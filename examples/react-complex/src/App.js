import React from "react";

import image from "./assets/Macaca_nigra_self-portrait_large.jpg";
import rotatedImage from "./assets/Macaca_nigra_self-portrait_large.jpg?rotate";

function App() {
  return (
    <div>
      <img src={image} />
      <img src={rotatedImage} />
    </div>
  );
}

export default App;
