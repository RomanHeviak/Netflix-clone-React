import axios from 'axios'

const instance = axios.create({
    baseURL:"https://www.tvmaze.com/"
})

export default instance;