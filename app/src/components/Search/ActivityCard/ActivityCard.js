import style from "./activityCard.module.css";
import { BsFillLightningChargeFill, BsPinMapFill } from "react-icons/bs";

function ActivityCard(props) {
  const itemData = props.itemData;
  const itemKey = props.key;

  return (
    <div key={itemKey} className={style.resultCard}>
      <div className={style.imageContainer}>
        <img src={itemData.thumbnailUrl} id={style.thumbnailImage} />
      </div>
      <div className={style.activityInfo}>
        <h2 id={style.cardHeader}>
          {itemData.type.charAt(0).toUpperCase() +
            itemData.type.substr(1).toLowerCase()}
        </h2>
        <p>
          <span className={style.boldText}>Created By:</span>{" "}
          {itemData.userName}
        </p>
        <p>
          <span className={style.boldText}>Description:</span>{" "}
          {itemData.description}
        </p>
        <p>
          <span className={style.boldText}>Location:</span> Chiling Waterfall
        </p>
        <p>
          <span className={style.boldText}>Date:</span> {itemData.date}
        </p>
        <p>
          <span className={style.boldText}>Time:</span> {itemData.time}{" "}
          {parseInt(itemData.time) < 1200 ? "am" : "pm"}
        </p>
        <div className={style.buttonContainer}>
          <button className={style.actionButton}>
            Join this activity and earn 200
            <BsFillLightningChargeFill />
          </button>
          <button className={style.actionButton}>
            Navigate to the Location <BsPinMapFill />
          </button>
        </div>
      </div>
    </div>
  );
}

export default ActivityCard;
