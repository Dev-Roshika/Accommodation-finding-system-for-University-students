import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Signin from './Student/Signin'
import Signup from './Student/Signup'
import OwnerSignin from './Owner/Signin'
import OwnerSignup from './Owner/Signup'
import Home from './Pages/Home'
import OnBoardPage from './OnBoardPage';
import BoardingHouses from './Pages/BoardingHouses';
import Footer from './Components/Footer';
import PostAd from './Owner/PostAd';
import CompletePostAd from './Owner/CompletePostAd';
import NotFoundPage from './Pages/NotFoundPage';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<OnBoardPage />} />
          <Route path='/student/login' element={<Signin />} />
          <Route path='/student/signup' element={<Signup />} />
          <Route path='/home' element={<Home />} />
          <Route path='/boarding-houses/:id' element={<BoardingHouses />} />
          <Route path='/owner/login' element={<OwnerSignin />} />
          <Route path='/owner/signup' element={<OwnerSignup />} />
          <Route path='/owner/post-ad' element={<PostAd />} />
          <Route path='/owner/post-ad/success/:id' element={<CompletePostAd />} />
          <Route path="/*" element={<NotFoundPage />} />
        </Routes>
      </BrowserRouter>
      <Footer />
    </div>
  );
}

export default App;
