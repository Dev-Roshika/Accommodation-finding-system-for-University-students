import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Modal from './Modal'; // Adjust the path based on your file structure
import '../css/modal.css';
import { useNavigate, useParams } from 'react-router-dom';

function OwnerTable() {
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
            const resp = await axios.get('http://localhost:8081/admin/owners');
            console.log("test");
            console.log(resp.data);
            setUsers(resp.data);
        }
        catch (err) {
            console.log(err);
        }
    }
	
	const backOwner = async () =>  {
		navigate(`/admin/home/${id}`);
	}

    const handleOwnerDeletion = (event) => {
        const id = event.target.value;
        setSelectedUserId(id);
        setShowModal(true);
    };

    const confirmDeletion = async () => {
        try {
            const resp = await axios.post(`http://localhost:8081/admin/deleteowner/${selectedUserId}`);
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
            <td > {users[i].ContactNo} </td>
            <td > {users[i].Email} </td>
            <td > {users[i].NidNo} </td>
            <td > {users[i].PrivateAddress} </td>
            <td>
                <button  className="btn btn-danger" value={users[i].Id} onClick={handleOwnerDeletion}>
                    Remove
                </button>
            </td>
        </tr>
          );
        }
        return rows;
      };
    
  return (
    <div class="col-md-10" id="tableCard">
    <div><a role="button" class="btn btn-info"  href="" onClick={backOwner}> Back </a></div><br/>
    <header>
        <h5>Owners Board</h5><br/>
    </header>

        <table>
        <thead>
            <tr>
                <th >id</th>
                <th >FullName</th>
                <th >UserName</th>
                <th >ContactNo</th>
                <th >Email</th>
                <th >NidNo</th>
                <th >PrivateAddress</th>
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

export default OwnerTable