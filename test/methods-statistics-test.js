const User = require('../models/user');
const Officevote = require('../models/officevote');
const Electoffice = require('../models/electoffice');
const assert = require('assert');
const THM = require('./test-helper-methods');

describe('Methods and statistics on models', () => {

  it('officeVote candidateVoteCount statistic returns total for given electOffice and candidate', (done) => {
    const thisElectOffice = new Electoffice(THM.electOfficeObj);
    thisElectOffice.save().then(() => {
      const thisOfficeVote1 = new Officevote(THM.officeVoteObj1);
      thisOfficeVote1.set('electOfficeId', thisElectOffice._id);
      const thisOfficeVote2 = new Officevote(THM.officeVoteObj2);
      thisOfficeVote2.set('electOfficeId', thisElectOffice._id);
      const thisOfficeVote3 = new Officevote(THM.officeVoteObj3);
      thisOfficeVote3.set('electOfficeId', thisElectOffice._id);
      Promise.all([thisOfficeVote1.save(), thisOfficeVote2.save(), thisOfficeVote3.save()])
        .then(async () => {
          assert(await Officevote.candidateVoteCount(thisElectOffice._id, thisOfficeVote3.candidateId) === 1)
          done();
        })
    });
  })

})