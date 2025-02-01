import { Router } from "express";


//pages & components

import Home from "./pages/Home"

function App() {
  return (
    <div className="App">
     <BrowserRouter>
     <div> className = "pages</div>
     <Routes>
      <Route

      path = "/"
      element = {  <Home />}
      
      />


     </Routes>
     </BrowserRouter>
    </div>
  );
}

export default App;
