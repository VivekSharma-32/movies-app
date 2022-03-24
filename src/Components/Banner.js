import { movies } from "./getMovies";
import React, { Component } from 'react'
export default class Banner extends Component {
    render() {
        // console.log(movies)
        let movie = movies.results[0]
        // console.log(movie)
        return (
            <>
                {
                    movie == '' ?
                        <div class="spinner-border text-primary" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div> :
                        <div class="card banner-card">
                            <img src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`} className="card-img-top banner-image" alt={movie.title} />
                            {/* <div className="card-body"> */}
                            <h1 className="card-title banner-title">{movie.original_title}</h1>
                                <p className="card-text banner-text">{movie.overview}</p>
                                {/* <a href="#" className="btn btn-primary">Go somewhere</a> */}
                            {/* </div> */}
                        </div>
                }
        </>
    )
  }
}
