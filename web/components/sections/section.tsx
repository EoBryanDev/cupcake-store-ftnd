interface ISection {
  children: React.ReactNode;
}

const Section = ({ children }: ISection) => {
  return <section className="my-12 h-[10vh]">{children}</section>;
};

export { Section };
