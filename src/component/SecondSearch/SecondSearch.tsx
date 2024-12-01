import React, { useState } from "react";
import "./SecondSearch.scss";
import { useSelector } from "react-redux";
import { RootState } from "../../../app/store";

export default function SecondSearch(): React.JSX.Element {
  const [search, setSearch] = useState<string>("");
  const { user, repos } = useSelector((state: RootState) => state.gitApi);

  const showRepos = () => {
    if (search === "") {
      return;
    }
    const reposUser: Array<any> = repos.filter((elem: any) =>
      elem.name.includes(search)
    );
    return reposUser.map((elem) => (
      <div className="SecondSearch-repo" key={elem.id}>
        <a href={elem.html_url} target="_blank">
          {elem.name}
        </a>
        <ul>
          <li>language:{elem.language}</li>
          <li>created:{elem.created_at}</li>
          <li>watchers:{elem.watchers}</li>
        </ul>
      </div>
    ));
  };

  return (
    <div className="SecondSearch">
      <div className="SecondSearch-wrap">
        <div className="SecondSearch-user">
          <img src={user.avatar_url} alt="" />
          <ul>
            <li>User name: {user.name}</li>
            <li>Login: {user.login}</li>
            <li>Email: {user.email}</li>
            <li>Location: {user.location}</li>
            <li>followers: {user.followers}</li>
            <li>following: {user.following}</li>
            <li>created: {user.created_at}</li>
            <li>updated: {user.updated_at}</li>
          </ul>
        </div>
        <div className="SecondSearch-search">
          <h3>REPOS</h3>
          <input
            type="text"
            value={search}
            placeholder="input repo"
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      {repos.length > 0 && showRepos()}
    </div>
  );
}
