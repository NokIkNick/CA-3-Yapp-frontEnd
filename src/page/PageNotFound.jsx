import { useNavigate } from 'react-router-dom'

export default function PageNotFound() {
    const navigate = useNavigate();
    return (
        <>
            <h1>404: Page Not Found</h1>
            <button onClick={() => navigate(-1)}>Back</button>
            <br />

            <button onClick={() => navigate('/')}>Go Home</button>
        </>
    )
}