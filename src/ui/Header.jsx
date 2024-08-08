import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { FaBars } from "react-icons/fa6";
import { RxCross1 } from "react-icons/rx";





const Header = () => {
  const[show,setShow]=useState(false)
  //checkbox,file,select
  const toggleHandle =()=>{
    setShow(!show)
  }

  return (
    <div>
      <div className='bg-black text-white flex justify-between px-5 py-4 items-end sm:items-start'>
      <h1>Blogs</h1>
        {/* only show dropdown in mobile and toggle value true   */}
      
     {show&& <nav className='mt-2 hidden sm:flex underline underline-offset-4'>
       <NavLink  className=''>Add BLog</NavLink>
      </nav>}
            {/* button depend on toggle value */}

      {show? <button onClick={toggleHandle} className='hidden sm:flex'><RxCross1 size={25} /></button>: 
      <button onClick={toggleHandle} className='hidden sm:flex'><FaBars size={25}/></button>}

      
      <nav className='sm:hidden'>
        <NavLink to='/add-form'>Add Blog</NavLink>
      </nav>


      

      </div>
      
    </div>
   
  )
}

export default Header