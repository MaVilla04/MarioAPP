import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './index.css';
import Home from './pages/home';
import InitPage from './pages/Init';
import PrivateRoute from './layouts/privateRoute';
import { AuthProvider } from './context/authContext';


function App() {
  return (

    <Routes>
      {/* Página pública */}
      <Route path="/" element={<InitPage />} />

      {/* Ruta privada protegida */}
      <Route
        path="/cards"
        element={
          <PrivateRoute>
            <Home />
          </PrivateRoute>
        }
      />
    </Routes>

  );
}

export default App;
