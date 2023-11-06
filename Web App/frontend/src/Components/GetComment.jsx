import React, { useState, useEffect } from "react";
import axios from 'axios';
import "../css/GetComment.css";

const GetComment = (props) => {
  const [comments, setComment] = useState([]);
  //const [edit,setEdit]=useState(false);
  const [comcont,setComcont]=useState("");
  const [selectedComment, setSelectedComment] = useState(0);
  const [userc,setUserc]=useState(0);


  useEffect(() => {
    axios
      .get(`http://localhost:8081/getComments/${props.id}`)
      .then((res) => {
        setComment(res.data);
        console.log("Data is fetched successfully");
      })
      .catch((error) => {
        console.error("Error fetching data from backend:", error);
      });
  }, [props.id]);
  useEffect(() => {
    axios
      .get(`http://localhost:8081`)
      .then((res) => {
        setUserc(res.data.Id);
        console.log("Data is fetched successfully");
      })
      .catch((error) => {
        console.error("Error fetching data from backend:", error);
      });
  }, []);

  const handledit=(id,comment)=>{
    setSelectedComment(id);
    setComcont(comment);
    //setEdit(true);
  }
  const handleChange = (event) => {
    setComcont(event.target.value);
  }
const setcomment=(id)=>{
    axios
    .put("http://localhost:8081/updatecomments",{
     
     comid:id,
     value: comcont
     
   })
    .catch((err) => console.log(err));
    setComcont("");
    setSelectedComment(0);
}
const deleteComment = (id) => {
  axios.delete(`http://localhost:8081/deletecomment/${id}`)
    .then((res) => {
      console.log("Comment deleted successfully");
      setComment(comments.filter((item) => item.id !== id));
    })
    .catch((error) => {
      console.error("Error deleting comment:", error);
    });
}
  return (
    <ul>
      {comments.length > 0 ? 
        comments.map((item) => 
            <div><li key={item.id} className="list"><div>
              {selectedComment === item.id ? <div>
                                <div className="commentbox">
                                <h5 className="commenttext">Edit Comment</h5>
                                <textarea className="inputbox" value={comcont} onChange={handleChange}/>
                                <button className="sbtn" onClick={() => setcomment(item.id)}>submit</button>
                               </div></div>:<div>
                <div className="listalign"><div className="namealgn">{item.FullName}</div><br></br>{item.comment}</div>{item.student_id === userc ?<div className="btnalign">
                    <button className="btnal" onClick={() => handledit(item.id,item.comment)}>edit</button>
                    <button className="btnal" onClick={() => deleteComment(item.id)}>delete</button></div>:""}</div>}</div></li></div>
            )
        : <li className="list">Give Your comments </li>
      }
    </ul>
  )
};

export default GetComment;
