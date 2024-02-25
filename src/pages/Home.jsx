import axios from 'axios';
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useSelector } from 'react-redux';

const Home = () => {
  const url = import.meta.env.VITE_API_URL;
  const user = useSelector(state => state.auth.user);
  const [candidates, setCandidates] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchCandidates = async () => {
    
    try {
      const res = await axios.get(`${url}api/auth/candidates`);
      if (res.data.success) {
        setCandidates(res.data.candidates);
      } else {
        console.error("Failed to fetch candidates.");
      }
    } catch (error) {
      console.error("Error fetching candidates.");
    } finally {
      setLoading(false);
    }
  };

  const giveVote = async (id) => {

   
    if(!user){
      toast.error("You are not logged in.")
    }else if(user.role=='admin'){
      toast.error("Admin not allowed.")
    }else{
      
    try{
      const res = await axios.post(`${url}api/auth/vote/${id}`);
      if (res.data.success) {
        toast.success(res.data.message);
        fetchCandidates();
      } 
    }catch(error){
      
      console.log(error)
    }
    }
  };


  useEffect(() => {
    fetchCandidates();
  }, []);

  return (
    <div className='container my-5'>
      <h2 className='text-center my-5'>{user && `Welcome ${user.name}`}</h2>
      <h2 className='text-center my-5'>{user && user.forVoted && `You have voted for ${user.forVoted}`}</h2>
      <h1 className='fs-1 text-center mb-3'>Candidates</h1>
      <div className="row">
        {loading ? (
          <p className='fs-5 text-center'>Loading...</p>
        ) : candidates.length === 0 ? (
          <p className='fs-5 text-center'>No candidates found.</p>
        ) : (
          candidates.map(candidate => (
            <div className='col-md-4 my-3' key={candidate._id}>
              <div className='card p-3'>
                <h2>Name: {candidate.name}</h2>
                <h3>Party: {candidate.party}</h3>
                <h5>Votes: {candidate.voteCount}</h5>
                <button
                  className={`btn btn-primary mt-2 ${user && user.isVoted && 'disabled'}`}
                  disabled={user && user.isVoted}
                  onClick={() => giveVote(candidate._id)}
                >
                  Give Vote
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Home;
