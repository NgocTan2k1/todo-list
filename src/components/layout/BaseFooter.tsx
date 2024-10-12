import React from 'react';

export interface IBaseFooter {
    children?: React.ReactNode;
}

const BaseFooter: React.FC<IBaseFooter> = () => {
    return <div className={'hidden'}>footer</div>;
};

export default BaseFooter;
