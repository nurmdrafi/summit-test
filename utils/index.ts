import axios from 'axios'
import { message } from "antd"

export const httpErrorHandler = (err: any) => {
  if (axios.isAxiosError(err)) {
    const response = err?.response
    const request = err?.request

    if (response) {
      const statusCode = response?.status
      if (statusCode === 404) {
        message.error({ key: 'server-error-404', content: 'The requested resource does not exist or has been deleted' })
      } else if (statusCode === 422) {
        message.error({ key: 'network-error-422', content: 'Bad Request' })
      } else if (statusCode === 401) {
        message.error({ key: 'network-error-401', content: 'Please login to access this resource' })
      } else {
        // err.response?.data?.message(few response message are include inside object instead plain text)
        message.error({ key: 'server-error', content: 'Something Went Wrong' })
      }
    } else if (request) {
      message.error({ key: 'network-error', content: 'Network Error' })
    } else {
      message.error({ key: 'uncaught-error', content: 'An Error Occured' })
    }
  }
}