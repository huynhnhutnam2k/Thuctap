import React from 'react'
// import './input.scss'
function Input(props) {
    const { type , name, placeHolder, onChange } = props
  return (
    <div className="input">
        <input type={type} placeholder="" name={name} id={name} className="input-field" autoComplete='off' onChange={onChange}/>    
        <label htmlFor={placeHolder} className="input-label">{placeHolder}</label>
    </div>
  )
}

export default Input