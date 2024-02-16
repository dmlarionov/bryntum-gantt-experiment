import { ModelFieldConfig, TaskModel } from "@bryntum/gantt";

export class ExtendedTaskModel extends TaskModel {
  static get fields(): Partial<ModelFieldConfig>[] {
    return [
      { type: 'string', name: 'sapToroOrder', dataSource: 'sapToroOrder', defaultValue: 'Не указано' },
      { type: 'string', name: 'sapToroOperation', dataSource: 'sapToroOperation', defaultValue: 'Не указано' },
      { type: 'string', name: 'sapTechPlace', dataSource: 'sapTechPlace', defaultValue: 'Не указано' },
      { type: 'string', name: 'sapEquipment', dataSource: 'sapEquipment', defaultValue: 'Не указано' },
      { type: 'string', name: 'category', dataSource: 'category', defaultValue: '0' },
    ]
  }
}