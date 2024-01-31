import React, { FunctionComponent, useRef } from "react";
import { BryntumGantt, BryntumGanttProps } from "@bryntum/gantt-react";
import { GanttFeaturesConfigType, GridColumnConfig } from "@bryntum/gantt";
import { DsrTaskModel } from '../models/DsrTaskModel';

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
    treeGroup: true,
    filter: true,
    taskMenu: {
      items: {
        // Custom reference to the new menu item
        moveOneDayForward : {
          text: 'Сдвинуть на 1 день вперёд',
          icon: 'b-fa b-fa-forward',
          weight : 90, // Add the item to the top
          onItem: (event) => {
            (event.record as DsrTaskModel).shift('day', 1);
          }
        },
        moveOneDayBackward : {
          text: 'Сдвинуть на 1 день назад',
          icon: 'b-fa b-fa-backward',
          weight : 95, // Add the item to the top
          onItem: (event) => {
            (event.record as DsrTaskModel).shift('day', -1);
          }
        }
      }
    },
    taskEdit: {
      items: {
        sapTab: {
          title  : 'SAP',
          weight : 450, // before Advanced tab, see https://bryntum.com/products/gantt/docs/guide/Gantt/customization/taskedit#customizing-the-tabs-and-the-fields
          items  : {
            sapToroOrder: {
              type: 'textfield',
              weight: 10,
              label: 'Заказ SAP ТОРО',
              // Name of the field matches data field name, so value is loaded/saved automatically.
              // In this case it is equal to the Task "name" field.
              name: 'sapToroOrder'
            },
            sapToroOperation: {
              type: 'textfield',
              weight: 20,
              label: 'Операция SAP ТОРО',
              name: 'sapToroOperation'
            }
          }
        }
      }
    }
  }
  const columns: Partial<GridColumnConfig>[] = [
    { type: 'name', field: 'name', text: 'Наименование', width: 250 },
    { type: 'column', field: 'sapToroOrder', text: 'Заказ SAP TORO', width: 250 },
    { type: 'column', field: 'sapToroOperation', text: 'Операция SAP TORO', width: 250 },
  ]

  return (
    <BryntumGantt
      ref={ref}
      features={features}
      columns={columns}
      {...props}
      // listeners={{
      //     taskclick: () => { alert ("task click!") }
      // }}
    />
  )
}

export default Gantt;