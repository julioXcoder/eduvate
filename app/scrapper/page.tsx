import React from "react";

import scrapper from "@/utils/cseeScrapper";
import { fetchStudentResult } from "@/utils/fetchStudentResult";

const Page = async () => {
  const studentResult = await fetchStudentResult("S0179/0003/2022");

  return (
    <div className="overflow-x-auto">
      {studentResult && (
        <table className="min-w-full table-auto border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="border border-gray-300 px-4 py-2">CNO</th>
              <th className="border border-gray-300 px-4 py-2">SEX</th>
              <th className="border border-gray-300 px-4 py-2">AGGT</th>
              <th className="border border-gray-300 px-4 py-2">DIV</th>
              <th className="border border-gray-300 px-4 py-2">Result</th>
            </tr>
          </thead>
          <tbody>
            <tr className="bg-white">
              <td className="border border-gray-300 px-4 py-2">
                {studentResult.CNO}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {studentResult.SEX}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {studentResult.AGGT}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {studentResult.DIV}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                <ul>
                  {Object.entries(studentResult.result).map(
                    ([subject, grade]) => (
                      <li key={subject}>
                        <strong>{subject}:</strong> {grade}
                      </li>
                    ),
                  )}
                </ul>
              </td>
            </tr>
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Page;
