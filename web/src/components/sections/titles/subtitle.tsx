interface ISubtitle {
  children: React.ReactNode;
}

const Subtitle = ({ children }: ISubtitle) => {
  return <h3 className="text-lg text-gray-500">{children}</h3>;
};

export { Subtitle };
