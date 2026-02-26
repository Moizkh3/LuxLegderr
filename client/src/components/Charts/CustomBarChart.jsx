import React from 'react'
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer
} from 'recharts'

const DEFAULT_GRADIENT = [
    { offset: '0%', color: '#d8f3dc' },
    { offset: '33%', color: '#95d5b2' },
    { offset: '66%', color: '#52b788' },
    { offset: '100%', color: '#2d6a4f' },
];

const CustomBarChart = ({
    data,
    gradientId = 'barGradient',
    gradientColors = DEFAULT_GRADIENT
}) => {

    const CustomTooltip = ({ active, payload }) => {
        if (active && payload && payload.length) {
            return (
                <div className='bg-white shadow-xl rounded-lg p-3 border border-gray-100'>
                    <p className='text-xs font-semibold text-[#2d6a4f] mb-1 leading-none'>
                        {payload[0].payload.category}
                    </p>
                    <p className='text-sm text-gray-600 font-medium'>
                        Amount: <span className='text-gray-900'>
                            ${payload[0].payload.amount}
                        </span>
                    </p>
                </div>
            )
        }
        return null;
    };

    return (
        <div className='bg-white mt-6'>
            <ResponsiveContainer width="100%" height={300}>
                <BarChart data={data}>
                    <defs>
                        <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
                            {gradientColors.map((stop, i) => (
                                <stop key={i} offset={stop.offset} stopColor={stop.color} />
                            ))}
                        </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                    <XAxis
                        dataKey="category"
                        tick={{ fontSize: 12, fill: "#666" }}
                        axisLine={false}
                        tickLine={false}
                    />
                    <YAxis
                        tick={{ fontSize: 12, fill: "#666" }}
                        axisLine={false}
                        tickLine={false}
                    />
                    <Tooltip content={<CustomTooltip />} cursor={{ fill: '#f5f5f5' }} />
                    <Bar
                        dataKey="amount"
                        fill={`url(#${gradientId})`}
                        radius={[8, 8, 0, 0]}
                        barSize={30}
                    />
                </BarChart>
            </ResponsiveContainer>
        </div>
    )
}

export default CustomBarChart