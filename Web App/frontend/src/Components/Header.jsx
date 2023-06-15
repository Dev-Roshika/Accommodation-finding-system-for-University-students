import React, { useState } from "react";
import "../css/header.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
     faCalendarDays, faCircleInfo, faContactBook, faHouse, faPerson, faUser} from "@fortawesome/free-solid-svg-icons"
import { DateRange } from 'react-date-range';
import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";

function Header({type, role}) {
    const navigate  = useNavigate();
    const [openDate, setOpenDate] =  useState(false);
    const [date, setDate] = useState([
        {
          startDate: new Date(),
          endDate: new Date(),
          key: 'selection'
        }
      ]);
    const [openOptions, setOpenOptions] = useState(false);
    const [options, setOptions] = useState({
        boy: 0,
        girl: 0
    })
    const handleOption = (name, operation) =>{
        setOptions((prev) => {
            return {
                ...prev,
                [name]:operation === 'i-count' ? options[name] + 1 : options[name] - 1,
            };
        });
    }
  return (
    <div className="header">
        <div className={type === 'list'? 'headerContainer listMode': 'headerContainer'}>
            <div className="headerList">
                <div className="headerListItem active">
                    <FontAwesomeIcon icon={faHouse} />
                    <span>Home</span>
                </div>
                <div className="headerListItem">
                    <FontAwesomeIcon icon={faUser} />
                    <span>Account</span>
                </div>
                <div className="headerListItem">
                    <FontAwesomeIcon icon={faCircleInfo} />
                    <span>About us</span>
                </div>
                <div className="headerListItem">
                    <FontAwesomeIcon icon={faContactBook} />
                    <span>Contact us</span>
                </div>
            </div>
            { type !== 'list' &&
                <> 
                <h1 className="headerTitle">Find Your Perfect Boarding House</h1>
                <p className="headerDesc">
                UniAccomodations is a dedicated platform designed to simplify the
                 process of finding comfortable and convenient boarding houses for students at the University of Jaffna. 
                </p>
                { role === "owner" && <button className="headerBtn" onClick={()=>{navigate('/owner/post-ad')}}>Post your Ad</button>}
                <div className="headerSearch">
                    <div className="headerSearchItem">
                        <FontAwesomeIcon icon = {faCalendarDays} onClick={()=> setOpenDate(!openDate)} className = "headerIcon" />
                        <span onClick={()=> setOpenDate(!openDate)} className="headerSearchText">{`${format(date[0].startDate, "MM/dd/yyyy")} to ${format(date[0].endDate, "MM/dd/yyyy")}`}</span>
                        {openDate && <DateRange
                            editableDateInputs={true}
                            onChange={item => setDate([item.selection])}
                            moveRangeOnFirstSelection={false}
                            ranges={date}
                            className= 'date'
                        />}
                    </div>
                    <div className="headerSearchItem">
                        <FontAwesomeIcon icon = {faPerson} className = "headerIcon" onClick={()=> setOpenOptions(!openOptions)} />
                        <span onClick={()=>setOpenOptions(!openOptions)} className="headerSearchText">{`${options.boy} boys . ${options.girl} girls`}</span>
                        {openOptions &&
                            <div className="options">
                                <div className="optionItem">
                                    <span className="optionText">Boy</span>
                                    <div className="optionCounter">
                                        <button className="optionCounterButton" disabled = {options.boy <= 0 || options.girl >= 1} onClick={() => handleOption('boy', 'd-count')}>-</button>
                                        <span className="optionCounterNumber">{options.boy}</span>
                                        <button className="optionCounterButton" disabled = {options.girl >= 1} onClick={() => handleOption('boy', 'i-count')}>+</button>
                                    </div>
                                </div>
                                <div className="optionItem">
                                    <span className="optionText">Girl</span>
                                    <div className="optionCounter">
                                        <button className="optionCounterButton" disabled = {options.girl <= 0 || options.girl >= 1} onClick={() => handleOption('girl', 'd-count')}>-</button>
                                        <span className="optionCounterNumber">{options.girl}</span>
                                        <button className="optionCounterButton" disabled = {options.boy >= 1} onClick={() => handleOption('girl', 'i-count')}>+</button>
                                    </div>
                                </div>
                            </div>
                        }
                    </div>
                    <div className="headerSearchItem">
                        <button className="headerBtn">Search</button>
                    </div>
                </div>
                </>
                }
        </div>
    </div>
  );
}

export default Header;
