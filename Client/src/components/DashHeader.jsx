import React from 'react'
import { CircleUserRound } from 'lucide-react';

const DashHeader = ({title}) => {
    return (
        <div className='flex items-center justify-between p-4 bg-white text-gray-800 shadow-sm'>
            <h2>{title}</h2>
            <div className="relative group">
                <CircleUserRound className='cursor-pointer' />
                <span className="absolute right-6 top-2 px-2 text-gray-800 text-xs opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-10">
                    Hi, Admin
                </span>
            </div>
        </div>
    )
}

export default DashHeader