import axios from 'axios'

const apiClient = axios.create({
    baseURL: 'https://my-json-server.typicode.com/andershc/IDATT2105-FullStack',
    withCredentials: false,
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
    }
})

export default {
    getSubmissions(){
        return apiClient.get('/submissions')
    },
    postFeedback(submission) {
        return apiClient.post('/submissions', submission)
    },
    getSubmission(id) {
        return apiClient.get('/submissions/' + id)
    },
}