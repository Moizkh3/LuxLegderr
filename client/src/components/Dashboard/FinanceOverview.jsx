import React from 'react'
import CustomPieChart from '../Charts/CustomPieChart';

const COLORS = ["#d8f3dc", "#95d5b2", "#2d6a4f"]

const FinanceOverview = ({ totalBalance, totalIncome, totalExpense }) => {

    const balanceData = [
        { name: "Total Balance", amount: totalBalance, fill: COLORS[0] },
        { name: "Total Expenses", amount: totalExpense, fill: COLORS[1] },
        { name: "Total Income", amount: totalIncome, fill: COLORS[2] }
    ];

    return (
        <div className='card'>
            <div className='flex items-center justify-between'>
                <h5 className='text-lg'>Financial Overview</h5>
            </div>

            <CustomPieChart
                data={balanceData}
                label="Total Balance"
                totalAmount={`$${totalBalance}`}
                showTextAnchor
            />

        </div>
    )
}

export default FinanceOverview