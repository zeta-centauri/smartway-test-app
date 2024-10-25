import { makeAutoObservable } from "mobx";

class SearchStore {
  searchValue: string = "";

  constructor() {
    makeAutoObservable(this);
  }
  setSearchValue = (value: string) => {
    this.searchValue = value;
  };
}

export default new SearchStore();
