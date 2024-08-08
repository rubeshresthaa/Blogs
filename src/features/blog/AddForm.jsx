import {
  Card,
  Input,
  Button,
  Typography,
  Textarea,
  Radio,
  Checkbox,
  Select,
  Option,
  Rating,
} from "@material-tailwind/react";
import * as Yup from "yup";
import { useFormik } from "formik";
import { nanoid } from "@reduxjs/toolkit";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { addBlog } from "./blogSlice";

const radioData = [
  {
    color: "blue",
    label: "Sports",
    value: "sports",
  },
  { color: "blue", label: "Travel", value: "travel" },
];

const checkBoxData = [
  { color: "red", value: "red", label: "Red" },
  { color: "blue", value: "blue", label: "Blue" },
  { color: "green", value: "green", label: "Green" },
];
const AddForm = () => {
  const nav=useNavigate();
  const dispatch=useDispatch()
  const blogSchema = Yup.object({
    title: Yup.string().min(5).max(100).required(),
    author: Yup.string().min(5).max(500).required(),
    radio: Yup.string().required(),
    checkBox: Yup.array().min(1).required(),
    rating:Yup.number().required(),
    content: Yup.string().required(),
    description: Yup.string().max(1000).required(),
    image:Yup.mixed().test('fileType','Invalid Image',(e)=>{
      const validTypes=['image/jpeg','image/png','image/jpg','image/gif']
      return e && validTypes.includes(e.type)

    })
  });
  const { handleChange, handleSubmit, values, errors, setFieldValue,touched } =
    useFormik({
      initialValues: {
        title: "",
        author: "",
        radio: "",
        checkBox: [],
        rating:null,
        content: "",
        description: "",
        image:null,
        baseImage:null
      },
      onSubmit: (val, {resetForm}) => {
        delete val.image;
        dispatch(addBlog({...val,id:nanoid()})) ;
        
        nav(-1);

      },
      // validationSchema: blogSchema,
    });
  return (
    <div className="m-auto p-5 max-w-96 sm:w-96">
      <Card color="transparent" shadow={false}>
        <Typography variant="h4" color="blue-gray">
          Add Form 
        </Typography>
        <Typography color="gray" className="mt-1 font-normal">
          Enter your new Blog
        </Typography>
        <form onSubmit={handleSubmit}>
          <div className="mb-1 flex flex-col gap-6">
            <div>
            <Typography color="gray" className="mt-1 font-normal">
          Title <span className="text-red-400">*</span>
        </Typography>
              <Input
                size="lg"
                name="title"
                value={values.title}
                placeholder="New Title"
                onChange={handleChange}
                label="Title"
              />
              {errors.title && touched.title && <h1 className="text-red-500">{errors.blog}</h1>}
            </div>
            <div>
            <Typography color="gray" className="mt-1 font-normal ">
          Name <span className="text-red-400">*</span>
        </Typography>
            <Input
              name="author"
              size="lg"
              value={values.author}
              placeholder="Author"
              onChange={handleChange}
              label="Author"
            />
            {errors.author && touched.author && <h1 className="text-red-500">{errors.title}</h1>}

            </div>
            
            <div className="flex">
              {radioData.map((radio, i) => {
                return (
                  <Radio
                    key={i}
                    name="radio"
                    onChange={handleChange}
                    value={radio.value}
                    color={radio.color}
                    label={radio.label}
                  />
                );
              })}
              {errors.radio && touched.radio && <h1 className="text-red-500">{errors.radio}</h1>}
            </div>
            <div>
              {checkBoxData.map((check, i) => {
                return (
                  <Checkbox
                    name="checkBox"
                    onChange={handleChange}
                    key={i}
                    color={check.color}
                    value={check.value}
                    label={check.label}
                  />
                );
              })}
              {errors.checkBox && touched.checkBox && <h1 className="text-red-500">{errors.checkBox}</h1>}
            </div>
            <div>
              <Typography>Rating</Typography>
              <Rating onChange={(e) => setFieldValue('rating', e)} />
              {errors.rating && touched.rating && <h1 className='text-red-600'>{errors.rating}</h1>}
            </div>


            <h1 className="font-bold:">Categories</h1>
            <div className="w-72">
              <Select
                onChange={(e) => {
                  setFieldValue("content", e);
                }}
                label="Select content"
              >
                <Option>Sports</Option>
                <Option>Travel</Option>
                <Option>Education</Option>
                <Option>Market</Option>
                <Option>Tech Info</Option>
              </Select>
              {/* {errors.content && touched.content && <h1 className="text-red-500">{errors.content}</h1>} */}
            </div>
            <div>
              <Input type="file" 
              onChange={(e)=>{
                const file=e.target.files[0];
                setFieldValue('image',file)
                const reader=new FileReader()
                reader.readAsDataURL(file)
                reader.addEventListener('load', (e)=>{
                  setFieldValue('baseImage',e.target.result)
                })
              }} 
              label="Upload File" />
              {values.baseImage && !errors.image && <img src={values.baseImage} alt="" className='h-[220px] w-full] mt-5 object-cover' />}
              {errors.image && errors.image && <h1 className="text-red-500">{errors.image}</h1>} 
            </div>

            <div>
            <Typography color="gray" className="mt-1 font-normal">
            Blog Description
            </Typography>
              <Textarea
                label="Message"
                name="description"
                value={values.description}
                onChange={handleChange}
              />
            </div>
          </div>

          <Button
            type="submit"
            className="mt-5"
            
            // onClick={handleSubmit}
          >
            Submit
          </Button>
        </form>
      </Card>
    </div>
  );
};
export default AddForm;
