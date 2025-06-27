import React from 'react'
import { CircleUserRound } from 'lucide-react';

const DashHeader = ({title}) => {
    return (
        <div className='flex items-center justify-between p-4 bg-white text-gray-800 shadow-sm'>
            <h2>{title}</h2>
            <div>
                <CircleUserRound title="Admin" className='cursor-pointer' />
            </div>
        </div>
    )
}

export default DashHeader