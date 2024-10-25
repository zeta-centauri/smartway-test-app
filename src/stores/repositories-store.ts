import { makeAutoObservable, runInAction } from "mobx";
import { Repository, SortProperty } from "../types";

class RepositoriesStore {
  repositories = new Map<number, Repository[]>();

  error: string | null = null;
  isLoading = false;

  count = 0;
  currentPage = 1;
  perPage = 12;
  totalPages = 0;

  get getRepositories(): Repository[] {
    return this.repositories.get(this.currentPage) ?? ([] as Repository[]);
  }

  get getSuggestions() {
    const mapa = new Set<string>((this.repositories.get(1) ?? []).map((repo) => repo.name));
    return Array.from(mapa).slice(0, 5);
  }

  constructor() {
    makeAutoObservable(this);
  }

  fetchRepositories = async (query: string, sortProperty: SortProperty) => {
    if (!this.repositories.get(this.currentPage)) {
      this.isLoading = true;
      this.error = null;
      if (query.length == 0) {
        this.repositories = new Map<number, Repository[]>();
        this.count = 0;
      } else {
        try {
          const response = await fetch(
            `https://api.github.com/search/repositories?q=${query}+in:name&sort=${sortProperty}&page=${this.currentPage}&per_page=${this.perPage} `
          );
          if (response.ok) {
            const data = await response.json();
            runInAction(() => {
              this.repositories.set(this.currentPage, data.items);
              this.count = data.total_count;
              this.totalPages = Math.ceil(data.total_count / this.perPage);
            });
          } else {
            if (response.status === 403) {
              const rateLimitRemaining = response.headers.get("X-RateLimit-Remaining");
              if (rateLimitRemaining === "0") {
                throw new Error("Превышен лимит запросов к API. Попробуйте позже.");
              }
            } else {
              throw new Error(`Ошибка при получении данных: ${response.statusText}`);
            }
          }
        } catch (error) {
          if (error instanceof Error) {
            runInAction(() => {
              this.error = error.message;
            });
          }
        } finally {
          runInAction(() => {
            this.isLoading = false;
          });
        }
      }
    }
  };

  prevPage = (searchValue: string, sortProperty: SortProperty) => {
    this.currentPage--;
    this.fetchRepositories(searchValue, sortProperty);
  };
  nextPage = (searchValue: string, sortProperty: SortProperty) => {
    this.currentPage++;
    this.fetchRepositories(searchValue, sortProperty);
  };

  resetPages = () => {
    this.currentPage = 1;
    this.totalPages = 0;
  };
  resetRepositories = () => {
    this.repositories = new Map<number, Repository[]>();
  };
}

export default new RepositoriesStore();
