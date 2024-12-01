import React from "react";
import FirstSearch from "./component/FirstSearch/FirstSearch";
import SecondSearch from "./component/SecondSearch/SecondSearch";
import { useSelector } from "react-redux";
import { RootState } from "../app/store";

function App():React.JSX.Element {
  const{show}=useSelector((state:RootState) =>state.gitApi)
  return <div className="App">
  <FirstSearch/>
 {show &&  <SecondSearch/>}
  </div>;
}

export default App;
