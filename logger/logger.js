const fs = require('fs');
const os = require('os');

module.exports = (req, res, next) => {
  const now = Date.now();
  const {url, method} = req;

  const data = `${now} ${method} ${url}`;
  if (url !== '/style.css') {
    fs.appendFile("./logger/server.log", data + os.EOL, (err) => {
      if (err) throw err;
    })
  }
  next();
}