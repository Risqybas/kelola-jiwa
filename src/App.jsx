import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Header from './components/header.jsx'  
import Mood from './pages/mood.jsx'
import { AuthProvider } from './context/AuthContext.jsx'

export default function App() {
  return (
    <BrowserRouter>
    <AuthProvider>
    <Header />
      <Routes>
        <Route path="/mood" element={<Mood />} />
      </Routes>
      </AuthProvider>
    </BrowserRouter>
  )
}
