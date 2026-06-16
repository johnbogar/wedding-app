import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import api from '../api/axiosConfig'

function ForgotPassword() {

    const navigate = useNavigate()

    const [email, setEmail] = useState('')

    const [errorMessage, setErrorMessage] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            const response = await api.post('/auth/forgot-password', {
                email: email,
            })
            console.log('Success:', response.data)
            navigate('/verify-code', { state: { email: email } })
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
            <Link to="/">Back to login</Link>
            <h1>Boda Social</h1>
            <h2>Forgot password?</h2>
            <h4>Enter your email to receive a temporary verification code</h4>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Email</label>
                    <input 
                    type="email" 
                    required
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
                />
                </div>
            {errorMessage && <p>{errorMessage}</p>}
            <button type="submit">Get code</button>
            </form>
            <label>Successful requests reroute here </label>
            <Link to="/verify-code">Success</Link>
        </div>
    )
}

export default ForgotPassword