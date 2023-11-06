import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Modal from './Modal'; // Adjust the path based on your file structure
import '../css/modal.css';
import { useNavigate, useParams } from 'react-router-dom';

function StudentTable() {
    const [users, setUsers] = useState([]);
    const navigate = useNavigate();
    const [showModal, setShowModal] = useState(false);
    const [selectedUserId, setSelectedUserId] = useState(null);
    const { id } = useParams();

    useEffect(() => {
        fetchUsers();
    }, [])

    const fetchUsers = async () => {
        try {
            const resp = await axios.get('http://localhost:8081/admin/students');
            console.log("test");
            console.log(resp.data);
            setUsers(resp.data);
        }
        catch (err) {
            console.log(err);
        }
    }

    const backStudent = () => {
        navigate(`/admin/home/${id}`);
    };

    const handleStudentDeletion = (event) => {
        const id = event.target.value;
        setSelectedUserId(id);
        setShowModal(true);
    };

    const confirmDeletion = async () => {
        try {
            const resp = await axios.post(`http://localhost:8081/admin/deletestudent/${selectedUserId}`);
            console.log("delete: ", resp);
            setShowModal(false);
            fetchUsers(); // Fetch the users data again to reflect the changes after deletion
        } catch (error) {
            console.error(error);
        }
    };

    const renderTable = () => {
        const rows = [];
        for (let i = 0; i < users.length; i++) {
        rows.push(
        <tr key={users[i].Id}>
            <td > {users[i].Id} </td>
            <td > {users[i].FullName} </td>
            <td > {users[i].UserName} </td>
            <td > {users[i].UnivRegNo} </td>
            <td > {users[i].ContactNo} </td>
            <td > {users[i].Email} </td>
            <td > {users[i].Faculty} </td>
            <td > {users[i].Dept} </td>
            <td>
                <button  className="btn btn-danger" value={users[i].Id} onClick={handleStudentDeletion}>
                    Remove
                </button>
            </td>
        </tr>
          );
        }
        return rows;
      };
    
  return (
    <div class="col-md-11" id="tableCard" >
    <div><a role="button" class="btn btn-info"  href="" onClick={backStudent}> Back </a></div><br/>
    <header>
        <h5>Students Board</h5><br/>
    </header>

        <table>
        <thead>
            <tr>
                <th >Id</th>
                <th >FullName</th>
                <th >UserName</th>
                <th >UnivRegNo</th>
                <th >ContactNo</th>
                <th >Email</th>
                <th >Faculty</th>
                <th >Dept</th>
                <th >Action</th>
            </tr>
        </thead>

        <tbody>
            {renderTable()}
        </tbody>   
        </table>

        {showModal && (
                <Modal
                    setOpenModal={setShowModal}
                    confirmAction={confirmDeletion}
                />
            )}
    </div>

  )
}

export default StudentTable