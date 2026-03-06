import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

// Mock events data
const mockEvents = [
  { id: 1, title: 'Team Meeting', date: '2026-02-12', time: '09:00', duration: 60 },
  { id: 2, title: 'Project Review', date: '2026-02-12', time: '14:00', duration: 90 },
  { id: 3, title: 'Client Call', date: '2026-02-13', time: '10:00', duration: 60 },
  { id: 4, title: 'Lunch with Team', date: '2026-02-12', time: '12:00', duration: 60 },
];

const CalendarComponent = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [view, setView] = useState('month');
  const today = new Date();

  // Helper functions
  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    return { daysInMonth, startingDayOfWeek, year, month };
  };

  const isSameDay = (date1, date2) => {
    return date1.getDate() === date2.getDate() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getFullYear() === date2.getFullYear();
  };

  const formatDate = (date) => {
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
  };

  const getWeekDays = (date) => {
    const day = date.getDay();
    const diff = date.getDate() - day;
    const weekStart = new Date(date);
    weekStart.setDate(diff);

    const days = [];
    for (let i = 0; i < 7; i++) {
      const d = new Date(weekStart);
      d.setDate(weekStart.getDate() + i);
      days.push(d);
    }
    return days;
  };

  const getEventsForDate = (date) => {
    const dateStr = formatDate(date);
    return mockEvents.filter(event => event.date === dateStr);
  };

  const getEventsForTimeSlot = (date, hour) => {
    const dateStr = formatDate(date);
    return mockEvents.filter(event => {
      if (event.date !== dateStr) return false;
      const eventHour = parseInt(event.time.split(':')[0]);
      return eventHour === hour;
    });
  };

  const navigateMonth = (direction) => {
    const newDate = new Date(currentDate);
    newDate.setMonth(currentDate.getMonth() + direction);
    setCurrentDate(newDate);
  };

  const goToToday = () => {
    setCurrentDate(new Date(today));
  };

  // Month View
  const MonthView = () => {
    const { daysInMonth, startingDayOfWeek, year, month } = getDaysInMonth(currentDate);
    const days = [];

    // Previous month days
    for (let i = 0; i < startingDayOfWeek; i++) {
      const prevMonthDate = new Date(year, month, -startingDayOfWeek + i + 1);
      days.push({ date: prevMonthDate, isCurrentMonth: false });
    }

    // Current month days
    for (let i = 1; i <= daysInMonth; i++) {
      days.push({ date: new Date(year, month, i), isCurrentMonth: true });
    }

    // Next month days
    const remainingDays = 42 - days.length;
    for (let i = 1; i <= remainingDays; i++) {
      days.push({ date: new Date(year, month + 1, i), isCurrentMonth: false });
    }

    return (
      <div className="grid grid-cols-7 gap-px bg-gray-300">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
          <div key={day} className="bg-gray-100 p-3 text-center font-semibold text-sm">
            {day}
          </div>
        ))}
        {days.map((day, idx) => {
          const isToday = isSameDay(day.date, today);
          const isSelected = isSameDay(day.date, currentDate);
          return (
            <div
              key={idx}
              onClick={() => setCurrentDate(day.date)}
              className={`bg-white p-4 min-h-[80px] cursor-pointer hover:bg-gray-50 transition-colors ${!day.isCurrentMonth ? 'text-gray-400' : ''
                } ${isToday ? 'bg-yellow-100' : ''} ${isSelected ? 'bg-blue-100 ring-2 ring-blue-500' : ''
                }`}
            >
              <div className={`text-right text-sm ${isSelected ? 'font-bold' : ''}`}>
                {day.date.getDate()}
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  // Week View
  const WeekView = () => {
    const weekDays = getWeekDays(currentDate);
    const hours = Array.from({ length: 24 }, (_, i) => i);

    // Calculate height to match month view: header row + 6 rows of days with min-h-[80px] each
    // Header: ~48px, 6 rows × 80px = 480px, total ≈ 528px + padding
    return (
      <div className="h-[568px] overflow-auto border border-gray-300">
        <div className="grid grid-cols-8 gap-px bg-gray-300 min-w-[800px]">
          <div className="bg-gray-100 p-3 text-center font-semibold sticky top-0 left-0 z-20">Time</div>
          {weekDays.map((day, idx) => {
            const isToday = isSameDay(day, today);
            return (
              <div
                key={idx}
                className={`p-3 text-center font-semibold sticky top-0 z-10 ${isToday ? 'bg-yellow-100' : 'bg-gray-100'
                  }`}
              >
                <div className="text-xs text-gray-600">
                  {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'][idx]}
                </div>
                <div className="text-lg">{day.getDate()}</div>
              </div>
            );
          })}

          {hours.map(hour => (
            <React.Fragment key={hour}>
              <div className="bg-white p-2 text-xs text-gray-600 text-right sticky left-0 border-t z-10">
                {String(hour).padStart(2, '0')}:00
              </div>
              {weekDays.map((day, dayIdx) => {
                const isToday = isSameDay(day, today);
                const events = getEventsForTimeSlot(day, hour);
                return (
                  <div
                    key={dayIdx}
                    className={`bg-white p-2 min-h-[60px] border-t ${isToday ? 'bg-yellow-50' : ''
                      }`}
                  >
                    {events.map(event => (
                      <div key={event.id} className="bg-blue-100 border-l-4 border-blue-500 p-1 text-xs mb-1">
                        {event.title}
                      </div>
                    ))}
                  </div>
                );
              })}
            </React.Fragment>
          ))}
        </div>
      </div>
    );
  };

  // Day View
  const DayView = () => {
    const hours = Array.from({ length: 24 }, (_, i) => i);
    const dayName = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'][currentDate.getDay()];
    const dateStr = `${dayName}, ${currentDate.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}`;

    // Match height with month view
    return (
      <div className="h-[568px] overflow-auto border border-gray-300">
        <div className="grid grid-cols-2 gap-px bg-gray-300 min-w-[600px]">
          <div className="bg-gray-100 p-3 text-center font-semibold sticky top-0 z-10">Time</div>
          <div className="bg-yellow-100 p-3 text-center font-semibold sticky top-0 z-10">{dateStr}</div>

          {hours.map(hour => {
            const events = getEventsForTimeSlot(currentDate, hour);
            return (
              <React.Fragment key={hour}>
                <div className="bg-white p-3 text-sm text-gray-600 border-t">
                  {String(hour).padStart(2, '0')}:00
                </div>
                <div className="bg-yellow-50 p-3 min-h-[60px] border-t">
                  {events.map(event => (
                    <div key={event.id} className="bg-blue-100 border-l-4 border-blue-500 p-2 text-sm mb-2">
                      <div className="font-semibold">{event.title}</div>
                      <div className="text-xs text-gray-600">{event.time} ({event.duration} min)</div>
                    </div>
                  ))}
                </div>
              </React.Fragment>
            );
          })}
        </div>
      </div>
    );
  };

  // List View
  const ListView = () => {
    const todayEvents = getEventsForDate(currentDate);

    return (
      <div className="bg-white rounded-lg">
        <div className="p-4 border-b">
          <h3 className="text-lg font-semibold">
            Events for {currentDate.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
          </h3>
        </div>
        {todayEvents.length === 0 ? (
          <div className="p-8 text-center text-gray-500">
            No events scheduled for this day
          </div>
        ) : (
          <div className="divide-y">
            {todayEvents.map(event => (
              <div key={event.id} className="p-4 hover:bg-gray-50 transition-colors">
                <div className="flex items-start justify-between">
                  <div>
                    <h4 className="font-semibold text-gray-900">{event.title}</h4>
                    <p className="text-sm text-gray-600 mt-1">
                      {event.time} • {event.duration} minutes
                    </p>
                  </div>
                  <div className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                    {event.date}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-7xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
        {/* Header */}
        <div className="bg-gray-800 text-white p-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-4">
              <div className="flex gap-2">
                <button
                  onClick={() => navigateMonth(-1)}
                  className="p-2 hover:bg-gray-700 rounded transition-colors"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={() => navigateMonth(1)}
                  className="p-2 hover:bg-gray-700 rounded transition-colors"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
              <button
                onClick={goToToday}
                className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded transition-colors"
              >
                today
              </button>
            </div>

            <h2 className="text-2xl font-bold">
              {currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
            </h2>

            <div className="flex gap-2">
              <button
                onClick={() => setView('month')}
                className={`px-4 py-2 rounded transition-colors ${view === 'month' ? 'bg-white text-gray-800' : 'bg-gray-700 hover:bg-gray-600'
                  }`}
              >
                month
              </button>
              <button
                onClick={() => setView('week')}
                className={`px-4 py-2 rounded transition-colors ${view === 'week' ? 'bg-white text-gray-800' : 'bg-gray-700 hover:bg-gray-600'
                  }`}
              >
                week
              </button>
              <button
                onClick={() => setView('day')}
                className={`px-4 py-2 rounded transition-colors ${view === 'day' ? 'bg-white text-gray-800' : 'bg-gray-700 hover:bg-gray-600'
                  }`}
              >
                day
              </button>
              <button
                onClick={() => setView('list')}
                className={`px-4 py-2 rounded transition-colors ${view === 'list' ? 'bg-white text-gray-800' : 'bg-gray-700 hover:bg-gray-600'
                  }`}
              >
                list
              </button>
            </div>
          </div>
        </div>

        {/* Calendar Content */}
        <div className="p-4">
          {view === 'month' && <MonthView />}
          {view === 'week' && <WeekView />}
          {view === 'day' && <DayView />}
          {view === 'list' && <ListView />}
        </div>
      </div>
    </div>
  );
};

export default CalendarComponent;