/**
 * Application configuration
 */
import { ProjectModelConfig } from '@bryntum/gantt';

const projectModelConfig: Partial<ProjectModelConfig> = {
  transport : {
    load : {
      url: 'http://localhost:3025/projects/6/load'
      // url : 'data/gantt-data.json'
    },
    sync : {
      url: 'http://localhost:3025/projects/6/sync',
      headers : {
        'Content-Type' : 'application/json'
      },
      credentials : 'include'
    }
  },
  skipSuccessProperty: true,
  autoLoad : true
};

export { projectModelConfig };
