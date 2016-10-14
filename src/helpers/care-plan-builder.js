import ReasonCodes from '../constants/reason-codes';
import ObservationCodes from '../constants/observation-codes';
import CarePlanCategories from '../constants/care-plan-categories';

function buildPhase(reasonCode, symptoms, actions, medications) {
  return {
    reasonCode,
    symptoms,
    actions,
    medications };
}

function buildTarget(code, unit, value) {
  return {
    code,
    system: 'urn:std:iso:11073:10101',
    unit,
    value };
}

function buildMeasurement(code, goal) {
  return {
    code,
    goal };
}

function buildDefaultMeasurements() {
  const measurements = [];
  measurements.push(buildMeasurement(ObservationCodes.weight,
    [{
      code: ObservationCodes.weight,
      high: buildTarget('263875', 'kg', '80'),
      low: buildTarget('263875', 'kg', '60'),
    }]
  ));
  measurements.push(buildMeasurement(ObservationCodes.pulse,
    [{
      code: ObservationCodes.pulse,
      high: buildTarget('264864', 'bpm', '80'),
      low: buildTarget('264864', 'bpm', '60'),
    }]
  ));
  measurements.push(buildMeasurement(ObservationCodes.pulseOximeter,
    [{
      code: ObservationCodes.pulseOximeter,
      high: buildTarget('262688', '%', '99'),
      low: buildTarget('262688', '%', '98'),
    }]
  ));
  measurements.push(buildMeasurement(ObservationCodes.bloodPressure,
    [{
      code: ObservationCodes.bloodPressureSystolic,
      high: buildTarget('266016', 'mmHg', '180'),
      low: buildTarget('266016', 'mmHg', '60'),
    },
    {
      code: ObservationCodes.bloodPressureDiastolic,
      high: buildTarget('266016', 'mmHg', '180'),
      low: buildTarget('266016', 'mmHg', '60'),
    }]
  ));
  return measurements;
}

function buildHeartFailureCarePlan() {
  const phases = [];
  phases.push(buildPhase(ReasonCodes.green,
      ['Pust som vanlig',
       'Form som vanlig',
       'Hevelser som vanlig',
       'Ingen vektøkning',
       'Hoste som vanlig',
       'Ingen feber',
      ],
      ['Ta dine faste medisiner',
       'Sørg for riktig kosthold og regelmessige måltider',
       'Hold deg i aktivitet',
      ],
      []
  ));
  phases.push(buildPhase(ReasonCodes.yellow,
      ['Mer tungpust enn vanlig',
       'Økende trett og sliten',
       'Økende hevelser i beina',
       'Gått opp mer enn 2 kg i vekt de siste tre dager',
       'Forverring av hoste',
       'Feber',
      ],
      ['Ta det med ro',
       'Vei deg hver dag',
       'Drikk minst 1,5 liter væske hver dag, men ikke mer enn 2 liter',
      ],
      []
  ));
  phases.push(buildPhase(ReasonCodes.red,
      ['Mye verre i pusten',
       'Må hvile/sove flere ganger i løpet av dagen',
       'Økende hevelse i bein',
       'Gått opp mer enn 2 kg i vekt de siste 3 dager',
       'Forverring av hoste',
       'Feber',
      ],
      ['Ta det med ro',
       'Vei deg hver dag',
       'Drikk minst 1.5 liter væske hver dag, men ikke mer enn 2 liter'],
      []
  ));

  return {
    category: CarePlanCategories.HeartFailure,
    measurements: buildDefaultMeasurements(),
    patientGoal: '',
    phases,
    questionnaireId: '62763',
    comment: '',
  };
}

function buildCOPDCarePlan() {
  const phases = [];
  phases.push(buildPhase(ReasonCodes.green,
      ['Pust som vanlig',
       'Hoste som vanlig',
       'Oppspytt som vanlig',
       'Dagsform som vanlig',
       'Ingen feber',
      ],
      ['Sørg for riktig kosthold og regelmessige måltider',
       'Mosjoner regelmessig',
       'Unngå situasjoner som forverrer pusten din',
      ],
      []
  ));
  phases.push(buildPhase(ReasonCodes.yellow,
      ['Mer tungpust enn vanlig',
       'Mer hoste',
       'Økt mengde eller endret farge på oppspytt',
       'Mer slapp og uopplagt, tyngre å utføre daglige aktiviteter',
       'Feber',
      ],
      ['Ta det med ro',
       'Unngå tobakksrøyk og det som forverrer symptomene',
       'Husk riktig puste- og hosteteknikk',
      ],
      []
  ));
  phases.push(buildPhase(ReasonCodes.red,
      ['Mye verre pust enn vanlig. Økt behov for inhalasjonsmedisin',
       'Mye verre hoste enn vanlig',
       'Mye mer oppspytt, gul-grønn farge',
       'Tiltagende slapp og uopplagt, tyngre å utføre daglige gjøremål',
       'Økt behov for inhalasjonsmedisin',
       'Feber',
       'Hevelse i beina',
       'Brystsmerter',
      ],
      ['Ta det med ro!',
       'Unngå tobakksrøyk og det som forverrer symptomene',
       'Husk riktig puste- og hosteteknikk',
       'Ved hevelse i føtter og/eller brystsmerter: kontakt lege straks!'],
      []
  ));

  return {
    category: CarePlanCategories.COPD,
    measurements: buildDefaultMeasurements(),
    patientGoal: '',
    phases,
    questionnaireId: '62763',
    comment: '',
  };
}

export function buildCarePlan(category) {
  switch (category) {
  case CarePlanCategories.HeartFailure:
    return buildHeartFailureCarePlan();
  case CarePlanCategories.COPD:
    return buildCOPDCarePlan();
  default:
    return null;
  }
}
