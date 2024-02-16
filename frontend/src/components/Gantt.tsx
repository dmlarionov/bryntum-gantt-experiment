import React, { FunctionComponent, useRef } from "react";
import { BryntumGantt, BryntumGanttProps } from "@bryntum/gantt-react";
import { ContainerItemConfig, GanttFeaturesConfigType, GridColumnConfig } from "@bryntum/gantt";
import { ExtendedTaskModel } from '../models/ExtendedTaskModel';
import { categoryTextMap } from "../Config";

const Gantt: FunctionComponent<Omit<BryntumGanttProps, "features"|"columns">> = (props) => {
  const ref = useRef<BryntumGantt>(null);
  const features: Partial<GanttFeaturesConfigType> = {
    // progressLine : {
    //     // statusDate : new Date()
    // },
    // labels: {
    //     // Label rendered above the event bar with content from the
    //     // record's location field
    //     top: {
    //         field: 'name',
    //         editor: {
    //             type: 'textfield'
    //         }
    //     }
    // }
    // pan: true,
    timeRanges : {
      showCurrentTimeLine : true,
    },
    tree: true,
    treeGroup: {
      // hideGroupedColumns: true,
      parentRenderer({ field, value, column, record }) {
        // console.log(record.id);
        let v: string = value.toString();
        // // The category field uses dictionary for a value
        // if (column.field === 'category') {
        //   v = categoryTextMap.get(value) ?? value;
        // }
        // For generated group parent, prefix with the grouped column text
        return `${column.text}: ${v}`;
      }
    },
    filter: true,
    taskMenu: {
      items: {
        // Custom reference to the new menu item
        moveOneDayForward : {
          text: 'Сдвинуть на 1 день вперёд',
          icon: 'b-fa b-fa-forward',
          weight : 90, // Add the item to the top
          onItem: (event) => {
            (event.record as ExtendedTaskModel).shift('day', 1);
          }
        },
        moveOneDayBackward : {
          text: 'Сдвинуть на 1 день назад',
          icon: 'b-fa b-fa-backward',
          weight : 95, // Add the item to the top
          onItem: (event) => {
            (event.record as ExtendedTaskModel).shift('day', -1);
          }
        }
      }
    },
    taskEdit: {
      items: {
        generalTab: {
          items: {
            stage: {
              // TODO: Задать ширину в Task Editor-е
              type: 'combo',
              label: 'Этап',
              items: [
                { value: 'Planning', text: 'Планирование' },
                { value: 'Preparation', text: 'Подготовка' },
                { value: 'Execution', text: 'Проведение' },
                { value: 'Analysis', text: 'Анализ' }
              ],
              name: 'stage'
            }
          }
        },
        sapTab: {
          title  : 'SAP',
          weight : 450, // before Advanced tab, see https://bryntum.com/products/gantt/docs/guide/Gantt/customization/taskedit#customizing-the-tabs-and-the-fields
          items: {
            // TODO: Выбор ТОРО заказа и операции из двух-уровневого списка, подгружаемого из бэкенда по мере набора текста.
            sapToroOrderOperation: {
              type: 'textfield',
              label: 'Заказ SAP ТОРО',
              // Name of the field matches data field name, so value is loaded/saved automatically.
              name: 'sapToroOrder'
            },
            sapToroOperation: {
              type: 'textfield',
              label: 'Операция SAP ТОРО',
              name: 'sapToroOperation'
            },
            greenButton: {
              type: 'button',
              text: 'Кнопень',
              color: 'b-green',
              onClick: () => {}
            }
          }
        }
      }
    }
  }
  const columns: Partial<GridColumnConfig>[] = [
    { type: 'name', field: 'name', text: 'Наименование', width: 250 },
    {
      type: 'column',
      field: 'sapToroOrder',
      text: 'Заказ SAP TORO',
      width: 250,
      // THIS IS WORKAROUND FOR THE BUG https://github.com/bryntum/support/issues/8466
      renderer: ({ value }) => value === '--' ? 'Отсутствует' : value,
      hidden: true
    },
    { type: 'column', field: 'sapToroOperation', text: 'Операция SAP TORO', width: 250, hidden: true },
    { type: 'column', field: 'sapTechPlace', text: 'Тех. место SAP', width: 250, hidden: true },
    { type: 'column', field: 'sapEquipment', text: 'ЕО SAP', width: 250, hidden: true },
    {
      type     : 'template',
      field    : 'category',
      text     : 'Категория работ',
      width    : 250,
      template: ({ value }) => `${categoryTextMap.get(value) || 'Не указано'}`,
      hidden   : true
  }
  ]
  const tbar: Partial<ContainerItemConfig>[] = [
    {
      type        : 'buttongroup',
      toggleGroup : true,
      items: [
        {
          text : 'none',
          pressed : true,
          onToggle({ pressed }) {
            pressed && ref.current?.instance.clearGroups();
          }
        },
        {
          text    : 'Заказ SAP TORO',
          onToggle({ pressed }) {
            pressed && ref.current?.instance.group(['sapToroOrder']);
          }
        },
        {
          text : 'Категория работ',
          onToggle({ pressed }) {
            pressed && ref.current?.instance.group(['category']);
          }
        },
        {
          text : 'Категория + Заказ',
          onToggle({ pressed }) {
            pressed && ref.current?.instance.group(['category', 'sapToroOrder']);
          }
        }
      ]
    }
]

  return (
    <BryntumGantt
      ref={ref}
      features={features}
      columns={columns}
      tbar={tbar}
      {...props}
      // listeners={{
      //     taskclick: () => { alert ("task click!") }
      // }}
    />
  )
}

export default Gantt;