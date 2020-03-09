const assert = require ('assert');
const yocojack = require ('../lib/yocojack.js');
const testdata = require ('../data/tests.json');

describe ('yocojack tests', () => {

    for (let i = 0; i < testdata.length; i++) {
        const result = testdata[i];
        it (`player A wins: ${result.playerAWins} on hands [${result.playerA}] v [${result.playerB}]`, done => {
            assert.equal (result.playerAWins, yocojack (result.playerA, result.playerB));
            done ();
        });
    }

});
