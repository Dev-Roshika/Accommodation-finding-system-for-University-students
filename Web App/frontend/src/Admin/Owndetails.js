import React from 'react'
import { useNavigate } from 'react-router-dom'

const Owndetails = () => {

	const Navigate = useNavigate();
	
	function backOwner(event) {
		event.preventDefault();
		Navigate('/home');
	}
    
  return (
    <div style={{padding:50}}>
    <div><a role="button" class="btn btn-info"  href="" onClick={backOwner}> Back </a></div><br/>
    <header>
        <h4>Owners Board</h4><br/>
    </header>

        <table>
        <thead>
            <tr>
                <th >No</th>
                <th >Full Name</th>
                <th >Address</th>
                <th >Gender</th>
                <th >E-mail</th>
                <th >Acc.Name</th>
                <th >Phone No</th>
                <th >Action</th>
            </tr>
        </thead>

        <tr>
            <td ></td>
            <td ></td>
            <td ></td>
            <td ></td>
            <td ></td>
            <td ></td>
            <td ></td>
            <td ><a role="button" class="btn btn-success" href=""> View </a> &ensp;
                <a role="button" class="btn btn-danger" href=""> Remove </a> 
            </td>
        </tr>
            
        </table>
    </div>
  )
}

export default Owndetails