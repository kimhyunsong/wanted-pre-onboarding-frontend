import axios from "axios"
import { useEffect, useState } from "react"
import  { useNavigate } from "react-router-dom"

function Todo(){

  const axiosInstance = axios.create({
    headers: {
      Authorization: `Bearer ${localStorage.getItem("AccessToken")}`,
      "Accept": "application/json;charset=UTF-8",
      "Content-Type": "application/json;charset=UTF-8"
    }
  })


  const navigate = useNavigate()
  const [todoList, setTodoList] = useState([])
  const [checkedList, setCheckedList] = useState([])
  const [todo, setTodo] = useState("")
  const [isUpdatingList, setIsUpdatingList] = useState([])
  const [updateTd, setUpdateTd] = useState("")





  async function axiosData(){
    await axiosInstance.get(process.env.REACT_APP_HOST + "todos")
    .then((res)=>{
      setTodoList(res.data)
      const tempChecked = [...checkedList]
      res.data.map((c) =>{
        tempChecked[c.id] = c.isCompleted
      })
      setCheckedList(tempChecked)
    })
    .catch((err)=>{
      //에러 처리
    })
  }
  const input_todo = function (e) {
    setTodo(e.target.value)
  }


  const createTodo = (async()=>{
    
    await axiosInstance.post(process.env.REACT_APP_HOST + "todos", {todo:todo})
    .then((res)=>{
      axiosData()
      setTodo('')
    })
    .catch((err)=>{
      alert(err)
    })
  })


  const updateTodo = ((e)=>{
    for (let i = 0; i < isUpdatingList.length; i++){
      if(isUpdatingList[i] === true) {
        alert("just one")
        return
      };
    }
    const tempIsUpdating = [...isUpdatingList]
    tempIsUpdating[e.target.id] = true 
    setIsUpdatingList(tempIsUpdating)

     for (let i = 0; i< todoList.length; i++){
      if (todoList[i].id == e.target.id) {
        setUpdateTd(todoList[i].todo)
        return
      }
    }
  })



  const cancelUpdate = ((e)=>{
    const tempIsUpdating = [...isUpdatingList]
    tempIsUpdating[e.target.id] = false 
    setIsUpdatingList(tempIsUpdating)
  })



  const update_input_todo = ((e)=>{
    setUpdateTd(e.target.value)
  })

  const submitUpdatedTodo = (async (e)=>{
    await axiosInstance.put(process.env.REACT_APP_HOST + `todos/${e.target.id}`,{
      todo: updateTd,
      isCompleted: checkedList[e.target.id]
    })
    .then((res)=>{
      const tempIsUpdating = [...isUpdatingList]
      tempIsUpdating[e.target.id] = false 
      setIsUpdatingList(tempIsUpdating)
      axiosData()
    })
    .catch((err)=>{
      alert(err)
    })
  })

  const deleteTodo = (async (e)=>{
    await axiosInstance.delete(process.env.REACT_APP_HOST + `todos/${e.target.id}`)
    .then((res)=>{
      axiosData()
    })
    .catch((err)=>{
      alert(err)
    })
  })




  const changeChecked = ((e)=>{
    const tempChecked = [...checkedList]
    tempChecked[e.target.id] = e.target.checked
    setCheckedList(tempChecked)
  })

  
  useEffect(()=>{
    if (localStorage.getItem("AccessToken") === null || localStorage.getItem("AccessToken") === ""){
      navigate('/signin')
    } else {
      axiosData()
    }
  }, [])
  return (
  <div>
    <input data-testid="new-todo-input" value={todo} onChange={input_todo}/>
    <button data-testid="new-todo-add-button" onClick={createTodo}>추가</button>
    
  {todoList.length === 0 ? <h1>없음</h1> : 
    todoList.map((c)=>
      <li key={c.id}>
        <label>
          <input type="checkbox" id={c.id} onChange={changeChecked} defaultChecked={checkedList[c.id] ? checkedList[c.id] : null}/>
          { isUpdatingList[c.id] && isUpdatingList[c.id] === true ?
          <input data-testid="modify-input" value={updateTd} onChange={update_input_todo}/> : <span id={c.id}>{c.todo}</span>
          }
        </label>

        { isUpdatingList[c.id] && isUpdatingList[c.id] === true ?
          <>
            <button data-testid="submit-button" id={c.id} onClick={submitUpdatedTodo}>제출</button>
            <button data-testid="cancel-button" id={c.id} onClick={cancelUpdate}>취소</button>
          </> : 
          <>
            <button data-testid="modify-button" id={c.id} onClick={updateTodo}>수정</button>
            <button data-testid="delete-button" id={c.id} onClick={deleteTodo}>삭제</button>
          </>
          }
        
      </li>
    )}
  </div>
  )
}


export default Todo