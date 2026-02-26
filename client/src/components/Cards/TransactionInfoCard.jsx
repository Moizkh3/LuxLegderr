import React from 'react';
import {
    LuUtensils,
    LuTrendingUp, // For Income
    LuTrendingDown, // For Expense
    LuTrash2
} from 'react-icons/lu'

const TransactionInfoCard = ({ title, icon, date, amount, type, hideDeleteBtn, onDelete }) => {
    return (
        <div className='group relative flex items-center gap-4 mt-2 p-3 rounded-lg hover:bg-gray-100/60 transition-all duration-200'>
            <div className='w-12 h-12 flex items-center justify-center text-xl text-gray-800 bg-gray-100 rounded-full shrink-0'>
                {icon ? (
                    <img
                        src={icon}
                        alt={title}
                        className='w-6 h-6'
                    />
                ) : (
                    <LuUtensils />
                )}
            </div>

            <div className='flex flex-1 items-center justify-between'>
                <div>
                    <p className='text-sm font-medium text-gray-900'>{title}</p>
                    <p className='text-xs text-gray-500 mt-0.5'>{date}</p>
                </div>

                <div className='flex items-center gap-2'>
                    <div className={`flex items-center gap-1 px-2 py-1 rounded-md ${type === 'expense' ? 'text-red-600 bg-red-50' : 'text-green-600 bg-green-50'}`}>
                        {type === 'expense' ? <LuTrendingDown size={14} /> : <LuTrendingUp size={14} />}
                        <span className='text-xs font-semibold'>
                            {type === 'expense' ? '-' : '+'} ${amount}
                        </span>
                    </div>

                    {!hideDeleteBtn && (
                        <button
                            onClick={onDelete}
                            className='text-gray-400 hover:text-red-500 transition-colors p-1.5 rounded-full hover:bg-red-50'
                        >
                            <LuTrash2 size={16} />
                        </button>
                    )}
                </div>
            </div>
        </div>
    )
}

export default TransactionInfoCard