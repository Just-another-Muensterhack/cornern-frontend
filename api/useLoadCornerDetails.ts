import {useCallback, useEffect, useState} from "react";
import { CornerDetails, BASE_URL } from "./types";

export const useLoadCornerDetails = (id?: string) => {
  const [state, setState] = useState<CornerDetails>()

  const load = useCallback(async () => {
    try {
      const response = await fetch(`${BASE_URL}/api/corner/${id}`, {"method": "GET"})
      const json = await response.json()

      setState(json as CornerDetails)
    } catch (e) {
      console.error(e)
    }
  }, [id])

  useEffect(() => {
    if (id !== undefined){
      load().then();
    } else {
      setState(undefined)
    }
  }, [id, load]);

  return {
    isLoading: state === undefined,
    corner: state
  }
}
