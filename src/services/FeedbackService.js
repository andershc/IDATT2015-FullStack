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
    getSubmission(searchID) {
        return this.getSubmissions().find(({id}) => id === searchID)
    },
    submit(submission) {
        return apiClient.post('/submissions', submission)
    }
}