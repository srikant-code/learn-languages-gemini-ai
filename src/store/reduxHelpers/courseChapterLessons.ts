import { useSelector } from "react-redux";
import { setSetting } from "../reducer";
import store from "../store";
import { STRINGS } from "../../utilities/constants";

export const COURSES_OBJ = {
  COURSE_LESSON_UNLOCK: "COURSE_LESSON_UNLOCK",
};
export const COURSES = {
  [COURSES_OBJ.COURSE_LESSON_UNLOCK]: {
    id: COURSES_OBJ.COURSE_LESSON_UNLOCK,
    coins: -200,
  },
};

export const UpdateCourse = ({
  courseID = "COURSE_ID",
  chapterID = null,
  lessonID = null,
  courseDetails = {},
  chapterDetails = {},
  lessonDetails = {},
  id = STRINGS.STORAGE.COURSES_DATA,
}) => {
  const courses = store.getState().language[id];
  const time = new Date().toISOString();
  let coursesObj = {};

  if (!courses || !courses[courseID]) {
    // If the course doesn't exist, create a new one
    coursesObj = {
      [courseID]: {
        ...COURSES[courseID],
        ...courseDetails,
        enrolledOn: time,
        lastUpdatedOn: time,
        lastUpdateDetails: courseDetails,
        chaptersData: {},
      },
    };
  } else {
    // If the course exists, update it
    coursesObj = { ...courses };
    coursesObj[courseID] = {
      ...courses[courseID],
      lastUpdatedOn: time,
      lastUpdateDetails: courseDetails,
      ...courseDetails,
    };

    if (chapterID) {
      // If a chapter ID is provided, update the chapter
      if (!coursesObj[courseID].chaptersData[chapterID]) {
        // If the chapter doesn't exist, create a new one
        coursesObj[courseID].chaptersData[chapterID] = {
          ...ChaptersData[chapterID],
          ...chapterDetails,
          unlockedOn: time,
          lastUpdatedOn: time,
          lastUpdateDetails: chapterDetails,
        };
      } else {
        // If the chapter exists, update it
        coursesObj[courseID].chaptersData[chapterID] = {
          ...coursesObj[courseID].chaptersData[chapterID],
          lastUpdatedOn: time,
          lastUpdateDetails: chapterDetails,
          ...chapterDetails,
        };

        if (lessonID) {
          // If a lesson ID is provided, update the lesson
          const lessonIndex = coursesObj[courseID].chaptersData[
            chapterID
          ].chapters.findIndex((lesson) => lesson.lesson === lessonID);

          if (lessonIndex !== -1) {
            // If the lesson exists, update it
            coursesObj[courseID].chaptersData[chapterID].chapters[lessonIndex] =
              {
                ...coursesObj[courseID].chaptersData[chapterID].chapters[
                  lessonIndex
                ],
                lastUpdatedOn: time,
                lastUpdateDetails: lessonDetails,
                ...lessonDetails,
              };
          }
        }
      }
    }
  }

  store.dispatch(
    setSetting({
      key: id,
      value: coursesObj,
    })
  );

  return coursesObj;
};
// Updating a course:
// UpdateCourses({
//   courseID: "COURSE_ID_1",
//   courseDetails: {
//     courseName: "New Course Name",
//     courseDescription: "New Course Description",
//   },
// });

// Updating a chapter:
// UpdateCourses({
//   courseID: "COURSE_ID_1",
//   chapterID: "CHAPTER_ID_1",
//   chapterDetails: {
//     chapterName: "New Chapter Name",
//     chapterDescription: "New Chapter Description",
//   },
// });

// Updating a lesson:
// UpdateCourses({
//   courseID: "COURSE_ID_1",
//   chapterID: "CHAPTER_ID_1",
//   lessonID: "LESSON_ID_1",
//   lessonDetails: {
//     lessonName: "New Lesson Name",
//     lessonDescription: "New Lesson Description",
//   },
// });

// Creating a new course:
// UpdateCourses({
//   courseID: "COURSE_ID_2",
//   courseDetails: {
//     courseName: "New Course Name",
//     courseDescription: "New Course Description",
//   },
// });

export const CreateCourse = ({
  courseID = "COURSE_ID",
  courseDetails = {},
  id = STRINGS.STORAGE.COURSES_DATA,
}) => {
  const courses = store.getState().language[id];
  const time = new Date().toISOString();
  let coursesObj = {};

  if (!courses || !courses[courseID]) {
    // If the course doesn't exist, create a new one
    coursesObj = {
      [courseID]: {
        ...COURSES[courseID],
        ...courseDetails,
        enrolledOn: time,
        lastUpdatedOn: time,
        lastUpdateDetails: courseDetails,
        chaptersData: courseDetails.chaptersData
          ? Object.keys(courseDetails.chaptersData).reduce((acc, chapterId) => {
              acc[chapterId] = {
                ...ChaptersData[chapterId],
                ...courseDetails.chaptersData[chapterId],
                unlockedOn: time,
                isUnlocked: false,
                lastUpdatedOn: time,
                lastUpdateDetails: courseDetails.chaptersData[chapterId],
                chapters: ChaptersData[chapterId].chapters.map(
                  (lesson, index) => ({
                    ...lesson,
                    ...courseDetails.chaptersData[chapterId].chapters[index],
                    unlockedOn: time,
                    isUnlocked: false,
                    lastUpdatedOn: time,
                    lastUpdateDetails:
                      courseDetails.chaptersData[chapterId].chapters[index],
                  })
                ),
              };
              return acc;
            }, {})
          : {},
      },
    };
  } else {
    // If the course exists, update it
    coursesObj = { ...courses };
    coursesObj[courseID] = {
      ...courses[courseID],
      ...courseDetails,
      lastUpdatedOn: time,
      lastUpdateDetails: courseDetails,
    };
  }

  store.dispatch(
    setSetting({
      key: id,
      value: coursesObj,
    })
  );

  return coursesObj;
};

// CreateCourses
// CreateCourses({
//   courseID: "COURSE_ID_1",
//   courseDetails: {
//     courseName: "New Course Name",
//     courseDescription: "New Course Description",
//     chaptersData: {
//       CHAPTER_ID_1: {
//         chapterName: "New Chapter Name",
//         chapterDescription: "New Chapter Description",
//         chapters: [
//           {
//             lessonName: "New Lesson Name",
//             lessonDescription: "New Lesson Description",
//           },
//           // More lessons...
//         ],
//       },
//       // More chapters...
//     },
//   },
// });

// Custom hook to get course details
export const useCourseDetails = (courseID) => {
  return (
    useSelector(
      (state) => state.language?.[STRINGS.STORAGE.COURSES_DATA]?.[courseID]
    ) || {}
  );
};

// Custom hook to get chapter details
export const useChapterDetails = (courseID, chapterID) => {
  return (
    useSelector(
      (state) =>
        state.language?.[STRINGS.STORAGE.COURSES_DATA]?.[courseID]
          ?.chaptersData?.[chapterID]
    ) || {}
  );
};

// Custom hook to get lesson details
export const useLessonDetails = (courseID, chapterID, lessonID) => {
  return (
    useSelector((state) => {
      const chapter =
        state.language?.[STRINGS.STORAGE.COURSES_DATA]?.[courseID]
          ?.chaptersData?.[chapterID];
      return chapter?.chapters?.find((lesson) => lesson.lesson === lessonID);
    }) || {}
  );
};

// const CourseComponent = ({ courseID }) => {
//   const course = useCourseDetails(courseID);
//   // Use course details...
// };

// const ChapterComponent = ({ courseID, chapterID }) => {
//   const chapter = useChapterDetails(courseID, chapterID);
//   // Use chapter details...
// };

// const LessonComponent = ({ courseID, chapterID, lessonID }) => {
//   const lesson = useLessonDetails(courseID, chapterID, lessonID);
//   // Use lesson details...
// };
