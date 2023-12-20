import * as cheerio from "cheerio";
import axios from "axios";

const url = "https://onlinesys.necta.go.tz/results/2022/csee/results/p0313.htm";

interface StudentInfo {
  CNO: string;
  SEX: string;
  AGGT: string;
  DIV: string;
  DETAILED_SUBJECTS: string;
}

const scrapper = async () => {
  try {
    const { data } = await axios.get(url);

    const $ = cheerio.load(data);
    const resultsTable = $("table").last();

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
        };
        students.push(studentInfo);
      }
    });

    return students;
  } catch (error) {
    //handle error
    return [];
  }
};

export default scrapper;
