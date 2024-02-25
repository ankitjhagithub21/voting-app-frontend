import React from 'react'
import { useState } from 'react'
import axios from 'axios'
import toast from 'react-hot-toast'
axios.defaults.withCredentials = true

const Modal = ({ data, setShowModal }) => {
    const [candidate,setCandidate] = useState(data)
    const url = import.meta.env.VITE_API_URL;
    const handleChange = (e) =>{
        const {name,value} = e.target;
        setCandidate({
            ...candidate,
            [name]:value
        })
    }
    const handleSubmit = async(e) =>{
        e.preventDefault()
        try {
            const res = await axios.put(`${url}api/admin/update/${candidate._id}`, candidate);
            if (res.data.success) {
                toast.success("Candidate updated.");
                setShowModal(false)
               
                
               
            } else {
                toast.error(res.data.message);
            }

        } catch (error) {
            toast.error("Failed to add candidate. Please try again later.");
            console.log(error.message);
        }
         
    }
    return (
        <section className="fixed-top bg-white w-full d-flex align-items-center justify-content-center" style={{height:"100vh"}}>
            <div className="row my-5 w-100">
                <div className="col-md-6 mx-auto">
                    <h2 className='mb-3 text-center'>Update Candidate</h2>

                    <form onSubmit={handleSubmit}>
                        <input type="text" className='form-control mb-3' placeholder='Update' name='name' value={candidate.name} onChange={handleChange} required />
                        <input type="number" className='form-control mb-3' placeholder='Update  Age' name='age' value={candidate.age} onChange={handleChange} required />
                        <input type="text" className='form-control mb-3' placeholder='Update Party' name='party' value={candidate.party} onChange={handleChange} required />
                        <button className='w-100 btn btn-primary'>Save Changes</button>
                    </form>
                </div>
            </div>

            <button className='btn btn-dark fixed-top m-2' style={{width:"fit-content"}} onClick={() => setShowModal(false)}>X</button>
        </section>
    )
}

export default Modal