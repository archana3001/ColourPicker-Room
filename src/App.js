import React, { useState } from "react";
import ColourPicker from "./Components/ColourPicker";
import Test1 from "./Components/Test1";
import "./index.css";

// export const ColourContext = React.createContext();

function App() {
  // const [colstate, setColstate] = useState({
  //   current: null,
  //   ceil: "#000",
  //   wall: "#ddd",
  // });

  return (
    <div className="wrapper">
      {/* <Test1 /> */}
      <ColourPicker />
    </div>
  );
}

export default App;
