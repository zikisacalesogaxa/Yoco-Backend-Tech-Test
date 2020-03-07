const assert = require ('assert');
const yocojack = require ('../lib/yocojack.js');
const testdata = require ('../data/tests.json');

describe ('yocojack tests', () => {

//   it(`[${testdata[79].playerA}], [${testdata[79].playerB}]`, (done) => {
//       assert.equal(testdata[79].playerAWins, yocojack(testdata[79]));
//       done();
//   });

  for (let i = 0; i < testdata.length; i++) {
    const result = testdata[i];
    it (`player A wins: ${result.playerAWins} on hands [${result.playerA}] v [${result.playerB}]`, done => {
      assert.equal (result.playerAWins, yocojack (testdata[i]));
      done ();
    });
  }
  
});
