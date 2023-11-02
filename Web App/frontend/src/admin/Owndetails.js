import React from 'react'
import { useNavigate } from 'react-router-dom'

const Owndetails = () => {

	const Navigate = useNavigate();
	
	function backOwner(event) {
		event.preventDefault();
		Navigate('/admin/home');
	}
    
  return (
    <div class="col-md-10" id="tableCard">
    <div><a role="button" class="btn btn-info"  href="" onClick={backOwner}> Back </a></div><br/>
    <header>
        <h4>Owners Board</h4><br/>
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