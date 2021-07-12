
import React from 'react';
import { PieChart } from 'react-minimal-pie-chart';


const DoughnutChart = ({ chartData, onSegmentFocus, selectedIndex, onSegmentClick }) => {
    if (chartData.length > 0) {
        return (
            <PieChart
                lineWidth={30}
                paddingAngle={5}
                label={({ dataEntry }) => `${dataEntry.title} · ${dataEntry.value}`}
                labelStyle={{
                    fontSize: '3px',
                    fontFamily: 'sans-serif',
                    fill: '#E38627',
                }}
                labelPosition={85}
                segmentsTabIndex={1}
                onClick={(data, index) => {
                 onSegmentClick(data, index);
                }}
                data={chartData}
            />
        )
    }

    return <div>No Chart Found</div>

    
};

export default DoughnutChart;