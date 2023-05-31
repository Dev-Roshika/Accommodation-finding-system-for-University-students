import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Signin from './Student/Signin'
import Signup from './Student/Signup'
import Home from './Pages/Home'
import OnBoardPage from './OnBoardPage';
import BoardingHouses from './Pages/BoardingHouses';
import Footer from './Components/Footer';
import PostAd from './Owner/PostAd';
import CompletePostAd from './Owner/CompletePostAd';
import Profile from './Pages/Profile';
import UpdateProfile from './Pages/UpdateProfile';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<OnBoardPage />} />
          <Route path='/student/login' element={<Signin />} />
          <Route path='/student/signup' element={<Signup />} />
          <Route path='/home' element={<Home />} />
          <Route path='/boarding-houses' element={<BoardingHouses />} />
          <Route path='/owner/post-ad' element={<PostAd />} />
          <Route path='/owner/post-ad/success/:id' element={<CompletePostAd />} />
          <Route path='/profile' element={<Profile/>} />
          <Route path='/UpdateProfile' element={<UpdateProfile/>} />
        </Routes>
      </BrowserRouter>
      <Footer />
    </div>
  );
}

export default App;
