import { useAutoAnimate } from "@formkit/auto-animate/react";
import { Card, CardBody, Link, Spacer } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { FaEyeSlash } from "react-icons/fa";
import { FaEye } from "react-icons/fa6";
import { FcGoogle } from "react-icons/fc";
import viteLogo from "../../../public/vite.svg";
import CustomButton from "../../components/Button";
import CustomInput from "../../components/Input";
import ParaGraph from "../../components/Paragraph";
import CustomTabs from "../../components/Tabs";
import firebase, {
  firebaseLogIn,
  firebaseSignInWithGoogle,
  firebaseSignUp,
} from "../../firebase/firebase";
import { SlideIDs, STRINGS } from "../../utilities/constants";
import { ValidateCustomRegex } from "../../utilities/utilities";
import { useNavigate } from "react-router-dom";
import CustomLink from "../../components/Link";

export const LoginAndSignup = () => {
  const [parent] = useAutoAnimate();
  return (
    <div className="flex w-full h-lvh" ref={parent}>
      <BackgroundImageLogin />
      <div className="flex-1 flex items-center justify-center">
        Some things to display to give info to user
      </div>
      <div className="flex-1 flex items-center justify-center">
        <LogInSignupForm
          className={`items-center justify-center ${STRINGS.CLASSES.basicTransitions}`}
        />
      </div>
    </div>
  );
};

export const BackgroundImageLogin = () => {
  return (
    <div
      style={{
        position: "fixed",
        width: "100vw",
        height: "100vh",
        background: `url(${`https://ozksgdmyrqcxcwhnbepg.supabase.co/storage/v1/object/public/assets/11683/4af06ae2-1a98-434e-80f2-ce0e5a7d73a5`})`,
        backgroundSize: "cover",
        zIndex: 0,
        opacity: 0.2,
      }}
    />
  );
};

export const ImageAndAppLogo = () => {
  return (
    <div className="flex items-center justify-center p-6">
      <img src={viteLogo} className="logo m-[-1rem]" alt="Vite logo" />
      <ParaGraph className={STRINGS.CLASSES.subHeading}>
        {STRINGS.APP_NAME}
      </ParaGraph>
    </div>
  );
};

export const Profile = () => {
  const user = firebase.auth().currentUser;

  if (user) {
    return (
      <div>
        <img src={user.photoURL} alt="Profile" />
        <h2>{user.displayName}</h2>
        <p>{user.email}</p>
      </div>
    );
  } else {
    return <p>No user is signed in</p>;
  }
};

const TABS = {
  LOGIN: "Login",
  SIGN_UP: "Sign up",
};

const COPY = {
  [TABS.SIGN_UP]: {
    heading: "Embark on Your Language Journey! 🌍",
    username: "Choose a fun language learner alias. ex: PolyglotPanda",
    emailHint: "We will not spam. Promise :)",
    // "We'll only send language learning goodies! ex: youremail@example.com",
    passwordPlaceholder: "Create a super secret password. ex: mypassword",
    // confirmPassword: "Type your secret password again, just to be sure.",
    signupButton: "Let's start learning! 🚀",
  },
  [TABS.LOGIN]: {
    heading: "Welcome back, Language Explorer! 🌟",
    emailHint: "",
    usernameOrEmail:
      "Your language learner alias or email. ex: PolyglotPanda or youremail@example.com",
    passwordPlaceholder: "Your super secret password. ex: mypassword",
    // rememberMe: "Stay signed in on this device.",
    loginButton: "Back to language learning! 🚀",
    forgotPassword: "Forgot your secret? No worries, click here.",
    newUser: "New here? Embark on your language journey!",
  },
};

const MIN_LENGTH = {
  EMAIL: 4,
  PASSWORD: 6,
  NAME: 4,
};

export const LogInSignupForm = ({ className }) => {
  const [selectedTab, setSelectedTab] = useState(TABS.LOGIN);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [expandForm, setExpandForm] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (error !== "") setError("");
  }, [name, email, password, expandForm, selectedTab]);

  const handleFireBaseResponse = (res, doLoginAfterSuccess) => {
    setLoading(false);
    if (res?.error && res?.message) setError(res?.message);
    else {
      if (doLoginAfterSuccess) handleEmailLogin();
      else {
        // navigate to homepage
        navigate(SlideIDs.home.route);
      }
    }
  };

  const googleSigninHandler = async () => {
    setLoading(true);
    handleFireBaseResponse(await firebaseSignInWithGoogle());
  };

  const handleEmailLogin = async () => {
    setLoading(true);
    handleFireBaseResponse(await firebaseLogIn({ email, password }));
  };

  return (
    <div className={`flex flex-col w-full ${className}`}>
      <Card className="max-w-full w-[380px] h-fit p-2 pb-8 px-6 rounded-3xl">
        <CardBody className="overflow-hidden">
          <ImageAndAppLogo />
          {error ? <ErrorCard error={error} /> : <></>}
          <CustomTabs
            fullWidth
            size="lg"
            aria-label="Tabs form"
            selectedKey={selectedTab}
            onSelectionChange={setSelectedTab}
            centerTabs
            className={`${STRINGS.CLASSES.basicTransitions}`}
            tabs={[
              {
                title: TABS.LOGIN,
                content: (
                  <div
                    className={`flex flex-col gap-4 ${STRINGS.CLASSES.basicTransitions}`}>
                    <ParaGraph>Join the GemAI Club! 🎉</ParaGraph>
                    <EmailAndPasswordRender
                      {...{
                        email,
                        password,
                        setEmail,
                        setPassword,
                        name,
                        setSelectedTab,
                        currentTab: TABS.LOGIN,
                        notIntendedTabMessage: undefined,
                        notIntendedTab: TABS.SIGN_UP,
                        googleSigninHandler,
                        loading,
                        primaryAction: handleEmailLogin,
                        expandForm,
                        setExpandForm,
                      }}
                    />
                  </div>
                ),
              },
              {
                title: TABS.SIGN_UP,
                content: (
                  <div className="flex flex-col gap-4">
                    {expandForm ? (
                      <>
                        <CustomInput
                          isRequired
                          label="Your name"
                          placeholder="Pick a cool nickname. ex: StarGazer"
                          value={name}
                          onChange={(val) => setName(val)}
                          disabled={loading}
                          isInvalid={
                            !name.length
                              ? false
                              : !(name?.length >= MIN_LENGTH.NAME)
                          }
                          color={
                            !name.length
                              ? "default"
                              : !(name?.length >= MIN_LENGTH.NAME)
                              ? "danger"
                              : "success"
                          }
                        />
                      </>
                    ) : (
                      <></>
                    )}
                    <EmailAndPasswordRender
                      {...{
                        email,
                        password,
                        setEmail,
                        setPassword,
                        name,
                        setSelectedTab,
                        currentTab: TABS.SIGN_UP,
                        notIntendedTabMessage: `Already have an account?`,
                        notIntendedTab: TABS.LOGIN,
                        googleSigninHandler,
                        loading,
                        primaryAction: async () => {
                          setLoading(true);
                          handleFireBaseResponse(
                            await firebaseSignUp({ email, password, name }),
                            true
                          );
                        },
                        expandForm,
                        setExpandForm,
                      }}
                    />
                  </div>
                ),
              },
            ]}
          />
        </CardBody>
      </Card>
    </div>
  );
};

const EmailAndPasswordRender = ({
  email,
  password,
  setEmail,
  setPassword,
  name,
  setSelectedTab,
  currentTab,
  notIntendedTabMessage = "Need to create an account?",
  notIntendedTab,
  loading,
  primaryAction,
  expandForm,
  setExpandForm,
  googleSigninHandler,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [parent] = useAutoAnimate();

  const isEmailValid =
    email?.length &&
    email?.length >= MIN_LENGTH.EMAIL &&
    ValidateCustomRegex(email, STRINGS.REGEX.EMAIL);
  const isPassValid =
    password?.length && password?.length >= MIN_LENGTH.PASSWORD;
  const isNameValid =
    currentTab === TABS.SIGN_UP ? name?.length >= MIN_LENGTH.NAME : true;

  const shouldEnableAction = isEmailValid && isPassValid && isNameValid;
  const isDisabled = loading || (expandForm ? !shouldEnableAction : false);

  return (
    <div ref={parent} className="flex flex-col gap-4">
      {expandForm ? (
        <>
          <CustomInput
            isRequired
            label="Email"
            disabled={loading}
            placeholder="Please enter your email"
            type="email"
            value={email}
            isInvalid={!email.length ? false : !isEmailValid}
            color={
              !email.length ? "default" : !isEmailValid ? "danger" : "success"
            }
            description={COPY[currentTab].emailHint}
            errorMessage="Uhh! That's not a email it seems🤨. Try something else!"
            onChange={(val) => setEmail(val)}
            // startContent={<FiMail className="m-2" />}
          />
          <CustomInput
            isRequired
            label="Password"
            disabled={loading}
            isInvalid={!password.length ? false : !isPassValid}
            color={
              !password.length ? "default" : !isPassValid ? "danger" : "success"
            }
            errorMessage="That's a small password! Keep it at least 6 characters long."
            description={
              isPassValid ? "Hmm, That's a good password." : undefined
            }
            placeholder={COPY[currentTab].passwordPlaceholder}
            type={isVisible ? "text" : "password"}
            endContent={
              password?.length ? (
                <CustomButton
                  isIconOnly
                  className="focus:outline-none mr-3"
                  onClick={() => setIsVisible(!isVisible)}
                  aria-label="toggle password visibility">
                  {isVisible ? (
                    <FaEye className="text-2xl text-default-400 " />
                  ) : (
                    <FaEyeSlash className="text-2xl text-default-400 " />
                  )}
                </CustomButton>
              ) : (
                <></>
              )
            }
            value={password}
            onChange={(val) => setPassword(val)}
          />
          <p className="text-center text-small">
            {notIntendedTabMessage}{" "}
            <CustomLink
              size="sm"
              onPress={() => setSelectedTab(notIntendedTab)}>
              {notIntendedTab}
            </CustomLink>
          </p>
        </>
      ) : (
        <></>
      )}
      {expandForm ? <></> : <Spacer y={0} />}
      <div className="flex gap-2 justify-end">
        <CustomButton
          fullWidth
          size="lg"
          // color="primary"
          variant={isDisabled ? "bordered" : "solid"}
          disabled={isDisabled}
          color={isDisabled ? "default " : "primary"}
          onClick={() => {
            if (!expandForm) setExpandForm(true);
            else if (shouldEnableAction) primaryAction();
          }}>
          {currentTab} with email
        </CustomButton>
      </div>

      <CustomButton
        size="lg"
        onClick={() => {
          if (googleSigninHandler) {
            googleSigninHandler();
          }
        }}
        className="gap-4"
        color={!isDisabled ? "default" : "primary"}
        disabled={loading}>
        <FcGoogle className="scale-150 mb-0" />
        <ParaGraph className="text-primary-500">
          {currentTab} with Google
        </ParaGraph>
      </CustomButton>
    </div>
  );
};

export const ErrorCard = ({ error }) => {
  return (
    <Card className="bg-red-200 shadow-none p-4 mb-6">
      <CardBody>{error}</CardBody>
    </Card>
  );
};

//  <div className="p-8">
//    <CustomInput
//      type="email"
//      placeholder="Email"
//      onChange={(e) => setEmail(e.target.value)}
//    />
//    <CustomInput
//      type="password"
//      placeholder="Password"
//      onChange={(e) => setPassword(e.target.value)}
//    />
//    <div>
//      <CustomButton onClick={() => firebaseLogIn({ email, password })}>
//        Log In
//      </CustomButton>
//      <CustomButton onClick={firebaseSignInWithGoogle}>
//        Log In with Google
//      </CustomButton>
//      <CustomButton onClick={firebaseSignInWithApple}>
//        Log In with Apple
//      </CustomButton>
//    </div>

//    <div>
//      <CustomButton onClick={() => firebaseSignUp({ email, password })}>
//        Sign Up
//      </CustomButton>
//      <CustomButton onClick={firebaseSignInWithGoogle}>
//        Sign Up with Google
//      </CustomButton>
//      <CustomButton onClick={firebaseSignInWithApple}>
//        Sign Up with Apple
//      </CustomButton>
//    </div>

//    <CustomButton onClick={firebaseLogOut}>Log Out</CustomButton>
//  </div>;
