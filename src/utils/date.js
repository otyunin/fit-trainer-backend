const moment = require('moment')

const toDate = (dateString) => {
  return moment.utc(dateString, 'MM-DD-YYYY').format()
}

module.exports = toDate
