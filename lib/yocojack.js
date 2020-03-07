module.exports = hand => {
  var mapObj = {
    S: '',
    D: '',
    C: '',
    H: '',
    J: 10,
    K: 10,
    Q: 10,
    A: 11,
  };

  var suitMapObj = {
    S: 1,
    H: 2,
    C: 3,
    D: 4,
  };

  var playerAHand = [];
  var playerBHand = [];

  // scrape the suit identifier
  hand.playerA.map (card => {
    var newcard = card.replace (/S|D|C|H|J|K|Q|A/gi, function (matched) {
      return mapObj[matched];
    });
    playerAHand.push (Number (newcard));
  });

  hand.playerB.map (card => {
    var newcard = card.replace (/S|D|C|H|J|K|Q|A/gi, function (matched) {
      return mapObj[matched];
    });
    playerBHand.push (Number (newcard));
  });

  // now compare the total of each
  let playerAHandTotal = playerAHand.reduce ((a, b) => a + b, 0);
  let playerBHandTotal = playerBHand.reduce ((a, b) => a + b, 0);

  //   player B hand check
  if (playerBHandTotal > 21) {
    return true;
  }

  if (playerAHandTotal > playerBHandTotal && playerAHandTotal < 21) {
    return true;
  } else {
    return false;
  }

  if (playerAHandTotal == playerBHandTotal) {
    let handAAceCheck = playerAHand.filter (card => card === 11);
    let handBAceCheck = playerBHand.filter (card => card === 11);

    if (handAAceCheck) {
      return true;
    }
    if (handBAceCheck) {
      return false;
    }
  }
};
