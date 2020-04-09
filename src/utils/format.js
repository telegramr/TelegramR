import dayjs from 'dayjs';

function dateFormat(timesmap) {
  return dayjs(timesmap*1000).format('YYYY-MM-DD');
}
export {
  dateFormat
}
