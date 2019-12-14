import { Component, Prop, State, h } from "@stencil/core";
import { getDateString, parseDate } from "../../utils/calendar-utils";

@Component({
  tag: "dv-date-picker",
  styleUrl: "date-picker.css",
  shadow: true
})
export class DatePicker {
  @Prop({ reflectToAttr: true, mutable: true }) value: string; // If named defaultDate, Stencil does not link this to att. a Stencil bug?
  @Prop() placeHolder = "Pick a date";
  @State() openCalendar = false;
  @State() date = this.setDate();

  setDate() {
      const date = parseDate(this.value);
      return date;
  }

  toggleCalendar() {
    this.openCalendar = !this.openCalendar;
  }

  onDateChange(date: Date) {
    this.date = date;
    this.value = getDateString(date);
    this.openCalendar = false;
  }

  render() {
    const calendarRender = this.openCalendar ? (
      <div class="calendar">
        <dv-calendar
          date={this.date}
          dateChanceCallback={this.onDateChange.bind(this)}
        ></dv-calendar>
      </div>
    ) : (
      <div></div>
    );

    return (
      <div class="date-picker-container">
        <div class="date-picker-form">
          <label class="date-picker-label">
            <slot />
          </label>
          <input
            class="date-picker-input"
            type="text"
            value={getDateString(this.date)}
            readOnly
            placeholder={this.placeHolder}
            onClick={this.toggleCalendar.bind(this)}
          />
        </div>
        {calendarRender}
      </div>
    );
  }
}
