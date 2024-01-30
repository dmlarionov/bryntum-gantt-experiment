/**
 * Main Application script
 */
import React, { FunctionComponent, useRef } from 'react';
import { ProjectModel } from '@bryntum/gantt';
import { Button, Col, Container, Row, Tab, Tabs } from 'react-bootstrap';
import { projectModelConfig } from './Config';
import './App.scss';
import Gantt from './Gantt';
import ResourceHistogram from './ResourceHistogram';

const App: FunctionComponent = () => {
  const bryntumHeight = 1200;
  const projectRef = useRef<ProjectModel>(new ProjectModel(projectModelConfig));
  // const projectRef = useRef<ProjectModel>(new ProjectModel({
  //   startDate  : '2017-01-01',

  //   tasksData : [
  //     { id : 1, name : 'Proof-read docs', startDate : '2017-01-02', endDate : '2017-01-09' },
  //     { id : 2, name : 'Release docs', startDate : '2017-01-09', endDate : '2017-01-10' }
  //   ],

  //   dependenciesData : [
  //     { fromTask : 1, toTask : 2 }
  //   ]
  // }));

  // save to backend
  const sync = () => {
    if (projectRef.current !== undefined) {
      projectRef.current.sync().then(
        () => console.log("Changes saved..."),
        ({ response, cancelled }) => console.log(`Error: ${cancelled ? 'Cancelled' : response.message}`)
      )
    } 
  }

  return (
    <>
      <Container fluid className='g-0' style={{ overflowX: 'clip' }}>
        <Row className='p-2'>
          <Col>
            <Button onClick={sync}>Сохранить</Button>
          </Col>
        </Row>
        <Row className='p-2'>
          <Tabs defaultActiveKey="gantt" id="tabs" className="mb-3">
            <Tab eventKey="gantt" title="Гант">
              <Gantt
                height={bryntumHeight}
                project={projectRef.current}
              />
            </Tab>
            <Tab eventKey="resources" title="Ресурсы">
              <ResourceHistogram
                height={bryntumHeight}
                project={projectRef.current}
              />
            </Tab>
          </Tabs>
        </Row>
      </Container>
    </>
  );
};

// If you plan to use stateful React collections for data binding please check this guide
// https://bryntum.com/products/gantt/docs/guide/Gantt/integration/react/data-binding

export default App;
