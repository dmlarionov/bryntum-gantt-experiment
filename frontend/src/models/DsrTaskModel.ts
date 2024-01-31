import { ModelFieldConfig, TaskModel } from "@bryntum/gantt";

export class DsrTaskModel extends TaskModel {
  static get fields(): Partial<ModelFieldConfig>[] {
    return [
      { name: 'sapToroOrder', dataSource: 'sapToroOrder', defaultValue: 'Не указано', type: 'string' },
      { name: 'sapToroOperation', dataSource: 'sapToroOperation', defaultValue: 'Не указано', type: 'string' }
    ]
  }
}