RESULT { 
  ValidationError: Volunteer validation failed: schedule.0.shifts: Invalid shift options
  at ValidationError.inspect (/Users/melissjs/Desktop/codeProjects/DC/NDCS/node_modules/mongoose/lib/error/validation.js:57:23)
  at formatValue (util.js:336:36)
  at inspect (util.js:196:10)
  at exports.format (util.js:136:20)
  at Console.log (console.js:106:24)
  at thisVolunteer.save.catch (/Users/melissjs/Desktop/codeProjects/DC/NDCS/test/validate-test.js:80:17)
  at <anonymous>
  at process._tickCallback (internal/process/next_tick.js:169:7)
errors: 
 { 'schedule.0.shifts': 
    { ValidatorError: Invalid shift options
        at ValidatorError (/Users/melissjs/Desktop/codeProjects/DC/NDCS/node_modules/mongoose/lib/error/validator.js:25:11)
        at validate (/Users/melissjs/Desktop/codeProjects/DC/NDCS/node_modules/mongoose/lib/schematype.js:782:13)
        at /Users/melissjs/Desktop/codeProjects/DC/NDCS/node_modules/mongoose/lib/schematype.js:829:11
        at Array.forEach (native)
        at SchemaArray.SchemaType.doValidate (/Users/melissjs/Desktop/codeProjects/DC/NDCS/node_modules/mongoose/lib/schematype.js:789:19)
        at /Users/melissjs/Desktop/codeProjects/DC/NDCS/node_modules/mongoose/lib/document.js:1528:9
        at _combinedTickCallback (internal/process/next_tick.js:95:7)
        at process._tickCallback (internal/process/next_tick.js:161:9)
      message: 'Invalid shift options',
      name: 'ValidatorError',
      properties: [Object],
      kind: 'user defined',
      path: 'shifts',
      value: [1,2,3,9],
      reason: undefined,
      '$isValidatorError': true } },
_message: 'Volunteer validation failed',
name: 'ValidationError' }