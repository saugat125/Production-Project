import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from '../Pages/home';
import Contact from '../Pages/contact';
import Prediction from '../Pages/prediction';
import Doctors from '../Pages/doctors';
import Appointment from '../Pages/appointment';
import Login from '../Pages/login';
import Signup from '../Pages/signup';
import PatientProfle from '../Pages/patient-profile';
import MedicalHistory from '../Pages/medical-history';
import AppointmentHistory from '../Pages/appoint-history';
import ProtectedRoute from './ProtectedRoute';

const Router=()=> {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/doctors" element={<Doctors />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        <Route element={<ProtectedRoute />}>
          <Route path="/prediction" element={<Prediction />} />
          <Route path="/patient-profile" element={<PatientProfle />} />
          <Route path="/medical-history" element={<MedicalHistory />} />
          <Route path="/appoint-history" element={<AppointmentHistory />} />
          <Route path="/appointment" element={<Appointment />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
