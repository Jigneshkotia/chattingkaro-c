import React from 'react'
import {Line , Doughnut} from "react-chartjs-2"
import {ArcElement, CategoryScale, Chart as ChartJS, Filler, Legend, LineElement, LinearScale, PointElement, Tooltip} from "chart.js"
import { lightpurple, purple, Orange } from '../../Constants/Colors';
import { getLast7Days } from '../../lib/features';
import { orange } from '@mui/material/colors';

ChartJS.register(CategoryScale, Tooltip, LinearScale, LineElement, PointElement, Filler, ArcElement, Legend);

const labels = getLast7Days();

const LineChartOptions = {
    response : true,
    Plugins: {
        legend : {
            display : false,
        },
        title : {
            display : false,
        },
    },

    scales : {
        x : {
            grid : {
                display : false,
            }
        },
        y : {
            beginAtZero : true,
            grid : {
                display : false,
            }
        }
    }
};

const LineChart = ({value=[]}) => {
    const data = {
        labels,
        datasets: [{
            data : value,
            label : "Messages",
            fill : true,
            backgroundColor : lightpurple,
            borderColor : purple
        }]
    }
  return <Line data={data} options={LineChartOptions}/>
};

const DoughnutChartOptions = {
    responsive : true,
    plugins : {
        legend: {
            display : false,
        }
    },
    cutout : 120
}

const DoughnutChart = ({ value = [], labels = [] }) => {
    const data = {
        labels,
        datasets: [{
            data: value,
            label: "Total Chats Vs Group Chats", // Corrected 'Label' to 'label'
            backgroundColor: [lightpurple, Orange],
            borderColor: [purple, Orange],
            borderWidth: 1,
            offset : 10
        }]
    };
    return <Doughnut style={{zIndex: 10}} data={data} options={DoughnutChartOptions}/>;
};

export {LineChart , DoughnutChart}