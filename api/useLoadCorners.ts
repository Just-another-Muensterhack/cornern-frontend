import {Corner} from "@/api/types";
import {useCallback, useEffect, useState} from "react";
import { BASE_URL } from "./types";

export const useLoadCorners = (): Corner[] | undefined => {
  const [corners, setCorners] = useState<Corner[]>()

  const load = useCallback(async () => {
    try {
      const response = await fetch(`${BASE_URL}/api/corner`, {"method": "GET"})
      const json = await response.json()

      setCorners(json as Corner[])
    } catch (e) {
      console.error(e)
    }
  }, [])

  useEffect(() => { const interval = setInterval(() => load(), 1000)
    return () => clearInterval(interval) }, [load]);

  return corners
}
