import React from "react";
import ReactDOM from "react-dom";
import { useLocation } from "react-location-hook";
// import history from "history/browser";
import history from "history/hash";

const App = () => {
  // work directly off of the location
  const [location, setLocation] = useLocation({ history });

  let Page;
  if (location.pathname === "/") Page = Home;
  else if (location.pathname.startsWith("/project")) Page = Project;
  else Page = Unknown;

  return (
    <div>
      <a
        href={history.createHref({ pathname: "/" })}
        onClick={e => {
          e.preventDefault();
          setLocation({ pathname: "/" });
        }}
        className={Page === Home ? "isActive" : ""}
      >
        Home
      </a>
      <a
        href={history.createHref({ pathname: "/project" })}
        onClick={e => {
          e.preventDefault();
          setLocation({ pathname: "/project" });
        }}
        className={Page === Project ? "isActive" : ""}
      >
        Projects
      </a>
      <Page />
      <pre>{JSON.stringify(location, null, 2)}</pre>
    </div>
  );
};

const Home = () => <h1>Welcome!</h1>;
const Project = () => {
  // Use encode/decode to interact with more succinct value/setValue variables.
  const encode = subpage => `/project/${subpage}`;
  const [subpage, setSubpage] = useLocation({
    history,
    encode,
    decode: ({ pathname }) => pathname.replace(/^\/project\/?/, "") || "react"
  });

  return (
    <div>
      <a
        href={history.createHref(encode("react"))}
        onClick={e => {
          e.preventDefault();
          setSubpage("");
        }}
        className={subpage === "react" ? "isActive" : ""}
      >
        react
      </a>
      <a
        href={history.createHref(encode("location"))}
        onClick={e => {
          e.preventDefault();
          setSubpage("location");
        }}
        className={subpage === "location" ? "isActive" : ""}
      >
        location
      </a>
      <a
        href={history.createHref(encode("hook"))}
        onClick={e => {
          e.preventDefault();
          setSubpage("hook");
        }}
        className={subpage === "hook" ? "isActive" : ""}
      >
        hook
      </a>
      <pre>{JSON.stringify({ subpage }, null, 2)}</pre>
    </div>
  );
};
const Unknown = () => <h1>How'd you get here</h1>;

ReactDOM.render(<App />, window.root);
