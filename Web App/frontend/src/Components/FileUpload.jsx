import axios from 'axios';
import React, { Fragment, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const FileUpload = () => {
  const [files, setFiles] = useState([]);
  const { id } = useParams();
  const navigate = useNavigate();
  const onChange = e => {
    console.log(e.target.files);
    setFiles(e.target.files)
  };
  console.log(files);
  const onSubmit = async e => {
    e.preventDefault();
    if (files.length === 0) {
        console.log('No files selected');
        alert("No files selected");
        return;
      }
      if (files.length >6) {
        console.log('Maximum of 6 files allowed');
        alert("Maximum of 6 files allowed");
        return;
      }
    const formData = new FormData();
    Object.values(files).forEach(file=>{
      formData.append("uploadImages", file);
    });
    
    try {
      const res = await axios.post(`http://localhost:8081/images/upload/${id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        },
      });
      console.log(res);
      alert("Images uploaded successfully");
      navigate("/home");
    } catch (err) {
      if (err.response.status === 500) {
        console.log(err);
      } else {
        console.log(err.response.data.msg);
      }
    }
  };

  return (
    <Fragment>
      <form onSubmit={onSubmit}>
        <div>
          <input
            type='file'
            id='file'
            name="uploadImages"
            multiple
            title='Max image count is 6'
            onChange={onChange}
          />
        </div>
        <input
          type='submit'
          value='Upload'
        />
      </form>
    </Fragment>
  );
};

export default FileUpload;