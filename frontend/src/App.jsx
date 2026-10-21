import { Routes, Route } from 'react-router-dom'
import CarForm from './components/CarForm'
import Prediction from './pages/Prediction'

function App() {
  return (
    <div
      className="min-h-screen bg-cover bg-center flex items-center justify-center p-4"
      style={{
        backgroundImage:
          "linear-gradient(rgba(0,0,0,0.45), rgba(0,0,0,0.45)), url('https://images.unsplash.com/photo-1535448580089-c7f9490c78b1?q=80&w=1621&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D')",
      }}
    >
      <Routes>
        <Route path="/" element={<CarForm />} />
        <Route path="/predict" element={<Prediction />} />
      </Routes>
    </div>
  )
}

export default App