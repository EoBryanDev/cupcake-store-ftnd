interface ISection85 {
  children: React.ReactNode;
}

const Section85 = ({ children }: ISection85) => {
  return <section className="mt-8 h-[85vh]">{children}</section>;
};

export { Section85 };
