const http = require('http')
const fs = require('fs')
const url = require('url')

const server = http.createServer((req, res) => {
  const pathObj = url.parse(req.url, true)
  res.setHeader('Access-Control-Allow-Origin', 'http://127.0.0.1:5500')
  switch(pathObj.pathname){
    case '/getPersonInfo':
      if(pathObj.query.uid === '12345') {
        res.end(JSON.stringify({
          name: 'Lihua',
          age: 18,
          address: 'Beijing'
        }))
      }
      break;
    default:
      try {
        let target = pathObj.pathname === '/' ? '/index.html' : pathObj.path
        res.end(fs.readFileSync(__dirname + target))
      } catch(e) {
        res.writeHead(404, 'Not Found')
        res.end('404 Not Found the page')
      }
  }
}).listen('8080')

console.log('server is listening on port 8080')