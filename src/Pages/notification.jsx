import Notificationheader from '@/components/notification/notification-header'
import React from 'react'
import Alerts from '@/components/notificationcomp/alerts'
import Notificationsmsg from '@/components/notification/notification-message'
const Notification = () => {
  return (
   <>
   <Notificationheader/>
   <Alerts/>
   <Notificationsmsg/>
   </>
  )
}

export default Notification