import React from 'react';

export interface IInputCustom {
    tailwindCSS?: string;
    value: any;
    type: string;
}

const InputCustom: React.FC<IInputCustom> = (propsInput) => {
    return <input {...propsInput} />;
};

export default InputCustom;
