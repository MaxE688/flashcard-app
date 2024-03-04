const express = require('express');
const cors = require('cors');
const mysql = require('mysql2');



const database = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	password: process.env.DB_PASSWORD,
	database: 'cards'
});



const app = express();

app.use(cors({origin: 'http://localhost:5173'}));
app.use(express.urlencoded({
	extended:true
}));
app.use(express.json());



database.connect((err) => {
	if(err) throw err;
	console.log('Connected to DB');

})



/****************************** Routing **************************************/



app.get('/', (req, res) => {
	console.log('getting cards');
	sendCards(res)
});

app.post('/create', (req, res) => {
	createCard(res, req.body);
});
app.post('/update', (req, res) => {
	updateCard(res, req.body);
});

app.post('/delete', (req, res) => {
	deleteCard(res, req.body);
});


/****************************** Listen on port *******************************/



let port = 5174;
if(process.env.PORT) {
	port = process.env.PORT;
	console.log("ENV Var set ");
}
app.listen(port, () => {console.log("Server is running on port " + port);})


/****************************** Functions ***********************************/



const sendCards = (res) => {
	database.connect(err => {
		if(err) throw err;
		database.query("SELECT * FROM cards", (err, result) => {
			if(err) throw err;
			// console.log(result);
			res.send(result);
		})
	});
}

const createCard = (res, card) => {
	database.connect(err => {
		if(err) throw err;
		let query = "INSERT INTO cards (answer, prompt) VALUES ('" + card.answer + "', '" + card.prompt + "')";
		database.query(query, (err, result) => {
			if(err) throw err;
			console.log("Adding " + result.toString());
			res.send("card added");
		});
	});
}

const updateCard = (res, card) => {
	database.connect(err => {
		if(err) throw err;
		let update = "UPDATE cards SET ";
		
		
		let newValues = '';
		let comma = '';
		
		if(card.answer !== ''){
			newValues += "answer = '" + card.answer + "'"; 
			comma = ', ';
		}
		if(card.prompt !== ''){
			newValues += comma + "prompt = '" + card.prompt + "'";
		}
		
		
		let where = " WHERE ID = " + card.ID;
		let query =   update + newValues + where;
		console.log('Making query: ' + query);
		
		database.connect(err => {
			if(err) throw err;
			database.query(query, (err, result) => {
				console.log('Updating: ' + result);
				res.send("card updated");
			});
		});
	});
}

const deleteCard = (res, card) => {
	database.connect(err => {
		if(err) throw err;
		
		let query = "DELETE FROM cards WHERE ID = " + card.ID;
		console.log(query);
		
		database.query(query, (err, result) => {
			console.log('deleting card: ' + result);
			res.send('card deleted');
		})
	});
}