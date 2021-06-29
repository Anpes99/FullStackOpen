const mongoose = require('mongoose')

if (process.argv.length<3) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]

const url =
  `mongodb+srv://anpes:${password}@cluster0.cjsgu.mongodb.net/phoneBook?retryWrites=true&w=majority`

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })

const phoneBookSchema = new mongoose.Schema({
  name: String,
  number: String,
})

const PhoneNumber = mongoose.model('phoneNumber', phoneBookSchema)
if (process.argv[3] && process.argv[4]){
    const phoneNumber = new PhoneNumber({
    name: process.argv[3],
    number: process.argv[4],
    })

    phoneNumber.save().then(response => {
    console.log(`added ${process.argv[3]} number ${process.argv[4]} to phonebook`)
    mongoose.connection.close()
    })
}

PhoneNumber.find({}).then(result => {
    console.log("phonebook:")
    result.forEach(phoneNumber => {
      console.log(phoneNumber.name + " " + phoneNumber.number)
    })
    mongoose.connection.close()
  })