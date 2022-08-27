import { useState, useEffect } from "react";
import axios from "axios";
import {
  GiRunningShoe,
  GiShuttlecock,
  GiBasketballBall,
  GiFrisbee,
} from "react-icons/gi";
import { IoFootballSharp } from "react-icons/io5";
import { FaLock } from "react-icons/fa";
import { MdHiking } from "react-icons/md";
import { CgGym } from "react-icons/cg";
import style from "./sportsOfFame.module.css";
import Navbar from "../Navbar/Navbar";
import SideNav from "../SideNav/SideNav";
import goldTrophy from "../../assets/trophy.png";
import silverTrophy from "../../assets/silver-trophy.png";
import bronzeTrophy from "../../assets/bronze-trophy.png";

function SportsOfFame() {
  const levelsRequired = {
    bronze: 1,
    silver: 3,
    gold: 5,
  };

  const activities = [
    "Hiking",
    "Running",
    "Basketball",
    "Futsal",
    "Badminton",
    "Frisbee",
    "Gym",
  ];

  const progressUnit = {
    KM: "Completed",
    Games: "Played",
    Sessions: "Joined",
  };

  const [userProgress, setUserProgress] = useState();
  const [userLevels, setUserLevels] = useState();

  const getData = async () => {
    const { data } = await axios.get("http://127.0.0.1:5000/sports-of-fame");
    const temp = data["userProgress"];
    let userLevel = {};

    temp.forEach((progress) => {
      progress["iconImg"] = iconDict[progress.activity];
    });

    temp.forEach((progress) => {
      userLevel[progress.activity] = progress.level;
    });

    setUserLevels(userLevel);
    setUserProgress(temp);
  };

  useEffect(() => {
    getData();
  }, []);

  const iconDict = {
    hiking: MdHiking,
    futsal: IoFootballSharp,
    running: GiRunningShoe,
    basketball: GiBasketballBall,
    frisbee: GiFrisbee,
    gym: CgGym,
    badminton: GiShuttlecock,
  };

  const [selectionStates, setSelectionStates] = useState({
    sectionSelector: "trophies",
    trophyIndex: "0",
    selectedActivity: "hiking",
  });

  const [wallStates, setWallStates] = useState([
    `${bronzeTrophy}`,
    "",
    "",
    "",
    "",
    "",
    "",
    "",
  ]);

  const handleTrophySelection = (event) => {
    let imgSrc;

    if (
      event.target.children[0] &&
      event.target.children[0].tagName.toLowerCase() === "svg"
    ) {
      return;
    }

    // Clikcing the image on top of the button
    if ("src" in event.target) {
      imgSrc = event.target.src;
    }

    // Clicking the button itself
    else {
      const childImg = event.target.children[0];
      imgSrc = childImg.src;
    }

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
                  ? `${style.selectorButton} ${style.activeSelector}`
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
                  ? `${style.selectorButton} ${style.activeSelector}`
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
                    className={
                      parseInt(selectionStates.trophyIndex) === index
                        ? `${style.indexButton} ${style.activeSelector}`
                        : style.indexButton
                    }
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
                onChange={handleSelection}
                value={selectionStates.selectedActivity}>
                {activities.map((activity, index) => (
                  <option key={index} value={activity.toLowerCase()}>
                    {activity}
                  </option>
                ))}
              </select>
              <div className={style.inventoryPanels}>
                {userProgress && (
                  <>
                    <button
                      className={style.panel}
                      onClick={handleTrophySelection}>
                      {userLevels[selectionStates.selectedActivity] >=
                      levelsRequired.bronze ? (
                        <img src={bronzeTrophy} alt="" />
                      ) : (
                        <FaLock />
                      )}
                    </button>
                    <button
                      className={style.panel}
                      onClick={handleTrophySelection}>
                      {userLevels[selectionStates.selectedActivity] >=
                      levelsRequired.silver ? (
                        <img src={silverTrophy} alt="" />
                      ) : (
                        <FaLock />
                      )}
                    </button>
                    <button
                      className={style.panel}
                      onClick={handleTrophySelection}>
                      {userLevels[selectionStates.selectedActivity] >=
                      levelsRequired.gold ? (
                        <img src={goldTrophy} alt="" />
                      ) : (
                        <FaLock />
                      )}
                    </button>
                  </>
                )}
              </div>
            </div>
          ) : (
            <div className={style.statsContainer}>
              {userProgress &&
                userProgress.map((progress, index) => (
                  <div key={index} className={style.statsCard}>
                    <div className={style.iconContainer}>
                      <progress.iconImg className={style.icon} />
                    </div>
                    <div className={style.statsInfoContainer}>
                      <h2>
                        {progress.activity.charAt(0).toUpperCase() +
                          progress.activity.substring(1).toLowerCase()}
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
          <div className={style.shelfWalls}>
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
          <div className={style.shelfTrapezoid}></div>
          <div className={style.shelfBase}></div>
        </div>
        <div className={style.shelf} id={style.top}>
          <div className={style.shelfWalls}>
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
          <div className={style.shelfTrapezoid}></div>
          <div className={style.shelfBase}></div>
        </div>
      </div>
    </main>
  );
}

export default SportsOfFame;
