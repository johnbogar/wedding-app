import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import api from '../api/axiosConfig'

function CreateAccount() {
    const navigate = useNavigate()

    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [inviteCode, setInviteCode] = useState('')

    const [errorMessage, setErrorMessage] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault()
      
        try {
          const response = await api.post('/auth/register', {
            first_name: firstName,
            last_name: lastName,
            email: email,
            password: password,
            confirm_password: confirmPassword,
            invite_code: inviteCode,
          })
          console.log('Success:', response.data)
          navigate('/')
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
        <h2>Create Account</h2>
        <form onSubmit={handleSubmit}>
        <div>
            <label>First Name</label>
            <input 
                type="text" 
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
            />
        </div>
        <div>
            <label>Last Name</label>
            <input 
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
            />
        </div>
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
        <div>
            <label>Confirm Password</label>
            <input 
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
            />
        </div>
        <div>
            <label>Invite Code</label>
            <input
                type="text"
                value={inviteCode}
                onChange={(e) => setInviteCode(e.target.value)}
            />
        </div>
        {errorMessage && <p>{errorMessage}</p>}
        <button type="submit">Create Account</button>
      </form>
    </div>
  )
}

export default CreateAccount