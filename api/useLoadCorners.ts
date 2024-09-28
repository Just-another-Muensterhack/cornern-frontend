import {Corner} from "@/api/types";
import {useCallback, useEffect, useState} from "react";
import { BASE_URL } from "./types";

export const useLoadCorners = (): Corner[] | undefined => {
  const [corners, setCorners] = useState<Corner[]>()

  const load = useCallback(async () => {
    try {
      const response = await fetch(`${BASE_URL}/api/corner`, {"method": "GET"})
      const json = await response.json()

      console.log(json)
      setCorners(json as Corner[])
    } catch (e) {
      console.error(e)
    }
  }, [])

  useEffect(() => { load() }, [load]);

  return corners
}
