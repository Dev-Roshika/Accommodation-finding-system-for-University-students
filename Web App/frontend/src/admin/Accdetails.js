import React from 'react'
import { useNavigate } from 'react-router-dom'

const Accdetails = () => {

	const Navigate = useNavigate();
	
	function backAccomodation(event) {
		event.preventDefault();
		Navigate('/admin/home');
	}

  return (
    <div class="col-md-10" id="tableCard">
    <div><a role="button" class="btn btn-info"  href="" onClick={backAccomodation}> Back </a></div><br/>
    <header>
        <h4>Accomodations</h4><br/>
    </header>

        <table>
        <thead>
            <tr>
                <th >Id</th>
                <th >Title</th>
                <th >Description</th>
                <th >Price</th>
                <th >Negotiable</th>
                <th >Address</th>
                <th >Distance</th>
                <th >Boys</th>
                <th >Girls</th>
                <th >Facilities</th>
                <th >Rules</th>
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