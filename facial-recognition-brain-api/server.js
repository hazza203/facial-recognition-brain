// npm install bcrypt-nodejs
const express = require('express')
const bodyParser = require('body-parser')
const bcrypt = require('bcrypt-nodejs')
const cors = require('cors')
const knex = require('knex')

const db = knex({
	client: 'pg',
	connection: {
		host: '127.0.0.1',
		user: 'harry',
		password: 'test',
		database: 'smart-brain'
	}
})

const app = express()

app.use(bodyParser.json())
app.use(cors())
 
//Get all users (tbh not safe at all)
app.get('/', (req, res) => {
	res.send(database.users)
})

//Post call which validates and signs in a user
app.post('/signin', (req, res) => {	
	db('login').where({ email: req.body.email})
	.then(data => {
		bcrypt.compare(req.body.password, data[0].hash, function(err, result) {
				if(result){
					return db('users').where({email: data[0].email})
					.then(user => res.json(user[0]))
					.catch(err => res.status(400).json('invalid login	'))
				} else {
					res.status(400).json('invalid login')
				}
			})
	}).catch(err => res.status(400).json('invalid login	'))

})

//Post call which registers a new user
app.post('/register', (req, res) => {
	const {email, name, password} = req.body
	bcrypt.hash(password, null, null, function(err, hash) {
		db.transaction(trx => {
			trx.insert({
				name: name,
				email: email,
				joined: new Date()
				
			})
			.into('users')
			.returning('*')
			.then(user => {
				return trx('login')
				.returning('*')
				.insert({
					hash: hash,
					email: email
				})
				.then(res.json(user[0]))
			})
			.then(trx.commit)
			.catch(trx.rollback)
		})
		.catch(err => res.status(400).json('Unable to register'))
	})
})

//Get the profile of the user by id
app.get('/profile/:id', (req, res) => {
	const { id } = req.params
	db('users').where({id}).then(user => {
		if(user === undefined || user.length === 0){
			res.status(400).json('User not found')
		} else {
			res.json(user[0])
		}	
	})
})

//Put call which increments the users image count and returns their current count
app.put('/image', (req, res) => {
	const { id } = req.body
	db('users').where({id: id}).increment('entries', 1).returning('entries').then(entries => {
		res.json(entries[0])
	}).catch(err => res.status(400).json('Failed to update'))
})

//Initial function on run
app.listen(3000, () => {
	console.log('app is running on port 3000')
})
