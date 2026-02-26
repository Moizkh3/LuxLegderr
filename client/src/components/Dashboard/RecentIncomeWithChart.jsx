import React, { useEffect, useState } from 'react'
import CustomPieChart from '../Charts/CustomPieChart'
import { addThousandsSeperator } from '../../utils/helper'

const COLORS = ["#d8f3dc", "#95d5b2", "#52b788", "#2d6a4f"];

const RecentIncomeWithChart = ({ data, totalIncome }) => {
    const [chartData, setChartData] = useState([]);

    const prepareChartData = () => {
        if (!data || data.length === 0) {
            setChartData([]);
            return;
        }

        const groupedData = {};

        data.forEach((item) => {
            const source = item?.source?.trim();
            if (source) {
                const amount = Number(item?.amount) || 0;
                if (groupedData[source]) {
                    groupedData[source] += amount;
                } else {
                    groupedData[source] = amount;
                }
            }
        });

        const dataArr = Object.keys(groupedData).map((key, index) => ({
            name: key,
            amount: groupedData[key],
            fill: COLORS[index % COLORS.length]
        }));

        setChartData(dataArr);
    };

    useEffect(() => {
        prepareChartData();
    }, [data]);

    return (
        <div className='card'>
            <div className='flex items-center justify-between'>
                <h5 className='text-lg'>Last 60 Days</h5>
            </div>

            {chartData.length > 0 ? (
                <>
                    <CustomPieChart
                        data={chartData}
                        label="Total Income"
                        totalAmount={`$${addThousandsSeperator(totalIncome)}`}
                        showTextAnchor
                    />

                    <div className="mt-6 space-y-3">
                        {chartData.map((item, index) => (
                            <div key={`income_item_${index}`} className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <div
                                        className="w-3 h-3 rounded-full"
                                        style={{ backgroundColor: item.fill }}
                                    />
                                    <span className="text-xs font-medium text-gray-700">{item.name}</span>
                                </div>
                                <span className="text-xs font-semibold text-gray-900">${addThousandsSeperator(item.amount)}</span>
                            </div>
                        ))}
                    </div>
                </>
            ) : (
                <div className="h-[380px] flex items-center justify-center text-gray-400 text-sm">
                    No income data available for the last 60 days
                </div>
            )}
        </div>
    );
};

export default RecentIncomeWithChart