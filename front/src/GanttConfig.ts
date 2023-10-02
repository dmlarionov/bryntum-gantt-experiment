/**
 * Application configuration
 */
import { GanttConfig } from '@bryntum/gantt';

const ganttConfig: Partial<GanttConfig> = {
    // features: {
        // progressLine : {
        //     statusDate : new Date(2022, 4, 3)
        // }
    // },

    columns : [
        { type : 'name', field : 'name', width : 250 }
    ],
    viewPreset : 'weekAndDayLetter',
    barMargin  : 10,

    project : {
        transport : {
            load : {
                url: 'http://localhost:3025/projects/2/load'
                // url : 'data/gantt-data.json'
            },
            sync : {
                url: 'http://localhost:3025/projects/2/sync',
                headers : {
                    'Content-Type' : 'application/json'
                },
                credentials : 'include'
            }
        },
        skipSuccessProperty: true,
        autoLoad : true
    }
};

export { ganttConfig };
