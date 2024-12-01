import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import Navbar from './layouts/navbar.jsx'
import Footer from './layouts/footer.jsx'
import { BrowserRouter as Router } from 'react-router-dom'  // Reemplaza Router con BrowserRouter
import { AuthProvider } from './context/authContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <Router>
        <Navbar />
        <App />
        <Footer />
      </Router>
    </AuthProvider>
  </StrictMode>,
)
