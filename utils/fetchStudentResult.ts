// Import the Cheerio and Axios libraries
import * as cheerio from "cheerio";
import axios from "axios";

// Define the base URL and the year (adjust according to your requirements)
const baseURL = "https://onlinesys.necta.go.tz/results/";

type SubjectGrade = {
  subject: string;
  grade: string;
};

interface StudentInfo {
  CNO: string;
  SEX: string;
  AGGT: string;
  DIV: string;
  DETAILED_SUBJECTS: string;
  result: Record<string, string>; // Add the result property
}

// Define a function to fetch the student result from a given form IV index
export const fetchStudentResult = async (
  formIVIndex: string,
): Promise<StudentInfo | null> => {
  try {
    const parts = formIVIndex.split("/");

    // Extract the candidate type, the school number, the candidate number, and the year of completion from the array
    const candidateType = parts[0].charAt(0); // The first character of the first element
    const schoolNumber = parts[0].slice(1); // The rest of the first element
    const candidateNumber = parts[1]; // The second element
    const yearOfCompletion = parts[2]; // The third element

    // Construct the URL for the NECTA website
    const url = `${baseURL}${yearOfCompletion}/csee/results/${candidateType.toLocaleLowerCase()}${schoolNumber}.htm`;

    console.log(url);

    const { data } = await axios.get(url);

    const $ = cheerio.load(data);
    const resultsTable = $("table").eq(2);

    const students: StudentInfo[] = [];

    resultsTable.find("tr").each((index: number, element: cheerio.Element) => {
      if (index !== 0) {
        // Skip the header row
        const columns = $(element).find("td");
        const studentInfo: StudentInfo = {
          CNO: $(columns[0]).text().trim(),
          SEX: $(columns[1]).text().trim(),
          AGGT: $(columns[2]).text().trim(),
          DIV: $(columns[3]).text().trim(),
          DETAILED_SUBJECTS: $(columns[4]).text().trim(),
          result: {}, // Initialize the result property
        };

        let myString = studentInfo.DETAILED_SUBJECTS.replace(/\s+/g, " ");

        let regex = /([A-Z\/]+(?:\s[A-Z]+)?)\s-\s'([A-Z])'/g;

        let matches = myString.match(regex);

        matches?.forEach((match) => {
          // Split each match by dash
          let subpart: string[] = match.split(" - ");
          // Get the subject and grade from the subpart
          let subject: string = subpart[0];
          let grade: string = subpart[1].replace(/'/g, ""); // Remove the single quotes
          // Assign the subject and grade to the subjects object
          studentInfo.result[subject] = grade;
        });

        students.push(studentInfo);
      }
    });

    let candidate = `${candidateType}${schoolNumber}/${candidateNumber}`;

    let student = students.find((obj) => obj.CNO === candidate);

    console.log(candidate);

    return student || null;
  } catch (error) {
    // Handle the error
    // console.error(error);
    throw error;
  }
};
