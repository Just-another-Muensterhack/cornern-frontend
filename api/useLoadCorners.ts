import {Corner} from "@/api/types";
import {useEffect, useState} from "react";

export const useLoadCorners = (): Corner[] | undefined => {
  const [corners, setCorners] = useState<Corner[]>()

  useEffect(() => {
    // TODO api request here
    const corners: Corner[] = new Array(20).fill(0).map((_, index) => ({
      id: index.toString(),
      position: [51.96 + Math.random() * 0.06 - 0.03, 7.626 + Math.random() * 0.06 - 0.03],
      noiseValue: Math.random() * 60 + 20
    }))
    console.log(corners)
    setCorners(corners)
  }, [])

  return corners
}
