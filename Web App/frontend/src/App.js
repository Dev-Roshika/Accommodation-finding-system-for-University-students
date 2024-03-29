import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Signin from './Student/Signin'
import Signup from './Student/Signup'
import OwnerSignin from './Owner/Signin'
import OwnerSignup from './Owner/Signup'
import Home from './Pages/Home'
import OnBoardPage from './OnBoardPage';
import BoardingHouses from './Pages/BoardingHouses';
import PostAd from './Owner/PostAd';
import CompletePostAd from './Owner/CompletePostAd';
import Profile from './Pages/Profile';
import UpdateProfile from './Pages/UpdateProfile';
import NotFoundPage from './Pages/NotFoundPage';
import OwnerDashboard from './Owner/OwnerDashboard';
import EditBoarding from './Owner/Crud/EditBoarding';
import NewPasswordChange from './Pages/NewPasswordChange';
import CompleteUpdatePostAd from './Owner/Crud/CompleteUpdatePostAd';
import AdminSignin from  './Admin/Signin';
import AdminSignup from  './Admin/Signup';

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
          <Route path='/owner/dashboard' element={<OwnerDashboard />} />
          <Route path='/edit-boarding-house/:id' element={<EditBoarding />} />
          <Route path='/owner/post-ad' element={<PostAd />} />
          <Route path='/owner/post-ad/success/:id' element={<CompletePostAd />} />
          <Route path='/owner/post-ad-update/success/:id' element={<CompleteUpdatePostAd />} />
                        
          <Route path='/profile' element={<Profile/>} />
          <Route path='/UpdateProfile' element={<UpdateProfile/>} />
          <Route path='/admin/login' element={<AdminSignin />} />
          <Route path='/admin/signup' element={<AdminSignup />} />
          <Route path="/*" element={<NotFoundPage />} />
          <Route path="/NewPasswordChange" element={<NewPasswordChange/>} />
          
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
