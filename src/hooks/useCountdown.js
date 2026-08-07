import { useEffect, useState } from 'react'

const DAY = 86400000
const HOUR = 3600000
const MINUTE = 60000

function getRemaining(target) {
  const diff = Math.max(0, target - Date.now())
  return {
    days: Math.floor(diff / DAY),
    hours: Math.floor((diff % DAY) / HOUR),
    minutes: Math.floor((diff % HOUR) / MINUTE),
    seconds: Math.floor((diff % MINUTE) / 1000),
    done: diff <= 0,
  }
}

export function useCountdown(targetDate) {
  const target = new Date(targetDate).getTime()
  const [remaining, setRemaining] = useState(() => getRemaining(target))

  useEffect(() => {
    const id = setInterval(() => setRemaining(getRemaining(target)), 1000)
    return () => clearInterval(id)
  }, [target])

  return remaining
}
