import './App.css';
import './global.css';
import {HashRouter, Routes, Route} from 'react-router-dom'
import Home from './Pages/home'
import Contact from './Pages/contact'
import Prediction from './Pages/prediction';
import Doctors from './Pages/doctors'
import Appointment from './Pages/appointment';
import Login from './Pages/login';
import Signup from './Pages/signup';
import PatientProfle from './Pages/patient-profile';
import MedicalHistory from './Pages/medical-history';
import AppointmentHistory from './Pages/appoint-history';

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/contact" element={<Contact/>}/>
        <Route path="/prediction" element={<Prediction/>}/>
        <Route path="/doctors" element={<Doctors/>}/>
        <Route path="/appointment" element={<Appointment/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/signup" element={<Signup/>}/>
        <Route path="/patient-profile" element={<PatientProfle/>}/>
        <Route path="/medical-history" element={<MedicalHistory/>}/>
        <Route path="/appoint-history" element={<AppointmentHistory/>}/>
      </Routes>
    </HashRouter>
  );
}

export default App;
