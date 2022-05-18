import logo from './logo.svg';
import './main-page.css';
import Header from "./header";
import { useEffect, useState, useMemo } from "react";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import FeaturedHouse from "./featured-house";

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
      <Routes>
          <Route path="/" element={
            <FeaturedHouse house={featuredHouse} />
          } />

      </Routes>
 
      </div>
    </Router>
  );
}

export default App;
