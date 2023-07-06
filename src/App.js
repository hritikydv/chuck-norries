import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [categories, setCategories] = useState([]);
  const [randomJoke, setRandomJoke] = useState({});
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    // Fetch categories
    axios
      .get('https://api.chucknorris.io/jokes/categories')
      .then((response) => {
        setCategories(response.data);
      })
      .catch((error) => {
        console.error('Error fetching categories:', error);
      });
  }, []);

  const getRandomJoke = (category) => {
    // Fetch random joke based on selected category
    axios
      .get(`https://api.chucknorris.io/jokes/random?category=${category}`)
      .then((response) => {
        setRandomJoke({ ...response.data, category });
        setShowPopup(true);
      })
      .catch((error) => {
        console.error('Error fetching random joke:', error);
      });
  };

  const getNextJoke = () => {
    const { category } = randomJoke;
    getRandomJoke(category);
  };

  const closePopup = () => {
    setShowPopup(false);
    setRandomJoke({});
  };

  return (
    <div>
      <h1>Chuck Norries </h1>
      <div className="categories">
        {categories.map((category, index) => (
          <div key={category} className="category-container">
            <button onClick={() => getRandomJoke(category)} className="category-button">
              {category}
              <p className="category-line">Unlimited Jokes On {category}</p>
            </button>
          </div>
        ))}
      </div>
      {showPopup && (
        <div className="popup">
          <div className="popup-content ">
            <button className="close-button" onClick={closePopup}>
              X
            </button>
            <h2 style={{fontSize:"50px" , fontWeight:"700" , textTransform:"capitalize"}}>{randomJoke.category}</h2>
            <p style={{fontSize:"20px" , fontWeight:"600"}}>{randomJoke.value}</p>
            <button className="next-joke-button" onClick={getNextJoke}>
              Next Joke
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;