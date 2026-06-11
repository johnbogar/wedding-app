import { Link } from 'react-router-dom'

function ResetPassword() {
    return (
        <div>
            <Link to="/">Back to login</Link>
            <h1>Boda Social</h1>
            <h2>Reset password</h2>
            <form>
                <div>
                    <label>New password</label>
                    <input type="password" />
                </div>
                <div>
                    <label>Confirm password</label>
                    <input type="password" />
                </div>
                <button type="submit">Reset password</button>
            </form>
            <label>Successful requests reroute here </label>
            <Link to="/">Success</Link>
        </div>
    )
}

export default ResetPassword