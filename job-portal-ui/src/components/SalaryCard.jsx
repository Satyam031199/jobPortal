import React from 'react'

const SalaryCard = ({salary}) => {
  return (
    <div className='shadow px-4 py-8'>
        <h4 className="text-xl font-semibold">{salary.title}</h4>
        <p className='my-2 font-semibold text-blue text-lg'>{salary.salary}</p>
        <div className="flex flex-wrap gap-4">
            <a href="/" className='underline'>{salary.status}</a>
            <a href="/" className='underline'>{salary.skills}</a>
        </div>
    </div>
  )
}

export default SalaryCard