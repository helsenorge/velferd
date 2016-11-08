import ReasonCodes from '../constants/reason-codes';
import ObservationCodes from '../constants/observation-codes';
import CarePlanCategories from '../constants/care-plan-categories';
import shortId from 'shortid';

function buildPhase(reasonCode, symptoms, actions, medications) {
  return {
    reasonCode,
    symptoms,
    actions,
    medications };
}

function buildTarget(code, unit) {
  return {
    code,
    system: 'urn:std:iso:11073:10101',
    unit,
  };
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
      high: buildTarget('263875', 'kg'),
      low: buildTarget('263875', 'kg'),
    }]
  ));
  measurements.push(buildMeasurement(ObservationCodes.pulse,
    [{
      code: ObservationCodes.pulse,
      high: buildTarget('264864', 'bpm'),
      low: buildTarget('264864', 'bpm'),
    }]
  ));
  measurements.push(buildMeasurement(ObservationCodes.pulseOximeter,
    [{
      code: ObservationCodes.pulseOximeter,
      high: buildTarget('262688', '%'),
      low: buildTarget('262688', '%'),
    }]
  ));
  measurements.push(buildMeasurement(ObservationCodes.bloodPressure,
    [{
      code: ObservationCodes.bloodPressureSystolic,
      high: buildTarget('266016', 'mmHg'),
      low: buildTarget('266016', 'mmHg'),
    },
    {
      code: ObservationCodes.bloodPressureDiastolic,
      high: buildTarget('266016', 'mmHg'),
      low: buildTarget('266016', 'mmHg'),
    }]
  ));
  return measurements;
}

function buildHeartFailureCarePlan() {
  const phases = [];
  phases.push(buildPhase(ReasonCodes.green,
      [{ id: shortId.generate(), text: 'Pust som vanlig' },
       { id: shortId.generate(), text: 'Form som vanlig' },
       { id: shortId.generate(), text: 'Hevelser som vanlig' },
       { id: shortId.generate(), text: 'Ingen vektøkning' },
       { id: shortId.generate(), text: 'Hoste som vanlig' },
       { id: shortId.generate(), text: 'Ingen feber' },
      ],
      [{ id: shortId.generate(), text: 'Ta dine faste medisiner' },
       { id: shortId.generate(), text: 'Sørg for riktig kosthold og regelmessige måltider' },
       { id: shortId.generate(), text: 'Hold deg i aktivitet' },
      ],
      []
  ));
  phases.push(buildPhase(ReasonCodes.yellow,
      [{ id: shortId.generate(), text: 'Mer tungpust enn vanlig' },
       { id: shortId.generate(), text: 'Økende trett og sliten' },
       { id: shortId.generate(), text: 'Økende hevelser i beina' },
       { id: shortId.generate(), text: 'Gått opp mer enn 2 kg i vekt de siste tre dager' },
       { id: shortId.generate(), text: 'Forverring av hoste' },
       { id: shortId.generate(), text: 'Feber' },
      ],
      [{ id: shortId.generate(), text: 'Ta det med ro' },
       { id: shortId.generate(), text: 'Vei deg hver dag' },
       { id: shortId.generate(),
        text: 'Drikk minst 1,5 liter væske hver dag, men ikke mer enn 2 liter' },
      ],
      []
  ));
  phases.push(buildPhase(ReasonCodes.red,
      [{ id: shortId.generate(), text: 'Mye verre i pusten' },
       { id: shortId.generate(), text: 'Må hvile/sove flere ganger i løpet av dagen' },
       { id: shortId.generate(), text: 'Økende hevelse i bein' },
       { id: shortId.generate(), text: 'Gått opp mer enn 2 kg i vekt de siste 3 dager' },
       { id: shortId.generate(), text: 'Forverring av hoste' },
       { id: shortId.generate(), text: 'Feber' },
      ],
      [{ id: shortId.generate(), text: 'Ta det med ro' },
       { id: shortId.generate(), text: 'Vei deg hver dag' },
       { id: shortId.generate(),
        text: 'Drikk minst 1.5 liter væske hver dag, men ikke mer enn 2 liter' }],
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
      [{ id: shortId.generate(), text: 'Pust som vanlig' },
       { id: shortId.generate(), text: 'Hoste som vanlig' },
       { id: shortId.generate(), text: 'Oppspytt som vanlig' },
       { id: shortId.generate(), text: 'Dagsform som vanlig' },
       { id: shortId.generate(), text: 'Ingen feber' },
      ],
      [{ id: shortId.generate(), text: 'Sørg for riktig kosthold og regelmessige måltider' },
       { id: shortId.generate(), text: 'Mosjoner regelmessig' },
       { id: shortId.generate(), text: 'Unngå situasjoner som forverrer pusten din' },
      ],
      []
  ));
  phases.push(buildPhase(ReasonCodes.yellow,
      [{ id: shortId.generate(), text: 'Mer tungpust enn vanlig' },
       { id: shortId.generate(), text: 'Mer hoste' },
       { id: shortId.generate(),
        text: 'Økt mengde eller endret farge på oppspytt' },
       { id: shortId.generate(),
        text: 'Mer slapp og uopplagt, tyngre å utføre daglige aktiviteter' },
       { id: shortId.generate(), text: 'Feber' },
      ],
      [{ id: shortId.generate(), text: 'Ta det med ro' },
       { id: shortId.generate(), text: 'Unngå tobakksrøyk og det som forverrer symptomene' },
       { id: shortId.generate(), text: 'Husk riktig puste- og hosteteknikk' },
      ],
      []
  ));
  phases.push(buildPhase(ReasonCodes.red,
      [{ id: shortId.generate(),
        text: 'Mye verre pust enn vanlig. Økt behov for inhalasjonsmedisin' },
       { id: shortId.generate(), text: 'Mye verre hoste enn vanlig' },
       { id: shortId.generate(), text: 'Mye mer oppspytt, gul-grønn farge' },
       { id: shortId.generate(),
        text: 'Tiltagende slapp og uopplagt, tyngre å utføre daglige gjøremål' },
       { id: shortId.generate(), text: 'Økt behov for inhalasjonsmedisin' },
       { id: shortId.generate(), text: 'Feber' },
       { id: shortId.generate(), text: 'Hevelse i beina' },
       { id: shortId.generate(), text: 'Brystsmerter' },
      ],
      [{ id: shortId.generate(), text: 'Ta det med ro!' },
       { id: shortId.generate(), text: 'Unngå tobakksrøyk og det som forverrer symptomene' },
       { id: shortId.generate(), text: 'Husk riktig puste- og hosteteknikk' },
       { id: shortId.generate(), text:
        'Ved hevelse i føtter og/eller brystsmerter: kontakt lege straks!' }],
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
