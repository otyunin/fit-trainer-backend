const moment = require('moment')

const toDate = (dateString) => {
  return moment.utc(dateString, 'YYYY-MM-DD').format()
}

module.exports = toDate
