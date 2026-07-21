import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Mood from './pages/mood.jsx'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/mood" element={<Mood />} />
      </Routes>
    </BrowserRouter>
  )
}
