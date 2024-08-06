import {useEffect, useState} from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom'

const Post = () => {
  const [posts, setPost] = useState([])
  const [error, setError] = useState('')

 

  useEffect(() =>{
    axios.get('https://jsonplaceholder.typicode.com/posts')
    .then(response =>{
      setPost(response.data)
      console.log(response.data)
    })
    .catch(error =>{
      setError(error)
      console.log(error)
    })
  }, [])

  return (
    <div>
        <h1 className='text-center text-gray-600 text-3xl mt-4 font-bold'>Post Page</h1>
        <div className='px-2 flex flex-wrap gap-4 mt-5 justify-center' >
          {
                posts.map(post =>(
                  <Link  to={`/post/${post.id}`} 
                  className='w-96 h-32  border p-4 mb-2 rounded-sm bg-slate-300 shadow-md' 
                  key={post.id}>
                        <p ><span className='text-gray-800 font-bold text-lg'>Id: </span> {post.id}</p>
                        <p className='mt-2'><span className='text-gray-800 font-bold text-lg'>Title: </span> {post.title}</p>
                  </Link>
                ))
          }
        </div>
    </div>
    
  )
}

export default Post
