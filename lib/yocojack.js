// suit scrapper
const suits = { "S": 4, "H": 3, "C": 2, "D": 1 }

const deck = {
	2: suits,
	3: suits,
	4: suits,
	5: suits,
	6: suits,
	7: suits,
	8: suits,
	9: suits,
	K: suits,
	Q: suits,
	J: suits,
	10: suits,
	A: suits,
}

function suitScrapper(card) {
	var result;
	var mapObj = { S: '', D: '', C: '', H: '' };
	result = card.replace (/S|D|C|H/gi, function (matched) {
		return mapObj[matched];
	});
	return result;
}

function cardValueConverter(card) {
	let result;
	var mapObj = { J: 10, K: 10, Q: 10, A: 11 };
	result = card.replace (/J|K|Q|A/gi, function (matched) {
		return mapObj[matched];
	});
	return result;
}

function handCardValueConverter (hand) {
	let result = [];
	hand.map(card => {
		result.push(cardValueConverter(card));
	});
	return result;
}

function handSuitScrapper(hand) {
	let result = [];
	hand.map(card => {
		result.push(suitScrapper(card));
	});
	return result;
}

function highestSuitCard(cardA, cardB) {
	// cardA
	let cnA = (cardA.indexOf('10') > -1) ? 10 : cardA.split('')[0];
	let csA = (cnA == 10) ? cardA.split('')[2] : cardA.split('')[1];
	// cardB
	let cnB = (cardB.indexOf('10') > -1) ? 10 : cardB.split('')[0];
	let csB = (cnB == 10) ? cardB.split('')[2] : cardB.split('')[1];

	if (cnA == cnB) {
		if (suits[csA] > suits[csB]) {
			return cardA;
		} else {
			return cardB;
		}
	} else {
		return;
	}
}

function highestCard(hand) {
	let highCard = hand[0];

	hand.map(card => {
		let cn = (card.indexOf('10') > -1) ? 10 : card.split('')[0];
		let cs = (cn == 10) ? card.split('')[2] : card.split('')[1];

		if (cn > suitScrapper(highCard)) highCard = card;
	});

	return highCard;
}

function highestHand(handA, handB) {
	let highestHandA = handCardValueConverter(handA);
	let highestHandB = handCardValueConverter(handB);

	let highSuitCard = highestSuitCard(highestCard(highestHandA), highestCard(highestHandB));

	if (highestHandA.find(card => card == highSuitCard) == highSuitCard) {
		return 'handA';
	} else {
		return 'handB'
	}
}

function handTotal (hand) {
	return hand.reduce((a, b) => Number(a) + Number(b));
}

function aceCheck(hand) {
	return hand.filter(card => card == 11);
}

module.exports = (handA, handB) => {
	let aTotal = handTotal(handSuitScrapper(handCardValueConverter(handA)));
	let bTotal = handTotal(handSuitScrapper(handCardValueConverter(handB)));

	if (aTotal > 21) {
		return false;
	} else if (bTotal > 21) {
		return true;
	} else {
		if (aTotal > bTotal) {
			return true;
		} else if (bTotal > aTotal) {
			return false;
		} else if (aTotal == bTotal) {
			if (aceCheck(handSuitScrapper(handA)) == 11) {
				return true;
			} else if (aceCheck(handSuitScrapper(handB)) == 11) {
				return false;
			} else {
				if (highestHand(handA, handB) == 'handA') {
					// console.log('true');
					return true;
				}
				// console.log('false');
				return false;
			}
		}
	}
};
