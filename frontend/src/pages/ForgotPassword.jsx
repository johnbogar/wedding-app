import { Link } from 'react-router-dom'

function ForgotPassword() {
    return (
        <div>
            <Link to="/">Back to login</Link>
            <h1>Boda Social</h1>
            <h2>Forgot password?</h2>
            <h4>Enter your email to receive a temporary verification code</h4>
            <form>
                <div>
                    <label>Email</label>
                    <input type="email" />
                </div>
                <button type="submit">Get code</button>
            </form>
        </div>
    )
}

export default ForgotPassword