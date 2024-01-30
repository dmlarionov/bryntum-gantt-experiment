import React, { FunctionComponent, useRef } from "react";
import { BryntumResourceHistogram, BryntumResourceHistogramProps } from "@bryntum/gantt-react";
import { GridColumnConfig, ToolbarConfig } from "@bryntum/gantt";

export const ResourceHistogram: FunctionComponent<Omit<BryntumResourceHistogramProps, "columns">> = (props) => {
  const ref = useRef<BryntumResourceHistogram>(null);
  const columns: Partial<GridColumnConfig>[] = [
    { type: 'name', field: 'name', width: 250 }
  ]
  const tbar: Partial<ToolbarConfig> = {
    items    : {
      addButton    : { text : 'Добавить', icon : 'b-fa b-fa-plus' },
      deleteButton : { text : 'Удалить', icon : 'b-fa b-fa-trash' }
    }
  }

  return (
    <BryntumResourceHistogram
      ref={ref}
      columns={columns}
      tbar={tbar}
      {...props}
    />
  )
}

export default ResourceHistogram;