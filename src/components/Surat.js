import React from 'react'
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Carousel from './Carousel';

export default function Surat() {
    let params = useParams();

    const [ayats, setAyats] = useState([]);
    const [sajdat, setSajdat] = useState([]);
    const [isSajdat, setIsSajdat] = useState(false);

    const [loading, setLoading] = useState(false);
    const getEdition = async () => {
        setLoading(true)
        const res = await axios.get(`http://api.alquran.cloud/v1/surah/${params.suratNumber}/${params.suratEdition}`)
        setAyats(res.data.data.ayahs);
        setLoading(false)
    }
    const getSajda = async () => {
        const res = await axios.get(`http://api.alquran.cloud/v1/sajda/${params.suratEdition}`)
        setSajdat(res.data.data.ayahs)
        const sajdats = ayats.filter(e => e.surah.number === sajdat.surah.number && e.number === sajdat.number)
        if (sajdats) setIsSajdat(true)
    }
    useEffect(() => {
        getEdition()
        getSajda()
    }, []);
    return (
        <div>
            {loading ? <p>Loading ayat</p> :
                <div style={{ marginTop: '50vh' }} className="carousel slide mt-5" data-ride="carousel">
                    <div className="carousel-inner mt-5">
                        {ayats.map(e => {
                            return (
                                <div className="carousel-item">
                                    <div className="carousel-caption">
                                        <h1 className={isSajdat ? 'sajdat-box' : ""}>{e.text}</h1>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                    <a className="carousel-control-prev" href="#carouselExampleControls" role="button" data-slide="prev">
                        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span className="sr-only">Previous</span>
                    </a>
                    <a className="carousel-control-next" href="#carouselExampleControls" role="button" data-slide="next">
                        <span className="carousel-control-next-icon" aria-hidden="true"></span>
                        <span className="sr-only">Next</span>
                    </a>
                </div>
            }

            <style jsx>{`
                html,body{
                    height:100%;
                    background:#404040
                }`}</style>
        </div>
    )
}
