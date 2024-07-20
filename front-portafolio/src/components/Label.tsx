import { LabelHTMLAttributes } from 'react';

type LabelProps = LabelHTMLAttributes<HTMLLabelElement> & {
    className?: string;
    children: React.ReactNode;
};

const Label = ({ className = '', children, ...props }: LabelProps) => (
    <label
        className={`${className} block font-medium text-sm text-gray-700`}
        {...props}
    >
        {children}
    </label>
);

export default Label;
