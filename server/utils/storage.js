const fs = require('fs');
const nggt = require('./nggt.js');

const WWW = __dirname.replace('utils', 'storage')
const resource = path => `${WWW}/${path}`

let data = nggt.dataObj({msg: 'Hello World'})

const load = () => {
  let exists = fs.existsSync(resource('storage.json'))
  let obj = {}
  if(exists)
    obj = JSON.parse(fs.readFileSync(resource('storage.json')))
  
  data = nggt.dataObj(obj)
  console.log('[loaded]', data)
}

const save = () => {
  const obj = data.val()
  fs.writeFileSync(resource('storage.json'), JSON.stringify(obj), 'utf8')
  console.log('[saved]', obj)
}

module.exports = {pipe: data, load, save}