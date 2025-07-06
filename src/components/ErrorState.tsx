import { AlertTriangle } from "lucide-react";
import { cn } from "@/lib/utils"; // if you're using class name utility
import { FC } from "react";

interface ErrorMessageProps {
  title?: string;
  description?: string;
  className?: string;
}

const ErrorState: FC<ErrorMessageProps> = ({ title = "Something went wrong", description, className }) => {
  return (
    <div
      className={cn(
        "w-full bg-red-900/20 border border-red-700 text-red-300 px-4 py-3 rounded-lg flex items-start gap-3",
        className
      )}
    >
      <AlertTriangle className="w-5 h-5 mt-1 text-red-400" />
      <div>
        <p className="font-semibold">{title}</p>
        {description && <p className="text-sm text-red-400 mt-1">{description}</p>}
      </div>
    </div>
  );
};

export default ErrorState;
