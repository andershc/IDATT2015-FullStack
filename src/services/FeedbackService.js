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
    getName(){
        return apiClient.get('/profile/name')
    },
    setName(newName){
        return apiClient.post('/profile', {name: newName})
    },
    getEmail(){
        return apiClient.get('profile/email')
    },
    setEmail(newEmail){
        return apiClient.post('/profile', {email: newEmail})
    },
    getUsers(){
        return apiClient.get('/users')
    },
    postUser(user){
        return apiClient.post('/users', user)
    },
    getUser(username){
        return apiClient.get('/users/' + username)
    }
}