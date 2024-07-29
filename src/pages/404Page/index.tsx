import React from "react";
import { Spacer } from "@nextui-org/react";
import ParaGraph from "../../components/Paragraph";
import CustomButton from "../../components/Button";
import { BackgroundImageLogin, ImageAndAppLogo } from "../LoginAndSignup";

const NotFoundPage = () => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
      }}>
      <BackgroundImageLogin />
      <ParaGraph className={`text-3xl font-bold`}>Oh no!</ParaGraph>
      <Spacer y={2} />
      <ParaGraph className={`text-9xl font-bold`}>404</ParaGraph>
      <Spacer y={2} />
      <ParaGraph className={`text-4xl font-bold`}>Page Not Found</ParaGraph>
      <Spacer y={8} />
      <ParaGraph className={`text-lg font-bold`}>
        We couldn't find the page you're looking for. <br />
        But don't worry, there's plenty more to learn!
      </ParaGraph>
      <Spacer y={8} />
      <CustomButton
        auto
        size="lg"
        color="primary"
        variant="solid"
        onClick={() => (window.location.href = "/")}>
        Back to Language Lessons
      </CustomButton>
      <Spacer y={2} />
      <CustomButton
        auto
        size="md"
        variant="flat"
        onClick={() => window.history.back()}>
        Return to Previous Page
      </CustomButton>
      <div className={"fixed flex items-center justify-center bottom-4"}>
        <ImageAndAppLogo className={""} />
      </div>
    </div>
  );
};

export default NotFoundPage;
