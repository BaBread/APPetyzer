import React from 'react';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import Auth from '../../utils/auth';

const Header = () => {

  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([])

  const logout = (event) => {
    event.preventDefault();
    Auth.logout();
  }

  const handleSearch = () => {
    if (searchTerm.trim() !== '') {
      performFetchSearch(searchTerm);
     

    }
  }

  function performFetchSearch(term) {
    const apiUrl = `https://www.themealdb.com/api/json/v1/1/search.php?s=${term}`;

    fetch(apiUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        const results = data.meals;
        console.log(results);
        setSearchResults(results);

      
        window.location.href = `/search-results/${term}`;
      })
      .catch((error) => {
        console.error('Error with fetch request: ', error);
      });
  };

  return (
    <header className="bg-primary text-light mb-4 py-3">
      <div className="container flex-column justify-space-between-lg justify-center align-center">
        <div className="text-center">
          <Link>
            <h1 className="m-0 text-light" to="/">Appetyzer</h1>
          </Link>
          <p className="m-0 text-light">¡¡Bon Appetite!!</p>
        </div>
        <div className="d-flex justify-start align-center">
          <input
            type="text"
            placeholder="Search for a meal..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Link to="/search-results">
          <button onClick={handleSearch}>Search</button>
          </Link>
        </div>
        <div className="container flex-column justify-end align-center">
          {Auth.loggedIn() ? (
            <>
              <span>Hey there, {Auth.getProfile().data.username}!</span>
              <button className="btn btn-lg btn-light m-2" onClick={logout}>
                Logout
              </button>
            </>
          ) : (
            <>
              <Link className="btn btn-lg btn-info m-2" to="/login">
                Login
              </Link>
              <Link className="btn btn-lg btn-light m-2" to="/signup">
                Signup
              </Link>
            </>
          )}
        </div>
      </div>
      {searchResults.length > 0 && (
        <div className="container">
          <h2>Search Results</h2>
          <ul>
            {searchResults.map((result) => (
              <li key={result.idMeal}>{result.strMeal}</li>
            ))}
          </ul>
        </div>
        
      )}
    </header>
  );
}



export default Header;