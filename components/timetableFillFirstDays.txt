"use client";

import React, { useState, useEffect } from "react";

interface Classroom {
  name: string;
  seats: number;
  available: boolean;
}

interface Programme {
  name: string;
  students: number;
  courses: string[];
  sockets: number[];
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

const TimetablePage = () => {
  const [classrooms, setClassrooms] = useState<Classroom[]>([
    { name: "Classroom 1", seats: 30, available: true },
    { name: "Classroom 2", seats: 30, available: true },
    // Add more classrooms as needed
  ]);

  const [programmes, setProgrammes] = useState<Programme[]>([
    {
      name: "Mathematics",
      students: 25,
      courses: ["Algebra", "Calculus", "Geometry"],
      sockets: [2, 1, 1],
    },
    {
      name: "Physics",
      students: 20,
      courses: ["Mechanics", "Electricity", "Optics"],
      sockets: [1, 1, 1],
    },
    // Add more programmes as needed
  ]);

  const [dayStructure, setDayStructure] = useState<DayStructure[]>([
    { type: "breakfast", duration: 2 },
    { type: "s", duration: 3 },
    { type: "break", duration: 1 },
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

  useEffect(() => {
    let startingTime = 8 * 60;

    let programmesCopy = shuffleCourses(JSON.parse(JSON.stringify(programmes)));

    let updatedTimetable: Array<Array<ScheduledPeriod[]>> = Array.from(
      { length: daysOfWeek.length },
      () => Array.from({ length: classrooms.length }, () => []),
    );

    // let programmesCopy = JSON.parse(JSON.stringify(programmes));

    for (let dayIndex = 0; dayIndex < daysOfWeek.length; dayIndex++) {
      let day = daysOfWeek[dayIndex];
      let currentTime = startingTime;

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

              if (programme.sockets[0] > 0) {
                let classroom = classrooms[classroomIndex];

                if (classroom.seats >= programme.students) {
                  updatedTimetable[dayIndex][classroomIndex].push({
                    time: `${startTime / 60}:${(startTime % 60)
                      .toString()
                      .padStart(2, "0")} - ${endTime / 60}:${(endTime % 60)
                      .toString()
                      .padStart(2, "0")}`,
                    course: `${programme.name}, ${programme.courses[0]}`,
                    classroom: classroom.name,
                  });

                  programme.sockets[0]--;

                  if (programme.sockets[0] === 0) {
                    programme.courses.shift();
                    programme.sockets.shift();
                  }

                  scheduled = true;
                  break;
                }
              }
            }

            if (!scheduled) {
              updatedTimetable[dayIndex][classroomIndex].push({
                time: `${startTime / 60}:${(startTime % 60)
                  .toString()
                  .padStart(2, "0")} - ${endTime / 60}:${(endTime % 60)
                  .toString()
                  .padStart(2, "0")}`,
                course: "Free",
              });
            }
          } else {
            updatedTimetable[dayIndex][classroomIndex].push({
              time: `${startTime / 60}:${(startTime % 60)
                .toString()
                .padStart(2, "0")} - ${endTime / 60}:${(endTime % 60)
                .toString()
                .padStart(2, "0")}`,
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
              (course) => `${programme.name}, ${course}`,
            ),
          );
        }
        return unscheduledCourses;
      },
      [],
    );

    setUnscheduledCourses(unscheduled);
  }, [classrooms, programmes, dayStructure]);

  function shuffleCourses(programmes: Programme[]): Programme[] {
    return programmes.map((programme) => {
      let courses = [...programme.courses];
      let sockets = [...programme.sockets];

      for (let i = courses.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [courses[i], courses[j]] = [courses[j], courses[i]];
        [sockets[i], sockets[j]] = [sockets[j], sockets[i]];
      }

      return { ...programme, courses, sockets };
    });
  }

  return (
    <div>
      {timetable.map((day, dayIndex) => (
        <div key={dayIndex}>
          <h2>{`${daysOfWeek[dayIndex]}`}</h2>
          {day.map((classroom, classroomIndex) => (
            <div key={classroomIndex}>
              <h3>{`${classrooms[classroomIndex].name}`}</h3>
              {classroom.map((period, periodIndex) => (
                <p key={periodIndex}>
                  {`${period.time}: ${period.course}${
                    period.classroom ? ", " + period.classroom : ""
                  }`}
                </p>
              ))}
            </div>
          ))}
        </div>
      ))}
      <div>
        <h2>Unscheduled Courses</h2>
        {unscheduledCourses.map((course, index) => (
          <p key={index}>{course}</p>
        ))}
      </div>
    </div>
  );
};

export default TimetablePage;
