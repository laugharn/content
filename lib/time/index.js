export const ttl = (seconds = 900) => {
    const date = new Date()
    date.setSeconds(date.getSeconds() + seconds)
  
    return date
  }
  
  export const validateTtl = (date) => {
    if (!date) {
      return false
    }
  
    const now = new Date().getTime()
    const expiry = new Date(date).getTime()
  
    return expiry > now
  }
  