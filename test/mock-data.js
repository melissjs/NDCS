const Affidavit = require('../models/affidavit');
const Amendment = require('../models/amendment');
const Anomaly = require('../models/anomaly');
const Candidate = require('../models/candidate');
const Contact = require('../models/contact');
const Demographics = require('../models/demographics');
const Election = require('../models/election');
const Electoffice = require('../models/electoffice');
const Evidence = require('../models/evidence');
const Officevote = require('../models/officevote')
const Pollingstation = require('../models/pollingstation');
const User = require('../models/user');
const Vote = require('../models/vote');
var bcrypt = require('bcryptjs');

const MD = {

  // affidavits
  affidavitArray:
  [
    {
      firstName: 'thisVoterFirstName', 
      lastName: 'thisVoterLastName',
      consent: true,
      streetAddress: 'thisStreetAddress',
      zip: 10001,
      emailAddress: 'thisVoter@Email.Address',
      comments: 'AffidavitComment',
      volunteerId: '5a3047c071b36b39cfce7700',
      electionId: '5a3047c071b36b39cfce6611',
      timestamp: Date.now()
    },
    {
      firstName: 'thisVoterFirstName', 
      lastName: 'thisVoterLastName',
      consent: true,
      streetAddress: 'thisStreetAddress',
      zip: 10001,
      emailAddress: 'thisVoter@Email.Address',
      comments: 'AffidavitComment',
      volunteerId: '5a3047c071b36b39cfce7711',
      electionId: '5a3047c071b36b39cfce6611',
      timestamp: Date.now()
    }
  ],

  mockAffidavits: function(arr) {
    arr.forEach((el) => {
      let EL = new Affidavit(el);
      EL.save()
      .then(() => {
      })
      .catch((e) => {
        console.log('Mock data error: ', e);
      });
    })
  },

  // amendments
  amendmentArray:
  [
    {
      incorrectSelection: 'thisIncorrectSelection',
      correctSelection: 'thisCorrectSelection',
      volunteerId: '5a3047c071b36b39cfce7722',
      auth: {
        authenticatingUserId: '5a3047c071b36b39cfce7711',
        date: Date.now()
      },
      electionId: '5a3047c071b36b39cfce6611',
      timestamp: Date.now()
    },
    {
      incorrectSelection: 'thisIncorrectSelection',
      correctSelection: 'thisCorrectSelection',
      volunteerId: '5a3047c071b36b39cfce7700',
      auth: {
        authenticatingUserId: '5a3047c071b36b39cfce7711',
        date: Date.now()
      },
      electionId: '5a3047c071b36b39cfce6611',
      timestamp: Date.now()
    }
  ],

  mockAmendments: function(arr) {
    arr.forEach((el) => {
      let EL = new Amendment(el);
      EL.save()
      .then(() => {
      })
      .catch((e) => {
        console.log('Mock data error: ', e);
      });
    })
  },

  //anomaly
  anomalyArray:
  [
    {
      nature: 'Name not on voter role',
      firstName: 'thisVoterFirstName',
      lastName: 'thisVoterLastName',
      consentToContact: true,
      emailAddress: 'thisVoterEmailAddress',
      phoneNumber: '1111111111',
      comments: 'thisComment',
      evidence: [],
      volunteerId: '5a3047c071b36b39cfce7722',
      electionId: '5a3047c071b36b39cfce6611',
      timestamp: Date.now()
    },
    {
      nature: 'Incorrect registration',
      firstName: 'thisVoterFirstName',
      lastName: 'thisVoterLastName',
      consentToContact: true,
      emailAddress: 'thisVoterEmailAddress',
      phoneNumber: '1111111111',
      comments: 'thisComment',
      evidence: [],
      volunteerId: '5a3047c071b36b39cfce7722',
      electionId: '5a3047c071b36b39cfce6611',
      timestamp: Date.now()
    }
  ],

  mockAnomaliesAndEvidence: async function() {
    let anomaly1 = new Anomaly(this.anomalyArray[0]);
    let evidence1 = new Evidence(this.evidenceArray[0]);
    let evidence2 = new Evidence(this.evidenceArray[1]);
    anomaly1.evidence.push(evidence1);
    anomaly1.evidence.push(evidence2);
    let anomaly2 = new Anomaly(this.anomalyArray[1]);
    let evidence3 = new Evidence(this.evidenceArray[2]);
    anomaly2.evidence.push(evidence3);
    evidence1.anomalyId = anomaly1._id;
    evidence2.anomalyId = anomaly1._id;
    evidence3.anomalyId = anomaly2._id;
    await Promise.all([anomaly1.save(), anomaly2.save(), evidence1.save(), evidence2.save(), evidence3.save()]);
  },

  //candidate
  candidateArray:
  [
    {
      name: 'Congress Candidate One',
      party: 'Independent',
      electOffice: ['5a3047c071b36b39cfce6622'],
    },
    {
      name: 'Congress Candidate Two',
      party: 'Democratic',
      electOffice: ['5a3047c071b36b39cfce6622'],
    },
    {
      name: 'Senate Candidate One',
      party: 'Democratic',
      electOffice: ['5a3047c071b36b39cfce6633'],
    }
  ],

  mockCandidates: async function() {
    let cC1 = new Candidate(this.candidateArray[0]);
    cC1.set('_id', '5a3047c071b36b39cfce6677');
    let cC2 = new Candidate(this.candidateArray[0]);
    cC1.set('_id', '5a3047c071b36b39cfce6688');
    let sC1 = new Candidate(this.candidateArray[0]);
    cC1.set('_id', '5a3047c071b36b39cfce6699');
    await Promise.all([cC1.save(), cC2.save(), sC1.save()])
  },

  // contact
  contactArray:
  [
    {
      userId: '5a3047c071b36b39cfce7700',
      firstName: 'thisContactFirstName',
      lastName: 'thisContactLastName',
      emailAddress: 'thisContact@email.address',
      timestamp: Date.now()
    },
    {
      firstName: 'thisContactFirstName',
      lastName: 'thisContactLastName',
      emailAddress: 'thisContact@email.address',
      timestamp: Date.now()
    }
  ],

  mockContacts: function(arr) {
    arr.forEach((el) => {
      let EL = new Contact(el);
      EL.save()
      .then(() => {
      })
      .catch((e) => {
        console.log('Mock data error: ', e);
      });
    })
  },

  // demographics
  demographicsArray:
  [
    {
      sex: 'female',
      age: '35-44',
      ethnicity: ['asian'],
      partyAffiliation: 'independent',
      annualIncome: '1M+',
      education: 'underGraduateSchool',
      maritalStatus: 'unmarried',
      naturalizedCitizen: false,
      firstTimeVoter: false,
      voteId: '5a3047c071b36b39cfce9900',
      volunteerId: '5a3047c071b36b39cfce7700',
      timestamp: Date.now()
    },
    {
      sex: 'female',
      age: '35-44',
      ethnicity: ['asian'],
      partyAffiliation: 'independent',
      annualIncome: '1M+',
      education: 'underGraduateSchool',
      maritalStatus: 'unmarried',
      naturalizedCitizen: false,
      firstTimeVoter: false,
      voteId: '5a3047c071b36b39cfce9911',
      volunteerId: '5a3047c071b36b39cfce7700',
      timestamp: Date.now()
    }
  ],

  mockDemographics: function(arr) {
    arr.forEach((el) => {
      let EL = new Demographics(el);
      EL.save()
      .then(() => {
      })
      .catch((e) => {
        console.log('Mock data error: ', e);
      });
    })
  },

  // election
  electionArray:
  [
    {
      cIId: '2016',
      electionTitle: '2016 General Election',
      electionDay: Date.now(),
      electionType: 'general',
      ocdDivisionId: 'thisOcdDivisionId',
      previousElection: '5a3047c071b36b39cfce6643',
    },
    {
      cIId: '2018',
      electionTitle: '2018 Midterm Election',
      electionDay: Date.now(),
      electionType: 'primary',
      ocdDivisionId: 'thisOcdDivisionId',
      previousElection: '5a3047c071b36b39cfce6600',
    }
  ],

  mockElections: async function() {
    let previousElection = new Election(this.electionArray[0]);
    previousElection.set('_id', '5a3047c071b36b39cfce6600');
    await previousElection.save()
    .then(() => {
      let currentElection = new Election(this.electionArray[1]);
      currentElection.set('_id', '5a3047c071b36b39cfce6611');
      currentElection.save();
    })
  },


  // electoffice
  electofficeArray:
  [
    {
      election: '5a3047c071b36b39cfce6611',
      office: 'Congress - District 34',
      mandatory: true,
    },
    {
      election: '5a3047c071b36b39cfce6611',
      office: 'Senate',
      mandatory: false,
    }
  ],

  mockElectOffices: async function() {
    let congress2018 = new Electoffice(this.electofficeArray[0]);
    congress2018.set('_id', '5a3047c071b36b39cfce6622');
    let senate2018 = new Electoffice(this.electofficeArray[1]);
    senate2018.set('_id', '5a3047c071b36b39cfce6633');
    await Promise.all([congress2018.save(), senate2018.save()]);
  },

  // evidence
  evidenceArray:
  [
    {
      originRecord: 'anomaly',
      kind: 'image',
      fileName: 'image.jpg',
      tags: ['givenIncorrectBallot', 'pollingStationProblem'],
      anomalyId:'5a3047c071b36b39cfce6640'
    },
    {
      originRecord: 'anomaly',
      kind: 'video',
      fileName: 'image.mp3',
      tags: ['givenIncorrectBallot', 'pollingStationProblem'],
      anomalyId:'5a3047c071b36b39cfce6640'
    },
    {
      originRecord: 'vote',
      kind: 'audio',
      fileName: 'image.wav',
      tags: ['givenIncorrectBallot', 'pollingStationProblem'],
      voteId:'5a3047c071b36b39cfce6640'
    }
  ],

  // moved to mockAnomaliesAndEvidence
  // mockEvidence: function(arr) {
  //   arr.forEach((el) => {
  //     let EL = new Evidence(el);
  //     EL.save()
  //     .then(() => {
  //     })
  //     .catch((e) => {
  //       console.log('Mock data error: ', e);
  //     });
  //   })
  // },

  // officevote
  officevoteArray:
  [
    { 
      electOfficeId: '5a3047c071b36b39cfce6622',
      candidateId: '5a3047c071b36b39cfce6677',
      levelOfSupport: 'highly',
      rankedVotes: [{ 
        candidate: '5a3047c071b36b39cfce6677',
        choice: 1,
        }, { 
        candidate: '5a3047c071b36b39cfce6688',
        choice: 2,
        }],
      voteId: '5a3047c071b36b39cfce9900'
    },
    {
      electOfficeId: '5a3047c071b36b39cfce6622',
      candidateId: '5a3047c071b36b39cfce6688',
      levelOfSupport: 'highly',
      rankedVotes: [{ 
        candidate: '5a3047c071b36b39cfce6688',
        choice: 1,
        }, { 
        candidate: '5a3047c071b36b39cfce6677',
        choice: 2,
        }],
      voteId: '5a3047c071b36b39cfce9911'
    },
    {
      electOfficeId: '5a3047c071b36b39cfce6633',
      candidateId: '5a3047c071b36b39cfce6699',
      levelOfSupport: 'highly',
      rankedVotes: [],
      voteId: '5a3047c071b36b39cfce9922'
    }
  ],

  // Moved into mockVotes
  // mockOfficeVotes: function(arr) {
  //   arr.forEach((el) => {
  //     let EL = new Officevote(el);
  //     EL.save()
  //     .then(() => {
  //     })
  //     .catch((e) => {
  //       console.log('Mock data error: ', e);
  //     });
  //   })
  // },

  // pollingstation
  pollingstationArray:
  [
    {
      electionId: ['5a3047c071b36b39cfce6611'],
      precinctNumber: '2600',
      locationName: 'Federal Building',
      streetAddress: '444 thisStreetAddress',
      city: 'Hollywood',
      state: 'FL',
      zip: 11111
    },
    {
      electionId: ['5a3047c071b36b39cfce6611'],
      precinctNumber: '2001A - 2001B',
      locationName: 'Angeles High School',
      streetAddress: '555 thisStreetAddress',
      city: 'Hollywood',
      state: 'FL',
      zip: 11111
    },
    {
      electionId: ['5a3047c071b36b39cfce6611'],
      precinctNumber: '2800',
      locationName: 'Westwood Masonic Lodge',
      streetAddress: '666 thisStreetAddress',
      city: 'Atlanta',
      state: 'FL',
      zip: 11111
    }
  ],

  mockPollingstations: async function() {
    let federalStation = new Pollingstation(this.pollingstationArray[0]);
    federalStation.set('_id', '5a3047c071b36b39cfce6644');
    let angelesStation = new Pollingstation(this.pollingstationArray[1]);
    angelesStation.set('_id', '5a3047c071b36b39cfce6655');
    let westwoodStation = new Pollingstation(this.pollingstationArray[2]);
    westwoodStation.set('_id', '5a3047c071b36b39cfce6666');
    await Promise.all([federalStation.save(), angelesStation.save(), westwoodStation.save()]);
  },

  // user
  userArray:
  [
    ////////////////////// uaDan
    {
      username: 'uaDan',
      password: bcrypt.hashSync('thisPassword', 10),
      userRoles: [{
        role: 'user',
        active: true,
        dateInitiated: [Date.now()],
        dateActivated: [Date.now()],
        dateInactivated: [null]
      }, {
        role: 'admin',
        active: true,
        dateInitiated: [Date.now()],
        dateActivated: [Date.now()],
        dateInactivated: [null],
        auth: {
          authenticatingUserId: '5a3047c071b36b39cfce7711',
          date: Date.now()
        }
      }],
      firstName: 'Dan', 
      lastName: 'Wolf',
      emailAddress: 'thisVolunteer1@Email.Address',
      exposeEmail: true,
      phoneNumber: 1111111111,
      age: 22,
      sex: 'noAnswer',
      partyAffiliation: 'Democratic',
      // schedule: [{
      //   pollingStationId: '5a3047c071b36b39cfce6644',
      //   electionId: '5a3047c071b36b39cfce6611',
      //   shifts: [1,2,3],
      //   timeSheet: [{
      //     inOrOut: 'in',
      //     location: {
      //       type: 'Point', 
      //       coordinates: [111, 111]
      //      },
      //      date: Date.now(),
      //      auth: {
      //        authenticatingUserId: '5a3047c071b36b39cfce7711',
      //        date: Date.now()
      //      }
      //   }]
      // }]
    },
    ////////////////////// uvdl1Westwood2018
    {
      username: 'uvdl1Westwood2018',
      password: bcrypt.hashSync('thisPassword', 10),
      userRoles: [{
        role: 'user',
        active: true,
        dateInitiated: [Date.now()],
        dateActivated: [Date.now()],
        dateInactivated: [null],
        auth: {
          authenticatingUserId: '5a3047c071b36b39cfce6640',
          date: Date.now()
        },
      }, {
        role: 'volunteer',
        active: true,
        dateInitiated: [Date.now()],
        dateActivated: [Date.now()],
        dateInactivated: [null],
        auth: {
          authenticatingUserId: '5a3047c071b36b39cfce6640',
          date: Date.now()
        }
      }, {
        role: 'auditor',
        active: true,
        dateInitiated: [Date.now()],
        dateActivated: [Date.now()],
        dateInactivated: [null],
        auth: {
          authenticatingUserId: '5a3047c071b36b39cfce6640',
          date: Date.now()
        }
      }, {
        role: 'lead',
        active: true,
        dateInitiated: [Date.now()],
        dateActivated: [Date.now()],
        dateInactivated: [null],
        auth: {
          authenticatingUserId: '5a3047c071b36b39cfce6640',
          date: Date.now()
        }
      }],
      firstName: 'Lead Volunteer', 
      lastName: 'One',
      emailAddress: 'thisVolunteer2@Email.Address',
      exposeEmail: true,
      phoneNumber: 2222222222,
      age: 22,
      sex: 'female',
      partyAffiliation: 'Republican',
      schedule: [{
        pollingStationId: '5a3047c071b36b39cfce6666',
        electionId: '5a3047c071b36b39cfce6611',
        shifts: [1,2,3],
        timeSheet: [{
          inOrOut: 'in',
          location: {
            type: 'Point', 
            coordinates: [111, 111]
           },
           date: Date.now(),
           auth: {
             authenticatingUserId: '5a3047c071b36b39cfce6640',
             date: Date.now()
           }
        }]
      }]
    }, 
    ////////////////////// uvd2Westwood2018
    {
      username: 'uvd2Westwood2018',
      password: bcrypt.hashSync('thisPassword', 10),
      userRoles: [{
        role: 'user',
        active: true,
        dateInitiated: [Date.now()],
        dateActivated: [Date.now()],
        dateInactivated: [null],
        auth: {
          authenticatingUserId: '5a3047c071b36b39cfce6640',
          date: Date.now()
        },
      }, {
        role: 'volunteer',
        active: true,
        dateInitiated: [Date.now()],
        dateActivated: [Date.now()],
        dateInactivated: [null],
        auth: {
          authenticatingUserId: '5a3047c071b36b39cfce6640',
          date: Date.now()
        }
      }, {
        role: 'auditor',
        active: true,
        dateInitiated: [Date.now()],
        dateActivated: [Date.now()],
        dateInactivated: [null],
        auth: {
          authenticatingUserId: '5a3047c071b36b39cfce6640',
          date: Date.now()
        }
      }
    ],
      firstName: 'Volunteer', 
      lastName: 'One',
      emailAddress: 'thisVolunteerw2@Email.Address',
      exposeEmail: true,
      phoneNumber: 2222222223,
      age: 22,
      sex: 'female',
      partyAffiliation: 'Republican',
      schedule: [{
        pollingStationId: '5a3047c071b36b39cfce6666',
        electionId: '5a3047c071b36b39cfce6611',
        shifts: [1,2,3],
        timeSheet: [{
          inOrOut: 'in',
          location: {
            type: 'Point', 
            coordinates: [111, 111]
           },
           date: Date.now(),
           auth: {
             authenticatingUserId: '5a3047c071b36b39cfce6640',
             date: Date.now()
           }
        }]
      }]
    },
    ////////////////////// uvd2Federal2018
    {
      username: 'uvd2Federal2018',
      password: bcrypt.hashSync('thisPassword', 10),
      userRoles: [{
        role: 'user',
        active: true,
        dateInitiated: [Date.now()],
        dateActivated: [Date.now()],
        dateInactivated: [null],
        auth: {
          authenticatingUserId: '5a3047c071b36b39cfce6640',
          date: Date.now()
        },
      }, {
        role: 'volunteer',
        active: true,
        dateInitiated: [Date.now()],
        dateActivated: [Date.now()],
        dateInactivated: [null],
        auth: {
          authenticatingUserId: '5a3047c071b36b39cfce6640',
          date: Date.now()
        }
      }, {
        role: 'auditor',
        active: true,
        dateInitiated: [Date.now()],
        dateActivated: [Date.now()],
        dateInactivated: [null],
        auth: {
          authenticatingUserId: '5a3047c071b36b39cfce6640',
          date: Date.now()
        }
      }
    ],
      firstName: 'Volunteer', 
      lastName: 'Two',
      emailAddress: 'thisVolunteer3@Email.Address',
      exposeEmail: false,
      phoneNumber: 3333333333,
      age: 22,
      sex: 'male',
      partyAffiliation: 'Green',
      schedule: [{
        pollingStationId: '5a3047c071b36b39cfce6644',
        electionId: '5a3047c071b36b39cfce6611',
        shifts: [1,2,3],
        timeSheet: [{
          inOrOut: 'in',
          location: {
            type: 'Point', 
            coordinates: [111, 111]
           },
           date: Date.now(),
           auth: {
             authenticatingUserId: '5a3047c071b36b39cfce7711',
             date: Date.now()
           }
        }]
      }]
    }
  ],

  mockUsers: async function() {
    let user1 = new User(this.userArray[0]);
    user1.set('_id', '5a3047c071b36b39cfce7700');
    let user2 = new User(this.userArray[1]);
    user2.set('_id', '5a3047c071b36b39cfce7711');
    let user3 = new User(this.userArray[2]);
    user3.set('_id', '5a3047c071b36b39cfce7712');
    let user4 = new User(this.userArray[3]);
    user4.set('_id', '5a3047c071b36b39cfce7722');
    await Promise.all([user1.save(), user2.save(), user3.save(), user4.save()])
  },

  // vote
  voteArray:
  [
    {
      voteSuccessDetails: [{
        election: '5a3047c071b36b39cfce6611',
        success: false,
        couldNotVoteReason: 'noTimeOff', 
        castBy: 'votingMachine',
      }, {
        election: '5a3047c071b36b39cfce6600',
        success: false,
        couldNotVoteReason: 'noTimeOff', 
        castBy: 'votingMachine',
      }],
      samePreviousVotePollingLocation: 'no',
      officeVotes: ['5a3047c071b36b39cfce8800', '5a3047c071b36b39cfce8822', '5a3047c071b36b39cfce0001', '5a3047c071b36b39cfce0000'],
      volunteerId: '5a3047c071b36b39cfce7700',
      electionId: '5a3047c071b36b39cfce6611',
      timestamp: Date.now()
    },
    {
      voteSuccessDetails: [{
        election: '5a3047c071b36b39cfce6611',
        success: false,
        couldNotVoteReason: 'noTimeOff', 
        castBy: 'votingMachine',
      }],
      samePreviousVotePollingLocation: 'no',
      officeVotes: ['5a3047c071b36b39cfce8811', '5a3047c071b36b39cfce8822'],
      volunteerId: '5a3047c071b36b39cfce7711',
      electionId: '5a3047c071b36b39cfce6611',
      timestamp: Date.now()
    },
    {
      voteSuccessDetails: [{
        election: '5a3047c071b36b39cfce6611',
        success: false,
        couldNotVoteReason: 'noTimeOff', 
        castBy: 'votingMachine',
      }],
      samePreviousVotePollingLocation: 'no',
      officeVotes: ['5a3047c071b36b39cfce8800', '5a3047c071b36b39cfce8822', '5a3047c071b36b39cfce0001', '5a3047c071b36b39cfce0000'],
      volunteerId: '5a3047c071b36b39cfce7722',
      electionId: '5a3047c071b36b39cfce6611',
      timestamp: Date.now()
    }
  ],

  mockVotesAndOfficeVotes: async function() {
    let vote1 = new Vote(this.voteArray[0]);
    vote1.set('_id', '5a3047c071b36b39cfce9900');
    let vote2 = new Vote(this.voteArray[1]);
    vote2.set('_id', '5a3047c071b36b39cfce9911');
    let vote3 = new Vote(this.voteArray[2]);
    vote3.set('_id', '5a3047c071b36b39cfce9922');
    let officeVote1 = new Officevote(this.officevoteArray[0]);
    officeVote1.set('_id', '5a3047c071b36b39cfce8800');
    let officeVote2 = new Officevote(this.officevoteArray[1]);
    officeVote2.set('_id', '5a3047c071b36b39cfce8811');
    let officeVote3 = new Officevote(this.officevoteArray[2]);
    officeVote3.set('_id', '5a3047c071b36b39cfce8822');
    await Promise.all([vote1.save(), vote2.save(), vote3.save(), officeVote1.save(), officeVote2.save(), officeVote3.save()])
  },

  // FUNCTIONS

  createMockData: async function() {
    await MD.mockElections()
    .then(() => MD.mockElectOffices())
    .then(() => MD.mockPollingstations())
    .then(() => MD.mockCandidates())
    .then(() => MD.mockUsers())
    .then(() => MD.mockVotesAndOfficeVotes())
    .then(() => MD.mockDemographics(MD.demographicsArray))
    .then(() => MD.mockAnomaliesAndEvidence())
    .then(() => MD.mockAffidavits(MD.affidavitArray))
    .then(() => MD.mockAmendments(MD.amendmentArray))
    .then(() => MD.mockContacts(MD.contactArray))
    .then(() => console.log('Mock data created'))
  },

  deleteMockData: async function() {
    await Promise.all([
      Affidavit.remove({}), 
      Amendment.remove({}), 
      Anomaly.remove({}), 
      Candidate.remove({}),
      Contact.remove({}),
      Demographics.remove({}),
      Election.remove({}),
      Electoffice.remove({}),
      Evidence.remove({}),
      Officevote.remove({}),
      Pollingstation.remove({}),
      User.remove({}),
      Vote.remove({})
    ])
      .then(() => console.log('Deleted all mock data'))
  },

  cleanMockData: async function() {
    await this.deleteMockData().then(() => this.createMockData())
  }

}

module.exports = MD;

// mock data _id keys
// previousElection: 5a3047c071b36b39cfce6600
// currentElection: 5a3047c071b36b39cfce6611
// electOffice (congress): 5a3047c071b36b39cfce6622
// electOffice (senate): 5a3047c071b36b39cfce6633
// pollingStation (federal): 5a3047c071b36b39cfce6644
// pollingStation (angeles): 5a3047c071b36b39cfce6655
// pollingStation (westood): 5a3047c071b36b39cfce6666
// candidate (cc1): 5a3047c071b36b39cfce6677
// candidate (cc2): 5a3047c071b36b39cfce6688
// candidate (sc1): 5a3047c071b36b39cfce6699
// user1: uaDan               5a3047c071b36b39cfce7700
// user2: uvdl1Westwood2018   5a3047c071b36b39cfce7711
// user3: uvd2Westwood2018:   5a3047c071b36b39cfce7712
// user4: uvd2Federal2018     5a3047c071b36b39cfce7722
// officevote (c1): 5a3047c071b36b39cfce8800
// officevote (c2): 5a3047c071b36b39cfce8811
// officevote (s1): 5a3047c071b36b39cfce8822
// vote1: 5a3047c071b36b39cfce9900
// vote1: 5a3047c071b36b39cfce9911
// vote1: 5a3047c071b36b39cfce9922