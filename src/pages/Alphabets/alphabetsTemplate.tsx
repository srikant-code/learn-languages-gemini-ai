import ParaGraph from "../../components/Paragraph";
import {
  useAllLetters,
  usePracticedLetters,
  useReviewedLetters,
} from "../../store/reduxHelpers/alphabets";
import { STRINGS } from "../../utilities/constants";

export const LettersComponent = ({ language, category }) => {
  const allLetters = useAllLetters(language, category);
  const reviewedLetters = useReviewedLetters(language, category);
  const practicedLetters = usePracticedLetters(language, category);

  const heading = STRINGS.CLASSES.subHeading;
  const pWrapper = "flex gap-4 flex-col";
  const flex = "flex gap-4 flex-col";

  return (
    <div>
      <div className={`${pWrapper}`}>
        <ParaGraph className={`${heading}`}>All Letters</ParaGraph>
        <div className={`${flex}`}>
          {allLetters?.length ? (
            allLetters.map((letter, index) => (
              <div key={index}>
                <ParaGraph>
                  {letter.frontText}: {letter.backText}
                </ParaGraph>
              </div>
            ))
          ) : (
            <NoResult data={undefined} />
          )}
        </div>
      </div>
      <div className={`${pWrapper}`}>
        <ParaGraph className={`${heading}`}>Reviewed Letters</ParaGraph>
        <div className={`${flex}`}>
          {reviewedLetters?.length ? (
            reviewedLetters.map((letter, index) => (
              <div key={index}>
                <ParaGraph>
                  {letter.frontText}: {letter.backText}
                </ParaGraph>
              </div>
            ))
          ) : (
            <NoResult data={undefined} />
          )}
        </div>
      </div>
      <div className={`${pWrapper}`}>
        <ParaGraph className={`${heading}`}>Practiced Letters</ParaGraph>
        <div className={`${flex}`}>
          {practicedLetters?.length ? (
            practicedLetters.map((letter, index) => (
              <div key={index}>
                <ParaGraph>
                  {letter.frontText}: {letter.backText}
                </ParaGraph>
              </div>
            ))
          ) : (
            <NoResult data={undefined} />
          )}
        </div>
      </div>
    </div>
  );
};

const NoResult = ({ data = "data" }) => <p>No {data} found.</p>;
