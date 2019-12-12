import { getMonthDays, parseDate } from './calendar-utils';

describe("Testing Calendar Utils", () => {
  describe("Testing parse Date String", () => {
    it("return null for invalid input empty", () => {
      expect(parseDate("")).toBeNull();
    });
    it("return null for invalid input wrong month/date order 1", () => {
      expect(parseDate("2019-15-05")).toBeNull();
    });
    it("return null for invalid input wrong month/date/year order 2", () => {
      expect(parseDate("20-2020-05")).toBeNull();
    });
    it("return null for invalid input wrong format", () => {
      expect(parseDate("2019/20/05")).toBeNull();
    });
    it("return null for invalid date", () => {
      expect(parseDate("2019-02-31")).toBeNull();
    });
    it("return correct date object for correct input", () => {
      const result = parseDate("2019-01-01");
      const date = new Date(2019, 0, 1);
      const test =
        result.getDate() === date.getDate() &&
        result.getMonth() == date.getMonth() &&
        result.getFullYear() === date.getFullYear();
      expect(test).toBeTruthy();
    });
  });
  describe("Testing getMonthDays", () => {
    it("returns 0 for invalid input 1", () => {
      expect(getMonthDays(15, 2019)).toEqual(0);
    });
    it("returns 0 for invalid input 2", () => {
      expect(getMonthDays(-1, 2019)).toEqual(0);
    });
    it("returns 30 days for September", () => {
      expect(getMonthDays(9, 2019)).toEqual(30);
    });
    it("returns 28 days for Febuary for non-leap year", () => {
      expect(getMonthDays(2, 2019)).toEqual(28);
    });
    it("returns 28 days for Febuary for leap year", () => {
      expect(getMonthDays(2, 2020)).toEqual(29);
    });
  });
})


