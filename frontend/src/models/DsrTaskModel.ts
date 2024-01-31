import { TaskModel } from "@bryntum/gantt";

export class DsrTaskModel extends TaskModel {
  static get fields() {
    return [
      { name: 'Заказ / Операция SAP TORO', column: 'sapToroNumber', type: 'string' }
    ]
  }
}