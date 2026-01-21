import { createBrowserRouter } from "react-router-dom";
import { Shell } from "../components/layout/Shell";
import Home from "../pages/Home";
import List from "../pages/List";
import Place from "../pages/Place";
import NotFound from "../pages/NotFound";
import About from "../pages/About";
import Contact from "../pages/Contact";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Shell />,
    children: [
      { index: true, element: <Home /> },
      { path: "list/:type", element: <List /> },
      { path: "place/:id", element: <Place /> },
      { path: "about", element: <About /> },
      { path: "contact", element: <Contact /> },
      { path: "*", element: <NotFound /> }
    ]
  }
]);
