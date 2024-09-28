import {BASE_URL} from "@/api/types";
import {useCallback, useEffect, useState} from "react";

type NextUpdateJson = {
  minutes: number,
  timestamp: string
}

type  NextUpdate = {
  /**
   * 0 to 1
   */
  next: Date,
  minutes: number
}

export const useNextPriceUpdate = (): NextUpdate => {
  const [state, setState] = useState<NextUpdateJson>()

  const load = useCallback(async () => {
    try {
      const response = await fetch(`${BASE_URL}/api/next`, {"method": "GET"})
      const json = await response.json()
      setState(json as NextUpdateJson)
      setTimeout(() => {
        load()
      }, new Date(json.timestamp).getTime() - Date.now())
    } catch (e) {
      console.error(e)
    }
  }, [])

  useEffect(() => {
    load()
  }, [load]);

  if (!state) {
    return {
      next: new Date(),
      minutes: 5
    }
  }
  const date = new Date(state.timestamp)

  return {
    next: date,
    minutes: 5
  }
}
