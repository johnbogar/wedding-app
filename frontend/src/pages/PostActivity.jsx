import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../api/axiosConfig'

function PostActivity() {
    const navigate = useNavigate()

    const [description, setDescription] = useState('')
    const [eventDatetime, setEventDatetime] = useState('')
    const [activityTitle, setActivityTitle] = useState('')
    const [activityLink, setActivityLink] = useState('')
    const [photo, setPhoto] = useState(null)

    const [errorMessage, setErrorMessage] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault()
        const token = localStorage.getItem('access_token')

        try {
            const formData = new FormData()
            if (photo) formData.append('file', photo)
            formData.append('description', description)
            formData.append('event_datetime', eventDatetime)
            formData.append('activity_title', activityTitle)
            formData.append('activity_link', activityLink)

            const response = await api.post('/posts/activity', formData, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            navigate('/home')

        } catch (error) {
            if (error.response) {
                setErrorMessage(error.response.data.detail)
            } else {
                setErrorMessage('Network error. Please try again.')
            }
        }
        console.log(errorMessage)
    }
    return (
        <div>
            <h1>Boda Social</h1>
            <h2>Post your activity!</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Photo</label>
                    <input 
                    type="file"
                    onChange={(e) => setPhoto(e.target.files[0])}
                    />
                </div>
                <div>
                    <label>Title</label>
                    <input
                    type="text"
                    value={activityTitle}
                    onChange={(e) => setActivityTitle(e.target.value)}
                    />
                </div>
                <div>
                    <label>Date and time</label>
                    <input
                    type="datetime-local"
                    value={eventDatetime}
                    onChange={(e) => setEventDatetime(e.target.value)}
                    />
                </div>
                <div>
                    <label>Description</label>
                    <input
                    type="text"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    />
                </div>
                <div>
                    <label>Link to activity</label>
                    <input
                    type="text"
                    value={activityLink}
                    onChange={(e) => setActivityLink(e.target.value)}
                    />
                </div>
                {errorMessage && <p>{errorMessage}</p>}
                <button type="submit">Post</button>
            </form>
        </div>
    )
}

export default PostActivity