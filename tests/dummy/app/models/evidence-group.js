import DS from 'ember-data';

const {
  Model,
  attr,
  hasMany
} = DS;

export default Model.extend({
  name: attr('string'),
  type: attr('string'),
  factName: attr('string'),
  patientId: attr('string'),
  evidence: hasMany('evidence', { async: true })
});
