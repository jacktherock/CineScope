import React, { useState } from "react";
import starIcon from '../assets/star-icon.svg'
import loadingGif from '../assets/loading.gif'

const MovieSearch = () => {
    const [movieName, setMovieName] = useState("");
    const [result, setResult] = useState("");
    const [loading, setLoading] = useState(false);

    const key = "c8048de5"; // Replace with your own OMDB API key

    const getMovie = () => {
        let url = `http://www.omdbapi.com/?t=${movieName}&apikey=${key}`;
        //if input field is empty
        if (movieName.length <= 0) {
            setResult(<h3 className="msg">Please Enter a Movie name !</h3>);
        }
        //if input isn't empty
        else {
            setResult(""); // clear any previous result
            setLoading(true); // set loading to true
            fetch(url)
                .then((resp) => resp.json())
                .then((data) => {
                    //if movie exists in database
                    if (data.Response === "True") {
                        setResult(
                            <div className="info">
                                <img src={data.Poster} className="poster" alt={data.Title} />
                                <div>
                                    <h2>{data.Title}</h2>
                                    <div className="genre">
                                        <p><u style={{ color: "#fff" }}>Director</u> : {data.Director}</p>
                                    </div>
                                    <div className="genre">
                                        <p><u style={{ color: "#fff" }}>Writer</u> : {data.Writer}</p>
                                    </div>
                                    <div className="rating">
                                        <img src={starIcon} alt="rating icon" />
                                        <h4>{data.imdbRating}</h4>
                                    </div>
                                    <div className="details">
                                        <span>{data.Rated}</span>
                                        <span>{data.Year}</span>
                                        <span>{data.Runtime}</span>
                                    </div>
                                    <div className="details">
                                        <span>{data.Language}</span>
                                        <span>{data.Country}</span>
                                        <span>{data.Released}</span>
                                    </div>
                                    <div className="genre">
                                        {data.Genre.split(",").map((genre, index) => (
                                            <div key={index}>{genre}</div>
                                        ))}
                                    </div>

                                </div>

                                <h3>Plot:</h3>
                                <p className="p-info">{data.Plot}</p>
                                <h3>Cast:</h3>
                                <p className="p-info">{data.Actors}</p>

                            </div>
                        );
                    }
                    //if movie doesn't exist in database
                    else {
                        setResult(<h3 className="msg">{data.Error}</h3>);
                    }
                })
                // if error occurs
                .catch((err) => {
                    // setResult(<h3 className="msg">Error Occured !</h3>);
                    setResult(<h3 className="msg">{err.message}</h3>);
                })
                .finally(() => setLoading(false)); // set loading to false when done
        }
    };

    return (
        <div className="container">
            <div className="search-container">
                <input
                    id="movie-name"
                    type="text"
                    placeholder="Enter movie name"
                    value={movieName}
                    onChange={(event) => setMovieName(event.target.value)}
                />
                <button id="search-btn" onClick={getMovie}>
                    Search
                </button>
            </div>
            {loading ? (

                <div style={{ marginTop: "2em", display: "grid", justifyContent: "center" }}>
                    <img src={loadingGif} alt="" width="25"></img>
                </div>
            ) : (
                <div id="result">{result}</div>
            )}
        </div>
    );
};

export default MovieSearch;