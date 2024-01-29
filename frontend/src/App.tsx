/**
 * Main Application script
 */
import React, { FunctionComponent, useRef } from 'react';
import { BryntumGantt, BryntumResourceHistogram } from '@bryntum/gantt-react';
import { ganttConfig } from './GanttConfig';
import './App.scss';
import { Button, Col, Container, Row, Tab, Tabs } from 'react-bootstrap';

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
        <Container fluid className='g-0' style={{ overflowX: 'clip' }}>
            <Row className='p-2'>
                <Col>
                    <Button onClick={sync}>Сохранить</Button>
                </Col>
            </Row>
            <Row className='p-2'>
                <Tabs defaultActiveKey="gantt" id="tabs" className="mb-3">
                    <Tab eventKey="gantt" title="Гант">
                        <BryntumGantt
                            height={1200}
                            ref = {ganttRef}
                            {...ganttConfig}
                            // listeners={{
                            //     taskclick: () => { alert ("task click!") }
                            // }}
                        />
                    </Tab>
                    <Tab eventKey="resources" title="Ресурсы">
                        <BryntumResourceHistogram
                            
                        />
                    </Tab>
                </Tabs>
            </Row>
        </Container>
    );
};

// If you plan to use stateful React collections for data binding please check this guide
// https://bryntum.com/products/gantt/docs/guide/Gantt/integration/react/data-binding

export default App;
