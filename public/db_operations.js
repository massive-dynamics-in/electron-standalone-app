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
	} else if (arg.operation === "find" || arg.operation === "findOne" || arg.operation === "count") {
		if (!arg.query) {
			arg.query = {}
		}

		let res;
		if ('projection' in arg) {
			res = db[arg.collection][arg.operation](arg.query, arg.projection)
		} else {
			res = db[arg.collection][arg.operation](arg.query)
		}
		if ('sort' in arg) {
			res = res.sort(arg.sort)
		}
		if ('skip' in arg) {
			res = res.skip(arg.skip)
		}
		if ('limit' in arg) {
			res = res.limit(arg.limit)
		}

		res.exec(function (err, docs) {
			if (err) {
				event.reply('db.response', {
					error: err
				})
				return
			}
			event.reply('db.response', docs)
		})
	} else if (arg.operation === "update") {
		if (!arg.query) {
			arg.query = {}
		}
		if (!arg.update) {
			arg.update = {}
		}
		if (!arg.options) {
			arg.options = {}
		}
		db[arg.collection].update(arg.query, arg.update, arg.options, function (err, numReplaced) {
			if (err) {
				event.reply('db.response', {
					error: err
				})
				return
			}
			event.reply('db.response', numReplaced)
		})
	} else if (arg.operation === "remove") {
		if (!arg.query) {
			arg.query = {}
		}
		if (!arg.options) {
			arg.options = {}
		}
		db[arg.collection].remove(arg.query, arg.options, function (err, numRemoved) {
			if (err) {
				event.reply('db.response', {
					error: err
				})
				return
			}
			event.reply('db.response', numRemoved)
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