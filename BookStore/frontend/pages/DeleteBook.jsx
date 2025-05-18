import React, { useState, useEffect} from 'react';
import BackButton from '../components/BackButton';
import Spinner from '../components/Spinner';
import axios from 'axios';
import { useNavigate, useParams  } from 'react-router-dom';
import { useSnackbar } from 'notistack';
const DeleteBook = () => {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
const {id} = useParams()

    const hanbleBookDelete = ()=>{
      setLoading(true)
      axios.delete(`http://localhost:5555/books/${id}`)

      .then(() =>{
        setLoading(false)
        navigate('/')
      })
      .catch((err) =>{
        console.log(err)
        setLoading(false)
      })
    }
  return (
<div className="p-4">
   <BackButton/>
   <h1 className="text-3xl my-4">Delete Book</h1>
         {loading ? <Spinner /> : ''}

         <div className="flex flex-col items-center border-2 border-sky-400 rounded-xl w-[600px] p-8 mx-auto">
          <h3 className='text-2xl'>Are You Sure you want to delte this?</h3>

          <button className='p-4 bg-red-600 text-white m-8 w-full'
          onClick={hanbleBookDelete}
          >
            Yes, Delete it!
          </button>
         </div>
</div>
  )
}

export default DeleteBook
