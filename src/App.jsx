import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Header from './components/header.jsx'  
import Mood from './pages/mood.jsx'

export default function App() {
  return (
    <BrowserRouter>
    <Header />
      <Routes>
        <Route path="/mood" element={<Mood />} />
      </Routes>
    </BrowserRouter>
  )
}
