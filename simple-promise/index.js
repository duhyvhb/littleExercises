class Promise2{
  status = 'pending'
  succeed = null
  fail = null
  
  resolve(result) {
    setTimeout(() => {
      this.status = 'fulfilled'
      this.succeed(result)
    })
  }

  reject(err) {
    setTimeout(() => {
      this.status = 'rejected'
      this.fail(err)
    })
  }

  constructor(fn) {
    fn(this.resolve.bind(this), this.reject.bind(this))
  }

  then(succeed, fail) {
    this.succeed = succeed
    this.fail = fail
  }
}

const $ = s => document.querySelector(s)

let fn = () => new Promise2((resolve, reject) => {
  let xhr = new XMLHttpRequest()
  let url = 'http://127.0.0.1:8080/getPersonInfo?uid=12345'
  xhr.open('GET', url, true)
  xhr.onload = function() {
    if((xhr.status === 200 && xhr.status < 300) || xhr.status === 304) {
      resolve(JSON.parse(xhr.responseText))
    }
    else {
      reject(xhr.status)
    }
  }
  xhr.send()
})

fn()
.then(result => {
    $('.name').appendChild(document.createTextNode(result.name))
    $('.age').appendChild(document.createTextNode(result.age))
    $('.address').appendChild(document.createTextNode(result.address))
  }, err => {
    console.log(`Error Code: ${err}`)
})
