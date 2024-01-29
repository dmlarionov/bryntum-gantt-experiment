/**
 * Application configuration
 */
import { GanttConfig } from '@bryntum/gantt';

const ganttConfig: Partial<GanttConfig> = {
    features: {
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
        }
    },
    
    columns : [
        { type : 'name', field : 'name', width : 250 }
    ],
    viewPreset : 'weekAndDayLetter',
    barMargin: 10,
    project : {
        transport : {
            load : {
                url: 'http://localhost:3025/projects/3/load'
                // url : 'data/gantt-data.json'
            },
            sync : {
                url: 'http://localhost:3025/projects/3/sync',
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
