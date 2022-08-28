import { useState } from "react";
import styles from "./navbar.module.css";
import { BsFillLightningChargeFill } from "react-icons/bs";
import { HiOutlineMenu } from "react-icons/hi";
import { RiCloseCircleLine } from "react-icons/ri";
import { NavLink } from "react-router-dom";

function Navbar() {
  const [sidebarVisible, setSidebarVisible] = useState(false);

  return (
    <nav className={styles.navContainer}>
      <h1 className={styles.logo}>
        Fit<span id={styles.logoHighlight}>nity</span>
      </h1>
      <div className={styles.pointContainer}>
        <BsFillLightningChargeFill id={styles.pointIcon} />
        <p>12345</p>
      </div>
      <button
        className={styles.toggleButton}
        onClick={() => {
          setSidebarVisible(!sidebarVisible);
        }}
        id={styles.navToggle}>
        <HiOutlineMenu />
      </button>
      <div className={styles.sidebarWrapper}>
        <div
          className={
            sidebarVisible
              ? styles.sidebar
              : `${styles.sidebar} ${styles.hidden}`
          }>
          <button
            className={styles.toggleButton}
            onClick={() => {
              setSidebarVisible(!sidebarVisible);
            }}
            id={styles.sidebarToggle}>
            <RiCloseCircleLine />
          </button>
          <ul className={styles.sidebarLinks}>
            <li>
              <NavLink
                to="/"
                className={({ isActive }) =>
                  isActive
                    ? `${styles.linkItem} ${styles.activeLink}`
                    : styles.linkItem
                }>
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/create-activity"
                className={({ isActive }) =>
                  isActive
                    ? `${styles.linkItem} ${styles.activeLink}`
                    : styles.linkItem
                }>
                Create an Activity
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/sports-of-fame"
                className={({ isActive }) =>
                  isActive
                    ? `${styles.linkItem} ${styles.activeLink}`
                    : styles.linkItem
                }>
                Sports of Fame
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
