import {useReducer, useState} from 'react'
import axios from 'axios'
import SituationMessage from './SituationMessage'

const reducer = (state, action) => {
  switch(action.type){
    case 'SET-USERID':
      return {...state, userId: action.userId}
    case 'SET-TITLE':
      return {...state, title: action.title}
    case 'SET-BODY':
      return {...state, body: action.body}
  }
}

const situationReducer = (state, action) => {
  switch(action.type){
    case 'SET-ERROR-MESSAGE': 
      return {isInvalidField: true, errorMessage: action.message}
    case 'RESET-DEFUALT-VALUE':
      return {isInvalidField: false, success: false, errorMessage: ''}
    case 'SET-SUCCESS-MESSAGE':
      return {isInvalidField: false, success: true, errorMessage: '', successMessage: 'Registered with success'}
  }
}
const Register = () => {
  const [state, dispatch] = useReducer(reducer, {
    userId: '',
    title: '',
    body: ''
  })

  const [situationState, situationDispatch] = useReducer(situationReducer, {
    isInvalidField: false,
    errorMessage: '',
    success: false,
    successMessage: 'Registered with success',
  })
  const {isInvalidField,  errorMessage, successMessage, success} = situationState
  const {userId, title, body} = state

  const handleRegister = (event) =>{
    if(userId > 0){
      if(title.length > 0){
        if(body.length > 0){
          axios.post("https://jsonplaceholder.typicode.com/posts", state)
          .then(response =>{
            console.log(response)
          })
          .catch(error =>{
            console.log(error)
          })
        
          situationDispatch({type: 'RESET-DEFUALT-VALUE'})
          situationDispatch({type: 'SET-SUCCESS-MESSAGE'})
        }else{
          situationDispatch({type: 'SET-ERROR-MESSAGE', message: 'body camp cannot be empty'})
        }
      }else{
        situationDispatch({type: 'SET-ERROR-MESSAGE', message: 'title camp cannot be empty'})
      }
    }else{
      situationDispatch({type: 'SET-ERROR-MESSAGE', message: 'userId camp need be bigger than 0'})
    }
    event.preventDefault()
  }

  return (
    <div className="">
      <h1 className='text-center text-gray-600 text-3xl font-bold mt-10'>Register</h1>

      {
        isInvalidField && <SituationMessage message={errorMessage} alert={"Error!"} background="bg-red-400"/> 
      }
      {
        success && <SituationMessage message={successMessage}  alert={"Success!"} background="bg-green-400"/>
      }
      <form onSubmit={handleRegister}
      className="w-full max-w-md py-2 px-4 flex flex-col gap-2 mx-auto mt-12"
      >
        <div>
          <input type="text"
          placeholder="Insert Userid"
          className="w-full border p-2 rounded-sm outline-none"
          value={userId}
          onChange={(event) => {
            situationDispatch({type: 'RESET-DEFUALT-VALUE'})
            dispatch({type: 'SET-USERID', userId: event.target.value})
          }}
          />
        </div>
        <div>
          <input type="text"
          placeholder="Insert title"
          className="w-full border p-2 rounded-sm outline-none"
          value={title}
          onChange={(event) =>{ 
            situationDispatch({type: 'RESET-DEFUALT-VALUE'})
            dispatch({type: 'SET-TITLE', title: event.target.value})
          }}
          />
        </div>
        <div>
          <input type="text"
          placeholder="Insert body"
          className="w-full border p-2 rounded-sm outline-none"
          value={body}
          onChange={(event) =>{ 
            situationDispatch({type: 'RESET-DEFUALT-VALUE'})
            dispatch({type: 'SET-BODY', body: event.target.value})
          }}
          />
        </div>
        <button
        className="bg-gray-900 text-white py-2 px-4 outline-none hover:bg-gray-800 rounded-ms mt-6"
        >Finish</button>
      </form>
    </div>
  )
}

export default Register
