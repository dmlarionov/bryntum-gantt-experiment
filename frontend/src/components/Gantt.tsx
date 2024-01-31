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
    }
  }
  const columns: Partial<GridColumnConfig>[] = [
    { type: 'name', field: 'name', width: 250 },
    { type: 'column', field: 'sapToroNumber', text: 'Заказ / Операция SAP TORO', width: 250 }
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