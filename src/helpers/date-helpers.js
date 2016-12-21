import { monthNames, monthNamesAbbrev } from '../constants/month-names.js';

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

// Formats date as yyyy-mm-dd
export function formatDate3(date) {
  const pad = number => `0${number}`.slice(-2);
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
}

export function formatDateTime(date) {
  const dateObject = new Date(date);
  const dateString = `${dateObject.getDate()}.${monthNamesAbbrev[dateObject.getMonth()]}
  ${dateObject.getFullYear()} kl. ${dateObject.getHours()}.${dateObject.getMinutes()}`;
  return dateString;
}

export function getMonth(date) {
  const dateObject = new Date(date);
  return monthNamesAbbrev[dateObject.getMonth()];
}

export function getDate(date) {
  const dateObject = new Date(date);
  return dateObject.getDate();
}

export function getTime(date) {
  const dateObject = new Date(date);
  const dateString = `${dateObject.getHours()}:${dateObject.getMinutes()}`;
  return dateString;
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

export function filterObservationsInRange(entries, fromDate, toDate) {
  return entries.filter(item =>
      new Date(item.resource.effectiveDateTime).valueOf() > fromDate.valueOf() &&
      new Date(item.resource.effectiveDateTime).valueOf() < toDate.valueOf()
    );
}

export function filterQuestionnaireResponses(entries, fromDate, toDate) {
  return entries.filter(item =>
      new Date(item.resource.authored).valueOf() > fromDate.valueOf() &&
      new Date(item.resource.authored).valueOf() < toDate.valueOf()
    );
}

export function calculateDateRange(startDate, endDate) {
  return Math.floor((endDate - startDate) / 86400000);
}

export function getNumberofColumnsinChart(dateRange) {
  return dateRange;
}
