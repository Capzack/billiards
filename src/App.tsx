import React from "react";
import Billiards from "./components/billiards";


function App() {
  return (
      <Billiards {...{
        size: {
          width: 550,
          height: 300,
        }
      }}/>
  );
}

export default App;
