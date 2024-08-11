import { useDispatch, useSelector } from "react-redux";
import CustomButton from "../../components/Button";
import Flag from "../../components/Flag";
import ParaGraph from "../../components/Paragraph";
import CustomTabs from "../../components/Tabs";
import { STRINGS } from "../../utilities/constants";
import { GetAllLanguages } from "../../utilities/countryIcons";
import { AppCurrencyIcon, AppStreakIcon, AppXPIcon } from "./homeContent";

import { Popover, PopoverContent, PopoverTrigger } from "@nextui-org/react";
import { FiTarget } from "react-icons/fi";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { CustomCard } from "../../components/Card";
import Footer from "../../components/Footer";
import { IconHeader } from "../../components/Paragraph";
import { PopOverProps } from "../../components/Popover/popover";
import { SlideIDs } from "../../utilities/constants";
import { ScrollWrapper } from "../SideBar/rightSideBar";
import { useState } from "react";
import { CheckRightTop } from "../LoginAndSignup/languageFinder";
import { FaPlus } from "react-icons/fa6";
import { setSetting } from "../../store/reducer";
import { useAutoAnimate } from "@formkit/auto-animate/react";

interface AppHeaderProps {}

const AppHeader: FunctionComponent<AppHeaderProps> = () => {
  const menuItems = [
    {
      // title: "Actions",
      showDivider: true,
      items: [],
    },
    {
      items: [SlideIDs.settings],
    },
  ];

  const NavItems = [
    SlideIDs.dashboard,
    SlideIDs.games,
    SlideIDs.challenges,
    SlideIDs.courses,
    SlideIDs.dictionary,
  ];

  const userProfile = useSelector((state) => state.language.profile) ?? {};
  const settings = useSelector((state) => state.language) ?? {};
  const currentlyLearning =
    settings[STRINGS.STORAGE.CURRENT_LEARNING_LANGUAGE] ??
    Object.keys(settings?.[STRINGS.STORAGE.languagesUserWantsToKnow] || {})[0];
  const [isOpenChangeLanguage, setIsOpenChangeLanguage] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [parent2] = useAutoAnimate();
  return (
    <>
      <div className="">
        {/* <SetupUserLearningGoalTime /> */}
        <div className="p-2 pb-6 flex flex-row items-center justify-between gap-4 rounded-3xl overflow-scroll">
          <Popover
            {...PopOverProps}
            isOpen={isOpenChangeLanguage}
            onClose={() => setIsOpenChangeLanguage(false)}>
            <PopoverTrigger className="w-full">
              <div>
                <IconCardWithTextButton
                  left={
                    <Flag
                      flag={
                        GetAllLanguages?.[currentlyLearning]?.usedIn[0]?.content
                      }
                      className="w-[45px]"
                    />
                  }
                  heading={"Currently learning"}
                  child={GetAllLanguages?.[currentlyLearning]?.languageName}
                  onClick={setIsOpenChangeLanguage}
                />
              </div>
            </PopoverTrigger>
            <PopoverContent className="">
              <div className="px-1 py-2 flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <ParaGraph className="text-lg font-bold">Learning</ParaGraph>
                  <CustomButton
                    isIconOnly
                    size="sm"
                    as={Link}
                    to={SlideIDs.courses.route}>
                    <FaPlus />
                  </CustomButton>
                </div>
                <div className="flex flex-col gap-2 items-start">
                  {Object.keys(settings?.languagesUserWantsToKnow || {}).map(
                    (lang, index) => {
                      const isSelectedLang =
                        settings[STRINGS.STORAGE.CURRENT_LEARNING_LANGUAGE] ===
                        lang;
                      return (
                        <IconCardWithTextButton
                          key={index}
                          left={
                            <>
                              <Flag
                                flag={GetAllLanguages[lang].usedIn[0]?.content}
                                className="w-[45px]"
                              />
                              {isSelectedLang && (
                                <CheckRightTop
                                  style={{ top: 5, left: 5 }}
                                  className={"bg-white rounded-full"}
                                />
                              )}
                            </>
                          }
                          heading={
                            isSelectedLang
                              ? "currently learning"
                              : "Switch to learn"
                          }
                          child={GetAllLanguages[lang].languageName}
                          onClick={() => {
                            dispatch(
                              setSetting({
                                key: STRINGS.STORAGE.CURRENT_LEARNING_LANGUAGE,
                                value: lang,
                              })
                            );
                            navigate(`${SlideIDs.courses.route}/${lang}`);
                          }}
                        />
                      );
                    }
                  )}
                </div>
                <div className="flex items-center justify-between">
                  <ParaGraph className="text-lg font-bold">You know</ParaGraph>
                  <CustomButton
                    isIconOnly
                    size="sm"
                    as={Link}
                    to={SlideIDs.courses.route}>
                    <FaPlus />
                  </CustomButton>
                </div>
                <div className="flex flex-col gap-2 items-start">
                  {Object.keys(settings?.languagesUserKnows || {}).map(
                    (lang, index) => {
                      const isSelectedLang =
                        settings[STRINGS.STORAGE.CURRENT_LEARNING_LANGUAGE] ===
                        lang;
                      return (
                        <IconCardWithTextButton
                          key={index}
                          left={
                            <>
                              <Flag
                                flag={GetAllLanguages[lang].usedIn[0]?.content}
                                className="w-[45px]"
                              />
                              {isSelectedLang && (
                                <CheckRightTop
                                  style={{ top: 5, left: 5 }}
                                  className={"bg-white rounded-full"}
                                />
                              )}
                            </>
                          }
                          heading={
                            isSelectedLang
                              ? "currently learning"
                              : "Switch to learn"
                          }
                          child={GetAllLanguages[lang].languageName}
                          onClick={() => {
                            dispatch(
                              setSetting({
                                key: STRINGS.STORAGE.CURRENT_LEARNING_LANGUAGE,
                                value: lang,
                              })
                            );
                            navigate(`${SlideIDs.courses.route}/${lang}`);
                          }}
                        />
                      );
                    }
                  )}
                </div>
              </div>
            </PopoverContent>
          </Popover>
          <div className="flex items-center gap-4">
            <IconCardWithTextButton
              left={<AppStreakIcon className={"text-xl"} />}
              heading={"Streak"}
              child={`${settings.streak} days`}
            />
            <IconCardWithTextButton
              left={<FiTarget className="text-red-500 text-2xl" />}
              heading={"Daily goal"}
              child={
                settings.dailyGoal
                  ? `${settings.timeSpent}/${settings.dailyGoal} mins`
                  : "Set Daily Goal"
              }
            />
            <Popover {...PopOverProps} placement="bottom">
              <PopoverTrigger className="w-full">
                <div>
                  <CustomCard className={"p-0"}>
                    <div className={"pl-6 pr-14 py-1 flex flex-row gap-4"}>
                      <div className="flex flex-col items-end">
                        <ParaGraph className="headerText p-0 m-0 first-letter:uppercase overflow-ellipsis">
                          {userProfile?.displayName?.split(" ")[0]}
                        </ParaGraph>
                        <ParaGraph>Novice</ParaGraph>
                      </div>
                      <img
                        src={STRINGS.DUMMY.PROFILE_IMAGE}
                        style={{ borderRadius: 100 }}
                        className="w-14 border-4 border-slate-800"
                        alt="profile pic"
                      />
                    </div>
                  </CustomCard>
                </div>
              </PopoverTrigger>
              <PopoverContent className="">
                <div className="px-1 py-2">
                  <div className="text-small font-bold flex flex-col gap-4">
                    <IconCardWithTextButton
                      left={<AppCurrencyIcon />}
                      heading={STRINGS.APP_CURRENCY}
                      child={`32`}
                    />
                    <IconCardWithTextButton
                      left={<AppXPIcon />}
                      heading={"XP"}
                      child={`387`}
                    />
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          </div>
        </div>
      </div>
      <CustomTabs
        fullWidth
        id={STRINGS.STORAGE.TABS.appHeader}
        selectedKey={
          NavItems.find((item) =>
            window.location.pathname.startsWith(item.route)
          )?.name ?? undefined
        }
        tabs={NavItems.map((item) => {
          return {
            title: item.name,
            route: item.route,
            icon: item.icon,
            content: (
              <div ref={parent2}>
                <IconHeader icon={item.icon} title={item.name}>
                  {item.name}
                </IconHeader>
                <ScrollWrapper className={"h-[81vh]"}>
                  <Outlet />
                  <div className="" style={{ flex: 2.5 }}>
                    <Footer />
                  </div>
                </ScrollWrapper>
              </div>
            ),
          };
        })}
      />
    </>
  );
};

export default AppHeader;

export const IconCardWithTextButton = ({
  left,
  heading,
  child,
  onClick,
  buttonProps = {},
}) => {
  return (
    <CustomCard as={CustomButton} className="p-0" {...buttonProps}>
      <div
        className="px-4 py-1 flex flex-row items-center gap-4"
        onClick={onClick}>
        {left}
        <div className="flex flex-col p-0 items-start gap-0">
          <ParaGraph className="text-xs p-0 m-0 uppercase">{heading}</ParaGraph>
          <ParaGraph className="headerText">{child}</ParaGraph>
        </div>
      </div>
    </CustomCard>
  );
};
