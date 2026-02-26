import React, { useEffect, useState } from 'react'
import { LuPlus } from 'react-icons/lu'
import CustomBarChart from '../Charts/CustomBarChart'
import { prepareIncomeBarChartData } from '../../utils/helper'

const IncomeOverview = ({ transactions, onAddIncome }) => {

    const [chartData, setChartData] = useState([])

    useEffect(() => {
        const result = prepareIncomeBarChartData(transactions);
        setChartData(result)
        return () => { }
    }, [transactions])

    useEffect(() => {
        const result = prepareIncomeBarChartData(transactions);
        console.log("Bar Chart Data:", result);
        setChartData(result);
    }, [transactions]);

    return (
        <div className='card'>
            <div className='flex items-center justify-between'>
                <div>
                    <h5 className='text-lg'>Income Overview</h5>
                    <p className='text-xs text-gray-400 mt-0.5'>Track your earnings over time and analyze your income trends.</p>
                </div>
                <button
                    className='add-btn'
                    onClick={onAddIncome}
                >
                    <LuPlus className='text-lg' />
                    Add Income
                </button>
            </div>

            <div className='mt-10'>
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
        </div>
    )
}

export default IncomeOverview