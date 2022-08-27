import { useNavigate, createSearchParams } from "react-router-dom";
import style from "./locationCard.module.css";

function LocationCard(props) {
  const itemData = props.itemData;
  itemData.sentiment =
    itemData.sentimentPolarity > 0
      ? "Positive"
      : itemData.sentimentPolarity < 0
      ? "Negative"
      : "Neutral";
  const itemKey = props.key;

  const navigate = useNavigate();

  const handleSearch = (event) => {
    event.preventDefault();
    const searchData = {
      locationName: itemData.locationName,
      searchType: "activities",
    };
    navigate({
      pathname: "/search",
      search: createSearchParams(searchData).toString(),
    });
    window.location.reload();
  };

  return (
    <div key={itemKey} className={style.resultCard}>
      <div className={style.imageContainer}>
        <img src={itemData.thumbnailUrl} id={style.thumbnailImage} />
      </div>
      <div className={style.locationInfo}>
        <h2 id={style.cardHeader}>{itemData.locationName}</h2>
        {itemData.activities && (
          <div>
            <p id={style.activityHeader}>Activities:</p>
            <div className={style.keywordContainer}>
              {itemData.activities.map((activity) => (
                <p className={style.keyword} key={activity.id}>
                  {activity}
                </p>
              ))}
            </div>
          </div>
        )}
        <button className={style.actionButton} onClick={handleSearch}>
          View Active Events
        </button>
      </div>
      <div className={style.reviewInfo}>
        {itemData.sentiment && (
          <p className={style.sentiment} id={style.positive}>
            Mostly {itemData.sentiment} Reviews
          </p>
        )}
        {itemData.keywords && (
          <div>
            <p id={style.keywordHeader}>People Often Mention:</p>
            <div className={style.keywordContainer}>
              {itemData.keywords.map((keyword) => (
                <p className={style.keyword} key={keyword.id}>
                  {keyword}
                </p>
              ))}
            </div>
          </div>
        )}
        <button className={style.actionButton}>View Reviews</button>
      </div>
    </div>
  );
}

export default LocationCard;
