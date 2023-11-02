import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

function StudentTable () {
    const[users,UseUsers] = useState([]);
	const navigate = useNavigate();
    const [role, setRole] = useState('');
	
    useEffect(()=>{
        const getUsers = async() =>
        {
            try{
                const resp = await axios.get('http://localhost:8081/admin/student');
                console.log("test");
                console.log(resp.data);
                UseUsers(resp.data);
            }
            catch(err){
                console.log(err);
            }
        }
        getUsers();
    },[])

	const backStudent = async () =>  {
		navigate('/admin/home');
	}

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
                <Link to={`/admin/student/${users[i].Id}`} className="btn btn-success">
                    View
                </Link>
                &ensp;
                <Link to={`/admin/student/${users[i].Id}/remove`} className="btn btn-danger">
                    Remove
                </Link>
            </td>
        </tr>
          );
        }
        return rows;
      };
    
  return (
    <div class="col-md-10" id="tableCard" >
    <div><a role="button" class="btn btn-info"  href="" onClick={backStudent}> Back </a></div><br/>
    <header>
        <h4>Students Board</h4><br/>
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
    </div>

  )
}

export default StudentTable