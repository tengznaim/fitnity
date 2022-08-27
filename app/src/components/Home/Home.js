import styles from "./home.module.css";
import Navbar from "../Navbar/Navbar";
import SideNav from "../SideNav/SideNav";
import { useState } from "react";
import { useNavigate, createSearchParams } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    activity: "hiking",
    searchType: "",
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    navigate({
      pathname: "search",
      search: createSearchParams(formData).toString(),
    });
  };

  return (
    <main className={styles.homeContainer}>
      <Navbar></Navbar>
      <SideNav></SideNav>
      <form className={styles.searchForm} onSubmit={handleSubmit}>
        <h1 className={styles.formItem} id={styles.formHeader}>
          What would you like to do today?
        </h1>
        <select
          className={styles.formItem}
          id={styles.activitySelect}
          defaultValue={formData.activity}
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
          <option value="frisbee">Frisbee</option>
          <option value="gym">Gym</option>
          <option value="basketball">Basketball</option>
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
          value="Search for Activity"
          name="activities"
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
