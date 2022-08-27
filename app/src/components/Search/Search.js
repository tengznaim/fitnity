import { useEffect, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { IoChevronBack } from "react-icons/io5";
import axios from "axios";
import style from "./search.module.css";
import Navbar from "../Navbar/Navbar";
import SideNav from "../SideNav/SideNav";
import LocationCard from "./LocationCard/LocationCard";
import ActivityCard from "./ActivityCard/ActivityCard";

function Search() {
  const [searchParams] = useSearchParams();
  const [searchResults, setSearchResults] = useState();

  const getData = async () => {
    const searchDict = Object.fromEntries([...searchParams]);
    // const activity = searchParams.get("activity");
    // const searchType = searchParams.get("searchType");
    const { data } = await axios.get("http://127.0.0.1:5000/search", {
      params: searchDict,
    });

    setSearchResults(data);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <main className={style.searchContainer}>
      <Navbar></Navbar>
      <SideNav></SideNav>
      <div className={style.contentContainer}>
        <div className={style.contentHeader}>
          <Link to="/">
            <IoChevronBack id={style.backIcon} />
          </Link>
          <h1 id={style.header}>Search Results</h1>
        </div>
        {searchResults ? (
          <div className={style.resultItems}>
            {searchParams.get("searchType") === "locations"
              ? searchResults.map((result) => (
                  <LocationCard key={result.id} itemData={result} />
                ))
              : searchResults.map((result) => (
                  <ActivityCard
                    key={result.id}
                    itemData={result}
                    renderLocation="search"
                  />
                ))}
          </div>
        ) : (
          <h2 id={style.loadingText}>Loading...</h2>
        )}
      </div>
    </main>
  );
}

export default Search;
