import logo from './logo.svg';
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Home from './pages/Home.js'

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <div className = "pages">

        <Routes>
          <Route
          path = "/"
          element= {<Home />}
          />

        </Routes>
      </div>

      </BrowserRouter>
    
   
    </div>
  );
}

export default App;
