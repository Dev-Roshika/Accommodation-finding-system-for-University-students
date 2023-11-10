import React, { useEffect, useState } from 'react'
import axios from 'axios';
import "../css/searchitem.css";
import Modal2 from './Newmodal'; // Adjust the path based on your file structure
import '../css/modal.css';

function Dashdis () {

  const[data,UseBoardings] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [BoardingId, setSelectedBoardingId] = useState(null);

  const handleVerification = (event) => {
    const id = event.currentTarget.getAttribute('data-id');
    setSelectedBoardingId(id);
    setShowModal(true);
  };
  const confirmVerification = async () => {
    try {
      const resp = await axios.put(`http://localhost:8081/admin/verifyboardings/${BoardingId}`);
      console.log("verified: ", resp);
      getBoarding();
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(()=>{
    getBoarding();
  },[])

    const getBoarding = async() =>
    {
        try{
            const resp = await axios.get('http://localhost:8081/admin/unverifyboardings');
            console.log("test")
            console.log(resp)
            UseBoardings(resp.data);
        }
        catch(err){
            console.log(err)
        }
    }



const getunverifyBoardings = () => {
    const rows = [];
    for (let i = 0; i < data.length; i++) {
    rows.push(
      <div className="searchItem" key={data[i].Id}>
        <div className="siDesc">
            <h1 className="siTitle">{data[i].Title}</h1>
            <span className="siDistance">
                {data[i].Distance} from University of Jaffna main premises
            </span>
            <span className="siConditions">
                {data[i].Boys !== 0 && <>{data[i].Boys} boys </>}
                {data[i].Girls !== 0 && <>{data[i].Girls} girls </>}only
            </span>
            <span className="siFeatures">{data[i].Facilities}</span>
            <span className="siSubtitle">Address : {data[i].Address}</span>
        </div>
        <div className="siDetails">
            <div className="siDetailsTexts">
            <span className="siPrice">Rs {data[i].Price} /month</span>
                <span className="siPriceText">Negotiable : {data[i].Negotiable}</span>
                <span className="siTaxi">{data[i].ContactNo}</span>


                <a role="button"  id="verify" data-id={data[i].Id} onClick={handleVerification}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="green" class="bi bi-bookmark-check" viewBox="0 0 16 16">
                      <path fill-rule="evenodd" d="M10.854 5.146a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L7.5 7.793l2.646-2.647a.5.5 0 0 1 .708 0z"/>
                      <path d="M2 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v13.5a.5.5 0 0 1-.777.416L8 13.101l-5.223 2.815A.5.5 0 0 1 2 15.5V2zm2-1a1 1 0 0 0-1 1v12.566l4.723-2.482a.5.5 0 0 1 .554 0L13 14.566V2a1 1 0 0 0-1-1H4z"/>
                    </svg>
                    </a>

            </div>
        </div>
    </div>
    );              
    }
      return rows;
}
  
  return (
    <div className="Dashdis">
      <div>
          <header>
            <div class="Header">
              <h5>New Accomodations </h5>&emsp;
              <div >
              <svg xmlns="http://www.w3.org/2000/svg" width="64" height="32" fill="#237544"  class="bi bi-app-indicator" viewBox="0 0 16 16">
                <path d="M5.5 2A3.5 3.5 0 0 0 2 5.5v5A3.5 3.5 0 0 0 5.5 14h5a3.5 3.5 0 0 0 3.5-3.5V8a.5.5 0 0 1 1 0v2.5a4.5 4.5 0 0 1-4.5 4.5h-5A4.5 4.5 0 0 1 1 10.5v-5A4.5 4.5 0 0 1 5.5 1H8a.5.5 0 0 1 0 1H5.5z"/>
                <path d="M16 3a3 3 0 1 1-6 0 3 3 0 0 1 6 0z"/>
                <text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" fill="red" font-size="8">{data.length}</text>
              </svg>
              </div>
            </div>
              <hr></hr>
          </header>

        <div>
          {getunverifyBoardings()}
        </div>

      </div>

      {showModal && (
                <Modal2
                    setOpenModal={setShowModal}
                    confirmAction={confirmVerification}
                />
            )}

    </div>
  )
}

export default Dashdis