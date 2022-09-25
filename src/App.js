import "./css/App.css";
import { Routes, Route, useLocation } from "react-router-dom";
import MyHome from "./Pages/Index/Index";
import NotFound from "./Pages/NotFound";
import Project1 from "./Projects/Project1/Project1";
import Home from "./Pages/Home/Home";
import Choose from "./Pages/Choose/Choose";
import "./css/pageSwitch.css";
import { AnimatePresence } from "framer-motion";
//通过pathname判断得到nodeRef

function App() {
  const location = useLocation();
  console.log(location.pathname);
  return (
    <div className="App">
      <AnimatePresence mode={"wait"}>
        {/* key  */}
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<MyHome />}>
            <Route index element={<Home />} />
            <Route path="project1" element={<Project1 />} />
          </Route>

          <Route path="/choose" element={<Choose />} />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </AnimatePresence>
    </div>
  );
}

export default App;
