import { Component, Prop, State, h } from "@stencil/core";
import { getDateString, parseDate } from "../../utils/calendar-utils";

@Component( {
  tag: 'dv-date-picker',
  styleUrl: 'date-picker.css',
  shadow: true,
})
export class DatePicker {
  @Prop() default: string; // If named defaultDate, Stencil does not link this to att. a Stencil bug?
  @State() openCalendar = false;
  @State() date = this.setDate();

  setDate() {
    if(this.default) {
      const date = parseDate(this.default);
      if(date) return date;
    }
    return new Date();
  }

  toggleCalendar() {
    this.openCalendar = !this.openCalendar;
    console.log(this.openCalendar);
  }

  onDateChange(date: Date) {
    this.date = date;
    this.openCalendar = false;
  }

  render() {
    // console.log("RERENDER ?");
    console.log(`DefaultDate is ${this.default}`);

    const calendarRender = this.openCalendar?  (
      <div class="calendar">
        <dv-calendar dateChanceCallback={this.onDateChange.bind(this)}></dv-calendar>
      </div>
    ) :
    (<div></div>);

    return (
      <div class="date-picker-container">
        <div class="date-picker-form">
          <label class="date-picker-label"><slot/></label>
          <input
            class="date-picker-input"
            type="text"
            value={getDateString(this.date)}
            readOnly
            placeholder="YYYY / MM / DD"
            onClick={this.toggleCalendar.bind(this)}
            />
          {/* <button class="large-button" onClick={this.toggleCalendar.bind(this)}>Toggle Calendar for me</button> */}
        </div>
        {calendarRender}
      </div>

    )
  }
}
