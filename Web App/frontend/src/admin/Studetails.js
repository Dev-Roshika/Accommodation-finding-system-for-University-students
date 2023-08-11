import React from 'react'
import { useNavigate } from 'react-router-dom'

const Studetails = () => {

	const Navigate = useNavigate();
	
	function backStudent(event) {
		event.preventDefault();
		Navigate('/admin/home');
	}
    
  return (
    <div class="col-md-10" id="tableCard" >
    <div><a role="button" class="btn btn-info"  href="" onClick={backStudent}> Back </a></div><br/>
    <header>
        <h4>Students Board</h4><br/>
    </header>

        <table>
        <thead>
            <tr>
                <th >No</th>
                <th >Full Name</th>
                <th >Address</th>
                <th >Reg.No</th>
                <th >Faculty</th>
                <th >Dept.</th>
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

export default Studetails