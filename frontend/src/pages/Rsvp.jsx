import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../api/axiosConfig'

function Rsvp() {
    const navigate = useNavigate()



    const [currentStep, setCurrentStep] = useState(1)
    const [rsvpStatus, setRsvpStatus] = useState(null)
    const [guestCount, setGuestCount] = useState('')
    const [dietaryRestrictions, setDietaryRestrictions] = useState('')
    const [songRequest, setSongRequest] = useState('')
    const [errorMessage, setErrorMessage] = useState('')
    

    const handleSubmit = async (e) => {
        const token = localStorage.getItem('access_token')

        try { 
            const response = await api.post('/auth/rsvp', {
            rsvp_status: rsvpStatus,
            guest_count: guestCount || null,
            dietary_restrictions: dietaryRestrictions || null,
            song_request: songRequest || null,
            }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            console.log('Success:', response.data)
            localStorage.setItem('rsvp_status', response.data.rsvp_status)
            navigate('/home', { state: { message: "You have successfully submitted your RSVP!" }})

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
            <h2>RSVP</h2>
            {currentStep === 1 && (
                <div>
                    <h3>Will you be attending?</h3>
                    <button onClick={() => { setRsvpStatus(true); setCurrentStep(2) }}>Yes</button>
                    <button onClick={() => { setRsvpStatus(false); setCurrentStep(5) }}>No</button>
                    <button onClick={() => { setRsvpStatus(null); setCurrentStep(2) }}>Maybe</button>
                    <button onClick={() => navigate('/home')}>Skip for now</button>
                </div>
            )}
            {currentStep === 2 && (
                <div>
                    <h3>How many additional guests are you bringing?</h3>
                    <input 
                        type="number"
                        value={guestCount}
                        onChange={(e) => setGuestCount(e.target.value)}
                    />
                    <button onClick={() => setCurrentStep(3)}>Next</button>
                    <button onClick={() => navigate('/home')}>Skip for now</button>
                </div>
            )}
            {currentStep === 3 && (
                <div>
                    <h3>Any dietary restrictions?</h3>
                    <input 
                        type="text"
                        value={dietaryRestrictions}
                        onChange={(e) => setDietaryRestrictions(e.target.value)}
                    />
                    <button onClick={() => setCurrentStep(4)}>Next</button>
                    <button onClick={() => navigate('/home')}>Skip for now</button>
                </div>
            )}
            {currentStep === 4 && (
                <div>
                    <h3>Any song requests?</h3>
                    <input 
                        type="text"
                        value={songRequest}
                        onChange={(e) => setSongRequest(e.target.value)}
                    />
                    <button onClick={() => setCurrentStep(5)}>Next</button>
                    <button onClick={() => navigate('/home')}>Skip for now</button>
                </div>
            )}
            {currentStep === 5 && (
                <div>
                    <h3>All done! Click submit to confirm your RSVP.</h3>
                    {errorMessage && <p>{errorMessage}</p>}
                    <button onClick={handleSubmit}>Submit</button>
                    <button onClick={() => navigate('/home')}>Skip for now</button>
                </div>
            )}
        </div>
    )
}

export default Rsvp