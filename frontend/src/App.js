//import logo from './logo.svg';
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Home from './pages/Home.js'
import Report from './pages/Report.js'
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
          <Route path="/report" element={<Report />} /> 
        </Routes>
      </div>

      </BrowserRouter>
    
   
    </div>
  );
}

export default App;
