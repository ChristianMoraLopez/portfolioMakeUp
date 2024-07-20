import React from 'react';

interface InputErrorProps {
    messages?: string[]; // messages es un array de strings opcional
    className?: string; // className es una cadena de texto opcional
}

const InputError: React.FC<InputErrorProps> = ({ messages = [], className = '' }) => (
    <>
        {messages.length > 0 && (
            <>
                {messages.map((message, index) => (
                    <p
                        className={`${className} text-sm text-red-600`}
                        key={index}
                    >
                        {message}
                    </p>
                ))}
            </>
        )}
    </>
);

export default InputError;
