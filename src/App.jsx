import React, { useEffect, useState } from 'react'
import { FaDeleteLeft } from "react-icons/fa6";
import { MdOutlineDoneOutline } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import './App.css'
function App()
{
  const[isCompleteScreen,setIsCompleteSCreen]=useState(false)//because false means todo page true-completed page
  const[allTodos,setTodos]=useState([])
  const[newTitle,setNewTitle]=useState("")
  const[newDescription,setnewDescription]=useState("")
  const[completedTodos,setCompletedTodos]=useState([])
  const[currentEdit,setCurrentEdit]=useState("")
  const[currentEditedItem,setcurrentEditedItem]=useState("")

  const handleAddTodo=()=>{
    let newTodoItem = {
      title:newTitle,
      description:newDescription
    }
    let updatedTodoArr =[...allTodos];
    updatedTodoArr.push(newTodoItem)
    setTodos(updatedTodoArr);
    localStorage.setItem('todolist',JSON.stringify(updatedTodoArr))

    setNewTitle('');
    setnewDescription('');


  }
  const handleDeleteTodo=(index)=>
  {
    let reducedTodo = [...allTodos];
    reducedTodo.splice(index,1);
    localStorage.setItem('todolist',JSON.stringify(reducedTodo))
    setTodos(reducedTodo)
  }
  const handleComplete=(index)=>
  {
    let now = new Date();
    let dd = now.getDate();
    let mm =now.getMonth()+1;
    let year=now.getFullYear();
    let h=now.getHours();
    let m=now.getMinutes();
    let s=now.getSeconds();
    let completedOn =dd + '-' + mm + '-' + year + '-' + 'at' + h + ':' + m + ':' + s
    let filteredItem= {
      ...allTodos[index],
      completedOn:completedOn
    }
    let updatedCompletedArr = [...completedTodos];
    updatedCompletedArr.push(filteredItem)
    setCompletedTodos(updatedCompletedArr);
    handleDeleteTodo(index)
    localStorage.setItem('completedTodos',JSON.stringify(updatedCompletedArr))


  }
  const handleDeleteCompletedTodo=(index)=>{
    let reducedTodo = [...completedTodos];
    reducedTodo.splice(index,1);
    localStorage.setItem('completedTodos',JSON.stringify(reducedTodo))
    setCompletedTodos(reducedTodo)

  }
  const handleEdit=(ind,item)=>
  {
    setCurrentEdit(ind)
    setcurrentEditedItem(allTodos[ind])
  }
  const handleUpdatedTitle=(value)=>{

    setcurrentEditedItem((prev)=>{
      return{...prev,title:value}
    })


  }
  const handleUpdatedDescription=(value)=>{

    setcurrentEditedItem((prev)=>{
      return{...prev,description:value}
    })

  }
  const handleUpdatedTodo=()=>{
    let newToDo = [...allTodos]
    newToDo[currentEdit]=currentEditedItem;
    localStorage.setItem('handleUpdatedTodos',JSON.stringify(newToDo))
    setTodos(newToDo)
    setCurrentEdit("")
  }
  useEffect(()=>{
  let savedTodo = JSON.parse(localStorage.getItem('todolist'))
  let savedCompletedTodo = JSON.parse(localStorage.getItem('completedTodos'))
  let savedUpdatedTodo=JSON.parse(localStorage.getItem('handleUpdatedTodos'))

  if(savedTodo){
    setTodos(savedTodo);
  }
  if(savedCompletedTodo){
    setCompletedTodos(savedCompletedTodo);
  }
  if(savedUpdatedTodo){
    setTodos(savedUpdatedTodo);
  }

  },[])

  return(
    <div className='container'>
      <h1>From To Do to Completed Tasks</h1>
      <div className='todo-wrapper'>
        <div className='todo-input'>

          <div className='todo-input-item'>
            <label>Task Heading</label>
            <input type='text' value={newTitle} onChange={(e)=>setNewTitle(e.target.value)} placeholder='Enter the task heading'></input>
          </div>

          <div className='todo-input-item'>
            <label>Task Details</label>
            <input type='text' value={newDescription} onChange={(e)=>setnewDescription(e.target.value)} placeholder='Enter the task details'></input>
          </div>

          <div className='todo-input-item'>
           <button type='button' onClick={handleAddTodo} className='primarybtn' disabled={!newTitle || !newDescription}>Add</button>
          </div>

        </div>

        <div className='btn-area'>
          <button className={`secondaryBtn isCompleteScreen ${isCompleteScreen===false && 'active'}`} onClick={()=>setIsCompleteSCreen(false)}>ToDo</button>
          <button className={`secondaryBtn isCompleteScreen ${isCompleteScreen===true && 'active'}`} onClick={()=>setIsCompleteSCreen(true)}>Completed</button>
        </div>

        <div className='todo-list'>
         {isCompleteScreen===false && allTodos.map((item,index)=>{
          if(currentEdit===index){
          return(
            <div className='edit_wrapper' key={index}>
            <input placeholder='updated title' onChange={(e)=>handleUpdatedTitle(e.target.value)} value={currentEditedItem.title}></input>
            <textarea placeholder='updated description' rows={4} onChange={(e)=>handleUpdatedDescription(e.target.value)} value={currentEditedItem.description}/>
            <button type='button' onClick={handleUpdatedTodo} className='primarybtn'>Update</button>

            </div>
          )

          }
            
         else{
          return(
            <div className='todo-list-item' key={index}>
            <div>
            <h3>{item.title}</h3>
             <p>{item.description}</p>
            </div>
 
            <div>
            <FaDeleteLeft  className='icon' onClick= {()=>handleDeleteTodo(index)} title='Delete?'/>
            <MdOutlineDoneOutline className='check-icon' onClick={()=>handleComplete(index)} title='complete?' />
            <FaEdit  className='check-icon' onClick={()=>handleEdit(index,item)} title='edit?'/>
            </div>
 
           </div>
          )
         }
         })}

{isCompleteScreen===true && completedTodos.map((item,index)=>{
          return(
            <div className='todo-list-item' key={index}>
            <div>
            <h3>{item.title}</h3>
             <p>{item.description}</p>
             <p><small>Completed On:{item.completedOn}</small></p>
            </div>
 
            <div>
            <FaDeleteLeft  className='icon' onClick= {()=>handleDeleteCompletedTodo(index)} title='Delete?'/>
 
            </div>
 
           </div>
          )
         })}

        </div>
      </div>
    </div>
  )
}
export default App