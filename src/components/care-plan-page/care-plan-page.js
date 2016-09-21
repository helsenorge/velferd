function getMeasurements(activities) {
  return activities
    .filter(activity => activity.detail.category.coding[0].code === 'observation'
    && activity.detail.code)
    .map(activity => (
      {
        code: activity.detail.code.coding[0].code,
        goal: activity.detail.goal,
      }));
}

function getActions(activities) {
  return activities
    .filter(activity => activity.detail.category.coding[0].code === 'procedure')
    .map(activity => activity.detail.description);
}

function getMedications(activities) {
  return activities
    .filter(activity => activity.detail.category.coding[0].code === 'drug')
    .map(activity => activity.detail.description);
}

function getQuestionnaire(activities) {
  const observations = activities
    .filter(activity => activity.detail.category.coding[0].code === 'observation'
    && activity.detail.extension && activity.detail.extension.length === 1
    && activity.detail.extension[0].valueReference.reference.startsWith('Questionnaire')
    );

  return observations ? observations[0] : null;
}

export function getPhase(resource, reasonCode) {
  const activities = resource.activity.filter(activity =>
      activity.detail.reasonCode[0].coding[0].code === reasonCode);

  const actions = getActions(activities);
  const medications = getMedications(activities);
  const measurements = getMeasurements(activities);
  const questionnaire = getQuestionnaire(activities);

  const containedResources = {};
  resource.contained.filter(res => res.resourceType === 'Condition')
    .forEach(res => {
      containedResources[res.id] = res.notes;
    });

  const symptoms = !questionnaire ? []
    : questionnaire.detail.reasonReference.map(
    ref => containedResources[ref.reference.substring(1)]);

  let questionnaireId;
  if (questionnaire) {
    const reference = questionnaire.detail.extension[0].valueReference.reference;
    questionnaireId = reference.substring(
      reference.indexOf('Questionnaire/') + 'Questionnaire/'.length);
  }

  return {
    reasonCode,
    questionnaireId,
    measurements,
    symptoms,
    actions,
    medications };
}
