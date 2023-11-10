import Slidebar from './Slidebar'
import Features from './Features'
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Modal from './Modal'; // Adjust the path based on your file structure
import '../css/modal.css';

function Adnotify () {
    const[comment,UseComments] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [CommentId, setSelectedCommentId] = useState(null);

    const handleCommentDeletion = (event) => {
      const id = event.currentTarget.getAttribute('data-id');
      setSelectedCommentId(id);
      setShowModal(true);
    };

    const confirmDeletion = async () => {
      try {
        const resp = await axios.post(`http://localhost:8081/admin/deletecomment/${CommentId}`);
        console.log("delete: ", resp);
        fetchComments();
      } catch (error) {
        console.error(error);
      }
    };

    useEffect(() => {
      fetchComments();
    }, [])

    const fetchComments = async () => {
        try {
            const resp = await axios.get('http://localhost:8081/admin/feedbacks');
            console.log("test");
            console.log(resp.data);
            UseComments(resp.data);
        }
        catch (err) {
            console.log(err);
        }
    }

    const getComments = () => {
      const rows = [];
      for (let i = 0; i < comment.length; i++) {
      rows.push(
        <div className="searchItem" id="Card" key={comment[i].id}>
        <div class="col-md-10">
          <strong class="d-inline-block mb-2 text-primary-emphasis">student id : {comment[i].student_id} &emsp; boarding id : {comment[i].boardingid}</strong>
          <p class="card-text mb-auto">{comment[i].comment}</p>
        </div>
        <div class="col-md-2" id="cross">
        <a role="button"  id="cross" data-id={comment[i].id} onClick={handleCommentDeletion}>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="red" class="bi bi-x-square" viewBox="0 0 16 16">
            <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z"/>
            <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
          </svg>
        </a>
        </div>
      </div>
        );              
      }
        return rows;
  }


  return (
    <div class="Container">
        <Slidebar/>
        
        <div className="Dashdis">
          <div>
            <header>
              <div class="Header">
                <h5>Comments</h5>&emsp;
                <div >
              <svg xmlns="http://www.w3.org/2000/svg" width="64" height="32" fill="#237544"  class="bi bi-app-indicator" viewBox="0 0 16 16">
                <path d="M5.5 2A3.5 3.5 0 0 0 2 5.5v5A3.5 3.5 0 0 0 5.5 14h5a3.5 3.5 0 0 0 3.5-3.5V8a.5.5 0 0 1 1 0v2.5a4.5 4.5 0 0 1-4.5 4.5h-5A4.5 4.5 0 0 1 1 10.5v-5A4.5 4.5 0 0 1 5.5 1H8a.5.5 0 0 1 0 1H5.5z"/>
                <path d="M16 3a3 3 0 1 1-6 0 3 3 0 0 1 6 0z"/>
                <text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" fill="red" font-size="8">{comment.length}</text>
              </svg>
              </div>
              </div>
                <hr></hr>
              </header>

            <div>
              {getComments()}
            </div>
    
          </div> 
        </div>

        <Features/>
        {showModal && (
                <Modal
                    setOpenModal={setShowModal}
                    confirmAction={confirmDeletion}
                />
            )}
      </div>
  )
}

export default Adnotify