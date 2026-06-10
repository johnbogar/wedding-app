import { Link } from 'react-router-dom'

function CreateAccount() {
  return (
    <div>
      <Link to="/">Back to login</Link>
      <h1>Boda Social</h1>
      <h2>Create Account</h2>
      <form>
        <div>
          <label>First Name</label>
          <input type="text" />
        </div>
        <div>
          <label>Last Name</label>
          <input type="text" />
        </div>
        <div>
          <label>Email</label>
          <input type="email" />
        </div>
        <div>
          <label>Password</label>
          <input type="password" />
        </div>
        <div>
          <label>Confirm Password</label>
          <input type="password" />
        </div>
        <button type="submit">Create Account</button>
      </form>
    </div>
  )
}

export default CreateAccount