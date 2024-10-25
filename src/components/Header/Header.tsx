import { Link } from "react-router-dom";
import favoritesStore from "../../stores/favorites-store";
import "./Header.css";
import { observer } from "mobx-react-lite";

const Header = observer(() => {
  const favoritesCount = favoritesStore.count;
  return (
    <header className="header">
      <div className="header__container container">
        <Link to="/" className="header__logo">
          <img src="svg/logo.svg" alt="" />
        </Link>
        <Link to="/favorites" className="favorites-link">
          <img src="svg/heart_simple.svg" alt="" />
          <div className="counter">
            <span>{favoritesCount}</span>
          </div>
        </Link>
        <a href="#" className="profile-link">
          <div className="inner">
            <img src="svg/account.svg" alt="" />
          </div>
        </a>
      </div>
    </header>
  );
});
export default Header;
