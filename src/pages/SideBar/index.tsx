import { Avatar, Chip, Spacer } from "@nextui-org/react";
import { FaMoon, FaSun } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { CustomListbox } from "../../components/ListBoxWrapper";
import ParaGraph from "../../components/Paragraph";
import CustomSwitch from "../../components/Switch";
import { setSetting } from "../../store/reducer";
import { SlideIDs, STRINGS } from "../../utilities/constants";
import { ImageAndAppLogo } from "../LoginAndSignup";
interface LeftSideBarProps {}

const LeftSideBar: FunctionComponent<LeftSideBarProps> = ({ className }) => {
  const theme = useSelector((state) => state.language.theme);
  const userProfile = useSelector((state) => state.language.profile) ?? {};
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

  const menuItems = [
    {
      // title: "Actions",
      showDivider: true,
      items: [
        SlideIDs.home,
        SlideIDs.games,
        SlideIDs.challenges,
        SlideIDs.lessons,
        SlideIDs.dictionary,
        SlideIDs.alphabets,
      ],
    },
    {
      items: [SlideIDs.settings],
    },
  ];
  const otherItems = [
    {
      // title: "Actions",
      // showDivider: true,
      items: [
        {
          name: "Setup Gemini API Key",
          route: SlideIDs.settings.route,
          description: "Toggle theme",
          icon: <FaSun />,
        },
        {
          name: "Dark Mode",
          // route: "/Dark Mode",
          description: "Toggle theme",
          icon: theme === STRINGS.THEMES.DARK ? <FaMoon /> : <FaSun />,
          onClick: toggleTheme,
          EndContent: (
            <CustomSwitch
              onPress={toggleTheme}
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
    <div className={className} style={{ height: "97vh" }}>
      <div
        variant="light"
        bordered
        className="flex flex-col justify-between h-full">
        <div variant="light" bordered className="">
          <ImageAndAppLogo />
          <CustomListbox items={menuItems} />
        </div>
        <div>
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
                  23 coins
                </Chip>
              </div>
            </div>
          </div>

          <CustomListbox items={otherItems} />
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
