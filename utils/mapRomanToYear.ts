export function mapRomanToYear(roman: string): string {
  switch (roman) {
    case "I":
      return "1st year";
    case "II":
      return "2nd year";
    case "III":
      return "3rd year";
    case "IV":
      return "4th year";
    default:
      return "";
  }
}
