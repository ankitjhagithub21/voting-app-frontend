import React, { useState } from 'react'
import toast from 'react-hot-toast';
import axios from "axios"
import {useNavigate} from "react-router-dom"

const Register = () => {
  const navigate = useNavigate()
  const url = import.meta.env.VITE_API_URL;
 
  const initialData = {
    name:"",
    age:"",
    ano:"",
    password:"",
  }
  const [formData,setFormData] = useState(initialData)

  const handleChange = (e) =>{
    const {name,value} = e.target;
    setFormData({
      ...formData,
      [name]:value
    })
  }

  const handleSubmit = async(e) =>{
    e.preventDefault()
   

    try{
        const res = await axios.post(`${url}api/auth/register`,formData)
       
        if(res.data.success){
          toast.success(res.data.message)
          setFormData(initialData)
          navigate("/login")
        }else{
          toast.error(res.data.message)
        }
    }catch(error){
      console.log(error.message)
      toast.error("Registration Failed")
    }

   
  }
  return (
    <section>
      <div className="container">
        <div className="row">
          <div className="col-md-6 mx-auto my-5">
            <h2 className='mb-3 text-center'>Register Page</h2>
           
              <form onSubmit={handleSubmit}>
                <input type="text" className='form-control mb-3' placeholder='Enter Your Name' name='name' value={formData.name} onChange={handleChange} required/>
                <input type="number" className='form-control mb-3'placeholder='Enter Your Age' name='age' value={formData.age} onChange={handleChange} required/>
                <input type="number" className='form-control mb-3'placeholder='Enter Your Aadhar Card Number' name='ano' value={formData.ano} onChange={handleChange} required/>
                <input type="password" className='form-control mb-3' placeholder='Enter Your Password' name='password' value={formData.password} onChange={handleChange} required/>
                <button className='w-100 btn btn-success'>Submit</button>
              </form>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Register