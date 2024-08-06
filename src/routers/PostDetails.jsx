import {useParams, useNavigate} from 'react-router-dom'
import {useEffect, useState, useReducer} from 'react'
import axios from 'axios'


const reducer = (state, action) =>{
  switch(action.type){
    case 'SET-ALL-FIELD': 
      return {userId: action.post.userId, id: action.post.id,title: action.post.title, body: action.post.body}
    case 'SET-POST-TITLE': 
      return {...state, title: action.title}
    case 'SET-POST-BODY': 
      return {...state, body: action.body}
  }
}

const PostDetails = () => {
  const {id} = useParams()
  const [error, setError] = useState('')
  const navigate = useNavigate()
  const [statePost, dispatchPost] = useReducer(reducer, {
    userId: '',
    title: '',
    body: ''
  })

  const handleBackContact = () =>{
      return navigate('/post')
  }

  useEffect(()=>{
    axios.get(`https://jsonplaceholder.typicode.com/posts/${id}`)
    .then(response =>{
      dispatchPost({type: 'SET-ALL-FIELD', post: response.data})
    })
    .catch(error =>{
      setError(error)
    })
  }, [])

  const handleEdit = (event) =>{
      axios.put(`https://jsonplaceholder.typicode.com/posts/${id}`,  statePost)
      .then(response =>{
        console.log(response)
      })
      .catch(error =>{
        console.log(error)
      })
      event.preventDefault()
      
  }

  return (
    <div className='text-center mt-3'>
        <h1 
        className='text-gray-800 text-3xl text-center'
        >Post Details {id}</h1>

      <div>
        <form 
        onSubmit={handleEdit}
        action=""
        className='flex flex-col gap-3 max-w-lg mx-auto px-2 mt-6'
        >
           <div className='flex flex-col items-start gap-2'>
            <label htmlFor="" >Title</label>
            <input 
            className='w-full border p-2 rounded-sm  outline-none'
            type="text"
            value={id}
            disabled
            />
          </div>
          <div className='flex flex-col items-start gap-2'>
            <label htmlFor="" >Title</label>
            <input 
            className='w-full border p-2 rounded-sm  outline-none'
            type="text"
            value={statePost.title}
            onChange={(event) =>dispatchPost({type: 'SET-POST-TITLE', title: event.target.value})}
            />
          </div>
          <div className='flex flex-col items-start gap-1'>
            <label htmlFor="">Body</label>
            <textarea 
            className='w-full h-40 border p-2 rounded-sm outline-none'
            value={statePost.body}
            onChange={(event) =>dispatchPost({type: 'SET-POST-BODY', body: event.target.value})}
            ></textarea>
          </div>
          <button 
          className='bg-gray-800 text-white outline-none py-2 px-4 text-center hover:bg-gray-700 
          rounded-sm mt-4'
          >Finish</button>
        </form>
      </div>


        <button 
        className='bg-gray-800 text-white outline-none py-4 px-4 text-center hover:bg-gray-700 
        rounded-full mt-6 bottom-8 right-4 fixed'
        onClick={handleBackContact}
        >Back</button>
    </div>
  )
}

export default PostDetails
