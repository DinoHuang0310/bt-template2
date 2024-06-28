export default () => {
  
  const removeSpace = (str) => str.replace(/ /g, '')
  const isString = (parameter) => {
    if (typeof parameter === 'string') {
      return true
    } else {
      console.warn(`wrong type: ${typeof str}`)
      return false
    }
  }

  const isEmpty = (str) => {
    if (isString(str)) {
      return removeSpace(str) === ''
    }
    return false
  }

  const isMobile = (mobile) => {
    if (isString(mobile)) {
      const regex = /^09\d{8}$/
      return regex.test(removeSpace(mobile))
    }
    return false
  }

  const isEmail = (email) => {
    if (isString(email)) {
      const regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      return regex.test(email)
    }
    return false
  }

  return {
    isEmpty,
    isMobile,
    isEmail,
  }
}