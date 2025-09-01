import { NavLink } from "react-router-dom";
import { Title } from "../../components/title";

export const ProjectsPage: React.FC = () => {
  return (
    <>
      <Title>Projects</Title>

      <ul>
        <li>
          <NavLink to="/projects/pace-calculator">Pace calculator</NavLink>
        </li>
      </ul>
    </>
  );
};
