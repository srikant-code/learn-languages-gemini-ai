import { Card, cn, Spacer } from "@nextui-org/react";
import moment from "moment";
import { useState } from "react";
import {
  FaCat,
  FaCheckCircle,
  FaDatabase,
  FaKey,
  FaMoon,
  FaSun,
  FaTrash,
} from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import CustomAutocomplete from "../../components/Autocomplete";
import CustomButton from "../../components/Button";
import CustomInput from "../../components/Input";
import ParaGraph, { IconHeader } from "../../components/Paragraph";
import CustomSwitch from "../../components/Switch";
import { firebaseLogOut } from "../../firebase/firebase";
import { setSetting } from "../../store/reducer";
import { SlideIDs, STRINGS } from "../../utilities/constants";
import { ConvertMillToMomentCalendar } from "../../utilities/utilities";
import { ErrorCard } from "../LoginAndSignup";
import { ProfilePic } from "../SideBar";
import { BsAlphabet } from "react-icons/bs";
import { FaPerson } from "react-icons/fa6";

interface SettingsProps {}

const TYPES = STRINGS.TYPES;

const SECTION = {
  PROFILE: { heading: "profile", id: "PROFILE" },
  ACCOUNT: { heading: "account", id: "ACCOUNT" },
  AI: { heading: "ai", id: "AI" },
  LESSONS: { heading: "lessons", id: "LESSONS" },
  GENERAL: { heading: "general", id: "GENERAL" },
};

export const SettingsObject = [
  {
    type: TYPES.CUSTOM,
    key: "profile",
    icon: <FaPerson />,
    componentProps: {
      label: "Your profile information",
    },
    section: SECTION.PROFILE.id,
    valueExtractor: ({ setting }) => {
      return [
        `Name: ${setting.displayName ?? ""}`,
        `Email: ${setting.email ?? ""}`,
        `${
          setting.emailVerified ? "Email is verified" : "Email is not verified"
        }`,
      ].join(STRINGS.SEPARATOR.BULL);
    },
    render: ({ setting }) => {
      const [error, setError] = useState("");
      return (
        <div className="flex flex-col gap-2">
          <ParaGraph className={STRINGS.CLASSES.subHeading}>
            Profile details
          </ParaGraph>
          <Spacer y={1} />
          {error ? <ErrorCard error={error} /> : null}
          <div className="flex justify-between items-center">
            <div className="flex flex-row gap-6">
              <ProfilePic />
              <div className="flex flex-col gap-2">
                <ParaGraph className={`${STRINGS.CLASSES.subHeading} mt-0`}>
                  {setting.displayName}
                </ParaGraph>
                <ParaGraph className="flex gap-2 items-center">
                  {setting.email}{" "}
                  {!setting.emailVerified && (
                    <FaCheckCircle className="text-primary-500" />
                  )}
                </ParaGraph>
              </div>
            </div>
            <CustomButton
              color="danger"
              variant="solid"
              className="w-fit"
              size="lg"
              onClick={async () => {
                const res = await firebaseLogOut();
                if (res?.error) setError(res?.message);
                else {
                  // navigate to login page
                  navigate(SlideIDs.login.route);
                }
              }}>
              Log Out
            </CustomButton>
          </div>
        </div>
      );
    },
  },
  {
    type: TYPES.BOOLEAN,
    key: "theme",
    defaultValue: STRINGS.THEMES.DARK,
    icon: <FaMoon />,
    section: SECTION.GENERAL.id,
    transformValue: ({ currentReduxValue }) => {
      return currentReduxValue === STRINGS.THEMES.DARK
        ? STRINGS.THEMES.LIGHT
        : STRINGS.THEMES.DARK;
    },
    componentProps: {
      label: "Dark Mode",
      startContent: <FaSun />,
      endContent: <FaMoon />,
      classNames: {
        base: cn(
          "inline-flex flex-row-reverse w-full max-w-md bg-content1 hover:bg-content2 items-center",
          "justify-between cursor-pointer rounded-lg gap-2 p-4 border-2 border-transparent"
          // "data-[selected=true]:border-primary"
        ),
      },
    },
    children: (
      <div className="flex flex-col gap-1">
        <p className="text-medium">Enable dark mode</p>
        <p className="text-tiny text-default-400">
          Get access to new features before they are released.
        </p>
      </div>
    ),
  },
  {
    type: TYPES.SELECT,
    key: "language",
    icon: <BsAlphabet />,
    section: SECTION.LESSONS.id,
    options: [
      { label: "English", value: "en" },
      { label: "Spanish", value: "es" },
      { label: "French", value: "fr" },
    ],
    componentProps: {
      placeholder: "Enter language",
      label: "Currently learning",
    },
  },
  {
    type: TYPES.INPUT,
    key: "apiKey",
    icon: <FaKey />,
    section: SECTION.AI.id,
    componentProps: {
      placeholder: "Enter your API key from Google AI Studio",
      label: "Gem AI API Key",
    },
  },
  {
    type: TYPES.SELECT,
    key: "geminiModel",
    icon: <FaCat />,
    section: SECTION.AI.id,
    options: Object.values(STRINGS.MODELS),
    componentProps: {
      placeholder: "Enter gemini model",
      label: "Default Gemini Model",
    },
  },
  {
    type: TYPES.CUSTOM,
    key: "profile",
    section: SECTION.ACCOUNT.id,
    icon: <FaDatabase />,
    componentProps: {
      label: "Account activity",
    },
    valueExtractor: ({ setting }) => {
      return [
        `Joined ${
          ConvertMillToMomentCalendar(setting.metadata.createdAt) ?? ""
        }`,
        `Last logged in ${
          ConvertMillToMomentCalendar(setting.metadata.lastLoginAt) ?? ""
        }`,
      ].join(STRINGS.SEPARATOR.BULL);
    },
    render: ({ setting }) => {
      return (
        <div className="flex flex-col gap-2">
          <ParaGraph className={STRINGS.CLASSES.subHeading}>
            Account activity
          </ParaGraph>
          <Spacer y={1} />
          <ParaGraph>
            Last logged in{" "}
            {ConvertMillToMomentCalendar(setting.metadata.lastLoginAt)}
          </ParaGraph>
          <ParaGraph>
            Account created on{" "}
            {ConvertMillToMomentCalendar(setting.metadata.createdAt)}
          </ParaGraph>
        </div>
      );
    },
  },
  {
    type: TYPES.CUSTOM,
    key: "profile",
    icon: <FaTrash />,
    section: SECTION.ACCOUNT.id,
    componentProps: {
      label: "Delete account",
    },
    valueExtractor: ({ setting }) => {
      return [`${"This action is irreversible"}`].join(STRINGS.SEPARATOR.BULL);
    },
    render: ({ setting }) => {
      return (
        <div className="flex flex-col gap-2">
          <ParaGraph className={STRINGS.CLASSES.subHeading}>
            Danger Area
          </ParaGraph>
          <Spacer y={1} />
          <ParaGraph className={""}>
            Deleting your account is irreversible. You will lose all your
            points, challenges.
          </ParaGraph>
          <CustomButton
            color="danger"
            className="w-fit"
            size="lg"
            // variant=""
            onClick={async () => {}}>
            Delete Account
          </CustomButton>
        </div>
      );
    },
  },
  // Keep for popover timeout - default 10000 millisecond
  // default voice of audio playback
  // default speed of audio playback
].map((setting) => {
  const id = `#${setting.componentProps.label?.replaceAll(" ", "")}`;
  return {
    ...setting,
    route: `${SlideIDs.settings.route}${id}`,
    id,
  };
});

const Settings: FunctionComponent<SettingsProps> = () => {
  const settingsFromRedux = useSelector((state) => state.language) ?? {};
  const dispatch = useDispatch();

  window.moment = moment;

  const handleInputChange = ({ setting, input, currentReduxValue }) => {
    console.log({ setting, input, currentReduxValue });
    const inputValue = input;
    dispatch(
      setSetting({
        key: setting.key,
        value: setting?.transformValue
          ? setting.transformValue({
              setting,
              inputValue,
              currentReduxValue: currentReduxValue ?? setting?.defaultValue,
            })
          : setting.type === TYPES.SELECT
          ? setting.options?.find((option) => option.value === inputValue)
          : inputValue,
      })
    );
  };

  const createSections = {};
  SettingsObject.forEach((setting) => {
    if (createSections[setting.section])
      createSections[setting.section].push(setting);
    else createSections[setting.section] = [setting];
  });

  return (
    <div>
      <IconHeader icon={SlideIDs.settings.icon}>Settings</IconHeader>
      <div className="flex flex-col gap-2">
        {Object.keys(createSections).map((section, index) => {
          return (
            <Card
              key={index}
              className="shadow-none border dark:border-slate-800 m-4 flex flex-col gap-10 px-8 pt-4 pb-10">
              <ParaGraph
                className={`border-b-2 dark:border-slate-700 pb-3 ${STRINGS.CLASSES.subHeading}`}>
                {SECTION[section].heading}
              </ParaGraph>
              {createSections[section].map((setting) => {
                switch (setting.type) {
                  case TYPES.BOOLEAN:
                    return (
                      <div id={setting.id} key={setting.key}>
                        <CustomSwitch
                          isSelected={
                            setting.defaultValue ===
                            (settingsFromRedux[setting.key]
                              ? settingsFromRedux[setting.key]
                              : false)
                          }
                          className="max-w-full"
                          onClick={(input) =>
                            handleInputChange({
                              setting,
                              input,
                              currentReduxValue: settingsFromRedux[setting.key],
                            })
                          }
                          {...(setting.componentProps ?? {})}>
                          {setting?.children ?? null}
                        </CustomSwitch>
                      </div>
                    );
                  case TYPES.SELECT:
                    return (
                      <div id={setting.id} key={setting.key}>
                        <CustomAutocomplete
                          value={settingsFromRedux[setting.key]?.value}
                          selectedKey={settingsFromRedux[setting.key]?.value}
                          onSelectionChange={(input) => {
                            console.log(input);
                            handleInputChange({
                              setting,
                              input,
                              currentReduxValue: settingsFromRedux[setting.key],
                            });
                          }}
                          items={setting.options}
                          {...(setting.componentProps ?? {})}
                        />
                      </div>
                    );
                  case TYPES.INPUT:
                    return (
                      <div id={setting.id} key={setting.key}>
                        <CustomInput
                          value={settingsFromRedux[setting.key]}
                          onChange={(input) =>
                            handleInputChange({
                              setting,
                              input,
                              currentReduxValue: settingsFromRedux[setting.key],
                            })
                          }
                          {...(setting.componentProps ?? {})}
                        />
                      </div>
                    );
                  case TYPES.CUSTOM: {
                    // Pass the profile data to the custom render function
                    if (setting.render)
                      return (
                        <div id={setting.id} key={setting.key}>
                          {setting.render({
                            setting: settingsFromRedux[setting.key],
                          })}
                        </div>
                      );
                    return null;
                  }
                  default:
                    return null;
                }
              })}
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default Settings;
