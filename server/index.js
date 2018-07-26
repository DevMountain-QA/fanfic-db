const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const massive = require('massive');
require('dotenv').config()

const fanfic = require('./controllers/fanficController')
const favorite = require('./controllers/favoriteController')
const review = require('./controllers/reviewController')
const user = require('./controllers/userController')

const app = express();
massive( process.env.CONNECTION_STRING ).then( dbInstance => app.set('db', dbInstance) );

app.use(bodyParser.json());
app.use(cors());

app.get('/api/fanfics', fanfic.get)
app.get('/api/fanfic/', fanfic.search)
app.post('/api/fanfic/', fanfic.add)
app.put('/api/fanfic/:id', fanfic.edit)
app.delete('/api/fanfic/:id', fanfic.delete)

app.get('/api/favorites/:user', favorite.get)
app.post('/api/favorites/add', favorite.add)
app.put('/api/favorite/read', favorite.read)
app.delete('/api/favorite/', favorite.delete)

app.get('/api/reviews/:fanfic', review.get)
app.post('/api/review', review.add)
app.delete('/api/review/:review/:user', review.delete)

app.get('/api/users/', user.get)
app.post('/api/user', user.add)
app.delete('/api/user', user.delete)

const port = process.env.PORT || 3000
app.listen(port, () => { console.log(`Server listening on port ${port}`); });
