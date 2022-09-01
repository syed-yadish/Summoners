import React from 'react'
import '../styles/home.css'
import SearchBar from '../components/searchBar';
import Header from '../components/header';
import HomeSlider from "../components/homeSlider";
import "../styles/homeSlider.css";

const Home = () => {
  return(
    <div className='home-background'>
      <Header/>
      <HomeSlider/>
      <div className='home-container'>
      <div className='home-search'>
        <h2 className='search-Heading'>Login with your Riot ID</h2>
      <SearchBar keyName={<img src='https://i.imgur.com/bI6DHNf.png' width='30' height='30'/>}/>
         </div>
      </div>
    </div>
    );
  }
  
  export default Home;
