import React from 'react'
import axios from 'axios'

const apiResponseHandler = async (endPoint, method = 'GET', data = null, config) => {
    try {
        const baseURL = "http://localhost:8000"
        const response = await axios({
            url: baseURL + endPoint,
            method: method,
            data: data,
            ...config
        })
        return response
    } catch (error) {
        return error.response
    }
}

export { apiResponseHandler }

