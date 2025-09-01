export const Title: React.FC<React.PropsWithChildren> = ({ children}) => {
  return (
    <h1 className="w-full text-3xl font-bold pt-36 lg:pt-64 pb-12">
      {children}
    </h1>
  );
};
