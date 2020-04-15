import React from 'react'
import Task from '../Task/Task'

const DBTasksContainer = props => {
  return (
    <div className='tasks'>
      <h1>DB tasks: </h1>
      {props.tasks.map(task => {
        return (
          <Task 
          key={task.id}
          id={task.id}
          title={task.title}
          description={task.description}
          handleDelete={props.deleteTask}
          />
        )
      })}
    </div>
  )
}

export default DBTasksContainer