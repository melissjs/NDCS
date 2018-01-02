const THM = {

  // for creating records

  affidavitObj: {
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

  amendmentObj: {
    incorrectSelection: 'thisIncorrectSelection',
    correctSelection: 'thisCorrectSelection',
    volunteerId: '5a3047c071b36b39cfce6640',
    auth: {
      authenticatingUserId: '5a3047c071b36b39cfce6641',
      date: Date.now()
    },
    electionId: '5a3047c071b36b39cfce6640',
    timestamp: Date.now()
  },

  anomalyObj: {
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

  candidateObj: {
    name: 'thisCandidateName',
    party: 'thisCandidateParty',
    electOffice: ['5a3047c071b36b39cfce6640'],
  },

  contactObj: {
    userId: '5a3047c071b36b39cfce6640',
    firstName: 'thisContactFirstName',
    lastName: 'thisContactLastName',
    emailAddress: 'thisContact@email.address',
    timestamp: Date.now()
  },

  demographicsObj: {
    sex: 'female',
    age: '35-44',
    ethnicity: ['asian'],
    partyAffiliation: 'independent',
    annualIncome: '1M+',
    education: 'underGraduateSchool',
    maritalStatus: 'unmarried',
    naturalizedCitizen: false,
    firstTimeVoter: false,
    voteId: '5a3047c071b36b39cfce6640',
    volunteerId: '5a3047c071b36b39cfce6640',
    timestamp: Date.now()
  },

  electionObj: {
    cIId: 'thiscIId',
    electionTitle: 'thisElectionTitle',
    electionDay: Date.now(),
    electionType: 'primary',
    ocdDivisionId: 'thisOcdDivisionId',
    previousElection: '5a3047c071b36b39cfce6640',
  },

  electOfficeObj: {
    election: '5a3047c071b36b39cfce6640',
    office: 'thisOffice',
    mandatory: true,
  },

  evidenceObj: {
    originRecord: 'Anomaly',
    kind: 'image',
    fileName: 'image.jpg',
    tags: ['givenIncorrectBallot', 'pollingStationProblem'],
    anomalyId: '5a3047c071b36b39cfce1122'
  },

  officeVoteObj: {
    electOfficeId: '5a3047c071b36b39cfce6640',
    candidateId: '5a3047c071b36b39cfce6641',
    levelOfSupport: 'highly',
    rankedVotes: [{ 
      candidate: '5a3047c071b36b39cfce6640',
      choice: 1,
     }, { 
      candidate: '5a3047c071b36b39cfce6641',
      choice: 2,
     }],
    voteId: '5a3047c071b36b39cfce6640'
  },

  pollingstationObj: {
    electionId: '5a3047c071b36b39cfce6640',
    precinctNumber: 'thisPrecinctNumber',
    locationName: 'thisLocationName',
    streetAddress: 'thisStreetAddress',
    city: 'thisCity',
    state: 'thisState',
    zip: 11111
  },

   userObj: {
    username: 'thisUsername',
    password: 'thisPassword',
    userRoles: [{
      role: 'user',
      active: true,
      dateInitiated: [Date.now()],
      dateActivated: [Date.now()],
      dateInactivated: [null]
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
    }],
    firstName: 'thisVolunteerFirstName', 
    lastName: 'thisVolunteerLastName',
    emailAddress: 'thisVolunteer@Email.Address',
    exposeEmail: 'thisVolunteerExposeEmail',
    phoneNumber: 1111111111,
    age: 22,
    sex: 'female',
    partyAffiliation: 'thisVolunteerPartyAffiliation',
    schedule: [{
      pollingStationId: '5a3047c071b36b39cfce6640',
      electionId: '5a3047c071b36b39cfce6640',
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
        //  electionId: '5a3047c071b36b39cfce6640'
      }]
    }]
  },

  voteObj: {
    voteSuccessDetails: [{
      election: '5a3047c071b36b39cfce6640',
      success: false,
      couldNotVoteReason: 'noTimeOff', 
      castBy: 'votingMachine',
    }],
    samePreviousVotePollingLocation: 'no',
    officeVotes: ['5a3047c071b36b39cfce6640', '5a3047c071b36b39cfce6641', '5a3047c071b36b39cfce6642', '5a3047c071b36b39cfce6643'],
    evidence: ['5a3047c071b36b39cfce6640'],
    volunteerId: '5a3047c071b36b39cfce6640',
    electionId: '5a3047c071b36b39cfce6640',
    timestamp: Date.now()
  },

  // for virtual office votes

  officeVoteObj1: {
    electOfficeId: '5a43f25081fbb7218e9122fd',
    candidateId: '5a3047c071b36b39cfce6641',
    levelOfSupport: 'highly',
    rankedVotes: [{ 
      candidate: '5a3047c071b36b39cfce6640',
      choice: 1,
     }, { 
      candidate: '5a3047c071b36b39cfce6641',
      choice: 2,
     }],
    voteId: '5a3047c071b36b39cfce6640'
  },

  officeVoteObj2: {
    electOfficeId: '5a43f25081fbb7218e9122fd',
    candidateId: '5a3047c071b36b39cfce6641',
    levelOfSupport: 'highly',
    rankedVotes: [{ 
      candidate: '5a3047c071b36b39cfce6640',
      choice: 1,
     }, { 
      candidate: '5a3047c071b36b39cfce6641',
      choice: 2,
     }],
    voteId: '5a3047c071b36b39cfce6640'
  },

  officeVoteObj3: {
    electOfficeId: '5a43f25081fbb7218e9122fd',
    candidateId: '5a3047c071b36b39cfce6642',
    levelOfSupport: 'highly',
    rankedVotes: [{ 
      candidate: '5a3047c071b36b39cfce6640',
      choice: 1,
     }, { 
      candidate: '5a3047c071b36b39cfce6641',
      choice: 2,
     }],
    voteId: '5a3047c071b36b39cfce6640'
  },

  previousElectionObj: {
    cIId: 'thiscIId',
    electionTitle: 'thisPreviousElectionTitle',
    electionDay: Date.now(),
    electionType: 'primary',
    ocdDivisionId: 'thisOcdDivisionId',
    previousElection: '5a3047c071b36b39cfce6640',
  },

}

module.exports = THM;
