import { Link } from 'react-router-dom'

function VerifyCode() {
    return (
        <div>
            <Link to="/forgot-password">Back to forgot password</Link>
            <h1>Boda Social</h1>
            <form>
                <h2>Enter verification code</h2>
                <input type="text" />
                <button type="submit">Verify code</button>
                <h4>Didn't get a code?</h4>
                <Link to="/forgot-password">Resend code</Link>
            </form>
        </div>
    )
}

export default VerifyCode