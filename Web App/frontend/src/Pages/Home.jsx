import React from "react";
import '../css/home.css';
import Header from '../Components/Header';
import Navbar from "../Components/Navbar";
import SearchItem from "../Components/SearchItem";

function Home() {
  return (
    <div>
      <Navbar />
      <Header />
      <div className="listContainer">
        <div className="listWrapper">
          <div className="listResult">
            <SearchItem />
            <SearchItem />
            <SearchItem />
            <SearchItem />
            <SearchItem />
            <SearchItem />
            <SearchItem />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
