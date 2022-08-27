import { FiPenTool } from "react-icons/fi";
import { AiFillHome, AiFillTrophy } from "react-icons/ai";
import { NavLink } from "react-router-dom";
import styles from "./sidenav.module.css";

function SideNav() {
  return (
    <div className={styles.sidenav}>
      <NavLink
        to="/"
        className={({ isActive }) =>
          isActive ? `${styles.linkItem} ${styles.activeLink}` : styles.linkItem
        }>
        <AiFillHome className={styles.navIcon} />
      </NavLink>
      <NavLink
        to="/create-activity"
        className={({ isActive }) =>
          isActive ? `${styles.linkItem} ${styles.activeLink}` : styles.linkItem
        }>
        <FiPenTool className={styles.navIcon} />
      </NavLink>
      <NavLink
        to="/sports-of-fame"
        className={({ isActive }) =>
          isActive ? `${styles.linkItem} ${styles.activeLink}` : styles.linkItem
        }>
        <AiFillTrophy className={styles.navIcon} />
      </NavLink>
    </div>
  );
}

export default SideNav;
