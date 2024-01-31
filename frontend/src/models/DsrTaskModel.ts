import { ModelFieldConfig, TaskModel } from "@bryntum/gantt";

export class DsrTaskModel extends TaskModel {
  static get fields(): Partial<ModelFieldConfig>[] {
    return [
      { name: 'Заказ SAP TORO', dataSource: 'sapToroOrder' },
      { name: 'Операция SAP TORO', dataSource: 'sapToroOperation' }
    ]
  }
}