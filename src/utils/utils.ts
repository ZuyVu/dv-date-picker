
export function format(first: string, middle: string, last: string): string {
  return (
    (first || '') +
    (middle ? ` ${middle}` : '') +
    (last ? ` ${last}` : '')
  );
}

export const THIS_YEAR = +(new Date().getFullYear());
export const THIS_MONTH = +(new Date().getMonth()) + 1;

export const WEEK_DAYS = {
  Sunday: "Sun",
  Monday: "Mon",
  Tuesday: "Tue",
  Wednesday: "Wed",
  Thursday: "Thu",
  Friday: "Fri",
  Saturday: "Sat"
};

export const CALENDAR_MONTHs = {
  January: "Jan",
  February: "Feb",
  March: "Mar",
  April: "Apr",
  May: "May",
  June: "Jun",
  July: "Jul",
  August: "Aug",
  September: "Sep",
  October: "Oct",
  November: "Nov",
  December: "Dec"
};

export const NO_OF_DISPLAYED_WEEKS = 6;

// to return month number with leading 0. Eg. Jun 6 => 06
export const zeroPad = (value, lenth) => `${value}`.padStart(lenth, '0');

export const getMonthDays = (month = THIS_MONTH, year = THIS_YEAR) => {
  const monthsWith30days = [4, 6, 9, 11];
  const leapYear = year % 4 == 0;

  if(month === 2) {
    return leapYear ? 29 : 28;
  } else if (monthsWith30days.includes(month)) {
    return 30;
  } else {
    return 31;
  }
}

// Get the first day of a month as an int
export const getMonthFirstDay = (month = THIS_MONTH, year = THIS_YEAR) => {
  return +(new Date(`${year}-${zeroPad(month, 2)}-01`).getDay()) + 1;
}

export const getPreviousMonth = (month, year) => {
  const prevMonth = (month > 1)? month - 1 : 12;
  const prevYear = (month > 1) ? year : year - 1;

  return { month: prevMonth, year: prevYear };
}

export const getNextMonth = (month, year) => {
  const nextMonth = (month < 12)? month + 1 : 1;
  const nextYear = (month < 12) ? year : year + 1;

  return { month: nextMonth, year: nextYear };
}

export default (month = THIS_MONTH, year = THIS_YEAR) => {
  const monthDays = getMonthDays(month, year);
  const monthFirstDay = getMonthFirstDay(month, year);

  const daysFromPrevMonth = monthFirstDay - 1;
  const daysFromNextMonth = (NO_OF_DISPLAYED_WEEKS * 7) - (daysFromPrevMonth + monthDays);

  const { month: prevMonth, year: prevMonthYear } = getPreviousMonth(month, year);
  const { month: nextMonth, year: nextMonthYear } = getNextMonth(month, year);

  const prevMonthDays = getMonthDays(prevMonth, prevMonthYear);

  const prevMonthDates = [... new Array(daysFromPrevMonth)].map((n, index) => {
    const day = index + 1 + (prevMonthDays - daysFromPrevMonth);
    return [ prevMonthYear, zeroPad(prevMonth, 2), zeroPad(day, 2)];
    // Each date will be an array [year, month, day]
  });

  const thisMonthDates = [... new Array(monthDays)].map((n, index) => {
    const day = index + 1;
    return [year, zeroPad(month, 2), zeroPad(day,2)];
  });

  const nextMonthDates = [...new Array(daysFromNextMonth)].map((n, index) => {
    const day = index + 1;
    return [nextMonthYear, zeroPad(nextMonth, 2), zeroPad(day, 2)];
  });

  return [ ...prevMonthDates, ...thisMonthDates, ...nextMonthDates ];
}
