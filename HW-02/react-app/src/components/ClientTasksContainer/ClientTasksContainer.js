import React from 'react'
import Task from '../Task/Task'

const ClientTasksContainer = props => {
  return (
    <div className='tasks'>
      <h1>Client tasks: </h1>
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
      <button onClick={props.saveTasks}>Save Task(s)</button>
    </div>
  )
}

export default ClientTasksContainer