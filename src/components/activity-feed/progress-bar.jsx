import { motion } from 'framer-motion';
import { STATUS_STEPS, STATUS_CONFIG } from './activity-data';

const ProgressBar = ({ status }) => {
    const config = STATUS_CONFIG[status] ?? STATUS_CONFIG['Submitted'];
    const stepIndex = STATUS_STEPS.indexOf(status);

    return (
        <div className="my-4">
            {/* Track */}
            <div className="relative h-0.5  bg-slate-200 rounded-full overflow-hidden">
                <motion.div
                    className={`absolute inset-y-0 left-0 rounded-full ${config.barColor}`}
                    initial={{ width: '0%' }}
                    animate={{ width: `${config.progressPercent}%` }}
                    transition={{ duration: 0.8, ease: 'easeOut' }}
                />
            </div>

            {/* Step Dots */}
            <div className="relative flex justify-between -mt-[14px] px-0">
                {STATUS_STEPS.map((step, i) => {
                    const isCompleted = i <= stepIndex;
                    const stepConfig = STATUS_CONFIG[step];
                    return (
                        <div key={step} className="flex flex-col items-center">
                            <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ delay: 0.1 + i * 0.08, type: 'spring', stiffness: 300 }}
                                className={`w-[25px] h-[25px] rounded-full border-2 border-white shadow-sm 
                                     transition-colors duration-500
                  ${isCompleted ? config.barColor : 'bg-slate-300'}`}
                            />
                        </div>
                    );
                })}
            </div>

            {/* Labels */}
            <div className="flex justify-between mt-2">
                <span className="text-[10px] text-slate-400 font-medium">Submitted</span>
                <span className="text-[10px] text-slate-400 font-medium">Closed</span>
            </div>
        </div>
    );
};

export default ProgressBar;
