import styles from "./home.module.css";
import Navbar from "../Navbar/Navbar";
import SideNav from "../SideNav/SideNav";
import { useState } from "react";

function Home() {
  const [formData, setFormData] = useState({
    activity: "",
    searchType: "",
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    // Update method to redirect to the search page.
    console.log(formData);
    // navigate({
    //   pathname: "search",
    //   search: createSearchParams(formData).toString(),
    // });
  };

  return (
    <main className={styles.homeContainer}>
      <Navbar></Navbar>
      <SideNav></SideNav>
      {/* Need to add onSubmit */}
      <form className={styles.searchForm} onSubmit={handleSubmit}>
        <h1 className={styles.formItem} id={styles.formHeader}>
          What would you like to do today?
        </h1>
        <select
          className={styles.formItem}
          id={styles.activitySelect}
          onChange={(event) => {
            setFormData({
              ...formData,
              activity: event.target.value,
            });
          }}>
          <option value="hiking">Hiking</option>
          <option value="running">Running</option>
          <option value="futsal">Futsal</option>
          <option value="badminton">Badminton</option>
        </select>
        <input
          type="submit"
          value="Search for Locations"
          name="locations"
          className={`${styles.formItem} ${styles.submitButton}`}
          onClick={(event) => {
            setFormData({
              ...formData,
              searchType: event.target.name,
            });
          }}
        />
        <input
          type="submit"
          value="Search for Events"
          name="events"
          className={`${styles.formItem} ${styles.submitButton}`}
          onClick={(event) => {
            setFormData({
              ...formData,
              searchType: event.target.name,
            });
          }}
        />
      </form>
    </main>
  );
}

export default Home;
