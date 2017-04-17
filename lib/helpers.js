const users = require("../conf/users.json");

module.exports = {

  fullname: function (id) {
    const details = users[id];
    if (details && details.fullname) {
      return details.fullname;
    }
    return id;
  }

};