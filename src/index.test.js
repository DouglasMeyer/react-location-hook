import React from 'react';
import { useRouter } from '.';
import { renderHook, act, cleanup } from "@testing-library/react-hooks";

describe("useRouter", () => {
  describe("on startup", () => {
    it("returns route with decoded location", () => {
      const history = {
        location: { pathname: "/", search: "" },
        listen: jest.fn(),
        push: jest.fn(),
        replace: jest.fn(),
      };
      const { result } = renderHook(() => useRouter({ history }));
      const [route, _setRoute] = result.current;
      expect(route).toEqual(history.location);
    });
  });

  describe('on detach', () => {
    it('unlistens', () => {
      const unlisten = jest.fn();
      const history = {
        location: { pathname: "/", search: "" },
        listen: jest.fn(() => unlisten),
        push: jest.fn(),
        replace: jest.fn(),
      };
      renderHook(() => useRouter({ history }));
      cleanup();
      expect(unlisten).toHaveBeenCalled();
    });
  });

  describe("on location change", () => {
    it("updates route decoded location", () => {
      const history = {
        location: { pathname: "/", search: "" },
        listen: jest.fn(),
        push: jest.fn(),
        replace: jest.fn(),
      };
      const { result } = renderHook(() => useRouter({ history }));

      expect(history.listen).toHaveBeenCalled();
      const newLocation = { pathname: "/new", search: "?location" };
      act(() =>
        history.listen.mock.calls[0][0]({
          location: newLocation,
        })
      );
      const [route, _setRoute] = result.current;
      expect(route).toEqual(newLocation);
    });
  });

  describe('setRoute', () => {
    it('calls history.push with encoded value', () => {
      const history = {
        location: { pathname: '/', search: '' },
        listen: jest.fn(),
        push: jest.fn(),
        replace: jest.fn(),
      }
      const { result } = renderHook(() => useRouter({ history }));
      const [_route, setRoute] = result.current;
      const newLocation = { pathname: "/new", search: "?location" };

      act(() => setRoute(newLocation));

      expect(history.push).toHaveBeenCalledWith(newLocation);
    });
  });
});
