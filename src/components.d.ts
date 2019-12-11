/* eslint-disable */
/* tslint:disable */
/**
 * This is an autogenerated file created by the Stencil compiler.
 * It contains typing information for all components that exist in this project.
 */


import { HTMLStencilElement, JSXBase } from '@stencil/core/internal';


export namespace Components {
  interface DvCalendar {
    'date': Date;
    'onDateChange': Function;
  }
  interface DvDatePicker {
    'dateString': string;
    'label': string;
  }
}

declare global {


  interface HTMLDvCalendarElement extends Components.DvCalendar, HTMLStencilElement {}
  var HTMLDvCalendarElement: {
    prototype: HTMLDvCalendarElement;
    new (): HTMLDvCalendarElement;
  };

  interface HTMLDvDatePickerElement extends Components.DvDatePicker, HTMLStencilElement {}
  var HTMLDvDatePickerElement: {
    prototype: HTMLDvDatePickerElement;
    new (): HTMLDvDatePickerElement;
  };
  interface HTMLElementTagNameMap {
    'dv-calendar': HTMLDvCalendarElement;
    'dv-date-picker': HTMLDvDatePickerElement;
  }
}

declare namespace LocalJSX {
  interface DvCalendar {
    'date'?: Date;
    'onDateChange'?: Function;
  }
  interface DvDatePicker {
    'dateString'?: string;
    'label'?: string;
  }

  interface IntrinsicElements {
    'dv-calendar': DvCalendar;
    'dv-date-picker': DvDatePicker;
  }
}

export { LocalJSX as JSX };


declare module "@stencil/core" {
  export namespace JSX {
    interface IntrinsicElements {
      'dv-calendar': LocalJSX.DvCalendar & JSXBase.HTMLAttributes<HTMLDvCalendarElement>;
      'dv-date-picker': LocalJSX.DvDatePicker & JSXBase.HTMLAttributes<HTMLDvDatePickerElement>;
    }
  }
}


