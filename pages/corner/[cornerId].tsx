import {NextPage} from "next";
import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import {Position} from "@/components/Marker";
import { NoiseIndicator } from "@/components/NoiseIndicator";

export type Data = {
    id: number,
    name: string,
    description: string,
    noise_value: number,
    position: Position,
    price_factor: number,
    noise_value_day: number[],
    noise_value_hour: number[],
    noise_value_week: number[],
}

const CornerDetailedPage: NextPage = () => {
  const router = useRouter()
  const id = router.query.cornerId


  const [data, setData] = useState<Data | undefined>()
  const [isLoading, setLoading] = useState(true)
 
  useEffect(() => {
    if(!id) return;

    fetch(`http://localhost:8000/api/corner/${id}`, {"method": "GET"})
      .then((res) => res.json())
      .then((data) => {
        setData(data)
        setLoading(false)
      })
  }, [id])
 
  if (isLoading) return <p>Loading...</p>
  if (!data || !id) return <p>No profile data</p>
        console.log("2", data);

  return (
    <div className={"flex flex-col h-screen bg-black items-center p-5"}>
      <h1 className={"text-3xl font-bold"}>{data.name}</h1>
      <NoiseIndicator sliceCount={25} percentage={data.noise_value} max={100}/>
    </div>
  )
}

export default CornerDetailedPage
