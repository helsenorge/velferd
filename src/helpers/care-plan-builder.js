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
      ['Ingen tungpust',
       'Normalt aktivitetsnivå',
       'Ingen hevelser i beina',
       'Tilfreds og rolig',
      ],
      ['Ta dine faste medisiner som avtalt/foreskrevet med legen',
       'Sørg for riktig kosthold og regelmessige måltider',
       'Hold deg i aktivitet',
      ],
      ['Vanndrivende: Burinex, 2mg, 1 gang daglig']
  ));
  phases.push(buildPhase(ReasonCodes.yellow,
      ['Lavt aktivitetsnivå, feber',
       'Mer tungpust enn vanlig, forverring av hoste',
       'Trett og sliten',
       'Økende hevelse i beina',
       'Rastløs, urolig',
      ],
      ['Ta det med ro',
       'Vei deg hver dag',
       'Drikk minst 1,5 liter væske hver dag, men ikke mer enn 2 liter',
      ],
      ['Vanndrivende: Burinex, 2mg, 2 ganger daglig',
       'Inhalasjonsmedisin: Ventolin, 0,2 mg, inntil 4-6 dager',
      ]
  ));
  phases.push(buildPhase(ReasonCodes.red,
      ['Lavt aktivitetsnivå, feber',
       'Mye verre i pusten, forverring av hoste',
       'Må hvile/sove flere ganger i løpet av dagen',
       'Økende hevelse i beina',
       'Irritabel, stresset',
      ],
      ['Ta det med ro',
       'Vei deg hver dag',
       'Drikk minst 1.5 liter væske hver dag, men ikke mer enn 2 liter'],
      ['Vanndrivende: Burinex, 2mg, 2 ganger daglig',
       'Inhalasjonsmedisin: Ventolin, 0,2 mg, inntil 4-6 dager',
      ]
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
      ['Pust, hoste og oppspytt er som vanlig',
       'Det kan likevel være variasjoner fra dag til dag',
       'Feberfri',
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
       'Økt mengde oppspytt',
       'Endret farge på oppspytt',
       'Mer slapp og uopplagt',
       'Feber',
       'Tyngre å utføre daglige aktiviteter',
      ],
      ['Ta det med ro',
       'Unngå tobakksrøyk og det som forverrer symptomene',
       'Husk riktig puste- og hosteteknikk',
      ],
      []
  ));
  phases.push(buildPhase(ReasonCodes.red,
      ['Mye verre pust enn vanlig - er du tungpust i hvile?',
       'Mye verre hoste enn vanlig',
       'Mye mer oppspytt, gul-grønn farge',
       'Tyngre å utføre daglige gjøremål',
       'Økt behov for inhalasjonsmedisin',
       'Tiltagende slapp og uopplagt',
       'Feber',
       'Hevelse i beina - brystsmerter?',
      ],
      ['Ta det med ro!',
       'Unngå tobakksrøy og det som forverrer symptomene',
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
