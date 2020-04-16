import React from 'react'

const FormBlock = props => {
  return (
    <form onSubmit={props.addTask} className='form form--add'>
      <input type='text' name='title' onChange={props.handleInputTitle} className='form__input' placeholder='Write title here...' required />
      <input type='text' name='description' onChange={props.handleInputDesc} className='form__input' placeholder='Write description here...' required />
      <button className='form__btn btn'>Add task</button>
    </form>
  )
}

export default FormBlock