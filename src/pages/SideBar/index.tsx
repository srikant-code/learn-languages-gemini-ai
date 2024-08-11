import { Avatar, Chip, Spacer } from "@nextui-org/react";
import { FaMoon, FaSun } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { CustomListbox } from "../../components/ListBoxWrapper";
import ParaGraph from "../../components/Paragraph";
import CustomSwitch from "../../components/Switch";
import { setSetting } from "../../store/reducer";
import { SlideIDs, STRINGS } from "../../utilities/constants";
import { AppIconAndText } from "../LoginAndSignup";
import CustomAutocomplete from "../../components/Autocomplete";
import { SettingsObject } from "../Settings";
import { FaAngleDoubleLeft, FaAngleDoubleRight, FaKey } from "react-icons/fa";
import { useState } from "react";
import CustomButton from "../../components/Button";
import { CourseItems } from "../Courses";
interface LeftSideBarProps {}

const LeftSideBar: FunctionComponent<LeftSideBarProps> = ({ className }) => {
  const theme =
    useSelector((state) => state.language?.theme) || STRINGS.THEMES.LIGHT;
  const dispatch = useDispatch();
  const toggleTheme = () => {
    dispatch(
      setSetting({
        key: "theme",
        value:
          theme === STRINGS.THEMES.DARK
            ? STRINGS.THEMES.LIGHT
            : STRINGS.THEMES.DARK,
      })
    );
  };
  const settingsFromRedux = useSelector((state) => state.language) ?? {};
  const [sideBarCollapsed, setSideBarCollapsed] = useState(false);
  const [hoverState, setHoverState] = useState(false);

  const otherItems = [
    {
      // title: "Actions",
      // showDivider: true,
      items: [
        {
          name: "Setup Gemini API Key",
          route: SlideIDs.settings.route,
          description: "Setup Gemini Key",
          icon: <FaKey />,
        },
        {
          name: "Dark Mode",
          // route: "/Dark Mode",
          description: "Toggle theme",
          icon: theme === STRINGS.THEMES.DARK ? <FaMoon /> : <FaSun />,
          onClick: toggleTheme,
          EndContent: (
            <CustomSwitch
              onClick={toggleTheme}
              // defaultSelected={theme === STRINGS.THEMES.DARK}
              isSelected={theme === STRINGS.THEMES.DARK}
              className=" mt-[-1rem]"
              size="md"
              color="primary"
              startContent={<FaSun />}
              endContent={<FaMoon />}
              aria-label="Dark mode toggle"
            />
          ),
        },
      ],
    },
  ];

  return (
    <div
      className={`hover:w-[290px] relative ${className}`}
      style={{
        height: "97vh",
        width: sideBarCollapsed ? (hoverState ? 290 : 80) : 290,
      }}
      onMouseEnter={() => {
        if (sideBarCollapsed) {
          setHoverState(true);
        }
      }}
      onMouseLeave={() => {
        if (sideBarCollapsed) {
          setHoverState(false);
        }
      }}>
      <CustomButton
        isIconOnly
        className="absolute right-[-12px] top-8 rounded-full p-0"
        color="primary"
        size={"md"}
        variant="solid"
        onClick={() => setSideBarCollapsed(!sideBarCollapsed)}>
        {sideBarCollapsed ? (
          <FaAngleDoubleRight className="text-2xl" />
        ) : (
          <FaAngleDoubleLeft className="text-2xl" />
        )}
      </CustomButton>
      <div
        variant="light"
        className="flex flex-col justify-between h-full"
        style={{ width: "inherit" }}>
        <div variant="light" className="">
          <AppIconAndText onlyLogo={!hoverState && sideBarCollapsed} />
          <CustomAutocomplete
            className="p-4 z-[99]"
            items={[
              ...Object.values(SlideIDs).map((slide) => {
                return {
                  label: slide.name,
                  route: slide.route,
                  description: slide.description,
                  value: slide.name,
                  icon: slide.icon,
                };
              }),
              ...SettingsObject.map((setting) => {
                console.log({ setting, settingsFromRedux });
                const settingTypeCustom = setting.type === STRINGS.TYPES.CUSTOM;
                return {
                  label: setting.componentProps?.label,
                  route: setting?.route ?? undefined,
                  description:
                    settingsFromRedux[setting.key]?.label ??
                    (settingTypeCustom
                      ? setting.valueExtractor({
                          setting: settingsFromRedux[setting.key],
                        })
                      : settingsFromRedux[setting.key]),
                  value: settingTypeCustom
                    ? setting.valueExtractor({
                        setting: settingsFromRedux[setting.key],
                      })
                    : setting.key,
                  icon: setting?.icon,
                };
              }),
              ...CourseItems,
            ]}
            placeholder="Quick access..."
          />
        </div>
        <div>
          <CustomListbox items={otherItems} isIconOnly={sideBarCollapsed} />
        </div>
      </div>
    </div>
  );
};

export default LeftSideBar;

export const ProfilePic = ({ ...props }) => {
  return (
    <Avatar
      // isBordered
      src={STRINGS.DUMMY.PROFILE_IMAGE}
      radius="lg"
      size="lg"
      {...props}
    />
  );
};

const UserProfileLegacy = () => {
  const userProfile = useSelector((state) => state.language.profile) ?? {};
  return (
    <div className="p-6 flex flex-col items-center relative gap-4 rounded-3xl dark bg-slate-800 m-6">
      <img
        src={STRINGS.DUMMY.PROFILE_IMAGE}
        style={{ borderRadius: 100 }}
        className="w-24 border-4 absolute top-[-35px] border-slate-800"
        alt="profile pic"
      />
      <Spacer y={8} />
      <div className="flex flex-col p-0 items-center gap-2">
        <ParaGraph className="headerText p-0 m-0 first-letter:uppercase overflow-ellipsis">
          {userProfile?.displayName?.split(" ")[0]}
        </ParaGraph>
        <ParaGraph className="overflow-ellipsis text-small">
          {userProfile?.email}
        </ParaGraph>
        <div className="flex gap-2 items-center ">
          <Chip className="" color="success">
            Novice
          </Chip>
          <Chip className="" color="warning">
            23 {STRINGS.APP_CURRENCY}
          </Chip>
        </div>
      </div>
    </div>
  );
};
