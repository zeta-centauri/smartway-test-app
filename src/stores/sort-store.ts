import { makeAutoObservable } from "mobx";
import { SortProperty } from "../types";

class SortStore {
  sortProperty: SortProperty = "stars";

  constructor() {
    makeAutoObservable(this);
  }

  setSortProperty = (property: SortProperty) => {
    this.sortProperty = property;
  };
}
export default new SortStore();
