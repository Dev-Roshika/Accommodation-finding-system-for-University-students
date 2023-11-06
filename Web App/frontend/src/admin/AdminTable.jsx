import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Modal from './Modal'; // Adjust the path based on your file structure
import '../css/modal.css';
import { useNavigate, useParams } from 'react-router-dom';

function AdminInfo  () {
    const[admin,UseAdmins] = useState([]);
	const navigate = useNavigate();
    const [showModal, setShowModal] = useState(false);
    const [adminId, setSelectedAdminId] = useState(null);
    const { id } = useParams();
	
    useEffect(() => {
        fetchAdmins();
    }, [])

    const fetchAdmins = async () => {
        try {
            const resp = await axios.get('http://localhost:8081/admin/show');
            console.log("test");
            console.log(resp.data);
            UseAdmins(resp.data);
        }
        catch (err) {
            console.log(err);
        }
    }
	
	const backBoarding = async () =>  {
		navigate(`/admin/home/${id}`);
	}

    const handleNewAdmin = async () =>  {
		navigate(`/admin/signup/${id}`);
	}

    const handleAdminDeletion = (event) => {
        const id = event.target.value;
        setSelectedAdminId(id);
        setShowModal(true);
    };

    const confirmDeletion = async () => {
        try {
            const resp = await axios.post(`http://localhost:8081/admin/deleteadmin/${adminId}`);
            console.log("delete: ", resp);
            setShowModal(false);
            fetchAdmins(); // Fetch the users data again to reflect the changes after deletion
        } catch (error) {
            console.error(error);
        }
    };

    const renderTable = () => {
        const rows = [];
        for (let i = 0; i < admin.length; i++) {
            if(admin[i].Role === "superadmin"){
                console.log("SuperAdmin");
            }else{
        rows.push(
        <tr key={admin[i].Id}>
            <td > {admin[i].Id} </td>
            <td > {admin[i].FullName} </td>
            <td > {admin[i].UserName} </td>
            <td > {admin[i].Position} </td>
            <td > {admin[i].Gender} </td>
            <td > {admin[i].Email} </td>
            <td > {admin[i].Mobile} </td>
            <td>
                <button  className="btn btn-danger" value={admin[i].Id} onClick={handleAdminDeletion}>
                    Delete Account
                </button>
            </td>
        </tr>
          );
        }}
        return rows;
      };

  return (
    <div class="col-md-10" id="tableCard">
    <div><a role="button" class="btn btn-info" onClick={backBoarding}> Back </a></div><br/>
    <header>
        <h5>Admins</h5><br/>
    </header>

        <table>
        <thead>
            <tr>
                <th >Id</th>
                <th >FullName</th>
                <th >UserName</th>
                <th >Position</th>
                <th >Gender</th>
                <th >Email</th>
                <th >Mobile</th>
                <th >Action</th>
            </tr>
        </thead>

        <tbody>
            {renderTable()}
        </tbody>
            
        </table><br/><br/>
        <div><a role="button" class="btn btn-success" onClick={handleNewAdmin}> New Admin </a></div><br/>

        {showModal && (
                <Modal
                    setOpenModal={setShowModal}
                    confirmAction={confirmDeletion}
                />
            )}
    </div>
  )
}

export default AdminInfo