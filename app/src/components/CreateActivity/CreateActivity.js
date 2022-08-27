import { useState, useEffect } from "react";
import axios from "axios";
import style from "./createActivity.module.css";
import Navbar from "../Navbar/Navbar";
import SideNav from "../SideNav/SideNav";
import ActivityCard from "../Search/ActivityCard/ActivityCard";

function CreateActivity() {
  const [locations, setLocations] = useState([]);
  const [userActivities, setUserActivities] = useState([]);
  const [formData, setFormData] = useState({
    userName: "fiquee",
    type: "hiking",
    locationName: "",
    date: "",
    time: "",
    description: "",
    thumbnailUrl: "",
  });

  const getData = async () => {
    const { data } = await axios.get("http://127.0.0.1:5000/create-activity");

    setUserActivities(data["userActivities"]);
    setLocations(data["locations"]);
  };

  const submitActivity = async () => {
    const json = JSON.stringify(formData);
    const res = await axios.post(
      "http://127.0.0.1:5000/create-activity",
      json,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return res;
  };

  useEffect(() => {
    getData();
  }, []);

  const handleChange = (event) => {
    const key = event.target.name;
    setFormData({
      ...formData,
      [key]: event.target.value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const res = submitActivity();

    window.location.reload();
  };

  return (
    <main className={style.postContainer}>
      <Navbar></Navbar>
      <SideNav></SideNav>
      <div className={style.contentContainer}>
        <form className={style.postForm} onSubmit={handleSubmit}>
          <h1>Create a New Activity</h1>
          <div className={style.formItem}>
            <label htmlFor="type">Activity:</label>
            <select name="type" onChange={handleChange} required>
              <option value="hiking">Hiking</option>
              <option value="running">Running</option>
              <option value="futsal">Futsal</option>
              <option value="badminton">Badminton</option>
              <option value="frisbee">Frisbee</option>
              <option value="gym">Gym</option>
              <option value="basketball">Basketball</option>
            </select>
          </div>
          <div className={style.formItem}>
            <label htmlFor="locationName">Location:</label>
            <select name="locationName" onChange={handleChange} required>
              <option disabled selected>
                Select a Location
              </option>
              {locations
                ? locations.map((location, index) => {
                    if (location.activities.includes(formData.type)) {
                      return (
                        <option key={index} value={location.locationName}>
                          {location.locationName}
                        </option>
                      );
                    }
                  })
                : null}
            </select>
          </div>
          <div className={style.formItem}>
            <label htmlFor="date">Date:</label>
            <input type="date" name="date" onChange={handleChange} required />
          </div>
          <div className={style.formItem}>
            <label htmlFor="time">Time:</label>
            <input type="time" name="time" onChange={handleChange} required />
          </div>
          <div className={style.formItem}>
            <label htmlFor="description">Description:</label>
            <input
              type="text"
              placeholder="Enter additional details..."
              name="description"
              onChange={handleChange}
            />
          </div>
          <input
            type="submit"
            value="Create Activity"
            id={style.createButton}
          />
        </form>
        <div className={style.userActivity}>
          <h2>Your Activities</h2>
          <div className={style.cardContainer}>
            {userActivities
              ? userActivities.map((activity, index) => {
                  return (
                    <ActivityCard
                      key={index}
                      itemData={activity}
                      renderLocation="userActivity"></ActivityCard>
                  );
                })
              : null}
          </div>
        </div>
      </div>
    </main>
  );
}

export default CreateActivity;
