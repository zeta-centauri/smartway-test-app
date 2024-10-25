import "./NotFound.css";
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="not-found">
      <h1 className="not-found__title">Кажется здесь ничего нет...</h1>
      <Link to="/" className="not-found__link">На главную</Link>
    </div>
  );
}
