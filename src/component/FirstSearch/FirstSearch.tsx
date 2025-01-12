import React, { ReactElement, useEffect, useState } from "react";
import {
  getShow,
  getUser,
  userRepos,
  usersRepo,
} from "../../features/git/gitSlice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../app/store";
import "./FirstSearch.scss";
import useDebounce from "../../hooks/useDebounce";

export default function FirstSearch(): React.JSX.Element {
  const usersGit = useSelector((state: RootState) => state.gitApi.repo);
  const dispatch = useDispatch();
  const [value, setValue] = useState<string>("");
  //   const [debounceValue, setDebounceValue] = useState<string>("");
  const [loading, setLoading] = useState<{ users: boolean; id: null | number }>(
    {
      users: false,
      id: null,
    }
  );

  const getUsersGit = (search: string) => {
    setLoading({ ...loading, users: true });
    fetch(`https://api.github.com/search/users?q=${search}&per_page=5&page=1`)
      .then((response) => response.json())
      .then((json) => {
        dispatch(usersRepo(json));
        setLoading({ ...loading, users: false });
      })
      .catch((err) => console.log(err));
  };

  const getUserRepo = async (login: string, id: number) => {
    try {
      setLoading({ ...loading, id: id });
      const user = await fetch(`https://api.github.com/users/${login}`);
      const repos = await fetch(`https://api.github.com/users/${login}/repos`);
      const _user = await user.json();
      const _repos = await repos.json();
      dispatch(getUser(_user));
      dispatch(userRepos(_repos));
      dispatch(getShow(true));
      setLoading({ ...loading, id: null });
    } catch (error) {
      console.log(error);
    }
  };

  //   useEffect(() => {
  //     const delayInputValue: ReturnType<typeof setTimeout> = setTimeout(() => {
  //       setDebounceValue(value);
  //     }, 1000);
  //     return () => clearTimeout(delayInputValue);
  //   }, [value]);

  const useValue = useDebounce(value, 2000);
  const showUsers = (arr: Array<any>): Array<ReactElement> =>
    arr.map((user: any) => (
      <div className="FirstSearch-user" key={user.id}>
        <img src={user.avatar_url} alt="user" />
        <div className="FirstSearch-user__btn">
          <span
            className="btn"
            onClick={() => getUserRepo(user.login, user.id)}
          >
            {user.login}
          </span>
          {loading.id === user.id && <div className="animated"></div>}
          <a className="btn" href={user.html_url} target="_blank">
            Repo
          </a>
        </div>
      </div>
    ));

  useEffect(() => {
    if (useValue.length) {
      getUsersGit(useValue);
    }
    if (!useValue.length && usersGit) {
      dispatch(usersRepo([]));
      dispatch(userRepos([]));
      dispatch(getShow(false));
    }
  }, [useValue]);

  return (
    <div className="FirstSearch">
      <div className="FirstSearch-search">
        <h1>Users Github</h1>
        <h2>USERS {usersGit?.items?.length}</h2>
        <input
          type="text"
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
          }}
          placeholder="input repo"
        />
        <p>{useValue}</p>
        {loading.users && <p>...Loading</p>}
      </div>

      {usersGit.items?.length && showUsers(usersGit.items)}
    </div>
  );
}
