import { BrowserRouter, Routes, Route } from 'react-router-dom'
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
import Addashboard from './admin/Addashboard.js'
import Adlogin from './admin/Adlogin'
import Adsignup from './admin/Adsignup'
import Loginoption from './admin/Loginoption'
import Studetails from "./admin/Studetails";
import Owndetails from "./admin/Owndetails";
import Accdetails from "./admin/Accdetails";
import Adprofile from "./admin/Adprofile";
import Adsetting from "./admin/Adsetting";
import Adeditprofile from "./admin/Adeditprofile";

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
          <Route path='/profile' element={<Profile />} />
          <Route path='/UpdateProfile' element={<UpdateProfile />} />
          <Route path="/*" element={<NotFoundPage />} />
          <Route path="/NewPasswordChange" element={<NewPasswordChange />} />

          <Route path="admin/login" element={<Adlogin />} />
          <Route path="/admin/signup" element={<Adsignup />} />
          <Route path="/admin/option" element={<Loginoption />} />
          <Route path="/admin/home" element={<Addashboard />} />
          <Route path="/admin/student" element={<Studetails />} />
          <Route path="/admin/owner" element={<Owndetails />} />
          <Route path="/admin/accom" element={<Accdetails />} />
          <Route path="/admin/profile" element={<Adprofile />} />
          <Route path="/admin/setting" element={<Adsetting />} />
          <Route path="/admin/editprofile" element={<Adeditprofile />} />


        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;