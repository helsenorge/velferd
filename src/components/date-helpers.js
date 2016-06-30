const monthNames = [
  'januar',
  'februar',
  'mars',
  'april',
  'mai',
  'juni',
  'juli',
  'august',
  'september',
  'oktober',
  'november',
  'desember',
];

export function formatDate(date) {
  const dateObject = new Date(date);
  const dateString = `${dateObject.getDate()}. ${monthNames[dateObject.getMonth()]}`;
  return dateString;
}

export function filterPointsSince(points, numberOfDaysAgo) {
  const from = new Date();
  from.setHours(0, 0, 0, 0);
  from.setDate(from.getDate() - numberOfDaysAgo);
  return points.filter(item => new Date(item.date).valueOf() > from.valueOf());
}
