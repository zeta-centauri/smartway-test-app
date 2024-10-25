import { observer } from "mobx-react-lite";
import { useCallback, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import RepositoryDetails from "../../components/RepositoryDetails/RepositoryDetails";
import { Repository } from "../../types";
import Loading from "../../components/Loading/Loading";
import "./Repository.css";

const RepositoryPage = observer(() => {
  const { owner, repo } = useParams();
  const [repository, setRepository] = useState<Repository | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchRepository = useCallback(async () => {
    setIsLoading(true);
    setError("");
    try {
      const response = await fetch(`https://api.github.com/repos/${owner}/${repo}`);
      if (response.ok) {
        const data: Repository = await response.json();
        setRepository(data);
      } else {
        if (response.status == 404) {
          throw new Error("Репозиторий не найден");
        } else {
          throw new Error(`Ошибка при получении данных, попробуйте снова`);
        }
      }
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      }
    } finally {
      setIsLoading(false);
    }
  }, [owner, repo]);

  useEffect(() => {
    fetchRepository();
  }, [fetchRepository]);

  return (
    <div className="repository-container container">
      <Link to="/" className="back-link">
        <img src={`${import.meta.env.BASE_URL}/svg/arrow-left.svg`} alt="go back" />
        Home
      </Link>
      {isLoading ? (
        <Loading />
      ) : repository ? (
        <RepositoryDetails {...repository} />
      ) : (
        <div>{error && <div className="">{error}</div>}</div>
      )}
    </div>
  );
});

export default RepositoryPage;
