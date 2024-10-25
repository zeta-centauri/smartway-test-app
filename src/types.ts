export type Repository = {
  id: number;
  name: string;
  full_name: string;
  owner: RepositoryOwner;
  html_url: string;
  description: string;
  created_at: string;
  updated_at: string;
  stargazers_count: number;
  language: string;
  forks_count: number;
  archived: boolean;
};

export type RepositoryOwner = {
  login: string;
  avatar_url: string;
  html_url: string;
};
export type ID = number;

export type SortProperty = "stars" | "forks" | "updated";
