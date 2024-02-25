import axios from 'axios';
import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import Modal from '../components/Modal';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

axios.defaults.withCredentials = true;

const Dashboard = () => {
    
    const url = import.meta.env.VITE_API_URL;
    const user = useSelector(state=>state.auth.user)
    const initialData = {
        name: "",
        party: "",
        age: "",
    };

    const [formData, setFormData] = useState(initialData);
    const [showModal, setShowModal] = useState(false);
    const [candidates, setCandidates] = useState([]);
    const [candidate, setCandidate] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await axios.post(`${url}api/admin/add`, formData);
            if (res.data.success) {
                toast.success("Candidate added.");
                setFormData(initialData);
               fetchCandidates()
            } else {
                toast.error(res.data.message);
            }

        } catch (error) {
            toast.error("Failed to add candidate. Please try again later.");
            console.log(error.message);
        }
    };

    const fetchCandidates = async () => {
        try {
            const res = await axios.get(`${url}api/auth/candidates`);
            if (res.data.success) {
                setCandidates(res.data.candidates);
            }
        } catch (error) {
            console.log(error.message);
        }
    };

    const deleteCandidate = async (id) => {
        try {
            const res = await axios.delete(`${url}api/admin/delete/${id}`);
            if (res.data.success) {
                toast.success("Candidate deleted.");
                fetchCandidates()
            }
        } catch (error) {

            console.log(error.message);
        }
    };

    const handleUpdate = (candidate) => {
        setShowModal(true);
        setCandidate(candidate);
        fetchCandidates()
    };

    useEffect(() => {
        fetchCandidates();
    }, []);

    if(!user || !user.role=='admin'){
        return <Navigate to={"/"}/>
    }
    return (
        <section>
            {showModal && <Modal data={candidate} setShowModal={setShowModal} />}
            <div className="container my-5">
                <div className="row my-5">
                    <div className="col-md-6 mx-auto">
                        <h2 className='mb-3 text-center'>Add Candidate</h2>
                        <form onSubmit={handleSubmit}>
                            <input type="text" className='form-control mb-3' placeholder='Enter Name' name='name' value={formData.name} onChange={handleChange} required />
                            <input type="number" className='form-control mb-3' placeholder='Enter  Age' name='age' value={formData.age} onChange={handleChange} required />
                            <input type="text" className='form-control mb-3' placeholder='Enter Party' name='party' value={formData.party} onChange={handleChange} required />
                            <button className='w-100 btn btn-success'>Add</button>
                        </form>
                    </div>
                </div>
                <div className="row my-5">
                    {candidates.length === 0 ? <p className='fs-5 text-center'>No Candidate found.</p> : candidates.map((candidate) => (
                        <div className='col-md-4 my-3' key={candidate._id}>
                            <div className='card p-3 d-flex flex-column align-items-start gap-2'>
                                <h2 className='fs-4'>Name: {candidate.name}</h2>
                                <h3 className='fs-5'>Party:{candidate.party}</h3>
                                <h5>Votes:{candidate.voteCount}</h5>
                                <div className='d-flex gap-3'>
                                    <button className='btn btn-danger' onClick={() => deleteCandidate(candidate._id)}>X</button>
                                    <button className='btn btn-info' onClick={() => handleUpdate(candidate)}>Update</button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Dashboard;
