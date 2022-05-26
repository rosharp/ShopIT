const mongoose = require('mongoose');

const conntectDatabase = () => {
  mongoose.connect(process.env.DB_URI, {
    useUnifiedTopology: true,
  }).then(con => {
    console.log(`MongoDB Database connected with HOST: ${con.connection.host}`)
  })
}

module.exports = conntectDatabase;
