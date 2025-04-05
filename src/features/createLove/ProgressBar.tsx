import { cn } from '@/utils/Helpers';

export const ProgressBar = ({ 
  currentStep, 
  totalSteps,
  onStepClick,
  stepTitles
}: { 
  currentStep: number; 
  totalSteps: number;
  onStepClick: (step: number) => void;
  stepTitles: string[];
}) => {
  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-2">
        {Array.from({ length: totalSteps }).map((_, index) => {
          const stepNumber = index + 1;
          const isActive = stepNumber === currentStep;
          const isCompleted = stepNumber < currentStep;
          
          return (
            <div key={index} className="flex flex-col items-center">
              <button
                className={cn(
                  "w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all",
                  isActive 
                    ? "border-primary bg-primary text-primary-foreground" 
                    : isCompleted 
                      ? "border-primary bg-primary/20 text-primary" 
                      : "border-muted-foreground bg-background text-muted-foreground"
                )}
                onClick={() => onStepClick(stepNumber)}
              >
                {stepNumber}
              </button>
              <span className={cn(
                "text-xs mt-1 text-center max-w-[80px]",
                isActive ? "text-primary font-medium" : "text-muted-foreground"
              )}>
                {stepTitles[index]}
              </span>
            </div>
          );
        })}
      </div>
      
      <div className="w-full bg-muted h-1 mt-2 rounded-full overflow-hidden">
        <div 
          className="bg-primary h-1 transition-all duration-300 ease-in-out"
          style={{ width: `${(currentStep - 1) / (totalSteps - 1) * 100}%` }}
        />
      </div>
    </div>
  );
}; 