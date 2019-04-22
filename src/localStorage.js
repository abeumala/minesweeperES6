'use strict'

function LocalStorage () {
	this.db = store.get('DATABASE');
	if (!this.db) {
		store.set('DATABASE', {
			"users": []
		})
		this.db = {"users": []}
	}
	console.log(this.db)
}

LocalStorage.prototype.getUsers = function(user) {
	return store.get('DATABASE').users
}

LocalStorage.prototype.saveUser = function(user) {
	var users = this.getUsers()
	var index = users.map(function(item){return item.username}).indexOf(user.username);
	if (users.length == 0 || index == -1) {
		users.push(user)
	}else{ //indexOf retorna -1 si l'objecte no existeix en l'array
		users[index] = user
	}
	store.set('DATABASE', {
		"users": users
	})
}

LocalStorage.prototype.getUser = function(username) {
	var users = this.getUsers()
	var index = users.map(function(item){return item.username}).indexOf(username);
	if (users.length == 0 || index == -1) {
		return null
	}else{ //indexOf retorna -1 si l'objecte no existeix en l'array
		return users[index]
	}
}

LocalStorage.prototype.clear = function(user) {
	store.clearAll(); //delete db
}