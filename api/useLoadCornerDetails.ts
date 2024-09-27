import {useCallback, useEffect, useState} from "react";
import {Data} from "@/pages/corner/[cornerId]";

export const useLoadCornerDetails = (id?: string) => {
  const [state, setState] = useState<Data>()

  const load = useCallback(async () => {
    try {
      const response = await fetch(`http://localhost:8000/api/corner/${id}`, {"method": "GET"})
      const json = await response.json()
      setState(json as Data)
    } catch (e) {
      console.error(e)
    }
  }, [id])

  useEffect(() => {
    if(id !== undefined){
      load().then();
    }else {
      setState(undefined)
    }
  }, [id, load]);

  return {
    isLoading: state === undefined,
    corner: state
  }
}
