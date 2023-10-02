/**
 * Main Application script
 */
import React, { FunctionComponent, useRef } from 'react';
import { BryntumGantt } from '@bryntum/gantt-react';
import { ganttConfig } from './GanttConfig';
import './App.scss';

const App: FunctionComponent = () => {
    const ganttRef = useRef<BryntumGantt>(null);

    // save to backend
    const sync = () => {
        if (ganttRef.current !== undefined) {
            ganttRef.current?.instance.project.sync().then(
                () => console.log("Changes saved..."),
                ({ response, cancelled }) => console.log(`Error: ${cancelled ? 'Cancelled' : response.message}`)
            );
        }
    }

    return (
        <main>
            <p>
                <button onClick={sync}>Save to backend</button>
            </p>
            <BryntumGantt
                ref = {ganttRef}
                {...ganttConfig}
            />
        </main>
    );
};

// If you plan to use stateful React collections for data binding please check this guide
// https://bryntum.com/products/gantt/docs/guide/Gantt/integration/react/data-binding

export default App;
