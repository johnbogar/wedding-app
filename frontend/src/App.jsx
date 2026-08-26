import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from './pages/Login'
import CreateAccount from './pages/CreateAccount'
import ForgotPassword from './pages/ForgotPassword'
import VerifyCode from './pages/VerifyCode'
import ResetPassword from './pages/ResetPassword'
import Home from './pages/Home'
import ProtectedRoute from './components/ProtectedRoute'
import Rsvp from './pages/Rsvp'
import PostPhoto from './pages/PostPhoto'
import PostActivity from './pages/PostActivity'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/create-account" element={<CreateAccount />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/verify-code" element={<VerifyCode />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/home" element={
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        } />
        <Route path="/rsvp" element={
          <ProtectedRoute>
            <Rsvp /> 
          </ProtectedRoute>
        } />
        <Route path="/post-photo" element={
          <ProtectedRoute>
            <PostPhoto />
          </ProtectedRoute>
        } />
        <Route path="/post-activity" element={
          <ProtectedRoute>
            <PostActivity />
          </ProtectedRoute>
        } />
      </Routes>
    </BrowserRouter>
  )
}

export default App