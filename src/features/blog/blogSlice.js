import { createSlice } from "@reduxjs/toolkit";
import { getBlogsFromLocal, setBlogToLocal } from "../../Hooks/localStorage";






export const blogSlice=createSlice({
  name:'blogSlice',
  initialState:{
    // blogs: []
    blogs:getBlogsFromLocal()
  },
  reducers:{
    addBlog:(state,action)=>{
      state.blogs.push(action.payload);
      setBlogToLocal([...state.blogs]);

    },
    removeBlog:(state,action)=>{
      // state.blogs=state.blogs.filter((blog)=>
      // blog.id!==action.payload)
      state.blogs.splice(action.payload,1)
      setBlogToLocal([...state.blogs]);

      
    },
    updateBlog:(state,action)=>{
      
      state.blogs=state.blogs.map((blog)=>{
        return blog.id===action.payload.id ?action.payload :blog
      })
      setBlogToLocal([...state.blogs]);
  }
}}

)


export const{addBlog,removeBlog,updateBlog}=blogSlice.actions;