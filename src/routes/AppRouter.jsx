// src/routes/AppRouter.jsx
import { Routes, Route } from 'react-router-dom';
import Login from '../pages/Login/Login';


function AppRouter() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="*" element={<Login />} />
    </Routes>
  );
}

export default AppRouter;
