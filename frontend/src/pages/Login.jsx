import { Link } from 'react-router-dom'

function Login() {
  return (
    <div>
      <h1>Boda Social</h1>
      <h2>Get ready for the big day!</h2>
      <form>
        <div>
          <label>Email</label>
          <input type="email" />
        </div>
        <div>
          <label>Password</label>
          <input type="password" />
        </div>
        <button type="submit">Sign In</button>
      </form>
      <Link to="/create-account">No account? Create one</Link>
      <br />
      <Link to="/forgot-password">Forgot password?</Link>
    </div>
  )
}

export default Login