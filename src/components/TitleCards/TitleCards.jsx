import React, { useEffect, useRef, useState } from 'react';
import "./TitleCards.css"
import cards_data from "../../assets/cards/Cards_data"
import { Link } from 'react-router-dom';


const TitleCards = ({title,category}) => {
  
  const [apiData,setApiData]=useState([])
  const cardsRef=useRef()

  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmMDBkOTA3YTk0ZTFkM2RmOTQyODg2MDMyNDljYzEzNiIsIm5iZiI6MTczMjAxNTQwMC4wOTA1ODcsInN1YiI6IjY3M2M3MzA1YWMzYWE3MTRmNDMyMTNiMSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.o6gnKtwHO87t9BV01HsmD0fPQM7cPs7H4InXWpCLsro'
    }
  };
  
  
  const handleWheel=(e)=>{
    e.preventDefault()
    cardsRef.current.scrollLeft+= e.deltaY
  }

  useEffect(() => {
    fetch(`https://api.themoviedb.org/3/movie/${category?category:"now_playing"}?language=en-US&page=1`, options)
      .then((res) => res.json()) 
      .then((data) => {
        console.log(data.results); 
        setApiData(data.results); 
      })
      .catch((err) => console.error("Fetch error:", err)); // Handle errors
  
     cardsRef.current.addEventListener("wheel",handleWheel)
  },[])
  return (
    <div className='title-cards'>
      <h2>{title ? title : "Popular on Netflix"}</h2>
      <div className='card-list' ref={cardsRef}>
        {apiData.map((card,index)=>{

   return(
    <Link className="card" key={index}
    to={`/player/${card.id}`}>
      <img src={`https://image.tmdb.org/t/p/w500/`+card.backdrop_path} alt=""/>
      <p>{card.original_title || "Title not available"}</p>
    </Link>
   )
        })}
      </div>
    </div>
  );
}

export default TitleCards;
