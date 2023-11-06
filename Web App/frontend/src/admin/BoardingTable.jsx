import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Modal from './Modal'; // Adjust the path based on your file structure
import '../css/modal.css';
import { useNavigate, useParams } from 'react-router-dom';

function BoardingTable  () {
    const[boardings,UseBoardings] = useState([]);
	const navigate = useNavigate();
    const [showModal, setShowModal] = useState(false);
    const [boardingId, setSelectedBoardingId] = useState(null);
    const { id } = useParams();
	
    useEffect(() => {
        fetchBoardings();
    }, [])

    const fetchBoardings = async () => {
        try {
            const resp = await axios.get('http://localhost:8081/admin/boardings');
            console.log("test");
            console.log(resp.data);
            UseBoardings(resp.data);
        }
        catch (err) {
            console.log(err);
        }
    }
	
	const backBoarding = async () =>  {
		navigate(`/admin/home/${id}`);
	}

    const handleBoardingDeletion = (event) => {
        const id = event.target.value;
        setSelectedBoardingId(id);
        setShowModal(true);
    };

    const confirmDeletion = async () => {
        try {
            const resp = await axios.post(`http://localhost:8081/admin/deleteboarding/${boardingId}`);
            console.log("delete: ", resp);
            setShowModal(false);
            fetchBoardings(); // Fetch the users data again to reflect the changes after deletion
        } catch (error) {
            console.error(error);
        }
    };

    const renderTable = () => {
        const rows = [];
        for (let i = 0; i < boardings.length; i++) {
        rows.push(
        <tr key={boardings[i].Id}>
            <td > {boardings[i].Id} </td>
            <td > {boardings[i].OwnerId} </td>
            <td > {boardings[i].Title} </td>
            <td > {boardings[i].Description} </td>
            <td > {boardings[i].Price} </td>
            <td > {boardings[i].Negotiable} </td>
            <td > {boardings[i].Address} </td>
            <td > {boardings[i].Distance} </td>
            <td > {boardings[i].Boys} </td>
            <td > {boardings[i].Girls} </td>
            <td > {boardings[i].Facilities} </td>
            <td > {boardings[i].Rules} </td>
            <td > {boardings[i].ContactNo} </td>
            <td>
                <button  className="btn btn-danger" value={boardings[i].Id} onClick={handleBoardingDeletion}>
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
    <div><a role="button" class="btn btn-info" onClick={backBoarding}> Back </a></div><br/>
    <header>
        <h5>Accomodations</h5><br/>
    </header>

        <table>
        <thead>
            <tr>
                <th >Id</th>
                <th >OwnerId</th>
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
                <th >ContactNo</th>
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

export default BoardingTable