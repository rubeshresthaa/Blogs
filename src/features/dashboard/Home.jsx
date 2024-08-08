import React from 'react'
import { useSelector } from 'react-redux'
import { Button, Card, Rating, Typography } from "@material-tailwind/react";
// import { removeBlog } from '../blog/blogSlice';
import AlertBox from './AlertBox';
import { useNavigate } from 'react-router';
// import { nanoid } from '@reduxjs/toolkit';
const TABLE_HEAD = ["Title", "Author","Radio","Checkbox","Rating","Content","Image", "Description","Edit", "Delete"];

 


const Home = () => {
  const nav=useNavigate()
  const [open, setOpen] = React.useState(false);
  const [ind,setInd]=React.useState(0)

  const handleOpen = () => setOpen(!open);
  const {blogs}=useSelector((state)=>state.blogSlice);
  // console.log(blogs)
  
    

   
  return (
    <div className='p-5'>
 <Card className="h-full w-full ">
      <table className="w-full  table-fixed text-left">
        <thead>
          <tr>
            {TABLE_HEAD.map((head) => (
              <th
                key={head}
                className="border-b border-blue-gray-100 bg-blue-gray-50 p-4"
              >
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-normal leading-none opacity-70"
                >
                  {head}
                </Typography>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {blogs.map(({ title,author,rating,radio,checkBox,content, description,id,baseImage }, index) => {
            const isLast = index === blogs.length - 1;
            const classes = isLast ? "p-4" : "p-4 border-b border-blue-gray-50";
 
            return (
              <tr key={id}>
                <td className={classes}>
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal"
                  >
                    {title}
                  </Typography>
                </td>
                <td className={classes}>
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal"
                  >
                    {author}
                  </Typography>
                </td>
                <td className={classes}>
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal"
                  >
                    {radio}
                  </Typography>
                </td>
                <td className={classes}>
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal"
                  >
                    {checkBox}
                  </Typography>
                </td>
                
                <td className={classes}>
                <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal"
                  >
                    <Rating readonly value={rating} />
                  </Typography>
               
                </td>

               
                  <td className={classes}>
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal"
                  >
                    {content}
                  </Typography>
                </td>
                <td className={classes}>
                  
                   <img src={baseImage} alt="img"/>
                </td>
                <td className={classes}>
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal"
                  >
                    {description}
                  </Typography>
                </td>
                <td className={classes}>
                  <Button onClick={()=>nav(`/edit-blog/${id}`)
                    }>
                    Edit
                  </Button>
                </td>
                <td className={classes}>
                  <Button onClick={()=>{
                    setInd((prev)=>index);
                    handleOpen();
                    }}>
                    Delete
                  </Button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </Card>
    <AlertBox open={open} handleOpen={handleOpen} index={ind}/>



    </div>
  )
}

export default Home