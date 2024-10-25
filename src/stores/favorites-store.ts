import { makeAutoObservable } from "mobx";
import { ID, Repository, SortProperty } from "../types";

class FavoritesStore {
  repositories: Record<ID, Repository> = {};

  constructor() {
    makeAutoObservable(this);
    this.loadFromLocalStorage();
  }

  get count() {
    return Object.keys(this.repositories).length;
  }

  getRepositories = (sortProperty: SortProperty) => {
    return Object.values(this.repositories).sort((a, b) => {
      switch (sortProperty) {
        case "stars":
          return b.stargazers_count - a.stargazers_count;
        case "forks":
          return b.forks_count - a.forks_count;
        case "updated":
          return new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime();
        default:
          return 0;
      }
    });
  };

  addRepository = (id: ID, repo: Repository) => {
    this.repositories[id] = repo;
    this.saveToLocalStorage();
  };

  removeRepository = (id: ID) => {
    delete this.repositories[id];
    this.saveToLocalStorage();
  };

  getRepository = (id: ID) => {
    return this.repositories[id];
  };

  saveToLocalStorage = () => {
    const serializedData = JSON.stringify(this.repositories);
    localStorage.setItem("favorites", serializedData);
  };

  loadFromLocalStorage = () => {
    const storedData = localStorage.getItem("favorites");
    if (storedData) {
      this.repositories = JSON.parse(storedData);
    }
  };
}

export default new FavoritesStore();
