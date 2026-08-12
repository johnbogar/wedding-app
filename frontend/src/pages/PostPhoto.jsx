import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../api/axiosConfig'

function PostPhoto() {
    const navigate = useNavigate()

    const [photo, setPhoto] = useState(null)
    const [description, setDescription] = useState('')

    const [errorMessage, setErrorMessage] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault()
        const token = localStorage.getItem('access_token')

        try {
            const formData = new FormData()
            formData.append('file', photo)
            formData.append('description', description)

            const response = await api.post('/posts/photo', formData, {
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
    }
    return (
        <div>
            <h1>Boda Social</h1>
            <h2>Post your photos!</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Photos</label>
                    <input 
                    type="file"
                    required
                    onChange={(e) => setPhoto(e.target.files[0])}
                    />
                </div>
                <div>
                    <input
                    type="text"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    />
                </div>
                {errorMessage && <p>{errorMessage}</p>}
                <button type="submit">Post</button>
            </form>
        </div>
    )
}

export default PostPhoto