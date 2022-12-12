const express = require('express')
const cors = require('cors')
const { v4: uuidv4 } = require('uuid');
const app = express()
const port = process.env.PORT || 5000;

app.use(cors())

function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

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

app.get('/api/questions', (req, res) => {
  const questions = require('./data/questions.json');
  res.send(questions);
})

app.get('/api/submissions', (req, res) => {
  const submissions = require('./data/submissions.json');
  res.send(submissions);
})

app.get('/api/bills/:id', (req, res) => {
  const foods = require('./data/foods.json');
  const shuffled = foods.sort(() => 0.5 - Math.random());

  let selected = shuffled
    .slice(0, randomInt(4, 10))
    .map((item) => ({ ...item, quantity: randomInt(1, 20) }));
  res.send(selected);
})

app.listen(port, () => {
  console.log(`Mock API app listening at http://localhost:${port}`)
})
