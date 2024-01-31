import { ModelFieldConfig, TaskModel } from "@bryntum/gantt";

export class DsrTaskModel extends TaskModel {
  static get fields(): Partial<ModelFieldConfig>[] {
    return [
      { name: 'stage', dataSource: 'stage', defaultValue: 'Не указано', type: 'string' },
      { name: 'sapToroOrder', dataSource: 'sapToroOrder', defaultValue: 'Не указано', type: 'string' },
      { name: 'sapToroOperation', dataSource: 'sapToroOperation', defaultValue: 'Не указано', type: 'string' }
    ]
  }
}