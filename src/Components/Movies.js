import React, { Component } from 'react';
// import { movies } from './getMovies';
import axios from 'axios';

export default class Movies extends Component {
    constructor() {
        super();
        this.state = {
            hover: '',
            parr: [1],
            currPage: 1,
            movies: [],
            favourites: []
        }
    }
    componentDidMount=async()=> {
        // Side effect
        const res = await axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=5540e483a20e0b20354dabc2d66a31c9&page=${this.state.currPage}`);
        let data = res.data;
        // console.log(data);
        this.setState({
            movies: [...data.results]
        })
        console.log('mounting done');
    }
    changeMovies = async () => {
        // console.log('changeMovies called')
        // console.log(this.state.currPage)
        let cpage = this.state.currPage
        const res = await axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=5540e483a20e0b20354dabc2d66a31c9&page=${this.state.currPage}`);
        let data = res.data;
        // console.log(data);
        this.setState({
            movies: [...data.results]
        })
    }
    handleLeft = () => {
        if (this.state.currPage != 1) {
            this.setState({
                currPage: this.state.currPage-1
            },this.changeMovies)
        }
    }
    handleRight = () => {
        let temparr = []
        for (let i = 1; i <= this.state.parr.length+1; i++){
            temparr.push(i);
        }
        this.setState({
            parr: [...temparr],
            currPage: this.state.currPage+1
        },this.changeMovies)
        
    }
    handleClick = (value) => {
        // console.log(value)
        // console.log(this.state.currPage)
        if (value != this.state.currPage) {
            console.log('Im called');
            this.setState({
                currPage: value
            },this.changeMovies)
        }
    }

    handleFavorites = (movie) => {
        let oldData = JSON.parse(localStorage.getItem('movies-app') || "[]")
        if (this.state.favourites.includes(movie.id)) {
            oldData = oldData.filter((m)=>m.id!=movie.id)
        }
        else {
            oldData.push(movie);
        }
        localStorage.setItem("movies-app", JSON.stringify(oldData));
        console.log(oldData)
        this.handleFavoritesState();
    }

    handleFavoritesState = () => {
        let oldData = JSON.parse(localStorage.getItem('movies-app') || "[]")
        let temp = oldData.map((movie) => movie.id);
        this.setState({
            favourites: [...temp]
        })
    }

    render() {
        // let movie = movies.results
        // console.log('render')
        return (
            <>
                {
                    this.state.movies.length == 0 ?
                        <div class="spinner-border text-primary" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div> :
                        <div>
                            <h3 className='text-center'><strong>Trending</strong></h3>
                            <div className='movies-list'>
                                {
                                    this.state.movies.map((movieObj) => (
                                        <div class="card movies-card" onMouseEnter={() => this.setState({ hover: movieObj.id })} onMouseLeave={() => this.setState({ hover: '' })}>
                                            <img src={`https://image.tmdb.org/t/p/original${movieObj.backdrop_path}`} className="card-img-top movies-image" alt={movieObj.title} />
                                            {/* <div className="card-body"> */}
                                            <h5 className="card-title movies-title">{movieObj.original_title}</h5>
                                            {/* <p className="card-text movies-text">{movieObj.overview}</p> */}
                                            <div className='button-wrapper'>
                                                {
                                                    this.state.hover == movieObj.id && <a className="btn btn-primary movies-button" onClick={() => this.handleFavorites(movieObj)}>{ this.state.favourites.includes(movieObj.id)?"Remove From Favorites":"Add To Favorites"}</a>
                                                }
                                            </div>

                                            {/* </div> */}
                                        </div>
                                    ))
                                }
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'center' }}>
                                <nav aria-label="Page navigation example">
                                    <ul className="pagination">
                                        <li className="page-item"><a className="page-link" onClick={this.handleLeft}>Previous</a></li>
                                        {
                                            this.state.parr.map((value) => (
                                                <li className="page-item"><a className="page-link" onClick={()=>this.handleClick(value)}>{value}</a></li>
                                            ))
                                        }
                                        <li className="page-item"><a className="page-link" onClick={this.handleRight}>Next</a></li>
                                    </ul>
                                </nav>
                            </div>
                        </div>
                }
            </>
        )
    }
}
