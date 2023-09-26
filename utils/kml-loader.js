// kml-loader.js
const { parseString } = require('xml2js')

module.exports = function (source) {
  let kmlObject
  parseString(source, (err, result) => {
    if (err) throw err
    kmlObject = result
  })

  return `module.exports = ${ JSON.stringify(kmlObject) };`
}
