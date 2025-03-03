import React from 'react'
import axios from 'axios'

const apiResponseHandler = async (endPoint, method = 'GET', data = null, config) => {
    try {
        const baseURL = "https://ecommerce-backend-p3ff.onrender.com"
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

