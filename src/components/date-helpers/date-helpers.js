import monthNames from '../../constants/month-names.js';

export function formatDate(date) {
  const dateObject = new Date(date);
  const dateString = `${dateObject.getDate()}. ${monthNames[dateObject.getMonth()]}`;
  return dateString;
}

export function getMonth(date) {
  const dateObject = new Date(date);
  return monthNames[dateObject.getMonth()];
}

export function getDate(date) {
  const dateObject = new Date(date);
  return dateObject.getDate();
}

export function filterPoints(points, fromDate, toDate) {
  return points.filter(item =>
    new Date(item.date).valueOf() > fromDate.valueOf() &&
    new Date(item.date).valueOf() < toDate.valueOf()
  );
}
