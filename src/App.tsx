import React, { ReactElement } from 'react';
import './assets/styles/App.css';

function App(): ReactElement {
    // const logger = (message: any) => {
    //     console.log(message);
    // };

    // logger(1);
    // logger('Hello World');
    const string: string = 'Hello World';

    return <div>{string}</div>;
}

export default App;
