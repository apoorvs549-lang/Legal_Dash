import React from 'react'
import HomeIcon from '@mui/icons-material/Home';
const Notificationheader = () => {
   return (
    <div className="sticky top-0 z-50 backdrop-blur-md bg-white/70 border-b dark:bg-gray-800/70">
        <div className="flex items-center justify-between px-6 py-4">
            <div>
              <p className="text-sm text-gray-500"><HomeIcon/> / Notification</p>
          <h1 className="text-xl font-semibold">Notification</h1>  
            </div>
    </div>
    </div>
  )
}

export default Notificationheader