import React, { FunctionComponent, useRef } from "react";
import { BryntumResourceUtilization, BryntumResourceUtilizationProps } from "@bryntum/gantt-react";
import { GridColumnConfig, ToolbarConfig } from "@bryntum/gantt";

export const ResourceUtilization: FunctionComponent<Omit<BryntumResourceUtilizationProps, "columns">> = (props) => {
  const ref = useRef<BryntumResourceUtilization>(null);
  const columns: Partial<GridColumnConfig>[] = [
    { type: 'name', field: 'name', text: 'Ресурс', width: 250 }
  ]
  const tbar: Partial<ToolbarConfig> = {
    items    : {
      addButton    : { text : 'Добавить', icon : 'b-fa b-fa-plus' },
      deleteButton : { text : 'Удалить', icon : 'b-fa b-fa-trash' }
    }
  }

  const startDate = new Date(2023, 10, 16); //(props.project as ProjectModel).startDate;

  return (
    <BryntumResourceUtilization
      ref={ref}
      columns={columns}
      tbar={tbar}
      startDate={startDate}
      {...props}
    />
  )
}

export default ResourceUtilization;