import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Header from './components/header.jsx'  
import Mood from './pages/mood.jsx'
import Footer  from './components/footer.jsx'
import { AuthProvider } from './context/AuthContext.jsx'

export default function App() {
  return (
    <BrowserRouter>
    <AuthProvider>
    <Header />
      <Routes>
        <Route path="/mood" element={<Mood />} />
      </Routes>
       <Footer/>
      </AuthProvider>
    </BrowserRouter>
  )
}
