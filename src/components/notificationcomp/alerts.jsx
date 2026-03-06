import { AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import {motion} from 'framer-motion'
const Alerts = () => {
  const [alerts, setAlerts] = useState([
    {
      id: 1,
      type: 'primary',
      message: 'Alexandra Thornton has submitted a new client intake form for review.',
      link: 'an example link',
      linkText: '. Give it a click if you like.',
      bgColor: 'bg-pink-600',
      textColor: 'text-white',
    },
    {
      id: 2,
      type: 'secondary',
      message: 'The matter Holloway v. Metro Transit has been marked as Ready for Filing.',
      link: 'an example link',
      linkText: '. Give it a click if you like.',
      bgColor: 'bg-gray-600',
      textColor: 'text-white',
    },
    {
      id: 3,
      type: 'success',
      message: 'You have a filing deadline for State v. Fortunato in 2 days.',
      link: 'an example link',
      linkText: '. Give it a click if you like.',
      bgColor: 'bg-green-600',
      textColor: 'text-white',
    },
    {
      id: 4,
      type: 'error',
      message: 'A new document has been uploaded to Reinholt Employment Claim.',
      link: 'an example link',
      linkText: '. Give it a click if you like.',
      bgColor: 'bg-red-600',
      textColor: 'text-white',
    },
    {
      id: 5,
      type: 'warning',
      message: 'Initial consultation with Priya Ananthan scheduled for tomorrow at 10:30 AM.',
      link: 'an example link',
      linkText: '. Give it a click if you like.',
      bgColor: 'bg-orange-500',
      textColor: 'text-white',
    },
    {
      id: 6,
      type: 'info',
      message: 'New intake requires conflict review before proceeding.',
      link: 'an example link',
      linkText: '. Give it a click if you like.',
      bgColor: 'bg-blue-600',
      textColor: 'text-white',
    },
    {
      id: 7,
      type: 'purple',
      message: 'Invoice #INV-4821 has been generated for Business Litigation – Apex Corp.',
      link: 'an example link',
      linkText: '. Give it a click if you like.',
      bgColor: 'bg-purple-600',
      textColor: 'text-white',
    },
    {
      id: 8,
      type: 'indigo',
      message: 'You have received a new secure message from Margaret Holloway.',
      link: 'an example link',
      linkText: '. Give it a click if you like.',
      bgColor: 'bg-indigo-600',
      textColor: 'text-white',
    },
    {
      id: 9,
      type: 'teal',
      message: 'Court hearing for Estate of Walker begins in 3 hours.',
      link: 'an example link',
      linkText: '. Give it a click if you like.',
      bgColor: 'bg-teal-600',
      textColor: 'text-white',
    },
    {
      id: 10,
      type: 'cyan',
      message: 'A new matter Employment Dispute – Rivera has been assigned to you.',
      link: 'an example link',
      linkText: '. Give it a click if you like.',
      bgColor: 'bg-cyan-600',
      textColor: 'text-white',
    },
  ]);

  const handleClose = (id) => {
    setAlerts(alerts.filter((alert) => alert.id !== id));
  };

  return (
    <div className="w-full mt-2 rounded-lg max-w-4xl mx-auto p-6 bg-gray-200 min-h-screen ">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Alerts</h1>
      
      <div className="space-y-4">
        <AnimatePresence>
        {alerts.map((alert) => (
          <motion.div
            key={alert.id}
            initial={{opacity:0,y:-20,height:0}}
            animate={{opacity:1,y:0,height:"auto"}}
            exit={{opacity:0,y:100,height:0,
                marginBottom:0,
                transition:{
                    duration:0.3,
                    ease:"easeInOut"
                }
            }}
            transition={{duration:0.5,ease:"easeInOut"}}>
                <div
            className={`${alert.bgColor} ${alert.textColor} px-6 py-4 rounded-lg flex items-center justify-between shadow-md`}
          >
            <p className="flex-1">
              {alert.message}
            </p>
            
            <button
              onClick={() => handleClose(alert.id)}
              className="ml-4 hover:opacity-75 transition-opacity"
              aria-label="Close alert"
            >
              <svg
                className="w-5 h-5"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
            </div>
          </motion.div>
        ))}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Alerts;