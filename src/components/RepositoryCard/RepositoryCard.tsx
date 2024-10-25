import { Repository } from "../../types";
import "./RepositoryCard.css";
import { observer } from "mobx-react-lite";
import { Link } from "react-router-dom";
import CopyButton from "../CopyButton/CopyButton";
import LikeButton from "../LikeButton/LikeButton";

const RepositoryCard = observer(({ ...repo }: Repository) => {
  return (
    <div className="repository-card">
      <div className="card__info">
        <header className="card__header">
          <a className="card__avatar" href={repo.owner.html_url} target="_blank">
            <img src={repo.owner.avatar_url} alt="" className="card__image" />
          </a>

          <div className="card-achievments">
            <div className="stars card__stat-block">
              <img src="svg/star.svg" alt="" />
              <span>{repo.stargazers_count}</span>
            </div>
            <div className="forks card__stat-block">
              <img src="svg/git-branch.svg" alt="" />
              <span>{repo.forks_count}</span>
            </div>
          </div>
        </header>

        <div className="card__links">
          <a href={repo.owner.html_url} target="_blank" className="card__owner-link">
            @{repo.owner.login}
          </a>
          <a href={repo.html_url} target="_blank" className="card__repo-link">
            {repo.full_name}
          </a>
        </div>
      </div>

      <div className="card__buttons">
        <LikeButton {...repo} />
        <CopyButton toCopy={repo.html_url} />
        <Link
          to={{
            pathname: `/repository/${repo.owner.login}/${repo.name}`,
          }}
          className="details-link"
        >
          Подробнее
        </Link>
      </div>
    </div>
  );
});

export default RepositoryCard;
