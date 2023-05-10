import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Signin from './Student/Signin'
import Signup from './Student/Signup'
import Home from './Pages/Home'
import OnBoardPage from './OnBoardPage';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<OnBoardPage />} />
          <Route path='/student/login' element={<Signin />} />
          <Route path='/student/signup' element={<Signup />} />
          <Route path='/student/home' element={<Home />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
