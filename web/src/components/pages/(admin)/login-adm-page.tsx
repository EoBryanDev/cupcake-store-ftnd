import { MainContainer } from "../../containers/main-container";
import SignInAdminForm from "../../forms/sign-in-adm-form";
import { LoginAdminMenu } from "../../menus/admin/login-admin-menu";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../ui/tabs";

const AdminLoginPage = () => {
  return (
    <>
      <LoginAdminMenu />
      <MainContainer>
        <Tabs defaultValue="sign-in-admin">
          <TabsList>
            <TabsTrigger value="sign-in-admin">Sign In</TabsTrigger>
          </TabsList>
          <TabsContent value="sign-in-admin" className="w-full">
            <SignInAdminForm />
          </TabsContent>
        </Tabs>
      </MainContainer>
    </>
  );
};

export { AdminLoginPage };
