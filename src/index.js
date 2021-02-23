import { useEffect, useState, useCallback } from "react";

const identity = (k) => k;
function useRouter({ history, encode = identity, decode = identity }) {
  const [value, setState] = useState(() => decode(history.location));

  const setRoute = useCallback((value, replace = false) => {
    setState(value);
    history[replace ? "replace" : "push"](encode(value));
  }, []);

  useEffect(
    () =>
      history.listen(({ location }) => {
        setState(() => decode(location));
      }),
    []
  );

  return [value, setRoute];
}

module.exports = { useRouter };
