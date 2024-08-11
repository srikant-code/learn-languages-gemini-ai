import {
  useCompletedAssessments,
  useIncompleteAssessments,
  useSubmission,
  useSubmissions,
} from "../../../store/reduxHelpers/assessments";

// SubmissionsComponent
export const SubmissionsComponent = ({ courseID }) => {
  const submissions = useSubmissions(courseID);
  const completedAssessments = useCompletedAssessments(courseID);
  const incompleteAssessments = useIncompleteAssessments(courseID);

  return (
    <div>
      <h2>All Submissions</h2>
      {submissions &&
        Object.values(submissions).map((submission, index) => (
          <div key={index}>
            <h3>{submission.name}</h3>
            <p>Completed: {submission.isCompleted ? "Yes" : "No"}</p>
            <p>Last Updated On: {submission.lastUpdateOn}</p>
          </div>
        ))}

      <h2>Completed Assessments</h2>
      {completedAssessments &&
        completedAssessments.map((assessment, index) => (
          <div key={index}>
            <h3>{assessment.name}</h3>
            <p>Last Updated On: {assessment.lastUpdateOn}</p>
          </div>
        ))}

      <h2>Incomplete Assessments</h2>
      {incompleteAssessments &&
        incompleteAssessments.map((assessment, index) => (
          <div key={index}>
            <h3>{assessment.name}</h3>
            <p>Last Updated On: {assessment.lastUpdateOn}</p>
          </div>
        ))}
    </div>
  );
};

// SubmissionComponent
export const SubmissionComponent = ({ courseID, submissionID }) => {
  const submission = useSubmission(courseID, submissionID);

  return submission ? (
    <div>
      <h2>{submission.name}</h2>
      <p>Type: {submission.type}</p>
      <p>Completed: {submission.isCompleted ? "Yes" : "No"}</p>
      <p>Last Updated On: {submission.lastUpdateOn}</p>
    </div>
  ) : (
    <p>No submission found with the provided ID.</p>
  );
};
