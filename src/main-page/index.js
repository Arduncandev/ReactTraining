import logo from './logo.svg';
import './main-page.css';
import Header from "./header";
import { useEffect, useState, useMemo } from "react";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import FeaturedHouse from "./featured-house";
import SearchResults from "../search-results";
import HouseFilter from "./house-filter";
import HouseFromQuery from "../house/HouseFromQuery";

function App() {
  const [allHouses, setAllHouses] = useState([]);
  
  useEffect(() => {
    const fetchHouses = async () => {
      const rsp = await fetch("/houses.json");
      const houses = await rsp.json();
      setAllHouses(houses)
    }
    fetchHouses();
  }, []);

  const featuredHouse = useMemo(() => {
    if(allHouses.length) {
      const randomIndex = Math.floor(Math.random() * allHouses.length);
      return allHouses[randomIndex];
    }
  }, [allHouses])


  return (
    <Router>
      <div className="container">
        <Header 
          subtitle="Providing houses all over the world"
        />

        <HouseFilter allHouses={allHouses} />
      <Routes>
          <Route path="house/:id" element={
            <HouseFromQuery allHouses={allHouses} />
          } />
          <Route path="/searchresults/:country" element={
            <SearchResults allHouses={allHouses} />
          } />
          <Route exact path="/" element={
            <FeaturedHouse house={featuredHouse} />
          } />

      </Routes>
 
      </div>
    </Router>
  );
}

export default App;
