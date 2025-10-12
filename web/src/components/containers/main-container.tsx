interface IMainContainerProps {
  children: React.ReactNode;
}

function MainContainer({ children }: IMainContainerProps) {
  return <main className="mx-auto max-w-7xl px-4 py-8">{children}</main>;
}
export { MainContainer };
