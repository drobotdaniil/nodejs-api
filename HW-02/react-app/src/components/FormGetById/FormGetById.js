import React from 'react'

const FormBlock = props => {
  return (
    <form onSubmit={props.getTaskById} className='form'>
      <input type='text' onChange={props.handleInput} className='form__input' placeholder='Write id here...' />
      <button className='form__btn btn'>Get Task By ID</button>
    </form>
  )
}

export default FormBlock