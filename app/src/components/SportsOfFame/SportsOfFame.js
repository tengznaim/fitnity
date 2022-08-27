import { useState } from "react";
// import Icon from "react-dom";
import { GiRunningShoe, GiShuttlecock, GiBasketballBall, GiFrisbee } from "react-icons/gi";
import { IoFootballSharp } from "react-icons/io5";
import { MdHiking } from "react-icons/md";
import { CgGym } from "react-icons/cg";
import style from "./sportsOfFame.module.css";
import Navbar from "../Navbar/Navbar";
import SideNav from "../SideNav/SideNav";
import trophy from "../../assets/trophy.png";
import silverTrophy from "../../assets/silver-trophy.png";

function SportsOfFame() {
  const activities = [
    "Hiking",
    "Running",
    "Basketball",
    "Futsal",
    "Badminton",
    "Frisbee",
    "Gym ",
  ];

  const progressUnit = {
    KM: "Completed",
    Games: "Played",
    Sessions: "Joined",
  };

  const userProgress = [
    {
      activity: "hiking",
      level: 2,
      progressValue: 10,
      progressType: "KM",
      iconimg: MdHiking,
    },
    {
      activity: "futsal",
      level: 3,
      progressValue: 10,
      progressType: "Games",
      iconimg: IoFootballSharp,
    },
    {
      activity: "running",
      level: 1,
      progressValue: 10,
      progressType: "KM",
      iconimg: GiRunningShoe,
    },
    {
      activity: "badminton",
      level: 2,
      progressValue: 10,
      progressType: "Games",
      iconimg: GiShuttlecock,
    },
    {
      activity: "basketball",
      level: 2,
      progressValue: 10,
      progressType: "Games",
      iconimg: GiBasketballBall,
    },
    {
      activity: "gym",
      level: 2,
      progressValue: 10,
      progressType: "Sessions",
      iconimg: CgGym,
    },
    {
      activity: "frisbee",
      level: 5,
      progressValue: 10,
      progressType: "Games",
      iconimg: GiFrisbee,
    },
  ];

  const [selectionStates, setSelectionStates] = useState({
    sectionSelector: "trophies",
    trophyIndex: "0",
    selectedActivity: "hiking",
  });

  const [wallStates, setWallStates] = useState([
    `http://localhost:3000${trophy}`,
    "",
    "",
    "",
    "",
    "",
    "",
    "",
  ]);

  const handleTrophySelection = (event) => {
    const childImg = event.target.children[0];
    const imgSrc = childImg.src;
    const index = parseInt(selectionStates.trophyIndex);

    let temp = [...wallStates];
    temp[index] = imgSrc;

    setWallStates(temp);
  };

  const handleSelection = (event) => {
    if (
      event.target.name === "sectionSelector" &&
      event.target.value === "stats"
    ) {
      setSelectionStates({
        ...selectionStates,
        trophyIndex: "-1",
        [event.target.name]: event.target.value,
      });
    } else {
      setSelectionStates({
        ...selectionStates,
        [event.target.name]: event.target.value,
      });
    }
  };

  return (
    <main className={style.pageContainer}>
      <Navbar></Navbar>
      <SideNav></SideNav>
      <div className={style.choiceSection}>
        <div className={style.choiceContent}>
          <h1 id={style.header}>Sports of Fame</h1>
          <p id={style.description}>
            Decorate your trophy wall and view your stats!
          </p>
          <div className={style.selectorContainer}>
            <button
              className={
                selectionStates.sectionSelector === "trophies"
                  ? `${style.selectorButton} ${style.selectorActive}`
                  : style.selectorButton
              }
              id={style.leftButton}
              name="sectionSelector"
              value="trophies"
              onClick={handleSelection}>
              Your Trophies
            </button>
            <button
              className={
                selectionStates.sectionSelector === "stats"
                  ? `${style.selectorButton} ${style.selectorActive}`
                  : style.selectorButton
              }
              id={style.rightButton}
              name="sectionSelector"
              value="stats"
              onClick={handleSelection}>
              Your Stats
            </button>
          </div>
          {selectionStates.sectionSelector === "trophies" ? (
            <div className={style.inventoryContainer}>
              <div className={style.trophyIndexSelector}>
                {wallStates.map((wall, index) => (
                  <button
                    key={index}
                    className={style.indexButton}
                    name="trophyIndex"
                    value={index}
                    onClick={handleSelection}>
                    {index + 1}
                  </button>
                ))}
              </div>
              <select
                id={style.activitySelector}
                name="selectedActivity"
                onChange={handleSelection}>
                {activities.map((activity, index) => (
                  <option key={index} value={activity.toLowerCase()}>
                    {activity}
                  </option>
                ))}
              </select>
              <div className={style.inventoryPanels}>
                <button className={style.panel} onClick={handleTrophySelection}>
                  <img src={trophy} alt="" />
                </button>
                <button className={style.panel} onClick={handleTrophySelection}>
                  <img src={silverTrophy} alt="" />
                </button>
                <button
                  className={style.panel}
                  onClick={handleTrophySelection}></button>
              </div>
            </div>
          ) : (
            <div className={style.statsContainer}>
              {userProgress.map((progress, index) => (
                <div key={index} className={style.statsCard}>
                  <div className={style.iconContainer}>
                    <progress.iconimg className={style.icon} />
                  </div>
                  <div className={style.statsInfoContainer}>
                    <h2>
                      {progress.activity.charAt(0).toUpperCase() +
                        progress.activity.substr(1).toLowerCase()}
                    </h2>
                    <p>Level {progress.level}</p>
                    <p>
                      {progress.progressValue} {progress.progressType}{" "}
                      {progressUnit[progress.progressType]}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      <div className={style.trophySection}>
        <div className={style.shelf} id={style.top}>
          <div class={style.shelfWalls}>
            {wallStates.slice(0, 4).map((wall, index) => (
              <div
                key={index}
                className={
                  selectionStates.trophyIndex === index.toString()
                    ? `${style.wall} ${style.activeTrophy}`
                    : style.wall
                }>
                {wallStates[index] ? (
                  <img
                    src={wallStates[index]}
                    alt=""
                    className={style.trophyImage}
                  />
                ) : null}
              </div>
            ))}
          </div>
          <div class={style.shelfTrapezoid}></div>
          <div class={style.shelfBase}></div>
        </div>
        <div className={style.shelf} id={style.top}>
          <div class={style.shelfWalls}>
            {wallStates.slice(4, 8).map((wall, index) => (
              <div
                key={index + 4}
                className={
                  selectionStates.trophyIndex === (index + 4).toString()
                    ? `${style.wall} ${style.activeTrophy}`
                    : style.wall
                }>
                {wallStates[index + 4] ? (
                  <img
                    src={wallStates[index + 4]}
                    alt=""
                    className={style.trophyImage}
                  />
                ) : null}
              </div>
            ))}
          </div>
          <div class={style.shelfTrapezoid}></div>
          <div class={style.shelfBase}></div>
        </div>
      </div>
    </main>
  );
}

export default SportsOfFame;
