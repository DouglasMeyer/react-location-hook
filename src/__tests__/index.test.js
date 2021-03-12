// import React from "react";
import { useLocation } from '..'
import { renderHook, act, cleanup } from '@testing-library/react-hooks'

describe('useLocation', () => {
  describe('on startup', () => {
    it('returns route with decoded location', () => {
      const history = {
        location: { pathname: '/', search: '' },
        listen: jest.fn(),
        push: jest.fn(),
        replace: jest.fn(),
      }
      const { result } = renderHook(() => useLocation({ history }))
      const [location, _setLocation] = result.current
      expect(location).toEqual(history.location)
    })
  })

  describe('on detach', () => {
    it('unlistens', () => {
      const unlisten = jest.fn()
      const history = {
        location: { pathname: '/', search: '' },
        listen: jest.fn(() => unlisten),
        push: jest.fn(),
        replace: jest.fn(),
      }
      renderHook(() => useLocation({ history }))
      cleanup()
      expect(unlisten).toHaveBeenCalled()
    })
  })

  describe('on location change', () => {
    it('updates location decoded location', () => {
      const history = {
        location: { pathname: '/', search: '' },
        listen: jest.fn(),
        push: jest.fn(),
        replace: jest.fn(),
      }
      const { result } = renderHook(() => useLocation({ history }))

      expect(history.listen).toHaveBeenCalled()
      const newLocation = { pathname: '/new', search: '?location' }
      act(() =>
        history.listen.mock.calls[0][0]({
          location: newLocation,
        }),
      )
      const [location, _setLocation] = result.current
      expect(location).toEqual(newLocation)
    })
  })

  describe('setLocation', () => {
    it('calls history.push with encoded value', () => {
      const history = {
        location: { pathname: '/', search: '' },
        listen: jest.fn(),
        push: jest.fn(),
        replace: jest.fn(),
      }
      const { result } = renderHook(() => useLocation({ history }))
      const [_location, setLocation] = result.current
      const newLocation = { pathname: '/new', search: '?location' }

      act(() => setLocation(newLocation))

      expect(history.push).toHaveBeenCalledWith(newLocation)
    })
  })
})
