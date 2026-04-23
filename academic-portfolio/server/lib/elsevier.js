const axios = require('axios')

const elsevier = axios.create({
  baseURL: 'https://api.elsevier.com/content',
  headers: {
    'X-ELS-APIKey': process.env.ELSEVIER_API_KEY,
    Accept: 'application/json',
  },
})

module.exports = elsevier