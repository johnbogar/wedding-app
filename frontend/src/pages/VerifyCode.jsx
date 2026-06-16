import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useState } from 'react'
import api from '../api/axiosConfig'

function VerifyCode() {
    const navigate = useNavigate()

    const location = useLocation()
    const email = location.state?.email
    const [verificationCode, setVerificationCode] = useState('')

    const [errorMessage, setErrorMessage] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            const response = await api.post('/auth/verify-code', {
                verification_code: verificationCode,
                email: email,
            })
            console.log('Success:', response.data)
            navigate('/reset-password', { state: { resetToken: response.data.access_token } })
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
            <Link to="/forgot-password">Back to forgot password</Link>
            <h1>Boda Social</h1>
            <p>A code was sent to your email if an account exists.</p>
            <form onSubmit={handleSubmit}>
                <div>
                    <h2>Enter verification code</h2>
                    <input 
                    type="text"
                    required
                    value={verificationCode}
                    onChange={(e) => setVerificationCode(e.target.value)}
                    />
                </div>
                {errorMessage && <p>{errorMessage}</p>}
                <button type="submit">Verify code</button>
                <div>
                    <h4>Didn't get a code?</h4>
                    <Link to="/forgot-password">Resend code</Link>
                </div>
            </form>
        </div>
    )
}

export default VerifyCode