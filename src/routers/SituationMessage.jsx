import React from 'react'

const SituationMessage = ({message, alert, background}) => {
  return (
    <div className={`${background} py-4 max-w-5xl mx-auto mt-4 rounded-sm`}>
        <p className='indent-10 text-white'> 
        <span className='font-bold text-xl me-4'>{alert}</span>
        <span className= 'font-base'>{message}</span></p>
    </div>
  )
}

export default SituationMessage
