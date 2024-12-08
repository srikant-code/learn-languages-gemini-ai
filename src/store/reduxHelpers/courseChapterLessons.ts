import { useSelector } from "react-redux";
import { setSetting } from "../reducer";
import store from "../store";
import { STRINGS } from "../../utilities/constants";
import { GenerateCourseDataCopy } from "../../pages/Courses/allChapters";

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
  const courses = GenerateCourseDataCopy(store.getState().language[id]);
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
      ...(courses[courseID] || {}),
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

// Delete a course:
export const DeleteCourse = ({
  courseID = "COURSE_ID",
  id = STRINGS.STORAGE.COURSES_DATA,
}) => {
  const courses = GenerateCourseDataCopy(store.getState().language[id]);

  const { [courseID]: remove, ...other } = courses;
  const coursesObj = {
    ...other,
  };

  store.dispatch(
    setSetting({
      key: id,
      value: coursesObj,
    })
  );

  return coursesObj;
};

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
      ...courses,
      [courseID]: {
        ...(COURSES[courseID] || {}),
        ...courseDetails,
        enrolledOn: time,
        lastUpdatedOn: time,
        lastUpdateDetails: courseDetails,
        chaptersData: courseDetails.chaptersData
          ? Object.keys(courseDetails.chaptersData).reduce((acc, chapterId) => {
              const currentChaptersData = courseDetails.chaptersData[chapterId];
              acc[chapterId] = {
                // ...ChaptersData[chapterId],
                ...currentChaptersData,
                unlockedOn: time,
                isUnlocked: false,
                lastUpdatedOn: time,
                lastUpdateDetails: currentChaptersData,
                chapters: courseDetails?.chaptersData?.[
                  chapterId
                ]?.chapters?.map((lesson, index) => ({
                  ...lesson,
                  ...currentChaptersData.chapters[index],
                  unlockedOn: time,
                  isUnlocked: false,
                  lastUpdatedOn: time,
                  lastUpdateDetails: currentChaptersData.chapters[index],
                })),
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

// Assuming you have the course data available in your component
// const courseData = this.props.courseData; // replace this with your actual course data

// Function to check if a chapter is unlocked
export function isChapterUnlocked(chapter) {
  return chapter.chapters.some((lesson) => lesson.isUnlocked);
}

// Function to check if a chapter is completed
export function isChapterCompleted(chapter) {
  return chapter.chapters.every((lesson) => lesson.isUnlocked);
}

// Function to unlock the next chapter
export function unlockNextChapter(courseData, currentChapterId) {
  const chapterIds = Object.keys(courseData.chaptersData);
  const currentChapterIndex = chapterIds.indexOf(currentChapterId);

  // If there's a next chapter, unlock it
  if (currentChapterIndex < chapterIds.length - 1) {
    const nextChapterId = chapterIds[currentChapterIndex + 1];
    courseData.chaptersData[nextChapterId].isUnlocked = true;
  }
}

// Function to unlock the next lesson in a chapter
export function unlockImmediateNextLesson(chapter, currentLessonIndex) {
  // If there's a next lesson, unlock it
  if (currentLessonIndex < chapter.chapters.length - 1) {
    chapter.chapters[currentLessonIndex + 1].isUnlocked = true;
  }
  return { chapter, lesson: chapter.chapters[currentLessonIndex + 1] };
}

export function unlockFirstLessonIfNoOtherLessonIsUnlocked(courseData) {
  // Iterate over the chapters
  for (const chapterId in courseData.chaptersData) {
    const chapter = courseData.chaptersData[chapterId];

    // Iterate over the lessons in the chapter
    for (const lesson of chapter.chapters) {
      // If a lesson is unlocked, return immediately
      if (lesson.isUnlocked) {
        return false;
      }
    }
  }

  // If no unlocked lesson was found, unlock the first lesson of the first chapter
  const firstChapterId = Object.keys(courseData.chaptersData)[0];
  const firstChapter = courseData.chaptersData[firstChapterId];
  const firstLesson = firstChapter.chapters[0];
  firstLesson.isUnlocked = true;

  return { courseData, firstLesson, firstChapter };
}

export function unlockNextLesson(courseData) {
  // Iterate over the chapters
  for (const chapterId in courseData.chaptersData) {
    const chapter = courseData.chaptersData[chapterId];

    // Check if the chapter is unlocked or completed
    chapter.isUnlocked = isChapterUnlocked(chapter);
    chapter.isCompleted = isChapterCompleted(chapter);

    // If the chapter is completed, unlock the next chapter
    if (chapter.isCompleted) {
      unlockNextChapter(courseData, chapterId);
    }

    // Iterate over the lessons in the chapter
    for (let i = 0; i < chapter.chapters.length; i++) {
      const lesson = chapter.chapters[i];

      // If the lesson is completed, unlock the next lesson
      if (lesson.isUnlocked) {
        unlockImmediateNextLesson(chapter, i);
        return { courseData, chapter, lesson };
      }
    }
  }
}

export function unlockSpecificLesson(courseData, chapterId, lessonId) {
  // Find the specified chapter
  const chapter = courseData.chaptersData[chapterId];

  // If the chapter exists
  if (chapter) {
    // Find the specified lesson
    const lesson = chapter.chapters.find(
      (lesson) => lesson.lesson === lessonId
    );

    // If the lesson exists, unlock it
    if (lesson) {
      lesson.isUnlocked = true;
    } else {
      console.log(
        `Lesson with ID ${lessonId} not found in chapter ${chapterId}`
      );
    }
    return { courseData, chapter, lesson };
  } else {
    console.log(`Chapter with ID ${chapterId} not found in course`);
  }
}

export function findChapterAndLessonByLessonId(courseData, lessonId) {
  // Iterate over the chapters
  for (let chapterId in courseData.chaptersData) {
    const chapter = courseData.chaptersData[chapterId];

    // Check if the chapter contains the specified lesson
    const lessonExists = chapter.chapters.some(
      (lesson) => lesson.lesson === lessonId
    );

    let lessonNumber = 0;
    // Find the specified lesson
    const lesson = chapter.chapters.find((lesson, index) => {
      lessonNumber = index;
      return lesson.lesson === lessonId;
    });

    // If the lesson exists in this chapter, return the chapter ID
    if (lessonExists) {
      return { chapterId, chapter, lesson, lessonNumber };
    }
  }

  // If no chapter was found containing the specified lesson, return null
  return null;
}
