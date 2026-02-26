import React, { useEffect, useState } from 'react'
import { prepareExpenseBarChartData } from '../../utils/helper';
import CustomBarChart from '../Charts/CustomBarChart';

const Last30DaysExpenses = ({ data }) => {

    const [chartData, setChartData] = useState([]);

    useEffect(() => {
        const result = prepareExpenseBarChartData(data);
        setChartData(result)

        return () => { };
    }, [data])

    return (
        <div className='card col-span-1'>
            <div className='flex items-center justify-between'>
                <h5 className='text-lg'>Last 30 Days Expenses</h5>
            </div>

            <CustomBarChart
                data={chartData}
                gradientId="mintFinanceGradient"
                gradientColors={[
                    { offset: '0%', color: '#d8f3dc' },
                    { offset: '33%', color: '#95d5b2' },
                    { offset: '66%', color: '#52b788' },
                    { offset: '100%', color: '#2d6a4f' },
                ]}
            />
        </div>
    )
}

export default Last30DaysExpenses