import { getFirestore, doc, setDoc, getDoc } from "firebase/firestore";
const db = getFirestore();

let userPoints = 0;
const completedChallenges = new Set();

const completeChallenge = async (challengeId, category) => {
  const challenge = challenges[category].find((ch) => ch.id === challengeId);
  if (challenge && !completedChallenges.has(challengeId)) {
    userPoints += challenge.points;
    completedChallenges.add(challengeId);
    await updateChallengeProgress(challengeId, category);
  }
};

const getProgress = () => {
  const totalChallenges = Object.values(challenges).flat().length;
  return (completedChallenges.size / totalChallenges) * 100;
};

const updateChallengeProgress = async (challengeId, category) => {
  const userDoc = doc(db, "users", "userId"); // Replace "userId" with the actual user ID
  const userSnapshot = await getDoc(userDoc);
  let userData = userSnapshot.data();

  if (!userData) {
    userData = { completedChallenges: [], points: 0 };
  }

  userData.completedChallenges.push({ challengeId, category });
  userData.points = userPoints;

  await setDoc(userDoc, userData);
};
