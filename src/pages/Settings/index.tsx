import { cn } from "@nextui-org/react";
import { FaMoon, FaSun } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import CustomAutocomplete from "../../components/Autocomplete";
import CustomInput from "../../components/Input";
import { IconHeader } from "../../components/Paragraph";
import CustomSwitch from "../../components/Switch";
import { setSetting as setSettings } from "../../store/reducer";
import { SlideIDs, STRINGS } from "../../utilities/constants";

interface SettingsProps {}

const TYPES = STRINGS.TYPES;

export const SettingsObject = [
  {
    type: TYPES.BOOLEAN,
    key: "theme",
    defaultValue: STRINGS.THEMES.DARK,
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
          "justify-between cursor-pointer rounded-lg gap-2 p-4 border-2 border-transparent",
          "data-[selected=true]:border-primary"
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
    route: "/settings",
    componentProps: {
      placeholder: "Enter your API key from Google AI Studio",
      label: "Gem AI API Key",
    },
  },
  {
    type: TYPES.SELECT,
    key: "geminiModel",
    options: Object.values(STRINGS.MODELS),
    route: "/settings",
    componentProps: {
      placeholder: "Enter gemini model",
      label: "Default Gemini Model",
    },
  },
  // Keep for popover timeout - default 10000 millisecond
  // default voice of audio playback
  // default speed of audio playback
];

const Settings: FunctionComponent<SettingsProps> = () => {
  const settingsFromRedux = useSelector((state) => state.language) ?? {};
  const dispatch = useDispatch();

  const handleInputChange = ({ setting, input, currentReduxValue }) => {
    console.log({ setting, input, currentReduxValue });
    const inputValue = input.target.value;
    dispatch(
      setSettings({
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

  return (
    <div>
      <IconHeader icon={SlideIDs.settings.icon}>Settings</IconHeader>
      <div className="flex flex-col gap-10 p-4">
        {SettingsObject.map((setting) => {
          switch (setting.type) {
            case TYPES.BOOLEAN:
              return (
                <div key={setting.key}>
                  <CustomSwitch
                    isSelected={
                      setting.defaultValue ===
                      (settingsFromRedux[setting.key]
                        ? settingsFromRedux[setting.key]
                        : false)
                    }
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
                <div key={setting.key}>
                  <CustomAutocomplete
                    value={settingsFromRedux[setting.key]?.value}
                    selectedKey={settingsFromRedux[setting.key]?.value}
                    onSelectionChange={(input) => {
                      console.log(input);
                      handleInputChange({
                        setting,
                        input: { target: { value: input } },
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
                <div key={setting.key}>
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
            default:
              return null;
          }
        })}
      </div>
    </div>
  );
};

export default Settings;
