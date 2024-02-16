/**
 * Application configuration
 */
import { ProjectModelConfig } from '@bryntum/gantt';
import { ExtendedTaskModel } from './models/ExtendedTaskModel';

const categoryTextMap = new Map<string, string>([
  ['1', 'Операции останова'],
  ['2', 'Операции ремонта (критические работы)'],
  ['3', 'Операции ремонта (прочие работы)'],
  ['4', 'Операции запуска']
]);

const projectModelConfig: Partial<ProjectModelConfig> = {
  transport : {
    load : {
      url: 'http://localhost:3025/projects/7/load'
      // url : 'data/gantt-data.json'
    },
    sync : {
      url: 'http://localhost:3025/projects/7/sync',
      headers : {
        'Content-Type' : 'application/json'
      },
      credentials : 'include'
    }
  },
  skipSuccessProperty: true,
  autoLoad: true,
  taskModelClass: ExtendedTaskModel
};

export { projectModelConfig, categoryTextMap };
