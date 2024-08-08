import React from 'react'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import RootLayout from './ui/RootLayout';
import Home from './features/dashboard/Home';
import AddForm from './features/blog/AddForm';
import EditBlog from './features/blog/EditBlog';


const App = () => {
  // const persons = [
  //   { id: 1, name: 'john' },
  //   { id: 2, name: 'riya' },
  //   { id: 3, name: 'shawn' },
  // ];

  // const m = persons.map((g) => {
  //   return g.id===1 ?{name:'siya'} : g;
  // });

  // console.log(m);
  // const { id } = useParams();
  // const dispatch = useDispatch();
  // const { blogs } = useSelector((state) => state.blogSlice);


  // const blogName=blogs.find((blog)=>blog.id===id)
  
// const users =[
//   { id: 1, name: 'john', genre: 'male' },
//   { id: 2, name: 'riya', genre: 'male' },
//   { id: 3, name: 'shawn', genre: 'female' },
// ];

// const filterName=users.filter((user)=>user.genre==='male')

// console.log(filterName)
// const persons=[
//   {id:1,name:'ram'},
//   {id:2,name:'shyam'}
// ]
//  const n=persons.map((per)=>{
//   return per.name==='ram'? per.name='sita':per.name
//  })

//  console.log(n)


  const router = createBrowserRouter([
    {
      path: '/',
      element: <RootLayout />,
      children: [
        {
          index: true,
          element: <Home />
        },
        {
          path:'add-form',
          element: <AddForm />
        },
        {
          path:'edit-blog/:id',
          element: <EditBlog />
        }
      ]
    },




  ]);



  return <RouterProvider router={router} />
}

export default App