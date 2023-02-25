const Datastore = require('nedb')
db = {}
db.clients = new Datastore({ filename: 'datastore/clients.db', autoload: true });

const db_operations = (event, arg) => {
	

	if (!arg.collection || !arg.operation) {
		event.reply('db.response', {
			error: "collection or operation not defined"
		})
		return
	}

	if (!db[arg.collection]) {
		event.reply('db.response', {
			error: "collection not found"
		})
		return
	}

	if (arg.operation === "insert") {
		if (!arg.data) {
			event.reply('db.response', {
				error: "data not defined"
			})
			return
		}
		db[arg.collection].insert(arg.data, function (err, newDoc) {
			if (err) {
				event.reply('db.response', {
					error: err
				})
				return
			}
			event.reply('db.response', newDoc)
		})
	} else if (arg.operation === "find") {
		if (!arg.query) {
			event.reply('db.response', {
				error: "query not defined"
			})
			return
		}
		db[arg.collection].find(arg.query, function (err, docs) {
			if (err) {
				event.reply('db.response', {
					error: err
				})
				return
			}
			event.reply('db.response', docs)
		})
	} else {
		event.reply('db.response', {
			error: "operation not supported"
		})
		return
	}


	// console.log("asynchronous-request", arg) // prints "async ping"
	// event.reply('db.clients.insert.response', 'pong')

}

// export db
module.exports = db_operations