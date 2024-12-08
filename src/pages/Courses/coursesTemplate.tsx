import {
  useChapterDetails,
  useCourseDetails,
  useLessonDetails,
} from "../../store/reduxHelpers/courseChapterLessons";

export const CourseComponent = ({ courseID }) => {
  const course = useCourseDetails(courseID);

  // Use course details...
  return (
    <div>
      <h1>{course.courseName}</h1>
      <p>{course.courseDescription}</p>
      {/* Render more course details here */}
    </div>
  );
};

export const ChapterComponent = ({ courseID, chapterID }) => {
  const chapter = useChapterDetails(courseID, chapterID);

  // Use chapter details...
  return (
    <div>
      <h2>{chapter.chapterName}</h2>
      <p>{chapter.chapterDescription}</p>
      {/* Render more chapter details here */}
    </div>
  );
};

export const LessonComponent = ({ courseID, chapterID, lessonID }) => {
  const lesson = useLessonDetails(courseID, chapterID, lessonID);

  // Use lesson details...
  return (
    <div>
      <h3>{lesson.lessonName}</h3>
      <p>{lesson.lessonDescription}</p>
      {/* Render more lesson details here */}
    </div>
  );
};
