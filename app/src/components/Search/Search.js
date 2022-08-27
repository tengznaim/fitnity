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
    const activity = searchParams.get("activity");
    const searchType = searchParams.get("searchType");
    // const { data } = await axios.get("http://127.0.0.1:5000/search", {
    //   params: {
    //     searchType: searchType,
    //     activity: activity,
    //   },
    // });

    // setSearchResults(data);

    // Hard coding for testing
    if (searchType === "locations") {
      const data = [
        {
          activities: ["hiking"],
          keywords: ["waterfall", "monkeys", "fish"],
          locationCoordinates: { latitude: 3.5953, longitude: 101.7509 },
          locationName: "Chiling Waterfall",
          sentimentPolarity: 36,
          thumbnailUrl:
            "https://selangor.travel/wp-content/uploads/2019/08/Sungai_Chilling_Mahseer_Fish_Sanctuary_Waterfall_Tourism_Selangor.jpg",
        },
      ];
      setSearchResults(data);
    } else {
      const data = [
        {
          date: "26/08/2022",
          description:
            "Let's enjoy the waterfall! Planning a 2 hour hike ⛰ with 100m elevation.",
          locationName: "Chiling Waterfall",
          thumbnailUrl:
            "https://selangor.travel/wp-content/uploads/2019/08/Sungai_Chilling_Mahseer_Fish_Sanctuary_Waterfall_Tourism_Selangor.jpg",
          time: "0900",
          type: "hiking",
          userName: "fiquee",
        },
      ];
      setSearchResults(data);
    }
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
