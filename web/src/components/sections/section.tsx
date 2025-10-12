interface ISection {
  children: React.ReactNode;
}

const Section = ({ children }: ISection) => {
  return <section className="my-12">{children}</section>;
};

export { Section };
