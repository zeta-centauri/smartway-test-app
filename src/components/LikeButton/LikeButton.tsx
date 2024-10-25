import { observer } from "mobx-react-lite";
import favoritesStore from "../../stores/favorites-store";
import { Repository } from "../../types";
import "./LikeButton.css";

const LikeButton = observer((repo: Repository) => {
  const { getRepository, removeRepository, addRepository } = favoritesStore;

  const handleClick = () => {
    if (getRepository(repo.id)) {
      removeRepository(repo.id);
    } else {
      addRepository(repo.id, repo);
    }
  };
  return (
    <button className="like-button card__button" onClick={handleClick}>
      <img src={`${import.meta.env.BASE_URL}svg/heart${getRepository(repo.id) ? "-red" : ""}.svg`} alt="" />
    </button>
  );
});

export default LikeButton;
