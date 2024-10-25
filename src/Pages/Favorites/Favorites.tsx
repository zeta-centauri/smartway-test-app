import "./Favorites.css";
import { observer } from "mobx-react-lite";
import Repositories from "../../components/Repositories/Repositories";
import sortStore from "../../stores/sort-store";
import favoritesStore from "../../stores/favorites-store";
import { Link } from "react-router-dom";

const Favorites = observer(() => {
  const sortProperty = sortStore.sortProperty;
  const count = favoritesStore.count;

  return (
    <main className="main favorites">
      <div className="favorites__container container">
        <Link to="/" className="back-link">
          <img src="svg/arrow-left.svg" alt="go back" />
          Back
        </Link>
        <Repositories count={count} title="Favorites" data={favoritesStore.getRepositories(sortProperty)} />
      </div>
    </main>
  );
});

export default Favorites;
