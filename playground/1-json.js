const fs = require('fs')

const buffer = fs.readFileSync('1-json.json').toString()
const data = JSON.parse(buffer)
console.log(data.name)


data.name = 'ofir'
data.age = '18'
const userJSON = JSON.stringify(data)
fs.writeFileSync('1-json.json', userJSON)