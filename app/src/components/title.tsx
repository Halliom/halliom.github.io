export const Title: React.FC<React.ComponentProps<'h1'>> = ({
  children,
  className,
}) => {
  return (
    <h1 className={`w-full text-heading-1 text-center ${className}`}>
      {children}
    </h1>
  );
};
