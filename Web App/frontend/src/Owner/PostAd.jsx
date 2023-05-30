import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

function PostAd() {
  const [values, setValues] = useState({
    title:'',
    description:'',
    price:'',
    address:'',
    distance:'',
    boys:'',
    girls:'',
    facilities:'',
    rules:'',
    contactno:''
  });
  const [isChecked, setIsChecked] = useState(false);

  const [file, setFile] = useState();
  const navigate = useNavigate();

  const handleInput = (event) => {
    setValues((prev) => ({
      ...prev,
      [event.target.name]: [event.target.value],
    }));
  };

  const handleFile = (event) => {
    //console.log(event.target.files[0])
      setFile(event.target.files[0])
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    var negotiable_or_not = "";
    if(isChecked){
      negotiable_or_not = "Yes"
    } else{
      negotiable_or_not = "No"
    }
    const formData = new FormData();
    formData.append('coverimage',file);
    formData.append('title',values.title);
    formData.append('description',values.description);
    formData.append('price',values.price);
    formData.append('negotiable',negotiable_or_not);
    formData.append('address',values.address);
    formData.append('distance',values.distance);
    formData.append('boys',values.boys);
    formData.append('girls',values.girls);
    formData.append('facilities',values.facilities);
    formData.append('rules',values.rules);
    formData.append('contactno',values.contactno);
      axios
        .post("http://localhost:8081/owner/post-ad", formData)
        .then((res) => {
          if (res.data.Status === "Success") {
            const RowId = res.data.RowId;
            console.log(res.data);
            navigate("/owner/post-ad/success/" + RowId);
          } else {
            alert("Error");
          }
        })
        .catch((err) => console.log(err));
  };
  return (
    <div>
      <div className='d-flex flex-direction-column'>
        <form action="" onSubmit={handleSubmit}>
            <div>
            <label htmlFor="title">Title</label>
            <input type="text" name='title' onChange={handleInput}/>
            </div>
            <div> 
            <label htmlFor="description">Description</label>
            <input type="text" name='description' onChange={handleInput}/>
            </div>
            <div>
            <label htmlFor="price">Price</label>
            <input type="text" name='price' onChange={handleInput}/>
            </div>
            <div>
            <label htmlFor="nagotiable">Negotiable</label>
            <input type="checkbox" name="nagotiable" checked={isChecked} onChange={() => setIsChecked((prev) => !prev)} />
            </div>
            <div>
            <label htmlFor="title">Address</label>
            <input type="text" name='address' onChange={handleInput}/>
            </div>
            <div>
            <label htmlFor="distance">Distance</label>
            <input type="text" name='distance' onChange={handleInput}/>
            </div>
            <div>
            <label htmlFor="title">Boys</label>
            <input type="text" name='boys' onChange={handleInput}/>
            </div>
            <div>
            <label htmlFor="title">Girls</label>
            <input type="text" name='girls'  onChange={handleInput}/>
            </div>
            <div>
            <label htmlFor="facilities">Facilities</label>
            <input type="text" name='facilities'  onChange={handleInput}/>
            </div>
            <div>
            <label htmlFor="rules">Rules</label>
            <input type="text" name='rules'  onChange={handleInput}/>
            </div>
            <div>
            <label htmlFor="contactno">Contact Number</label>
            <input type="text" name='contactno'  onChange={handleInput}/>
            </div>
            <div>
            <label htmlFor="title">Cover Image</label>
            <input type="file" name='coverimage'  onChange={handleFile}/>
            </div>
            <div>
            <button type="submit">Post</button>
            </div>
        </form>
        </div>
    </div>
  )
}

export default PostAd