const mongoose = require('mongoose')
class UserFilter {
  constructor (options) {
    this.filter = options.filter || {}
    if (options.id) {
      if (mongoose.Types.ObjectId.isValid(options.id)) {
        this.filter._id = mongoose.Types.ObjectId(options.id)
      } else {
        throw new TypeError('Invalid user id!')
      }
    }
    if (options.username) {
      this.filter.username = options.username
    }
    if (options.email) {
      this.filter.email = options.email
    }
    if (options.ids) {
      this.filter._id = { $in: options.ids }
    }
  }

  getFilter () {
    return this.filter
  }
}

module.exports = UserFilter
