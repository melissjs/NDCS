const Affidavit = require('../models/affidavit');
const Amendment = require('../models/amendment');
const Anomaly = require('../models/anomaly');
const User = require('../models/user');
const Election = require('../models/election');
const Pollingstation = require('../models/pollingstation');


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
      volunteerId: '5a3047c071b36b39cfce6640',
      electionId: '5a3047c071b36b39cfce6640',
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
      volunteerId: '5a3047c071b36b39cfce6640',
      electionId: '5a3047c071b36b39cfce6640',
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
      volunteerId: '5a3047c071b36b39cfce6640',
      authenticatingVolunteerId: '5a3047c071b36b39cfce6641',
      electionId: '5a3047c071b36b39cfce6640',
      timestamp: Date.now()
    },
    {
      incorrectSelection: 'thisIncorrectSelection',
      correctSelection: 'thisCorrectSelection',
      volunteerId: '5a3047c071b36b39cfce6640',
      authenticatingVolunteerId: '5a3047c071b36b39cfce6641',
      electionId: '5a3047c071b36b39cfce6640',
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
      nature: 'thisNature',
      firstName: 'thisVoterFirstName',
      lastName: 'thisVoterLastName',
      consentToContact: true,
      emailAddress: 'thisVoterEmailAddress',
      phoneNumber: '1111111111',
      comments: 'thisComment',
      evidence: ['5a3047c071b36b39cfce6640'],
      volunteerId: '5a3047c071b36b39cfce6640',
      electionId: '5a3047c071b36b39cfce6640',
      timestamp: Date.now()
    },
    {
      nature: 'thisNature',
      firstName: 'thisVoterFirstName',
      lastName: 'thisVoterLastName',
      consentToContact: true,
      emailAddress: 'thisVoterEmailAddress',
      phoneNumber: '1111111111',
      comments: 'thisComment',
      evidence: ['5a3047c071b36b39cfce6640'],
      volunteerId: '5a3047c071b36b39cfce6640',
      electionId: '5a3047c071b36b39cfce6640',
      timestamp: Date.now()
    }
  ],

  mockAnomalies: function(arr) {
    arr.forEach((el) => {
      let EL = new Anomaly(el);
      EL.save()
      .then(() => {
      })
      .catch((e) => {
        console.log('Mock data error: ', e);
      });
    })
  },

  // //candidate 
  // [
  //   {
  //     name: 'thisCandidateName',
  //     party: 'thisCandidateParty',
  //     electOffice: ['5a3047c071b36b39cfce6640'],
  //   },
  //   {
  //     name: 'thisCandidateName',
  //     party: 'thisCandidateParty',
  //     electOffice: ['5a3047c071b36b39cfce6640'],
  //   }
  // ]

  // // contact
  // [
  //   {
  //     firstName: 'thisContactFirstName',
  //     lastName: 'thisContactLastName',
  //     phoneNumber: '1111111111',
  //     emailAddress: 'thisContact@email.address',
  //     timestamp: Date.now()
  //   },
  //   {
  //     firstName: 'thisContactFirstName',
  //     lastName: 'thisContactLastName',
  //     phoneNumber: '1111111111',
  //     emailAddress: 'thisContact@email.address',
  //     timestamp: Date.now()
  //   }
  // ]

  // // demographics
  // [
  //   {
  //     sex: 'female',
  //     age: '35-44',
  //     ethnicity: ['asian'],
  //     partyAffiliation: 'independent',
  //     annualIncome: '1M+',
  //     education: 'underGraduateSchool',
  //     maritalStatus: 'unmarried',
  //     naturalizedCitizen: false,
  //     firstTimeVoter: false,
  //     voteId: '5a3047c071b36b39cfce6640',
  //     volunteerId: '5a3047c071b36b39cfce6640',
  //     timestamp: Date.now()
  //   },
  //   {
  //     sex: 'female',
  //     age: '35-44',
  //     ethnicity: ['asian'],
  //     partyAffiliation: 'independent',
  //     annualIncome: '1M+',
  //     education: 'underGraduateSchool',
  //     maritalStatus: 'unmarried',
  //     naturalizedCitizen: false,
  //     firstTimeVoter: false,
  //     voteId: '5a3047c071b36b39cfce6640',
  //     volunteerId: '5a3047c071b36b39cfce6640',
  //     timestamp: Date.now()
  //   }
  // ]

  // // election
  // [
  //   {
  //     cIId: 'thiscIId',
  //     electionTitle: 'thisElectionTitle',
  //     electionDay: Date.now(),
  //     electionType: 'primary',
  //     ocdDivisionId: 'thisOcdDivisionId',
  //     previousElection: '5a3047c071b36b39cfce6640',
  //   },
  //   {
  //     cIId: 'thiscIId',
  //     electionTitle: 'thisElectionTitle',
  //     electionDay: Date.now(),
  //     electionType: 'primary',
  //     ocdDivisionId: 'thisOcdDivisionId',
  //     previousElection: '5a3047c071b36b39cfce6640',
  //   }
  // ]

  // // electoffice
  // [
  //   {
  //     election: '5a3047c071b36b39cfce6640',
  //     office: 'thisOffice',
  //     mandatory: true,
  //   },
  //   {
  //     election: '5a3047c071b36b39cfce6640',
  //     office: 'thisOffice',
  //     mandatory: true,
  //   }
  // ]

  // // evidence 
  // [
  //   {
  //     kind: 'image',
  //     fileName: 'image.jpg',
  //     tags: ['givenIncorrectBallot', 'pollingStationProblem'],
  //     anomalyId:'5a3047c071b36b39cfce6640'
  //   },
  //   {
  //     kind: 'video',
  //     fileName: 'image.mp3',
  //     tags: ['givenIncorrectBallot', 'pollingStationProblem'],
  //     anomalyId:'5a3047c071b36b39cfce6640'
  //   },
  //   {
  //     kind: 'audio',
  //     fileName: 'image.wav',
  //     tags: ['givenIncorrectBallot', 'pollingStationProblem'],
  //     anomalyId:'5a3047c071b36b39cfce6640'
  //   }
  // ]

  // // officevote
  // [
  //   {
  //     electOfficeId: '5a3047c071b36b39cfce6640',
  //     candidateId: '5a3047c071b36b39cfce6641',
  //     levelOfSupport: 'highly',
  //     rankedVotes: [{ 
  //       candidate: '5a3047c071b36b39cfce6640',
  //       choice: 1,
  //       }, { 
  //       candidate: '5a3047c071b36b39cfce6641',
  //       choice: 2,
  //       }],
  //     voteId: '5a3047c071b36b39cfce6640'
  //   },
  //   {
  //     electOfficeId: '5a3047c071b36b39cfce6640',
  //     candidateId: '5a3047c071b36b39cfce6641',
  //     levelOfSupport: 'highly',
  //     rankedVotes: [{ 
  //       candidate: '5a3047c071b36b39cfce6640',
  //       choice: 1,
  //       }, { 
  //       candidate: '5a3047c071b36b39cfce6641',
  //       choice: 2,
  //       }],
  //     voteId: '5a3047c071b36b39cfce6640'
  //   }
  // ]

  // // pollingstation
  // [
  //   {
  //     electionId: '5a3047c071b36b39cfce6640',
  //     precinctNumber: 'thisPrecinctNumber',
  //     locationName: 'thisLocationName',
  //     streetAddress: 'thisStreetAddress',
  //     city: 'thisCity',
  //     state: 'thisState',
  //     zip: 11111
  //   },
  //   {
  //     electionId: '5a3047c071b36b39cfce6640',
  //     precinctNumber: 'thisPrecinctNumber',
  //     locationName: 'thisLocationName',
  //     streetAddress: 'thisStreetAddress',
  //     city: 'thisCity',
  //     state: 'thisState',
  //     zip: 11111
  //   },
  //   {
  //     electionId: '5a3047c071b36b39cfce6640',
  //     precinctNumber: 'thisPrecinctNumber',
  //     locationName: 'thisLocationName',
  //     streetAddress: 'thisStreetAddress',
  //     city: 'thisCity',
  //     state: 'thisState',
  //     zip: 11111
  //   }
  // ]

  // // user
  // [
  //   {
  //     username: 'thisUsername',
  //     password: 'thisPassword',
  //     volunteerRoles: ['user', 'volunteer'],
  //     firstName: 'thisVolunteerFirstName', 
  //     lastName: 'thisVolunteerLastName',
  //     emailAddress: 'thisVolunteer@Email.Address',
  //     exposeEmail: 'thisVolunteerExposeEmail',
  //     phoneNumber: 1111111111,
  //     age: 22,
  //     sex: 'thisVolunteerSex',
  //     partyAffiliation: 'thisVolunteerPartyAffiliation',
  //     schedule: [{
  //       pollingStationId: '5a3047c071b36b39cfce6640',
  //       electionId: '5a3047c071b36b39cfce6640',
  //       shifts: [1,2,3]
  //     }],
  //     timeSheet: [{
  //       roleInOrOut: 'in',
  //       location: {
  //         type: 'Point', 
  //         coordinates: [111, 111]
  //         },
  //         authenticatingVolunteerId: '5a3047c071b36b39cfce6640',
  //         electionId: '5a3047c071b36b39cfce6640'
  //     }]
  //   },
  //   {
  //     username: 'thisUsername',
  //     password: 'thisPassword',
  //     volunteerRoles: ['user', 'volunteer'],
  //     firstName: 'thisVolunteerFirstName', 
  //     lastName: 'thisVolunteerLastName',
  //     emailAddress: 'thisVolunteer@Email.Address',
  //     exposeEmail: 'thisVolunteerExposeEmail',
  //     phoneNumber: 1111111111,
  //     age: 22,
  //     sex: 'thisVolunteerSex',
  //     partyAffiliation: 'thisVolunteerPartyAffiliation',
  //     schedule: [{
  //       pollingStationId: '5a3047c071b36b39cfce6640',
  //       electionId: '5a3047c071b36b39cfce6640',
  //       shifts: [1,2,3]
  //     }],
  //     timeSheet: [{
  //       roleInOrOut: 'in',
  //       location: {
  //         type: 'Point', 
  //         coordinates: [111, 111]
  //         },
  //         authenticatingVolunteerId: '5a3047c071b36b39cfce6640',
  //         electionId: '5a3047c071b36b39cfce6640'
  //     }]
  //   },
  //   {
  //     username: 'thisUsername',
  //     password: 'thisPassword',
  //     volunteerRoles: ['user', 'volunteer'],
  //     firstName: 'thisVolunteerFirstName', 
  //     lastName: 'thisVolunteerLastName',
  //     emailAddress: 'thisVolunteer@Email.Address',
  //     exposeEmail: 'thisVolunteerExposeEmail',
  //     phoneNumber: 1111111111,
  //     age: 22,
  //     sex: 'thisVolunteerSex',
  //     partyAffiliation: 'thisVolunteerPartyAffiliation',
  //     schedule: [{
  //       pollingStationId: '5a3047c071b36b39cfce6640',
  //       electionId: '5a3047c071b36b39cfce6640',
  //       shifts: [1,2,3]
  //     }],
  //     timeSheet: [{
  //       roleInOrOut: 'in',
  //       location: {
  //         type: 'Point', 
  //         coordinates: [111, 111]
  //         },
  //         authenticatingVolunteerId: '5a3047c071b36b39cfce6640',
  //         electionId: '5a3047c071b36b39cfce6640'
  //     }]
  //   }
  // ]

  // // vote
  // [
  //   {
  //     voteSuccessDetails: [{
  //       election: '5a3047c071b36b39cfce6640',
  //       success: false,
  //       couldNotVoteReason: 'noTimeOff', 
  //       castBy: 'votingMachine',
  //     }],
  //     samePreviousVotePollingLocation: 'no',
  //     officeVotes: ['5a3047c071b36b39cfce6640', '5a3047c071b36b39cfce6641'],
  //     PreviousOfficeVotes: ['5a3047c071b36b39cfce6642', '5a3047c071b36b39cfce6643'],
  //     volunteerId: '5a3047c071b36b39cfce6640',
  //     electionId: '5a3047c071b36b39cfce6640',
  //     timestamp: Date.now()
  //   },
  //   {
  //     voteSuccessDetails: [{
  //       election: '5a3047c071b36b39cfce6640',
  //       success: false,
  //       couldNotVoteReason: 'noTimeOff', 
  //       castBy: 'votingMachine',
  //     }],
  //     samePreviousVotePollingLocation: 'no',
  //     officeVotes: ['5a3047c071b36b39cfce6640', '5a3047c071b36b39cfce6641'],
  //     PreviousOfficeVotes: ['5a3047c071b36b39cfce6642', '5a3047c071b36b39cfce6643'],
  //     volunteerId: '5a3047c071b36b39cfce6640',
  //     electionId: '5a3047c071b36b39cfce6640',
  //     timestamp: Date.now()
  //   },
  //   {
  //     voteSuccessDetails: [{
  //       election: '5a3047c071b36b39cfce6640',
  //       success: false,
  //       couldNotVoteReason: 'noTimeOff', 
  //       castBy: 'votingMachine',
  //     }],
  //     samePreviousVotePollingLocation: 'no',
  //     officeVotes: ['5a3047c071b36b39cfce6640', '5a3047c071b36b39cfce6641'],
  //     PreviousOfficeVotes: ['5a3047c071b36b39cfce6642', '5a3047c071b36b39cfce6643'],
  //     volunteerId: '5a3047c071b36b39cfce6640',
  //     electionId: '5a3047c071b36b39cfce6640',
  //     timestamp: Date.now()
  //   }
  // ]

  // FUNCTIONS

  createMockData: function() {
    this.mockAffidavits(this.affidavitArray);
    this.mockAmendments(this.amendmentArray);
    this.mockAnomalies(this.anomalyArray);
  },

  deleteMockData: function() {
    Promise.all([Affidavit.remove({}), Amendment.remove({}), Anomaly.remove({}), User.remove({})])
      .then(() => console.log('Deleted all mock data'))
  }

}

module.exports = MD;
