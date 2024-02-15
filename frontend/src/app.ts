import { Gantt, ProjectModel } from "@bryntum/gantt";
import '@bryntum/gantt/gantt.stockholm.css';
import './style.css';

const
  // prioTextMap = { 1 : 'High', 2 : 'Medium', 3 : 'Low' },
  project     = new ProjectModel({
    transport : {
      load : {
        url: 'http://localhost:3025/projects/7/load'
        // url : 'data/gantt-data.json'
      },
      sync : {
        url: 'http://localhost:3025/projects/7/sync',
        headers : {
          'Content-Type' : 'application/json'
        },
        credentials : 'include'
      }
    },
    skipSuccessProperty: true,
    autoLoad: true,
  });

const gantt = new Gantt({
  appendTo : 'container',

  features : {
      treeGroup : {
          hideGroupedColumns : true,
          // levels             : [
          //     'priority'
          // ],
          // parentRenderer({ field, value, column, record }) {
          //     // Do not html encode priority columns value, it uses custom markup
          //     if (column.field === 'priority') {
          //         return `<div>${StringHelper.encodeHtml(column.text)}:</div>${value}`;
          //     }
          //     // For generated group parent, prefix with the grouped column text
          //     return StringHelper.xss`<div>${column.text}: ${value}</div>`;
          // }
      }
  },

  project,

  tbar: [
    {
      type        : 'buttongroup',
      toggleGroup : true,
      items: [
        {
          text : 'none',
          pressed : true,
          onToggle({ pressed }) {
            pressed && gantt.clearGroups();
          }
        },
        {
          text    : 'Заказ SAP TORO',
          onToggle({ pressed }) {
            pressed && gantt.group(['sapToroOrder']);
          }
        },
        {
          text : 'Категория работ',
          onToggle({ pressed }) {
            pressed && gantt.group(['category']);
          }
        },
        {
          text : 'Категория + Заказ',
          onToggle({ pressed }) {
            pressed && gantt.group(['category', 'sapToroOrder']);
          }
        }
      ]
    }
  ],

  // tbar : [
  //     'Drag columns here to group',
  //     { type : 'groupbar' }
  // ],

  columns: [
    { type: 'name', field: 'name', text: 'Наименование', width: 250 },
    { type: 'column', field: 'sapToroOrder', text: 'Заказ SAP TORO', width: 250, hidden: true },
    { type: 'column', field: 'sapToroOperation', text: 'Операция SAP TORO', width: 250, hidden: true },
    { type: 'column', field: 'sapTechPlace', text: 'Тех. место SAP', width: 250, hidden: true },
    { type: 'column', field: 'sapEquipment', text: 'ЕО SAP', width: 250, hidden: true },
    { type: 'column', field: 'category', text: 'Категория работ', width: 250, hidden: true }
  ],
  
  // columns : [
  //     {
  //         type       : 'name',
  //         flex       : 1,
  //         minWidth   : 300,
  //         htmlEncode : false,
  //         renderer   : ({ value }) => StringHelper.xss`<div>${value}</div>`
  //     },
  //     { field : 'cost', text : 'Cost', width : 150 },
  //     {
  //         field    : 'priority',
  //         text     : 'Priority',
  //         width    : 120,
  //         type     : 'template',
  //         template : ({ value = '' }) => `<div class="b-prio b-prio-${StringHelper.encodeHtml(value)}">${prioTextMap[value] || ''}</div>`
  //     },
  //     { type : 'startdate' },
  //     { type : 'duration', width : 150 }
  // ]
});

project.load();