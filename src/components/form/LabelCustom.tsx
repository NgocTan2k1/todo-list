import React from 'react';

export interface ILabelCustom {
    tailwindCSS: string[] | [];
    labelName?: string;
    required?: boolean;
    children?: React.ReactNode; // Prop children
}

const LabelCustom: React.FC<ILabelCustom> = ({ tailwindCSS, labelName, required }) => {
    return (
        <p className={tailwindCSS[0]}>
            {labelName}
            {required && <strong className={tailwindCSS[1]}> *</strong>}
        </p>
    );
};

export default LabelCustom;
