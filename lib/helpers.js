const users = require("../conf/users.json");

module.exports = {

  fullname: function (userId) {
    const details = users[userId];
    if (details && details.fullname) {
      return details.fullname;
    }
    return userId;
  },

  gravatarUrl: function (userId, size) {

    let hash = "unknown";

    const details = users[userId];
    if (details && details.gravatar) {
      hash = details.gravatar;
    }

    return "https://www.gravatar.com/avatar/" + hash + "?size=" + size;

  }

};