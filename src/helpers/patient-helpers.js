import { BirthNumberSystemIdentifier } from '../constants/patient.js';

export function getBirthNumber(resource) {
  if (!resource || !resource.identifier) {
    return null;
  }

  const identifier = resource.identifier.filter(
      identifier => identifier.system === BirthNumberSystemIdentifier);

  return identifier && identifier.length > 0 ? identifier[0].value : null;
}

export function getName(resource) {
  if (resource && resource.name && resource.name.length > 0) {
    const name = resource.name[0];
    const given = name.given ? name.given.join(' ') : '';
    const family = name.family ? name.family.join(' ').trim() : '';
    return `${family}, ${given}`;
  }
  return null;
}
