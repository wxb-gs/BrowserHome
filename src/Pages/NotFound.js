import React from 'react'
import './NotFound.css'
import { useNavigate } from 'react-router-dom';
export default function NotFound() {
    const navigate=useNavigate();
  return (
    <div className='not-found'>
       <button onClick={()=>{navigate('/',{replace:true})}}>返回主页</button>
    </div>
  )
}
