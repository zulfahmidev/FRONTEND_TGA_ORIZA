export default function fetchAPI(url, options = {}) {
    const token = localStorage.getItem('AUTH_TOKEN')

    options.headers = {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        ...options.headers,
    }

    return $fetch('http://localhost:5000/api'+url, options)
}