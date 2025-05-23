import React, {useState, useEffect} from 'react'
import axios from 'axios'
import {useParams} from 'react-router-dom'
import BackButton from '../components/BackButton'
import Spinner from '../components/Spinner' 
const ShowBooks = () => {
  const [book, setBook] = useState({})
  const [loading, setLoading] = useState(false)
  const {id} = useParams()
const API_URL = (
  typeof import.meta !== "undefined" && import.meta.env.VITE_REACT_APP_API_URL
    ? import.meta.env.VITE_REACT_APP_API_URL
    : "http://localhost:5555"
).replace(/\/$/, "");
  useEffect(()=>{
    setLoading(true)
    axios
    .get(`${API_URL}/books/${id}`)
    .then((res) =>{
      setBook(res.data)
      setLoading(false)
    })
    .catch((error)=>{
      console.log(error)
      setLoading(false)
      return( 
        <h1>{error}</h1>
       )
    })
  },[])
   return (
    <div className='p-4'>
    <BackButton/>
    <h1 className="text-3xl my-4">Show Book</h1>
    {loading ? (
      <Spinner/>
    ):(
      <div className="flex flex-col border-2 border-sky-400 rounded-xl w-fit p-4">
        <div className="my-4">
          <span className='text-xl mr-4 text-gray-500'>Id</span>
          <span>{book._id}</span>
        </div>
        <div className="my-4">
          <span className='text-xl mr-4 text-gray-500'>Id</span>
          <span>{book.title}</span>
        </div>
        <div className="my-4">
          <span className='text-xl mr-4 text-gray-500'>Id</span>
          <span>{book.author}</span>
        </div>
        <div className="my-4">
          <span className='text-xl mr-4 text-gray-500'>Id</span>
          <span>{book.publishyear}</span>
        </div>
        <div className="my-4">
          <span className='text-xl mr-4 text-gray-500'>Created Time</span>
          <span>{new Date(book.createdAt).toString()}</span>
        </div>
        <div className="my-4">
          <span className='text-xl mr-4 text-gray-500'>Last Updated Time</span>
          <span>{new Date(book.updatedAt).toString()}</span>
        </div>
      </div>
    )}
    </div>
  )
}

export default ShowBooks
