import React from 'react'
import './App.css';
import axios from 'axios'
import { useEffect, useState } from 'react';
import { Link, Outlet } from "react-router-dom";

function App() {

  const [editions, setEditions] = useState([]);
  const [loading, setLoading] = useState(false);
  const getEditions = async () => {
    setLoading(true)
    const res = await axios.get('http://api.alquran.cloud/v1/edition', {
      params: {

      }
    })
    setEditions(res.data.data);
    setLoading(false)
  }

  useEffect(() => {
    getEditions()
  }, []);


  return (
    <div className="container text-center">
      <h1>Quran app</h1>

      <h2>List of Quran editions</h2>
      <div className='row'>
        {
          loading ? <p>Loading ...</p> :
            editions.map(e => {
              return (
                <div className='col-4 mt-5 text-left'>
                  <div>
                    <Link key={e.identifier} to={`/edition/${e.identifier}`}><h3>{e.name}</h3></Link>
                    <Link key={e.identifier} to={`/edition/${e.identifier}`}><h6>{e.englishName}</h6></Link>
                  </div>
                  <ul>
                    <li>Language : {e.language}</li>
                    <li>Direction : {e.direction}</li>
                  </ul>
                </div>
              )
            })}
      </div>
      <Outlet />
    </div>
  );
}

export default App;
