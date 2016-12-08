import { containedReferenceId } from '../../../../helpers/care-plan-helpers';

export function getVersions(data) {
  const versions = data.entry.map(entry => {
    const resource = entry.resource;
    const date = resource.meta.lastUpdated;

    const authorRef = containedReferenceId(resource.author[0].reference);
    const contained = resource.contained.filter(res => res.id === authorRef);
    const author = contained[0];

    let comment = '';
    if (resource.note) {
      comment = resource.note.text;
    }

    return {
      author,
      date,
      comment,
    };
  });

  return versions;
}
