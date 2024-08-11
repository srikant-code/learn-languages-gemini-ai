import { CustomCard } from "../../components/Card";
import ParaGraph from "../../components/Paragraph";
import {
  useChallenges,
  useClaimedChallenges,
  useCompletedChallenges,
  useIncompleteChallenges,
  useUnclaimedChallenges,
} from "../../store/reduxHelpers/challenges";
import { STRINGS } from "../../utilities/constants";

export const ChallengesComponent = ({ type }) => {
  const challenges = useChallenges(type);
  const completedChallenges = useCompletedChallenges(type);
  const incompleteChallenges = useIncompleteChallenges(type);
  const claimedChallenges = useClaimedChallenges(type);
  const unclaimedChallenges = useUnclaimedChallenges(type);

  const heading = STRINGS.CLASSES.subHeading;
  return (
    <div>
      <CustomCard className={``}>
        <ParaGraph className={`${heading}`}>All Challenges</ParaGraph>
        <div>
          {challenges?.length ? (
            challenges.map((challenge, index) => (
              <div key={index}>
                <h2>{challenge.name}</h2>
                <p>{challenge.description}</p>
              </div>
            ))
          ) : (
            <div>
              <NoResult data={undefined} />
            </div>
          )}
        </div>
      </CustomCard>
      <CustomCard className={``}>
        <ParaGraph className={`${heading}`}>Completed Challenges</ParaGraph>
        <div>
          {completedChallenges?.length ? (
            completedChallenges.map((challenge, index) => (
              <div key={index}>
                <h2>{challenge.name}</h2>
                <p>{challenge.description}</p>
              </div>
            ))
          ) : (
            <div>
              <NoResult data={undefined} />
            </div>
          )}
        </div>
      </CustomCard>
      <CustomCard className={``}>
        <ParaGraph className={`${heading}`}>Incomplete Challenges</ParaGraph>
        <div>
          {incompleteChallenges?.length ? (
            incompleteChallenges.map((challenge, index) => (
              <div key={index}>
                <h2>{challenge.name}</h2>
                <p>{challenge.description}</p>
              </div>
            ))
          ) : (
            <div>
              <NoResult data={undefined} />
            </div>
          )}
        </div>
      </CustomCard>
      <CustomCard className={``}>
        <ParaGraph className={`${heading}`}>Claimed Challenges</ParaGraph>
        <div>
          {claimedChallenges?.length ? (
            claimedChallenges.map((challenge, index) => (
              <div key={index}>
                <h2>{challenge.name}</h2>
                <p>{challenge.description}</p>
              </div>
            ))
          ) : (
            <div>
              <NoResult data={undefined} />
            </div>
          )}
        </div>
      </CustomCard>
      <CustomCard className={``}>
        <ParaGraph className={`${heading}`}>Unclaimed Challenges</ParaGraph>
        <div>
          {unclaimedChallenges?.length ? (
            unclaimedChallenges.map((challenge, index) => (
              <div key={index}>
                <h2>{challenge.name}</h2>
                <p>{challenge.description}</p>
              </div>
            ))
          ) : (
            <div>
              <NoResult data={undefined} />
            </div>
          )}
        </div>
      </CustomCard>
    </div>
  );
};

const NoResult = ({ data }) => {
  return <p>No {data} found.</p>;
};
