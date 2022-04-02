import React from 'react'

export default function Carousel(props) {
    const { arr } = props;
    console.log(arr[0].text);
    return (
        <div style={{ marginTop: '50vh' }} className="carousel slide mt-5" data-ride="carousel">
            <div className="carousel-inner mt-5">
                {arr.map(e => {
                    return (
                        <div className="carousel-item">
                            <div className="carousel-caption">
                                <h1>{e.text}</h1>
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
    )
}
