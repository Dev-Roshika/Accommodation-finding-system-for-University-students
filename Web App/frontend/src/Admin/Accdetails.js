import React from 'react'
import { useNavigate } from 'react-router-dom'

const Accdetails = () => {

	const Navigate = useNavigate();
	
	function backAccomodation(event) {
		event.preventDefault();
		Navigate('/home');
	}

  return (
    <div style={{padding:50}}>
    <div><a role="button" class="btn btn-info"  href="" onClick={backAccomodation}> Back </a></div><br/>
    <header>
        <h4>Accomodations</h4><br/>
    </header>

        <table>
        <thead>
            <tr>
                <th >No</th>
                <th >Name</th>
                <th >Address</th>
                <th >Owner</th>
                <th >Rate per month</th>
                <th >Capacity</th>
                <th >Contact No</th>
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

export default Accdetails