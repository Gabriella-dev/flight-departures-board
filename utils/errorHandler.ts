import axios from 'axios'

export function handleError(error: unknown): string {
  if (axios.isAxiosError(error)) {
    if (error.response) {
      // The server responded with a status code that falls out of the range of 2xx
      const statusCode = error.response.status
      const statusText = error.response.statusText

      console.error(`HTTP Error: ${statusCode} ${statusText}`)

      switch (statusCode) {
        case 400:
          return 'Bad Request: There was an issue with your request. Please check and try again.'
        case 404:
          return 'Not Found: The requested resource could not be found.'
        case 500:
          return 'Internal Server Error: The server encountered an issue. Please try again later.'
        default:
          return `Unexpected Error: ${statusCode} ${statusText}. Please report this issue.`
      }
    } else if (error.request) {
      // The request was made but no response was received
      console.error('No response received from the server:', error.request)
      return 'No response from the server. Please check your connection and try again.'
    } else {
      // Something happened in setting up the request that triggered an error
      console.error('Error setting up request:', error.message)
      return `Request Error: ${error.message}`
    }
  } else if (error instanceof Error) {
    // Non-Axios errors
    console.error('General Error:', error.message)
    return error.message
  } else {
    console.error('Unknown error type:', error)
    return 'An unknown error occurred. Please try again later.'
  }
}
