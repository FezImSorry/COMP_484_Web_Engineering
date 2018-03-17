let app = require('http').createServer(); // create HTTP server
let io = require('socket.io')(app, {path: '/socket.io'}); // bind Socket to HTTP server

app.listen(3000); // listen on port 3000
console.log('Listening for connections on port 3000');

io.on('connection', function(socket) {
   console.log('Socket connected');
   socket.join('my-room'); // join the socket into the room called 'my-room'
   socket.in('my-room').emit('fromServer', {id: 'foo'}); // send to all other room clients

   socket.on('fromClient', function(data) { // listen for fromClient message
      console.log('Received ' + data.id + ' from client'); // single client
   });
});


var cardArray = ['02C', '03C', '04C', '05C', '06C', '07C', '08C', '09C', '10C', 'JC', 'QC', 'KC', 'AC',
      			 '02S', '03S', '04S', '05S', '06S', '07S', '08S', '09S', '10S', 'JS', 'QS', 'KS', 'AS',
      			 '02D', '03D', '04D', '05D', '06D', '07D', '08D', '09D', '10D', 'JD', 'QD', 'KD', 'AD',
      			 '02H', '03H', '04H', '05H', '06H', '07H', '08H', '09H', '10H', 'JH', 'QH', 'KH', 'AH',];
var player1CollectiveSum;
var player2CollectiveSum;
var dealerCollectiveSum;
var player1Deck;
var player2Deck;
var dealerDeck;
var player1DeckCardAmount;
var player2DeckCardAmount;
var dealerDeckCardAmount;
var dealtCards;
var dealtCardsIndex;
var cardAlreadyDealt;
var randomCard;

function initializeGame() {
			
	player1Deck = [];
	player2Deck = [];
	dealerDeck = [];
	dealtCards = [];
	player1DeckCardAmount = 0;
	player2DeckCardAmount = 0;
	dealerDeckCardAmount = 0;
	dealtCardsIndex = 0;
	player1CollectiveSum = 0;
	player2CollectiveSum = 0;
	dealerCollectiveSum = 0;
	cardAlreadyDealt = false;

	//Deal Player 1's Cards
	for (var i = 0; i < 2; i++) {

		randomCard = Math.floor(Math.random() * cardArray.length);								
		cardAlreadyDealt = cardAlreadyDealtCheck();

		while(cardAlreadyDealt == true) {

			randomCard = Math.floor(Math.random() * cardArray.length);
			cardAlreadyDealt = cardAlreadyDealtCheck();
		
		}

		dealtCards[i] = cardArray[randomCard];
		dealtCardsIndex = i+1;

		player1Deck[i] = cardArray[randomCard];
		player1DeckCardAmount = i+1;

		if(cardArray[randomCard] == '02C' || cardArray[randomCard] == '02S' || cardArray[randomCard] == '02D' || cardArray[randomCard] == '02H')
			player1CollectiveSum += 2;
		else if (cardArray[randomCard] == '03C' || cardArray[randomCard] == '03S' || cardArray[randomCard] == '03D' || cardArray[randomCard] == '03H')
			player1CollectiveSum += 3;
		else if (cardArray[randomCard] == '04C' || cardArray[randomCard] == '04S' || cardArray[randomCard] == '04D' || cardArray[randomCard] == '04H')
			player1CollectiveSum += 4;
		else if (cardArray[randomCard] == '05C' || cardArray[randomCard] == '05S' || cardArray[randomCard] == '05D' || cardArray[randomCard] == '05H')
			player1CollectiveSum += 5;    			
		else if (cardArray[randomCard] == '06C' || cardArray[randomCard] == '06S' || cardArray[randomCard] == '06D' || cardArray[randomCard] == '06H')
			player1CollectiveSum += 6;
		else if (cardArray[randomCard] == '07C' || cardArray[randomCard] == '07S' || cardArray[randomCard] == '07D' || cardArray[randomCard] == '07H')
			player1CollectiveSum += 7;
		else if (cardArray[randomCard] == '08C' || cardArray[randomCard] == '08S' || cardArray[randomCard] == '08D' || cardArray[randomCard] == '08H')
			player1CollectiveSum += 8;   
		else if (cardArray[randomCard] == '09C' || cardArray[randomCard] == '09S' || cardArray[randomCard] == '09D' || cardArray[randomCard] == '09H')
			player1CollectiveSum += 9;
		else if (cardArray[randomCard] == '10C' || cardArray[randomCard] == '10S' || cardArray[randomCard] == '10D' || cardArray[randomCard] == '10H')
			player1CollectiveSum += 10;
		else if (cardArray[randomCard] == 'JC' || cardArray[randomCard] == 'JS' || cardArray[randomCard] == 'JD' || cardArray[randomCard] == 'JH')
			player1CollectiveSum += 10;    			
		else if (cardArray[randomCard] == 'QC' || cardArray[randomCard] == 'QS' || cardArray[randomCard] == 'QD' || cardArray[randomCard] == 'QH')
			player1CollectiveSum += 10;
		else if (cardArray[randomCard] == 'KC' || cardArray[randomCard] == 'KS' || cardArray[randomCard] == 'KD' || cardArray[randomCard] == 'KH')
			player1CollectiveSum += 10;
		else if (cardArray[randomCard] == 'AC' || cardArray[randomCard] == 'AS' || cardArray[randomCard] == 'AD' || cardArray[randomCard] == 'AH') {
			if(player1CollectiveSum < 11)
				player1CollectiveSum += 11;
			else
				player1CollectiveSum += 1;   
		}

	}

	//Deal Player 2's Cards
	for (var i = 0; i < 2; i++) {

		randomCard = Math.floor(Math.random() * cardArray.length);								
		cardAlreadyDealt = cardAlreadyDealtCheck();

		while(cardAlreadyDealt == true) {

			randomCard = Math.floor(Math.random() * cardArray.length);
			cardAlreadyDealt = cardAlreadyDealtCheck();
		
		}

		dealtCards[dealtCardsIndex] = cardArray[randomCard];
		dealtCardsIndex++;

		player2Deck[i] = cardArray[randomCard];
		player2DeckCardAmount = i+1;

		if(cardArray[randomCard] == '02C' || cardArray[randomCard] == '02S' || cardArray[randomCard] == '02D' || cardArray[randomCard] == '02H')
			player2CollectiveSum += 2;
		else if (cardArray[randomCard] == '03C' || cardArray[randomCard] == '03S' || cardArray[randomCard] == '03D' || cardArray[randomCard] == '03H')
			player2CollectiveSum += 3;
		else if (cardArray[randomCard] == '04C' || cardArray[randomCard] == '04S' || cardArray[randomCard] == '04D' || cardArray[randomCard] == '04H')
			player2CollectiveSum += 4;
		else if (cardArray[randomCard] == '05C' || cardArray[randomCard] == '05S' || cardArray[randomCard] == '05D' || cardArray[randomCard] == '05H')
			player2CollectiveSum += 5;    			
		else if (cardArray[randomCard] == '06C' || cardArray[randomCard] == '06S' || cardArray[randomCard] == '06D' || cardArray[randomCard] == '06H')
			player2CollectiveSum += 6;
		else if (cardArray[randomCard] == '07C' || cardArray[randomCard] == '07S' || cardArray[randomCard] == '07D' || cardArray[randomCard] == '07H')
			player2CollectiveSum += 7;
		else if (cardArray[randomCard] == '08C' || cardArray[randomCard] == '08S' || cardArray[randomCard] == '08D' || cardArray[randomCard] == '08H')
			player2CollectiveSum += 8;   
		else if (cardArray[randomCard] == '09C' || cardArray[randomCard] == '09S' || cardArray[randomCard] == '09D' || cardArray[randomCard] == '09H')
			player2CollectiveSum += 9;
		else if (cardArray[randomCard] == '10C' || cardArray[randomCard] == '10S' || cardArray[randomCard] == '10D' || cardArray[randomCard] == '10H')
			player2CollectiveSum += 10;
		else if (cardArray[randomCard] == 'JC' || cardArray[randomCard] == 'JS' || cardArray[randomCard] == 'JD' || cardArray[randomCard] == 'JH')
			player2CollectiveSum += 10;    			
		else if (cardArray[randomCard] == 'QC' || cardArray[randomCard] == 'QS' || cardArray[randomCard] == 'QD' || cardArray[randomCard] == 'QH')
			player2CollectiveSum += 10;
		else if (cardArray[randomCard] == 'KC' || cardArray[randomCard] == 'KS' || cardArray[randomCard] == 'KD' || cardArray[randomCard] == 'KH')
			player2CollectiveSum += 10;
		else if (cardArray[randomCard] == 'AC' || cardArray[randomCard] == 'AS' || cardArray[randomCard] == 'AD' || cardArray[randomCard] == 'AH') {
			if(player2CollectiveSum < 11)
				player2CollectiveSum += 11;
			else
				player2CollectiveSum += 1;   
		}

	}

	//Deal Dealer's Cards
	for (var i = 0; i < 2; i++) {

		randomCard = Math.floor(Math.random() * cardArray.length);				
		cardAlreadyDealt = cardAlreadyDealtCheck();

		while(cardAlreadyDealt == true) {

			randomCard = Math.floor(Math.random() * cardArray.length);
			cardAlreadyDealt = cardAlreadyDealtCheck();
		
		}

		dealtCards[dealtCardsIndex] = cardArray[randomCard];
		dealtCardsIndex++;

		dealerDeck[i] = cardArray[randomCard];
		dealerDeckCardAmount = i+1;

		if(cardArray[randomCard] == '02C' || cardArray[randomCard] == '02S' || cardArray[randomCard] == '02D' || cardArray[randomCard] == '02H')
			dealerCollectiveSum += 2;
		else if (cardArray[randomCard] == '03C' || cardArray[randomCard] == '03S' || cardArray[randomCard] == '03D' || cardArray[randomCard] == '03H')
			dealerCollectiveSum += 3;
		else if (cardArray[randomCard] == '04C' || cardArray[randomCard] == '04S' || cardArray[randomCard] == '04D' || cardArray[randomCard] == '04H')
			dealerCollectiveSum += 4;
		else if (cardArray[randomCard] == '05C' || cardArray[randomCard] == '05S' || cardArray[randomCard] == '05D' || cardArray[randomCard] == '05H')
			dealerCollectiveSum += 5;    			
		else if (cardArray[randomCard] == '06C' || cardArray[randomCard] == '06S' || cardArray[randomCard] == '06D' || cardArray[randomCard] == '06H')
			dealerCollectiveSum += 6;
		else if (cardArray[randomCard] == '07C' || cardArray[randomCard] == '07S' || cardArray[randomCard] == '07D' || cardArray[randomCard] == '07H')
			dealerCollectiveSum += 7;
		else if (cardArray[randomCard] == '08C' || cardArray[randomCard] == '08S' || cardArray[randomCard] == '08D' || cardArray[randomCard] == '08H')
			dealerCollectiveSum += 8;   
		else if (cardArray[randomCard] == '09C' || cardArray[randomCard] == '09S' || cardArray[randomCard] == '09D' || cardArray[randomCard] == '09H')
			dealerCollectiveSum += 9;
		else if (cardArray[randomCard] == '10C' || cardArray[randomCard] == '10S' || cardArray[randomCard] == '10D' || cardArray[randomCard] == '10H')
			dealerCollectiveSum += 10;
		else if (cardArray[randomCard] == 'JC' || cardArray[randomCard] == 'JS' || cardArray[randomCard] == 'JD' || cardArray[randomCard] == 'JH')
			dealerCollectiveSum += 10;    			
		else if (cardArray[randomCard] == 'QC' || cardArray[randomCard] == 'QS' || cardArray[randomCard] == 'QD' || cardArray[randomCard] == 'QH')
			dealerCollectiveSum += 10;
		else if (cardArray[randomCard] == 'KC' || cardArray[randomCard] == 'KS' || cardArray[randomCard] == 'KD' || cardArray[randomCard] == 'KH')
			dealerCollectiveSum += 10;
		else if (cardArray[randomCard] == 'AC' || cardArray[randomCard] == 'AS' || cardArray[randomCard] == 'AD' || cardArray[randomCard] == 'AH') {
			if(dealerCollectiveSum < 11)
				dealerCollectiveSum += 11;
			else
				dealerCollectiveSum += 1;   
		}
	}

	if(player1CollectiveSum == 21) {
		playerID++;
	}

	if(player1CollectiveSum == 21) {
		document.getElementById('hitButton').disabled = true;
		document.getElementById('standButton').disabled = true;
		gameStateElement.innerHTML = "You got Blackjack! Dealer's Turn";
		dealerTurn();
	}

	if(dealerCollectiveSum == 21) {
		document.getElementById('hitButton').disabled = true;
		document.getElementById('standButton').disabled = true;
		gameStateElement.innerHTML = "Dealer's Blackjack! You Lose";
	}
}