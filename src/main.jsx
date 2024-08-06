import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'


import {createBrowserRouter, RouterProvider, Navigate} from 'react-router-dom'

import Home from './routers/Home.jsx'
import Post from './routers/Post.jsx'
import ErrorPage from './routers/ErrorPage.jsx'
import Register from './routers/Register.jsx'
import PostDetails from './routers/PostDetails.jsx'



const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/',
        element: <Home />
      },
      {
        path: '/register',
        element: <Register/>
      }, 
      {
        path: '/post',
        element: <Post />
      },
      {
        path: '/post/:id',
        element: <PostDetails />
      },
      {
        path: '/out-side',
        element: <Navigate to="/"/>
      }
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  //<React.StrictMode>
    <RouterProvider router={router} />
  //</React.StrictMode>,
)
