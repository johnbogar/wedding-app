import { useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'

function Home() {
  const navigate = useNavigate()

  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [activeTab, setActiveTab] = useState('photos')

  const location = useLocation()
  const successMessage = location.state?.message
  
  const rsvpStatus = localStorage.getItem('rsvp_status')

  const handleLogout = () => {
    localStorage.removeItem('access_token')
    navigate('/')
  }

  return (
    <div>
      <div>
        {rsvpStatus === 'null' && <p>You still need to RSVP! Due date: [date]</p>}
        <h1>Boda Social</h1>
        {successMessage && <p>{successMessage}</p>}
        <span>☰</span>
        <button onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
          Profile
        </button>

        {isDropdownOpen && (
          <div>
            <Link to="/profile">Profile</Link>
            <br />
            <Link to="/settings">Settings</Link>
            <br />
            <button onClick={handleLogout}>Logout</button>
          </div>
        )}
      </div>

      <div>
        <button onClick={() => setActiveTab('photos')}>Photos</button>
        <button onClick={() => setActiveTab('activities')}>Activities</button>
      </div>

      <button onClick={() => navigate(activeTab === 'photos' ? '/post-photo' : '/post-activity')}>
        + Post
      </button>

      <div>
        {activeTab === 'photos' && <p>Photo feed goes here</p>}
        {activeTab === 'activities' && <p>Activity feed goes here</p>}
      </div>
    </div>
  )
}

export default Home