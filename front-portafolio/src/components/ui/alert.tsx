import React from 'react';
import { AlertCircle } from 'lucide-react';

interface AlertProps {
  title?: string;
  children: React.ReactNode;
  variant?: 'default' | 'destructive';
  className?: string;
}

const Alert: React.FC<AlertProps> = ({ title, children, variant = 'default' }) => {
  const baseStyles = "rounded-lg border p-4";
  const variantStyles = {
    default: "bg-blue-50 border-blue-200 text-blue-800",
    destructive: "bg-red-50 border-red-200 text-red-800"
  };

  return (
    <div className={`${baseStyles} ${variantStyles[variant]}`} role="alert">
      <div className="flex items-start">
        <div className="flex-shrink-0">
          <AlertCircle className="h-5 w-5" />
        </div>
        <div className="ml-3">
          {title && (
            <AlertTitle className="text-sm font-medium mb-1">{title}</AlertTitle>
          )}
          <AlertDescription className="text-sm">{children}</AlertDescription>
        </div>
      </div>
    </div>
  );
};

interface AlertTitleProps {
  children: React.ReactNode;
  className?: string;
}

const AlertTitle: React.FC<AlertTitleProps> = ({ children, className }) => (
  <h3 className={`text-sm font-medium ${className}`}>{children}</h3>
);

interface AlertDescriptionProps {
  children: React.ReactNode;
  className?: string;
}

const AlertDescription: React.FC<AlertDescriptionProps> = ({ children, className }) => (
  <div className={`text-sm ${className}`}>{children}</div>
);

export { Alert, AlertDescription, AlertTitle };
