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

import Addashboard from './admin/Addashboard'
import AdSignin from './admin/AdSignin'
import AdSignup from './admin/AdSignup'
import StudentTable from "./admin/StudentTable";
import OwnerTable from "./admin/OwnerTable";
import BoardingTable from "./admin/BoardingTable";
import Adprofile from "./admin/Adprofile";
import Adchangepassword from "./admin/Adchangepassword";
import Adeditprofile from "./admin/Adeditprofile";
import Adnotify from "./admin/Adnotify";
import AdminInfo from "./admin/AdminTable";

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
          <Route path='/profile' element={<Profile/>} />
          <Route path='/UpdateProfile' element={<UpdateProfile/>} />
          <Route path="/*" element={<NotFoundPage />} />
          <Route path="/NewPasswordChange" element={<NewPasswordChange/>} />

          <Route path="/admin/login" element={<AdSignin/>} />
          <Route path="/admin/signup/:id" element={<AdSignup/>} />
          <Route path="/admin/home/:id" element={<Addashboard/>} />
          <Route path="/admin/students/:id" element={<StudentTable/>} />
          <Route path="/admin/owners/:id" element={<OwnerTable/>} />
          <Route path="/admin/boardings/:id" element={<BoardingTable/>} />
          <Route path="/admin/profile/:id" element={<Adprofile/>} />
          <Route path="/admin/changepassword" element={<Adchangepassword/>} />
          <Route path="/admin/editprofile/:id" element={<Adeditprofile/>} />
          <Route path="/admin/notify/:id" element={<Adnotify/>} />
          <Route path="/admin/info/:id" element={<AdminInfo/>} />
          
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
