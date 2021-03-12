# react-location-hook
[![Travis](https://travis-ci.org/DouglasMeyer/react-location-hook.svg?branch=master)](https://travis-ci.org/DouglasMeyer/react-location-hook)
[![Dependency Status](https://david-dm.org/DouglasMeyer/react-location-hook.svg)](https://david-dm.org/DouglasMeyer/react-location-hook)
[![npm](https://img.shields.io/npm/v/react-location-hook.svg)](https://www.npmjs.com/package/react-location-hook)

Simply use history in React

```js
import { useLocation } from "react-location-hook";
import history from "history/browser";
// import history from "history/hash";

const App = () => {
  const [ location, setLocation ] = useLocation({ history });

  let Page;
  if (location.pathname === '/') Page = Page1;
  else if (location.pathname.startsWith('/page_2')) Page = Page2;
  else Page = Unknown;

  return <div>
    <a
      href={history.createHref({ pathname: "/" })}
      onClick={(e) => { e.preventDefault(); setLocation({ pathname: "/" }); }}
      className={Page === Page1 ? "isActive" : ""}
    >
      Page 1
    </a>
    <a
      href={history.createHref({ pathname: "/page_2" })}
      onClick={(e) => { e.preventDefault(); setLocation({ pathname: "/page_2" }); }}
      className={Page === Page2 ? "isActive" : ""}
    >
      Page 2
    </a>
    <Page />
  </div>;
};

const Page1 = () => <h1>Welcome!</h1>;
const Page2 = () => {
  const [ subpage, setSubpage ] = useLocation({
    history,
    encode: (subpage) => `/page_2/${subpage}`,
    decode: ({ pathname }) => pathname.replace(/^\/page_2\/?/, "")
  });

  return <div>
    <a
      href={history.createHref({ pathname: "/page_2/one" })}
      onClick={(e) => { e.preventDefault(); setSubpage('one'); }}
      className={subpage === 'one' ? "isActive" : ""}
    >
      one
    </a>
    <a
      href={history.createHref({ pathname: "/page_2/two" })}
      onClick={(e) => { e.preventDefault(); setSubpage('two'); }}
      className={subpage === 'two' ? "isActive" : ""}
    >
      two
    </a>
    <a
      href={history.createHref({ pathname: "/page_2/three" })}
      onClick={(e) => { e.preventDefault(); setSubpage('three'); }}
      className={subpage === 'three' ? "isActive" : ""}
    >
      three
    </a>
  </div>;
};
const Unknown = () => <h1>How'd you get here</h1>;
```

## Demo
See [https://DouglasMeyer.github.io/react-location-hook/]() for a demo.

## Installation

Install using [Yarn](https://yarnpkg.com):
```sh
yarn add react-location-hook
```

or NPM:
```sh
npm install react-location-hook --save
```
