"use client";
import { MainContainer } from "../containers/main-container";
import SignInForm from "../forms/sign-in-form";
import SignUpForm from "../forms/sign-up-form";
import { NavMenu } from "../menus/nav-menu";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";

const Login = () => {
  return (
    <>
      <NavMenu />
      <MainContainer>
        <Tabs defaultValue="sign-in">
          <TabsList>
            <TabsTrigger value="sign-in">Sign In</TabsTrigger>
            <TabsTrigger value="sign-up">Sign Up</TabsTrigger>
          </TabsList>
          <TabsContent value="sign-in" className="w-full">
            <SignInForm />
          </TabsContent>
          <TabsContent value="sign-up" className="w-full">
            <SignUpForm />
          </TabsContent>
        </Tabs>
      </MainContainer>
    </>
  );
};
export { Login };
