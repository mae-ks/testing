import React, { useState, useEffect } from 'react';

interface SearchProps {
    movie_name: string;
}

function Search({ movie_name } : SearchProps) {

    const [search_results, setResults] = useState([]);
    useEffect(() => {
        if (movie_name.trim() !== '') {
            fetch('/search/movies/' + movie_name)
            .then((res) => res.json())
            .then((data) => {setResults(data)});
        } else {
            setResults([]);
        }
    }, [movie_name]);

    const results = JSON.parse(JSON.stringify(search_results));
    const listItems = results.map((movie: any) =>
        <div>
            <li>{movie.title}</li>
            <li>{movie.overview}</li>
            <li>{movie.genres}</li>
        </div>
    );
  
    return listItems;
};

export default Search;