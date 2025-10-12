interface IHighLightTitle {
  children: React.ReactNode;
}

const HighLightTitle = ({ children }: IHighLightTitle) => {
  return (
    <h1 className="mb-1 text-5xl leading-none font-extrabold tracking-tight">
      {children}
    </h1>
  );
};

export { HighLightTitle };
