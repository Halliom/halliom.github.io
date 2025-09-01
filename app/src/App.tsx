import { Route, Routes } from "react-router-dom";
import { Footer } from "./components/footer";
import { IndexPage } from "./pages";
import { ProjectsPage } from "./pages/projects/projects";
import { PaceCalculatorPage } from "./pages/projects/pace-calculator/pace-calculator";
import { ProjectsLayout } from "./pages/projects/layout";

const App: React.FC = () => {
  return (
    <div className="flex flex-col w-screen h-screen justify-between items-center">
      <Routes>
        <Route index element={<IndexPage />} />
        
        <Route path="projects" element={<ProjectsLayout />}>
          <Route index element={<ProjectsPage />} />
          <Route path="pace-calculator" element={<PaceCalculatorPage />} />
        </Route>
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
