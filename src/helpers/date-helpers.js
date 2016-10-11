import monthNames from '../constants/month-names.js';

export function formatDate(date) {
  const dateObject = new Date(date);
  const dateString = `${dateObject.getDate()}. ${monthNames[dateObject.getMonth()]}`;
  return dateString;
}

export function formatDate2(date) {
  const dateObject = new Date(date);
  const month = dateObject.getMonth() + 1;
  return `${dateObject.getDate()}.${month}.${dateObject.getFullYear()}`;
}

export function formatDateTime(date) {
  const dateObject = new Date(date);
  const dateString = `${dateObject.getDate()}.${monthNames[dateObject.getMonth()]}
  ${dateObject.getFullYear()} kl. ${dateObject.getHours()}.${dateObject.getMinutes()}`;
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

export function filterObservations(entries, date) {
  return entries.filter(item =>
      new Date(item.resource.effectiveDateTime).setHours(0, 0, 0, 0).valueOf()
        === date.valueOf()
    );
}

export function filterQuestionnaireResponses(entries, fromDate, toDate) {
  return entries.filter(item =>
      new Date(item.resource.authored).valueOf() > fromDate.valueOf() &&
      new Date(item.resource.authored).valueOf() < toDate.valueOf()
    );
}

export function calculateDateRange(startDate, endDate) {
  const timeDiff = Math.abs(endDate.getTime() - startDate.getTime());
  return Math.ceil(timeDiff / (1000 * 3600 * 24));
}

export function getNumberofColumnsinChart(dateRange) {
  if (dateRange >= 90) {
    return 14;
  }

  return dateRange;
}
