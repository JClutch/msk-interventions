import React, { useState } from 'react';
import { Button, SearchBar, Card, Dropdown } from './components';
import { interventionSearch } from './utils/fetch';
import { Logo } from './images';

import './App.css';

const App = () => {

  /* Quick test for mobile */
  var isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
  /* 
    Originally set initial for displaySearch to "" but it's possible to search this API w/ an empty string 
    Initial false state helps designate that we haven't search at all yet and to not display 'no result' messages
  */
  const [ searchString, setSearch ] = useState("");
  const [ displaySearch, setDisplaySearch ] = useState(false);
  const [ results, setResults] = useState([]);
  const [ displayResults, setDisplayResults] = useState([]);
  const [ categories, setCategories] = useState([]);

  const onSearch = () => {
    const params = {
      name: searchString !== false ? searchString : "",
    };
    interventionSearch(params).then((res)=> {
      const categories = new Set();
      res.terms.map((val) => {
        categories.add(val.category);
      })
      setSearch("")
      setDisplaySearch(searchString);
      setCategories([...categories])
      setResults(res.terms)
      setDisplayResults(res.terms);
    }).catch((err) => {
      /* Could display to user */
      console.error(err);
    })
  }

  const onFilter = (f) => {
    if(f === "Select a Filter"){
      /* Reset */   
      setDisplayResults(results)
      return
    };
    const filteredResults = results.filter((val) => val.category === f )
    setDisplayResults(filteredResults);
  }

  return (
    <div className="App">
      <img src={Logo} alt="Logo" />
      <div>
        <SearchBar onChange={setSearch} />
        <Button onClick={onSearch} />
        {displaySearch !== false ? <h3> Search Results for "{displaySearch}"</h3> : null}
      </div>
      {
          /* Display Category Filter if we have more than 1 category */
        categories.length > 1 ? <Dropdown options={categories} onSelect={onFilter} />: null 
      }
        <div className="container">
        {
          /* Message to display no results */
          results.length < 1 && displaySearch !== false 
          ? 
          <h2 className="nullResults">There were no results for that search :( </h2>
          : 
          null
        }
        {displayResults.map((val) => (<Card {...val} isMobile={isMobile} />))}
        </div>

       
    </div>
  );
}

export default App;
