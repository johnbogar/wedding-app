import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useState } from 'react'
import api from '../api/axiosConfig'

function Login() {
    const navigate = useNavigate()

    const location = useLocation()
    const successMessage = location.state?.message

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const [errorMessage, setErrorMessage] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            const response = await api.post('/auth/login', {
                email: email,
                password: password,
            })
            console.log('Success:', response.data)
            localStorage.setItem('access_token', response.data.access_token)
            navigate('/home')
        } catch (error) {
            if (error.response) {
                setErrorMessage(error.response.data.detail)
            }  else {
                setErrorMessage('Network error. Please try again.')
            }
        }
    }
    
    return (
        <div>
            <h1>Boda Social</h1>
            <h2>Get ready for the big day!</h2>
            {successMessage && <p>{successMessage}</p>}
            <form onSubmit={handleSubmit}>
            <div>
                <label>Email</label>
                <input 
                type="email" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
            />
            </div>
            <div>
                <label>Password</label>
                <input 
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            </div>
            {errorMessage && <p>{errorMessage}</p>}
            <button type="submit">Sign In</button>
            </form>
            <Link to="/create-account">No account? Create one</Link>
            <br />
            <Link to="/forgot-password">Forgot password?</Link>
            <br />
            <label>Successful logins reroute here </label>
            <br />
            <Link to="/home">Success</Link>
        </div>
  )
}

export default Login