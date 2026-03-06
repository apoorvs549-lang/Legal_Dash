import { Routes, Route } from 'react-router-dom'
import Sidebarc from './components/sidebarc'
import './index.css'
import Dashboard from './components/dashboard/dashboard'
import Tables from './Pages/tables'
import Billing from './Pages/billing'
import Notification from './Pages/notification'
import Teampage from './Pages/team-page'
import Tablechart from './Pages/table-chart'
import Employee from './Pages/employee'
import Clients from './Pages/clients'
import UploadPage from './Pages/upload-page'
import AuditLogs from './Pages/auditlogs'
import ActivityFeed from './Pages/activity-feed'
import { AuthProvider } from './context/AuthContext'
import LoginModal from './components/auth/login-modal'
import RoleGuard from './components/auth/role-guard'


function App() {
  return (
    <AuthProvider>
      <div className="flex min-h-screen w-full bg-background text-foreground transition-colors duration-300">
        <Sidebarc />

        <main className="flex-1 p-6 w-full bg-background">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/tables" element={<Tables />} />
            <Route path="/uploadpage" element={<UploadPage />} />
            <Route path="/billing" element={<Billing />} />
            <Route path='/notification' element={<Notification />} />
            <Route path="/teams" element={<Teampage />} />
            <Route path="/tablechart" element={
              <RoleGuard allowedRoles={['admin', 'lawyer']}>
                <Tablechart />
              </RoleGuard>
            } />
            <Route path="/employee" element={<Employee />} />
            <Route path="/clients" element={<Clients />} />
            <Route path="/auditlogs" element={
              <RoleGuard allowedRoles={['admin', 'lawyer']}>
                <AuditLogs />
              </RoleGuard>
            } />
            <Route path="/activity-feed" element={<ActivityFeed />} />
          </Routes>
        </main>

        {/* Login Modal — rendered globally, controlled by AuthContext */}
        <LoginModal />
      </div>
    </AuthProvider>
  )
}

export default App
