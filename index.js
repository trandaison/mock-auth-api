const express = require('express')
const cors = require('cors')
const { v4: uuidv4 } = require('uuid');
const app = express()
const port = process.env.PORT || 5000;

app.use(cors())

app.get('/', (req, res) => {
  res.send('welcome!')
})

app.get('/ping', (req, res) => {
  res.send('pong')
})

app.post('/api/login', (req, res) => {
  res.send({
    token: uuidv4(),
    refresh_token: uuidv4(),
  })
})

app.post('/api/refresh_token', (req, res) => {
  if (!req.query.refresh_token) {
    res.status(400)
    res.send({ error: 'refresh_token is required' })
    return;
  }

  res.send({
    token: uuidv4(),
    refresh_token: uuidv4(),
  })
})

app.delete('/api/logout', (req, res) => {
  const accessToken = req.headers['x-access-token'];
  if (!(accessToken && accessToken.startsWith('Bearer'))) {
    res.sendStatus(401)
    return;
  }

  res.send(true)
})

app.get('/api/me', (req, res) => {
  const accessToken = req.headers['x-access-token'];
  if (!(accessToken && accessToken.startsWith('Bearer'))) {
    res.sendStatus(401)
    return;
  }

  res.send({
    user: {
      id: 'u10000',
      name: 'sontd',
      email: 'sontd@nal.vn',
      avatar: 'https://i.pravatar.cc/300',
    },
  })
})

app.listen(port, () => {
  console.log(`Mock API app listening at http://localhost:${port}`)
})
