const express = require('express')
const bodyParser = require('body-parser')

const app = express()

app.get('/', (req, res) => {
  const name = req.query.name

  res.set('X-XSS-Protection', '1; mode=block; report=/report/')
  res.send(`
    <!doctype html>
    <body>Hello, ${name}!</body>
  `)
})

app.post('/report',
  bodyParser.json({ type: 'application/xss-auditor-report' }),
  (req, res) => {
    console.log(req.body)
    res.json({})
  })

const port = process.env.PORT || 3000
app.listen(port, () => {
  console.log('App started on port ' + port)
})
