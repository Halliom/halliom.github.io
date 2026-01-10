export const Title: React.FC<React.PropsWithChildren> = ({ children}) => {
  return (
    <h1 className="w-full text-heading-1 text-center pt-36 lg:pt-64 pb-12">
      {children}
    </h1>
  );
};
