
export function getPhase(resource, reasonCode) {
  const activities = resource.activity.filter(activity =>
      activity.detail.reasonCode[0].coding[0].code === reasonCode
    );

  const actions = activities
    .filter(activity => activity.detail.category.coding[0].code === 'procedure')
    .map(activity => activity.detail.description);

  const medications = activities
    .filter(activity => activity.detail.category.coding[0].code === 'drug')
    .map(activity => activity.detail.description);

  const questionnaireObservations = activities
    .filter(activity => activity.detail.category.coding[0].code === 'observation'
    && activity.detail.extension && activity.detail.extension.length === 1
    && activity.detail.extension[0].valueReference.reference.startsWith('Questionnaire')
    );

  const containedResources = {};

  resource.contained.filter(res => res.resourceType === 'Condition')
    .forEach(res => {
      containedResources[res.id] = res.notes;
    });

  const questionnaire = questionnaireObservations[0];
  const symptoms = questionnaire.detail.reasonReference.map(
    ref => containedResources[ref.reference.substring(1)]);

  return {
    reasonCode,
    symptoms,
    actions,
    medications };
}
