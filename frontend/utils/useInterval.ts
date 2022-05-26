import { useEffect, useRef } from 'react'

// const useInterval = (callback: Function, delay?: number) => {
export const useInterval = (callback: Function, delay?: number | null) => {
  const savedCallback = useRef<Function>(() => {})
  useEffect(() => {
    savedCallback.current = callback
  }, [callback])
  useEffect(() => {
    if (delay !== null) {
      const interval = setInterval(() => savedCallback.current(), delay || 0)
      return () => clearInterval(interval)
    }
  }, [delay])
}
