import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Header from './components/header.jsx'  
import Mood from './pages/mood.jsx'
import Medications from './pages/medications.jsx'
import Journal from './pages/journal.jsx'
import Footer  from './components/footer.jsx'
import { AuthProvider } from './context/AuthContext.jsx'

export default function App() {
  return (
    <BrowserRouter>
    <AuthProvider>
    <Header />
      <Routes>
        <Route path="/mood" element={<Mood />} />
        <Route path="/medications" element={<Medications />} />
        <Route path="/journal" element={<Journal />} />
      </Routes>
       <Footer/>
      </AuthProvider>
    </BrowserRouter>
  )
}
