import { observer } from "mobx-react-lite";
import "./RepositoryDetails.css";
import { Repository } from "../../types";
import LikeButton from "../LikeButton/LikeButton";
import CopyButton from "../CopyButton/CopyButton";

function formatDate(dateString: string) {
  const date = new Date(dateString);
  return date.toLocaleDateString("ru-RU", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
}

const RepositoryDetails = observer(({ ...repo }: Repository) => {
  return (
    <div className="details-card">
      <h1 className="details__title">Профиль</h1>
      <div className="details__info">
        <a target="_blank" href={repo.owner.html_url} className="details__img-link">
          <img src={repo.owner.avatar_url} alt="owner avatar" />
        </a>
        <div className="info__text">
          <a target="_blank" href={repo.html_url} className="info__full-name">
            {repo.full_name}
          </a>
          <p className="info__description">{repo.description ?? "Описание отсутствует"}</p>
        </div>
      </div>

      <div className="repository__showcase">
        <div className="showcase-block">
          <div className="showcase__img">
            <img src={`${import.meta.env.BASE_URL}svg/star.svg`} alt="" />
          </div>
          <div className="showcase__text">
            <h3 className="showcase__title">{repo.stargazers_count}</h3>
            <p className="showcase__subtitle">Количество звезд</p>
          </div>
        </div>

        <div className="showcase-block">
          <div className="showcase__img">
            <img src={`${import.meta.env.BASE_URL}svg/git-branch.svg`} alt="" />
          </div>
          <div className="showcase__text">
            <h3 className="showcase__title">{repo.forks_count}</h3>
            <p className="showcase__subtitle">Количество форков</p>
          </div>
        </div>

        <div className="showcase-block">
          <div className="showcase__img">
            <img src={`${import.meta.env.BASE_URL}svg/archive.svg`} alt="" />
          </div>
          <div className="showcase__text">
            <h3 className="showcase__title">{repo.archived ? "Да" : "Нет"}</h3>
            <p className="showcase__subtitle">В архиве</p>
          </div>
        </div>

        <div className="showcase-block">
          <div className="showcase__img">
            <img src={`${import.meta.env.BASE_URL}svg/terminal.svg`} alt="" />
          </div>
          <div className="showcase__text">
            <h3 className="showcase__title">{repo.language ?? "Неизвестно"}</h3>
            <p className="showcase__subtitle">Язык</p>
          </div>
        </div>

        <div className="showcase-block">
          <div className="showcase__img">
            <img src={`${import.meta.env.BASE_URL}svg/folder.svg`} alt="" />
          </div>
          <div className="showcase__text">
            <h3 className="showcase__title">{formatDate(repo.created_at)}</h3>
            <p className="showcase__subtitle">Создано</p>
          </div>
        </div>

        <div className="showcase-block">
          <div className="showcase__img">
            <img src={`${import.meta.env.BASE_URL}svg/create.svg`} alt="" />
          </div>
          <div className="showcase__text">
            <h3 className="showcase__title">{formatDate(repo.updated_at)}</h3>
            <p className="showcase__subtitle">Изменено</p>
          </div>
        </div>
      </div>

      <div className="repository__buttons">
        <CopyButton toCopy={repo.html_url} />
        <LikeButton {...repo} />
        <a target="_blank" href={repo.html_url} className="github-link">
          Открыть репозиторий
        </a>
      </div>
    </div>
  );
});

export default RepositoryDetails;
