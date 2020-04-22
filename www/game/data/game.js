// utils
const Data = (name, plural, map, ...vals) => {
  let exp = {}
  exp[plural] = vals
  exp[name] = {}
  vals.forEach(e => map(exp[name], e))
  return exp
}
const nospace = str => str.split(' ').join('')

// data
const title = text => text

let TitleData = Data('Title', 'Titles', (data, e) => data[nospace(e)] = e,
  title('Hello World')
)

/*
Title.HelloWorld === 'Hello World'
Titles[0] === 'Hello World'
*/

export default {...TitleData}