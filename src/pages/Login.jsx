import React, { useState } from 'react'
import toast from 'react-hot-toast'
import axios  from "axios"
import { useNavigate } from 'react-router-dom'
import { loginUser } from '../redux/slices/authSlice'
import { useDispatch } from 'react-redux'

const Login = () => {
  const url = import.meta.env.VITE_API_URL
  const navigate = useNavigate()
  const dispatch = useDispatch()


  const initialData = {
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
        const res = await axios.post(`${url}api/auth/login`,formData)
        if(res.data.success){
         dispatch(loginUser())

          toast.success("Login Successfull")
          setFormData(initialData)
          navigate("/")
        }
      
        
    }catch(error){
      console.log(error.message)
      toast.error("Login Failed.")
    }
    
  }
  return (
    <section>
      <div className="container">
        <div className="row">
          <div className="col-md-6 mx-auto my-5">
            <h2 className='mb-3 text-center'>Login Page</h2>
            
              <form onSubmit={handleSubmit}>
                <input type="number" className='form-control mb-3' placeholder='Enter Your Aadhar Card Number' name='ano' value={formData.ano} onChange={handleChange} required/>
                <input type="password" className='form-control mb-3' placeholder='Enter Your Password' name='password' value={formData.password} onChange={handleChange} required/>
                <button className='w-100 btn btn-success'>Submit</button>
              </form>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Login