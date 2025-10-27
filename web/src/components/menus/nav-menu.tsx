import { NavMenuDesktop } from "./nav-menu-dktp";

interface INavMenuProps {
  token?: { name: string; value: string } | undefined;
}

function NavMenu({ token }: INavMenuProps) {
  return (
    <>
      <NavMenuDesktop token={token} />
    </>
  );
}

export { NavMenu };
