import React from 'react'

const Task = props => {
  return (
    <div className='task'>
      <h3>{props.title}</h3>
      <p>{props.id}</p>
      <p>{props.description}</p>
      <button className='btn btn--delete' id={props.id} onClick={props.handleDelete}>Delete</button>
    </div>
  )
}

export default Task