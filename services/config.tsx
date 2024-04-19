import axios from 'axios'
import {Platform} from 'react-native'

const baseURL = 'https://dummyjson.com/'
const config = axios.create({
  baseURL: baseURL,
  timeout: 30000,
  headers: {os: Platform.OS, version: Platform.Version },
  params: {tokenx: 'token1234'}
})

export default config