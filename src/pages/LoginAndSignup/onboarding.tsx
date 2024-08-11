import { useEffect, useState } from "react";
import CustomButton from "../../components/Button";
import { GetAllCountries } from "../../utilities/countryIcons";
import LanguageFinder from "./languageFinder";
import MarqueeAnimation from "./marqueeAnimation";
import { ScrollShadow, Spacer } from "@nextui-org/react";
import { RemoveNullValuesFromArray } from "../../utilities/utilities";
import ParaGraph from "../../components/Paragraph";
import { useDispatch, useSelector } from "react-redux";
import { setSetting } from "../../store/reducer";
import MotivationToLearn from "./motivation";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import UserDailyGoal from "./goals";
import { LogInSignupForm } from ".";
import { STRINGS } from "../../utilities/constants";

const Onboarding = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const dispatch = useDispatch();
  const settings = useSelector((state) => state.language) ?? {};
  const [langsUserKnows, setLangsUserKnows] = useState(
    settings?.[STRINGS.STORAGE.languagesUserKnows] || {
      en: {
        read: true,
        write: true,
        speak: true,
      },
    }
  );
  const [langsUserWantsToKnow, setLangsUserWantsKnow] = useState(
    settings?.[STRINGS.STORAGE.languagesUserWantsToKnow] || {
      en: {
        read: true,
        write: true,
        speak: true,
      },
    }
  );
  const [motivation, setMotivation] = useState(
    settings?.motivation ?? ["Other"]
  );
  const [dailyGoal, setDailyGoal] = useState(settings?.dailyGoal ?? 10);

  const steps = [
    {
      id: STRINGS.STORAGE.languagesUserKnows,
      value: langsUserKnows,
      buttonText: "Yes! I know these languages. Go Next!",
      heading: "What languages do you already know?",
      disabled: !RemoveNullValuesFromArray(
        Object.keys(langsUserKnows),
        (k) => langsUserKnows[k]
      )?.length,
      disabledButtonText: "Select some languages to proceed",
      component: (
        <LanguageFinder
          selectedLangs={langsUserKnows}
          setSelectedLangs={setLangsUserKnows}
        />
      ),
    },
    {
      id: STRINGS.STORAGE.languagesUserWantsToKnow,
      value: langsUserWantsToKnow,
      buttonText: "Yes! I want to learn/improve on these languages. Go Next!",
      heading: "What languages do you want to learn?",
      disabled: !RemoveNullValuesFromArray(
        Object.keys(langsUserWantsToKnow),
        (k) => langsUserWantsToKnow[k]
      )?.length,
      disabledButtonText: "Select some languages to proceed",
      component: (
        <LanguageFinderToLearn
          langsUserWantsToKnow={langsUserWantsToKnow}
          setLangsUserWantsKnow={setLangsUserWantsKnow}
        />
      ),
    },
    {
      id: STRINGS.STORAGE.motivation,
      buttonText: "Yes! I am motivated😁. Go Next!",
      value: motivation,
      disabled: !motivation?.length,
      disabledButtonText: "Without a motivation you cannot proceed",
      heading: "Goals and motivation to learn a new language?",
      component: (
        <MotivationToLearn
          motivation={motivation}
          setMotivation={setMotivation}
        />
      ),
    },
    {
      id: STRINGS.STORAGE.dailyGoal,
      buttonText: "Yes! I will stick to my goal😁. Go Next!",
      value: dailyGoal,
      disabled: !dailyGoal,
      disabledButtonText: "Select a goal to proceed",
      heading: "How many words do you want to learn per day?",
      component: (
        <UserDailyGoal dailyGoal={dailyGoal} setDailyGoal={setDailyGoal} />
      ),
    },
    {
      id: STRINGS.STORAGE.login,
      buttonText: "Yes! I will stick to my goal😁. Go Next!",
      value: dailyGoal,
      disabled: !dailyGoal,
      disabledButtonText: "Select a goal to proceed",
      heading: "Now lets save your progress using an account...",
      component: <LogInSignupForm cardClassName={"w-full"} />,
    },
  ];

  const currentStepObj = steps[currentStep];

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
    dispatch(
      setSetting({
        key: currentStepObj.id,
        value: currentStepObj.value,
      })
    );
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const skipToLogin = () => setCurrentStep(steps.length - 1);
  const isCurrentStep = (num) => currentStep === num;

  console.log({ GetAllCountries });

  const [parent] = useAutoAnimate();
  const isLastStep = isCurrentStep(steps.length - 1);

  // debug useEffect
  // useEffect(() => {
  //   dispatch(
  //     setSetting({
  //       key: STRINGS.STORAGE.languagesUserWantsToKnow,
  //       value: undefined,
  //     })
  //   );
  // }, []);

  return (
    <div
      className={`min-h-screen flex flex-row items-center justify-center bg-gradient-to-r from-blue-500 ${
        isLastStep ? "from-red-500" : ""
      } to-purple-600 text-white overflow-hidden w-full relative ${
        STRINGS.CLASSES.basicTransitions
      }`}>
      <div className="flex-1">
        <MarqueeAnimation className="opacity-100" />
      </div>
      <ScrollShadow
        size={0}
        className="flex-1 flex items-center justify-center p-8 m-4 h-[97vh] bg-slate-100 dark:bg-slate-900 rounded-3xl z-10">
        <div
          className="w-full p-8 shadow-3xl rounded-3xl text-black dark:text-white flex flex-col gap-4 h-full justify-center"
          ref={parent}>
          {isLastStep && (
            <div className="mt-4 ">
              <h3 className="text-2xl font-bold">Congratulations!</h3>
              <p>You're all set to get started.</p>
              <Spacer y={8} />
            </div>
          )}
          <ParaGraph className="text-xl font-bold mb-4">
            {currentStepObj.heading}
          </ParaGraph>
          {steps?.map((step, index) => {
            return isCurrentStep(index) ? (
              <div>{step?.component ? step?.component : null}</div>
            ) : (
              <></>
            );
          })}
          {!isLastStep && (
            <div className="flex justify-between mt-4 w-full px-0">
              <CustomButton
                onClick={prevStep}
                style={{
                  visibility: isCurrentStep(0) ? "hidden" : "visible",
                }}>
                Back
              </CustomButton>
              <CustomButton
                onClick={nextStep}
                disabled={isLastStep || currentStepObj.disabled}
                color={!currentStepObj.disabled ? "primary" : undefined}
                variant={!currentStepObj.disabled ? "solid" : "bordered"}>
                {currentStepObj.disabled && currentStepObj.disabledButtonText
                  ? currentStepObj.disabledButtonText
                  : currentStepObj.buttonText || `Yep! looks cool. Go Next!`}
              </CustomButton>
            </div>
          )}
          {!isLastStep && (
            <CustomButton
              onClick={skipToLogin}
              className="mt-4 self-start"
              size="sm"
              variant="outlined">
              Skip for now
            </CustomButton>
          )}
        </div>
      </ScrollShadow>
    </div>
  );
};

export default Onboarding;

export const LanguageFinderToLearn = ({
  langsUserWantsToKnow,
  setLangsUserWantsKnow,
  ...props
}) => {
  return (
    <LanguageFinder
      selectedLangs={langsUserWantsToKnow}
      setSelectedLangs={setLangsUserWantsKnow}
      inputProps={{
        placeholder: "Search the language that you want to learn...",
      }}
      messageForConfirmation={
        "So you want to learn/improve your existing knowledge, for all of these languages right?"
      }
      messageForNoSelection="Come on! Don't be cheeky. You definitely would want to learn/improve on atleast one language. Select it to proceed."
      {...props}
    />
  );
};
