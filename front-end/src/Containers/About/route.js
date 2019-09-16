import About from "./About";
import AboutPerson from "./AboutPerson";

export default [
  {
    path: "/about",
    exact: true,
    component: About
  },
  {
    path: "/about/:person",
    exact: true,
    component: AboutPerson
  }
];
