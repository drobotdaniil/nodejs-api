import React, { useState} from 'react'
import FormGetById from '../FormGetById/FormGetById'
import FormAdd from '../FormAdd/FormAdd'
import DBTasksContainer from '../DBTasksContainer/DBTasksContainer'
import ClientTasksContainer from '../ClientTasksContainer/ClientTasksContainer'
const { v4: uuidv4 } = require('uuid')

const Content = () => {
  const [tasksCL, setTasksCL] = useState([])
  const [tasksDB, setTasksDB] = useState([])
  const [id, setValue] = useState('')
  const [title, setTitle] = useState('')
  const [desc, setDesc] = useState('')

  const handleInputIdx = e => {
    setValue(e.target.value)
  }

  const handleInputTitle = e => {
    setTitle(e.target.value)
  }

  const handleInputDesc = e => {
    setDesc(e.target.value)
  }

  const getTasks = e => {
    e.preventDefault()

    fetch(`http://localhost:3000/api/tasks`)
      .then(resp => resp.json())
      .then(data => {
        setTasksDB(data)
      })
      .catch(err => {
        throw err
    })
  }

  const getTaskById = async e => {
    e.preventDefault()

    try {
      const response = await fetch(`http://localhost:3000/api/tasks?id=${id}`)
      if (!response.ok) {
        throw new Error('Ответ сети был не ok.')
      }
      const result = await response.json()
      setTasksDB(result)
    } catch (error) {
      throw ('Возникла проблема с вашим fetch запросом: ', error.message)
    }
  }

  const deleteTaskDB = e => {
    const id = e.target.id

    fetch(`http://localhost:3000/api/delete?id=${id}`,
      {
        method: 'DELETE'
      }
    )
    .then(resp => resp.json())
    .then(data => {
      setTasksDB(data)
    })
  }

  const deleteTaskCL = e => {
    const id = e.target.id
    const arr = [...tasksCL]

    const filtered = arr.filter(task => task.id !== id)

    setTasksCL(filtered)
  }

  const saveTasks = () => {
    fetch(`http://localhost:3000/api/save`,
    {
      method: 'POST',
      body: JSON.stringify(tasksCL), 
    })
    .then(res => res.json())
    .then(data => {
      setTasksDB(data)
      setTasksCL([])
    })
  }

  const addTask = e => {
    e.preventDefault()
    
    const arr = [...tasksCL]
    arr.push({id: uuidv4(), title: title, description: desc})

    setTasksCL(arr)
  }

  return (
    <div className='wrapper'>
      
      <button className='btn' onClick={getTasks}>Get All Tasks</button>
      <FormGetById handleInput={handleInputIdx} getTaskById={getTaskById}/>
      <FormAdd addTask={addTask} handleInputTitle={handleInputTitle} handleInputDesc={handleInputDesc}/>
      <div className='tasks-wrapper'>
        {tasksCL.length ? <ClientTasksContainer tasks={tasksCL} deleteTask={deleteTaskCL} saveTasks={saveTasks} /> : ''}
        {tasksDB.length ? <DBTasksContainer tasks={tasksDB} deleteTask={deleteTaskDB}/> : ''}
      </div>
    </div>
  );
}

export default Content