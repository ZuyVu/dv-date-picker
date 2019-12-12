import { Component, Prop, State, h } from '@stencil/core'
import calendar, { CALENDAR_MONTHS, getPreviousMonth, getNextMonth, sameDay, WEEK_DAYS } from '../../utils/calendar-utils'

@Component({
  tag: 'dv-calendar',
  styleUrl: 'calendar.css',
  shadow: true,
})
export class Calendar {
  @Prop() date : Date;
  @Prop() dateChanceCallback: Function;
  @State() current = this.getCurrentState(this.date);
  @State() today = new Date();
  @State() trigger = false;

  getCurrentState(date: any) {
    const _date = date instanceof Date ? date : new Date();
    return {
      chosen: _date, // Currently chosen date, by default it's today
      month: +_date.getMonth() + 1, //Currently displayed month
      year: _date.getFullYear() //Currently displayed year
    };
  }

  getCalendarDates() {
    const { month, year } = this.current;
    return calendar(month, year);
  }

  gotoPrevMonth() {
    const { month, year } = this.current;
    const result = getPreviousMonth(month, year)
    this.current.month = result.month;
    this.current.year = result.year;
    this.trigger = !this.trigger; // This trigger rerender
  }

  gotoNextMonth() {
    const { month, year } = this.current;
    const result = getNextMonth(month, year)
    this.current.month = result.month;
    this.current.year = result.year;
    this.trigger = !this.trigger; // This trigger rerender
  }

  gotoPrevYear() {
    this.current.year = this.current.year - 1;
    this.trigger = !this.trigger;
  }

  gotoNextYear() {
    this.current.year = this.current.year + 1;
    this.trigger = !this.trigger;
  }

  renderCurrentMonthYear() {

    return (
      <div class="calendar-header">
        <button class="arrow arrow-left" onClick={this.gotoPrevYear.bind(this)}>
          &lt;&lt;
        </button>

        <button class="arrow" onClick={this.gotoPrevMonth.bind(this)}>
          &lt;
        </button>

        <div class="calendar-month">
          {CALENDAR_MONTHS[this.current.month]} {this.current.year}
        </div>

        <button class="arrow" onClick={this.gotoNextMonth.bind(this)}>
          &gt;
        </button>

        <button class="arrow arrow-right" onClick={this.gotoNextYear.bind(this)}>
          &gt;&gt;
        </button>
      </div>
    )
  }

  renderDayLabel = (day, index) => {
    const daylabel = WEEK_DAYS[day].toUpperCase();
    return (
      <div class="calendar-day calendar-cell">
        {daylabel}
      </div>
    );
  };

  gotoDate = (date: Date, notSameMonth: boolean) => evt => {
    evt && evt.preventDefault();
    this.current =  this.getCurrentState(date);
    if(!notSameMonth) { // If chosen a date on the same month
      this.current.chosen = date;
      this.trigger = !this.trigger;
      this.dateChanceCallback(date);
    } // Otherwise just update the view
    // console.log(date);
  }

  renderCalendarDates = (date, index) => {

    const _date = new Date(date.join("-"));

    const today = sameDay(_date, this.today);
    const chosen = sameDay(_date, this.current.chosen);
    // const inMonth =
      // month && year && isSameMonth(_date, new Date([year, month, 1].join("-")));

    const notSameMonth = (_date.getMonth() + 1) !== this.current.month;

    const onClick = this.gotoDate(_date, notSameMonth);

    const props = { onClick, notSameMonth, today, chosen }

      return (
        <div class="calendar-date calendar-cell" {...props}>
          {_date.getDate()}
        </div>
      );
  };

  render() {
    // console.log(this.current.chosen)
    return (
      <div class="calendar-container">

        {this.renderCurrentMonthYear()}

        <div class="calendar-grid">

            {Object.keys(WEEK_DAYS).map(this.renderDayLabel)}

            {this.getCalendarDates().map(this.renderCalendarDates)}

        </div>

      </div>
    )
  }

}
