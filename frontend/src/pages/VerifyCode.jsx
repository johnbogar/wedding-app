import { Link } from 'react-router-dom'

function VerifyCode() {
    return (
        <div>
            <Link to="/forgot-password">Back to forgot password</Link>
            <h1>Boda Social</h1>
            <form>
                <div>
                    <h2>Enter verification code</h2>
                    <input type="text" />
                </div>
                <button type="submit">Verify code</button>
                <div>
                    <h4>Didn't get a code?</h4>
                    <Link to="/forgot-password">Resend code</Link>
                </div>
            </form>
            <label>Successful requests reroute here </label>
            <Link to="/reset-password">Success</Link>
        </div>
    )
}

export default VerifyCode