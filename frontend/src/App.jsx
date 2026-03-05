import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import './App.css'
import Landing from './pages/Landing'
import Authentication from './pages/Authentication'
import { AuthProvider } from './contexts/AuthContext'
import VideoMeet from './pages/VideoMeet'

function App() {
  

  return (
   <>
   <Router>

    <AuthProvider>

    <Routes>

    
    <Route path='/' element={<Landing />}/>

    <Route path='/auth' element={<Authentication/>}/>

    <Route path='/:url' element={<VideoMeet/>} />

    </Routes>

    </AuthProvider>

   </Router>
   </>
  )
}

export default App
