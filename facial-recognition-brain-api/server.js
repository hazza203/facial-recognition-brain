// npm install bcrypt-nodejs
const express = require('express')
const bodyParser = require('body-parser')
const bcrypt = require('bcrypt-nodejs')
const cors = require('cors')

const app = express()

app.use(bodyParser.json())
app.use(cors())

const database = {
	users: [
		{
			id: '100',
			name: 'John',
			email: 'john@gmail.com', 
			entries: 0,
			passwordHash: "$2a$10$3FaRXuG03pnQk7WchoT/Juc6raNqzb4DTLxKSEPzjTtSQF0MuS.Z6",
			joined: new Date()
		},
		{
			id: '101',
			name: 'Sally',
			email: 'sally@gmail.com', 
			entries: 0,
			passwordHash: "$2a$10$ooInmbpeP9VPg1YoJkVj1uaIWd6OkOYZ9v.zbGiU3YUKV9rCP1m6C",
			joined: new Date()
		}
	],
}

//Get all users (tbh not safe at all)
app.get('/', (req, res) => {
	res.send(database.users)
})

//Post call which validates and signs in a user
app.post('/signin', (req, res) => {	
	let foundUser = false
	for (user of database.users){
		if(req.body.email === user.email) {
			foundUser = true
			bcrypt.compare(req.body.password, user.passwordHash, function(err, result) {
				if(result){
					return res.json('success')
				} else {
					return res.status(400).json('invalid login')
				}
			})
		} 
		if(!foundUser){
			return res.status(400).json('invalid login')
		}
	}

})

//Post call which registers a new user
app.post('/register', (req, res) => {
	const {email, name, password} = req.body
	bcrypt.hash(password, null, null, function(err, hash) {
		database.users.push({
			id: '102',
			name: name,
			email: email,
			password: hash,
			entries: 0,
			date: new Date()
		})

	res.json(database.users[database.users.length - 1])
	})
	
})

//Get the profile of the user by id
app.get('/profile/:id', (req, res) => {
	const { id } = req.params
	const user = getUser(id)
	if( user != undefined ){
		res.json(user)
	} else {
		res.status(404).json('user not found')
	}
})

//Put call which increments the users image count and returns their current count
app.put('/image', (req, res) => {
	const { id } = req.body
	const user = getUser(id)
	if(user != undefined){
		user.entries++
		return res.json(user.entries)
	} else {
		res.status(404).json('user not found')
	}
})

//Function used to get find the user object by id
function getUser(id){
	for(let i = 0; i < database.users.length; i++){
		if(database.users[i].id === id){
			return database.users[i]
		}
	}
	return undefined
}

//Initial function on run
app.listen(3000, () => {
	console.log('app is running on port 3000')
})
