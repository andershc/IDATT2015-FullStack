import axios from 'axios'

const apiClient = axios.create({
    baseURL: 'http://localhost:3000',
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
    getName(){
        return apiClient.get('/profile/name')
    },
    setName(){

    },
    getEmail(){
        return apiClient.get('profile/email')
    },
    setEmail(){

    }
}