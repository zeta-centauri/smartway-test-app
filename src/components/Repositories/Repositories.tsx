import { observer } from "mobx-react-lite";
import { Repository } from "../../types";
import RepositoryCard from "../RepositoryCard/RepositoryCard";
import "./Repositories.css";
import Sort from "../Sort/Sort";

interface RepositoriesProps {
  title: string;
  data: Repository[];
  count: number;
  isLoading?: boolean;
}

const Repositories = observer(({ title, data, count }: RepositoriesProps) => {
  return (
    <>
      <section className="repositories">
        <header className="repositories__header">
          <h3 className="repositories__title">
            {title}: {count} repositories
          </h3>
          <Sort />
        </header>
        <div className="repositories__wrapper">
          {data.map((repo) => (
            <RepositoryCard key={repo.id} {...repo} />
          ))}
        </div>
      </section>
    </>
  );
});

export default Repositories;
