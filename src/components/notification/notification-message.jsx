import { Toaster, toast } from 'react-hot-toast';
import { XCircle } from "lucide-react"
import WarningIcon from '@mui/icons-material/Warning';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import InfoOutlineIcon from '@mui/icons-material/InfoOutline';
const Notificationsmsg = () => {
    const showSuccessNotification = () => {
        // toast.dismiss();
        toast.custom((t) => (
            <div
                className={`${t.visible ? 'animate-enter' : 'animate-leave'
                    } max-w-md w-full bg-white shadow-lg rounded-lg pointer-events-auto flex flex-col border-l-4 border-green-500`}
            >
                {/* Header with close button and timestamp */}
                <div className="flex items-center justify-between px-4 pt-3 pb-2">
                    <span className="text-xs text-gray-500">10 minutes ago</span>
                    <button
                        onClick={() => toast.dismiss(t.id)}
                        className="text-gray-400 hover:text-gray-600 transition-colors"
                    >
                        <XCircle />
                    </button>
                </div>

                {/* Content */}
                <div className="px-4 pb-4">
                    <div className="flex items-start">
                        <div className="flex-shrink-0">
                            <CheckCircleIcon/>
                        </div>
                        <div className="ml-3 flex-1">
                            <h3 className="text-sm font-semibold text-gray-900">
                                Success Notification
                            </h3>
                            <p className="mt-1 text-sm text-gray-600">
                                Your operation completed successfully! Everything is working as expected.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        ), {
            duration: 5000,
            position: 'bottom-right',
            //id: "global-notification"
        });
    };

    const showInfoNotification = () => {
        // toast.dismiss();
        toast.custom((t) => (
            <div
                className={`${t.visible ? 'animate-enter' : 'animate-leave'
                    } max-w-md w-full bg-white shadow-lg rounded-lg pointer-events-auto flex flex-col border-l-4 border-blue-500`}
            >
                <div className="flex items-center justify-between px-4 pt-3 pb-2">
                    <span className="text-xs text-gray-500">5 minutes ago</span>
                    <button
                        onClick={() => toast.dismiss(t.id)}
                        className="text-gray-400 hover:text-gray-600 transition-colors"
                    >
                        <XCircle />
                    </button>
                </div>

                <div className="px-4 pb-4">
                    <div className="flex items-start">
                        <div className="flex-shrink-0">
                            <InfoOutlineIcon/>
                        </div>
                        <div className="ml-3 flex-1">
                            <h3 className="text-sm font-semibold text-gray-900">
                                Info Notification
                            </h3>
                            <p className="mt-1 text-sm text-gray-600">
                                Here's some important information you should know about your account.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        ), {
            duration: 5000,
            position: 'bottom-right',
           // id: "global-notification"
        });
    };

    const showWarningNotification = () => {
        //toast.dismiss();
        toast.custom((t) => (
            <div
                className={`${t.visible ? 'animate-enter' : 'animate-leave'
                    } max-w-md w-full bg-white shadow-lg rounded-lg pointer-events-auto flex flex-col border-l-4 border-orange-500`}
            >
                <div className="flex items-center justify-between px-4 pt-3 pb-2">
                    <span className="text-xs text-gray-500">15 minutes ago</span>
                    <button
                        onClick={() => toast.dismiss(t.id)}
                        className="text-gray-400 hover:text-gray-600 transition-colors"
                    >
                        <XCircle />
                    </button>
                </div>

                <div className="px-4 pb-4">
                    <div className="flex items-start">
                        <div className="flex-shrink-0">
                            <WarningIcon/>
                        </div>
                        <div className="ml-3 flex-1">
                            <h3 className="text-sm font-semibold text-gray-900">
                                Warning Notification
                            </h3>
                            <p className="mt-1 text-sm text-gray-600">
                                Please be careful! This action requires your attention and confirmation.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        ), {
            duration: 5000,
            position: 'bottom-right',
          //  id: "global-notification"
        });
    };

    const showErrorNotification = () => {
       // toast.dismiss();
        toast.custom((t) => (
            <div
                className={`${t.visible ? 'animate-enter' : 'animate-leave'
                    } max-w-md w-full bg-white shadow-lg rounded-lg pointer-events-auto flex flex-col border-l-4 border-red-500`}
            >
                <div className="flex items-center justify-between px-4 pt-3 pb-2">
                    <span className="text-xs text-gray-500">2 minutes ago</span>
                    <button
                        onClick={() => toast.dismiss(t.id)}
                        className="text-gray-400 hover:text-gray-600 transition-colors"
                    >
                        <XCircle />
                    </button>
                </div>

                <div className="px-4 pb-4">
                    <div className="flex items-start">
                        <div className="flex-shrink-0">
                            <XCircle />
                        </div>
                        <div className="ml-3 flex-1">
                            <h3 className="text-sm font-semibold text-gray-900">
                                Error Notification
                            </h3>
                            <p className="mt-1 text-sm text-gray-600">
                                Oops! Something went wrong. Please try again or contact support.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        ), {
            duration: 5000,
            position: 'bottom-right',
           // id: "global-notification"
        });
    };

    return (
        <div className="w-full max-w-4xl rounded-lg mx-auto p-6 bg-gray-200 mt-2">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-800 mb-2">Notifications</h1>
                <p className="text-gray-600">
                    Notifications on this page use Toasts from Bootstrap. Read more details here.
                </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <button
                    onClick={showSuccessNotification}
                    className="bg-green-600 hover:bg-green-700 text-white font-semibold py-6 px-6 rounded-lg shadow-md transition-all duration-200 transform hover:scale-105"
                >
                    SUCCESS
                    <br />
                    NOTIFICATION
                </button>

                <button
                    onClick={showInfoNotification}
                    className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-6 px-6 rounded-lg shadow-md transition-all duration-200 transform hover:scale-105"
                >
                    INFO NOTIFICATION
                </button>

                <button
                    onClick={showWarningNotification}
                    className="bg-orange-500 hover:bg-orange-600 text-white font-semibold py-6 px-6 rounded-lg shadow-md transition-all duration-200 transform hover:scale-105"
                >
                    WARNING
                    <br />
                    NOTIFICATION
                </button>

                <button
                    onClick={showErrorNotification}
                    className="bg-red-600 hover:bg-red-700 text-white font-semibold py-6 px-6 rounded-lg shadow-md transition-all duration-200 transform hover:scale-105"
                >
                    ERROR
                    <br />
                    NOTIFICATION
                </button>
            </div>

            {/* Toaster component with custom styles */}
            <Toaster
                position="bottom-right"
                toastOptions={{
                    className: '',
                    style: {
                        background: 'transparent',
                        boxShadow: 'none',
                        padding: 0,
                    },
                }}
            />

            <style jsx>{`
                @keyframes enter {
          0% {
            transform: translateX(100%);
            opacity: 0;
          }
          100% {
            transform: translateX(0);
            opacity: 1;
          }
        }

        @keyframes leave {
          0% {
            transform: translateX(0);
            opacity: 1;
          }
          100% {
            transform: translateX(100%);
            opacity: 0;
          }
        }

        .animate-enter {
          animation: enter 0.3s ease-out;
        }

        .animate-leave {
          animation: leave 0.2s ease-in forwards;
        }
         `} 
        </style>
        </div>
    );
};

export default Notificationsmsg;