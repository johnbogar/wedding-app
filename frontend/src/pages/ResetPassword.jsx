import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useState } from 'react'
import api from '../api/axiosConfig'

function ResetPassword() {
    const navigate = useNavigate()

    const location = useLocation()
    const resetToken = location.state?.resetToken
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    const [errorMessage, setErrorMessage] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            const response = await api.post('/auth/reset-password', {
                password: password,
                confirm_password: confirmPassword,
                access_token: resetToken,
            })
            console.log('Success:', response.data)
            navigate('/', { state: { message: 'Password successfully reset. Please log in.' }})
        } catch (error) {
            if (error.response) {
                setErrorMessage(error.response.data.detail)
            } else {
                setErrorMessage('Network error. Please try again.')
            }
        }
    }


    return (
        <div>
            <Link to="/">Back to login</Link>
            <h1>Boda Social</h1>
            <h2>Reset password</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>New password</label>
                    <input 
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <div>
                    <label>Confirm password</label>
                    <input 
                    type="password"
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                </div>
                {errorMessage && <p>{errorMessage}</p>}
                <button type="submit">Reset password</button>
            </form>
        </div>
    )
}

export default ResetPassword