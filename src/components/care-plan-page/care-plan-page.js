function getMeasurements(activities, goals) {
  return activities
    .filter(activity => activity.detail.category.coding[0].code === 'observation'
    && activity.detail.code)
    .map(activity => {
      const goalReference = activity.detail.goal[0].reference;
      const goal = goals[goalReference.substring(1)].map(g => {
        const range = g.extension[1].valueRange;
        return {
          code: g.extension[0].valueCodeableConcept.coding[0].code,
          high: range.high,
          low: range.low,
        };
      });

      return {
        code: activity.detail.code.coding[0].code,
        goal,
      };
    });
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

  const goals = {};
  resource.contained.filter(res => res.resourceType === 'Goal')
    .forEach(res => (goals[res.id] = res.extension));
  const measurements = getMeasurements(activities, goals);

  const questionnaire = getQuestionnaire(activities);

  const conditions = {};
  resource.contained.filter(res => res.resourceType === 'Condition')
    .forEach(res => (conditions[res.id] = res.notes));

  const symptoms = !questionnaire ? []
    : questionnaire.detail.reasonReference.map(
    ref => conditions[ref.reference.substring(1)]);

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

export function getPatientGoal(resource) {
  if (resource.goal.length > 0) {
    const ref = resource.goal[0].reference.substring(1);
    const goal = resource.contained.filter(res => res.resourceType === 'Goal' && res.id === ref);

    if (goal.length > 0) {
      return goal[0].description;
    }
  }
  return '';
}
