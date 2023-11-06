import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios';

function Features () {

	const Navigate = useNavigate();
	const[stu,UseStudent] = useState([])
    const[own,UseOwner] = useState([])
    const[board,UseBoarding] = useState([])
    const { id } = useParams();

    useEffect(()=>{
        const getUser = async() =>
        {
            try{
                const resp = await axios.get('http://localhost:8081/admin/students');
                console.log("test")
                console.log(resp)
                UseStudent(resp.data);
            }
            catch(err){
                console.log(err)
            }
        }
        getUser();
    },[])

    useEffect(()=>{
        const getUser = async() =>
        {
            try{
                const resp = await axios.get('http://localhost:8081/admin/owners');
                console.log("test")
                console.log(resp)
                UseOwner(resp.data);
            }
            catch(err){
                console.log(err)
            }
        }
        getUser();
    },[])

    useEffect(()=>{
        const getUser = async() =>
        {
            try{
                const resp = await axios.get('http://localhost:8081/admin/boardings');
                console.log("test")
                console.log(resp)
                UseBoarding(resp.data);
            }
            catch(err){
                console.log(err)
            }
        }
        getUser();
    },[])


	const handleStudent = async () =>  {
		Navigate(`/admin/students/${id}`);
	}
    const handleOwner = async () =>  {
		Navigate(`/admin/owners/${id}`);
	}
    const handleAccomodation = async () =>  {
		Navigate(`/admin/boardings/${id}`);
	}

  return (
    <div className="Features">
        <div>

        <div class="col-lg-4">
            <h5>@Students</h5><br></br>
            <svg class="bd-placeholder-img rounded-circle" width="80" height="80" xmlns="http://www.w3.org/2000/svg" role="button" onClick={handleStudent}>
                <rect width="100%" height="100%" fill="#6ECCAF" />
                <text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" fill="white" font-size="32">{stu.length}</text>
            </svg>
        </div><br/><br/><br/>


        <div class="col-lg-4">
            <h5>@Owners</h5><br></br>
            <svg class="bd-placeholder-img rounded-circle" width="80" height="80" xmlns="http://www.w3.org/2000/svg" role="button" onClick={handleOwner}>
                <rect width="100%" height="100%" fill="#F7D060" />
                <text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" fill="white" font-size="32">{own.length}</text>
            </svg>
        </div><br/><br/><br/>


        <div class="col-lg-4">
            <h5>#Accomodations</h5><br></br>
            <svg class="bd-placeholder-img rounded-circle" width="80" height="80" xmlns="http://www.w3.org/2000/svg" role="button" onClick={handleAccomodation}>
                <rect width="100%" height="100%" fill="#95BDFF" />
                <text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" fill="white" font-size="32">{board.length}</text>
            </svg>
        </div>

        </div>
    </div>
  )
}

export default Features