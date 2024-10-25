import "./Home.css";
import Search from "../../components/Search/Search";
import Repositories from "../../components/Repositories/Repositories";
import repositoriesStore from "../../stores/repositories-store";
import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import searchStore from "../../stores/search-store";
import sortStore from "../../stores/sort-store";
import Paginate from "../../components/Paginate/Paginate";
import Loading from "../../components/Loading/Loading";

const Home = observer(() => {
  const {
    resetRepositories,
    resetPages,
    getRepositories,
    count,
    error,
    currentPage,
    totalPages,
    isLoading,
    fetchRepositories,
    nextPage,
    prevPage,
  } = repositoriesStore;
  const searchValue = searchStore.searchValue;
  const sortProperty = sortStore.sortProperty;

  useEffect(() => {
    resetPages();
    resetRepositories();
    fetchRepositories(searchValue, sortProperty);
  }, [searchValue, sortProperty, fetchRepositories, resetPages, resetRepositories]);

  const handlePrevPage = () => {
    prevPage(searchValue, sortProperty);
  };
  const handleNextPage = () => {
    nextPage(searchValue, sortProperty);
  };

  return (
    <main className="main search">
      <div className="search__container container">
        <Search />
        {!error ? (
          searchValue ? (
            !isLoading ? (
              <>
                <Repositories title="Result" data={getRepositories} count={count} />
                {totalPages > 1 && (
                  <Paginate
                    onClickPrev={handlePrevPage}
                    onClickNext={handleNextPage}
                    currentPage={currentPage}
                    totalPages={totalPages}
                  />
                )}
              </>
            ) : (
              <Loading />
            )
          ) : (
            <h1>Введите запрос в поисковую строку</h1>
          )
        ) : (
          <h1>{error}</h1>
        )}
      </div>
    </main>
  );
});

export default Home;
