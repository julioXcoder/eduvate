"use client";

import React, { useState, useEffect, useMemo, useCallback } from "react";

interface Classroom {
  name: string;
  seats: number;
  available: boolean;
  features: string[];
  block: string; // added block property
}

interface Course {
  name: string;
  sockets: string[][];
}

interface Programme {
  name: string;
  students: number;
  courses: Course[];
  allowedBlocks: string[]; // added allowedBlocks property
}

interface DayStructure {
  type: string;
  duration: number;
}

interface ScheduledPeriod {
  time: string;
  course: string;
  classroom?: string;
}

let daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];

const Timetable = () => {
  const [classrooms, setClassrooms] = useState<Classroom[]>([
    {
      name: "Classroom 1",
      seats: 30,
      available: true,
      features: ["computers", "projector"],
      block: "A", // assigned block A
    },
    {
      name: "Classroom 2",
      seats: 30,
      available: true,
      features: ["laboratory", "workshop"],
      block: "B", // assigned block B
    },
    {
      name: "Classroom 3",
      seats: 30,
      available: true,
      features: ["laboratory", "workshop", "projector", "computers"],
      block: "C", // assigned block B
    },
  ]);

  const [programmes, setProgrammes] = useState<Programme[]>([
    {
      name: "Mathematics",
      students: 25,
      courses: [
        { name: "Algebra", sockets: [["computers"], ["laboratory"]] },
        { name: "Calculus", sockets: [["computers"], ["laboratory"]] },
        {
          name: "Geometry",
          sockets: [["computers"], ["laboratory", "workshop"]],
        },
      ],
      allowedBlocks: ["A", "B", "C"], // allowed blocks A and B
    },
    {
      name: "Physics",
      students: 20,
      courses: [
        { name: "Mechanics", sockets: [["laboratory"], ["workshop"]] },
        { name: "Electricity", sockets: [["laboratory"], ["workshop"]] },
        { name: "Optics", sockets: [["laboratory"], ["workshop"]] },
      ],
      allowedBlocks: ["B"], // allowed block B only
    },
  ]);

  const [dayStructure, setDayStructure] = useState<DayStructure[]>([
    { type: "breakfast", duration: 2 },
    { type: "s", duration: 3 },
    { type: "break", duration: 1.5 },
    { type: "s", duration: 2 },
    { type: "lunch", duration: 1 },
    { type: "s", duration: 2 },
  ]);

  const [timetable, setTimetable] = useState<Array<Array<ScheduledPeriod[]>>>(
    Array.from({ length: daysOfWeek.length }, () =>
      Array.from({ length: classrooms.length }, () => []),
    ),
  );

  const [unscheduledCourses, setUnscheduledCourses] = useState<string[]>([]);

  const shuffleCourses = useCallback((programmes: Programme[]): Programme[] => {
    return programmes.map((programme) => {
      let courses = [...programme.courses];

      // Shuffle the courses
      for (let i = courses.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [courses[i], courses[j]] = [courses[j], courses[i]];
      }

      // Sort the courses by the number of requirements and then by the number of sockets
      courses.sort((a, b) => {
        if (a.sockets.length !== b.sockets.length) {
          return a.sockets.length - b.sockets.length;
        } else {
          return a.sockets[0].length - b.sockets[0].length;
        }
      });

      return { ...programme, courses };
    });
  }, []);

  useEffect(() => {
    let startingTime = 8 * 60;
    const programmesCopy = shuffleCourses(
      JSON.parse(JSON.stringify(programmes)),
    );

    let updatedTimetable: Array<Array<ScheduledPeriod[]>> = Array.from(
      { length: daysOfWeek.length },
      () => Array.from({ length: classrooms.length }, () => []),
    );

    for (let dayIndex = 0; dayIndex < daysOfWeek.length; dayIndex++) {
      let currentTime = startingTime;

      // Create a set to store the scheduled courses for the day
      let scheduledCourses = new Set<string>();

      for (
        let periodIndex = 0;
        periodIndex < dayStructure.length;
        periodIndex++
      ) {
        const period = dayStructure[periodIndex];
        const { type, duration } = period;
        const startTime = currentTime;
        currentTime += duration * 60;
        const endTime = currentTime;

        for (
          let classroomIndex = 0;
          classroomIndex < classrooms.length;
          classroomIndex++
        ) {
          if (type === "s") {
            let scheduled = false;

            for (
              let programmeIndex = 0;
              programmeIndex < programmesCopy.length;
              programmeIndex++
            ) {
              let programme = programmesCopy[programmeIndex];

              if (
                programme.courses.length > 0 &&
                programme.courses[0].sockets.length > 0
              ) {
                let classroom = classrooms[classroomIndex];

                // Check if the classroom's block is allowed for the programme
                if (programme.allowedBlocks.includes(classroom.block)) {
                  // Check if the classroom's seats and features match the course's requirements
                  if (
                    classroom.seats >= programme.students &&
                    programme.courses[0].sockets[0].every((req: string) =>
                      classroom.features.includes(req),
                    )
                  ) {
                    // Check if the course has not been scheduled for the day
                    if (
                      !scheduledCourses.has(
                        `${programme.name}, ${programme.courses[0].name}`,
                      )
                    ) {
                      updatedTimetable[dayIndex][classroomIndex].push({
                        time: `${formatTime(startTime)} - ${formatTime(
                          endTime,
                        )}`,
                        course: `${programme.name}, ${programme.courses[0].name}`,
                        classroom: classroom.name,
                      });

                      // Add the course to the set of scheduled courses for the day
                      scheduledCourses.add(
                        `${programme.name}, ${programme.courses[0].name}`,
                      );

                      programme.courses[0].sockets.shift();

                      if (programme.courses[0].sockets.length === 0) {
                        programme.courses.shift();
                      }

                      scheduled = true;
                      break;
                    }
                  }
                }
              }
            }

            if (!scheduled) {
              updatedTimetable[dayIndex][classroomIndex].push({
                time: `${formatTime(startTime)} - ${formatTime(endTime)}`,
                course: "Free",
              });
            }
          } else {
            updatedTimetable[dayIndex][classroomIndex].push({
              time: `${formatTime(startTime)} - ${formatTime(endTime)}`,
              course: period.type,
            });
          }
        }
      }
    }

    setTimetable(updatedTimetable);

    const unscheduled = programmesCopy.reduce(
      (unscheduledCourses: string[], programme: Programme) => {
        if (programme.courses.length > 0) {
          unscheduledCourses.push(
            ...programme.courses.map(
              (course) => `${programme.name}, ${course.name}`,
            ),
          );
        }
        return unscheduledCourses;
      },
      [],
    );

    setUnscheduledCourses(unscheduled);
  }, [classrooms, dayStructure, programmes, shuffleCourses]);

  function formatTime(minutes: number): string {
    return `${Math.floor(minutes / 60)
      .toString()
      .padStart(2, "0")}:${(minutes % 60).toString().padStart(2, "0")}`;
  }

  return (
    <div>
      <table className="table-bordered table-striped table">
        <thead>
          <tr>
            <th className="px-3 py-3">Day / Time</th>
            {classrooms.map((classroom, index) => (
              <th key={index} className="px-3 py-3">
                {classroom.name} - Block {classroom.block} - {classroom.seats}{" "}
                Seats
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {timetable.map((day, dayIndex) => (
            <React.Fragment key={dayIndex}>
              <tr>
                <td
                  colSpan={classrooms.length + 1}
                  className="border-2 bg-red-400 px-3 py-3"
                >
                  <h2>{daysOfWeek[dayIndex]}</h2>
                </td>
              </tr>
              {day[0].map((period, periodIndex) => (
                <tr key={periodIndex}>
                  <td className="border-2 bg-blue-600 px-3 py-3">
                    {period.time}
                  </td>
                  {day.map((classroom, classroomIndex) => (
                    <td
                      key={classroomIndex}
                      className={`border-2 px-3 py-3 ${
                        classroom[periodIndex].course === "Free"
                          ? "bg-green-500"
                          : ""
                      }`}
                    >
                      {classroom[periodIndex].course}
                    </td>
                  ))}
                </tr>
              ))}
            </React.Fragment>
          ))}
        </tbody>
      </table>
      <div>
        <h2>Unscheduled Courses</h2>
        {unscheduledCourses.map((course, index) => (
          <p key={index}>{course}</p>
        ))}
      </div>
    </div>
  );
};

export default Timetable;
