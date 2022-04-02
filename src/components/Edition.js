import React from 'react'

import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Link, Outlet } from "react-router-dom";


export default function Edition() {
  let params = useParams();

  const [surats, setSurats] = useState([]);
  const [loading, setLoading] = useState(false);
  const getEdition = async () => {
    setLoading(true)
    const res = await axios.get(`http://api.alquran.cloud/v1/quran/${params.editionInv}`)
    setSurats(res.data.data.surahs);
    setLoading(false)
  }
  useEffect(() => {
    getEdition()
  }, []);
  return (
    <div className="container">
      <h1>Edition :  {params.editionInv}</h1>
      <div className="row">
        {loading ? <p>Loading surats...</p> :
          surats.map(e => {
            return <div className="col-4">
              <Link key={e.number} to={`/surat/${e.number}/${params.editionInv}`}><h3>{e.number} - {e.name}</h3></Link>
              <Link key={e.number} to={`/surat/${e.number}/${params.editionInv}`}><h6>{e.englishName} - {e.englishNameTranslation} ({e.revelationType})</h6></Link>
            </div>
          })}
      </div>
      <Outlet />
    </div>

  )
}