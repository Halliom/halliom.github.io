export const Frenchie: React.FC<React.ComponentProps<"span">> = ({
  children,
  ...props
}) => <span {...props}>&laquo; {children} &raquo;</span>;
