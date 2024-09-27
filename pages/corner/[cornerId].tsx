import {NextPage} from "next";
import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'

export type Data = {
    id: string,
    name: string,
    lat: number,
    lon: number,
}

const CornerDetailedPage: NextPage = () => {
  const router = useRouter()
  const id = router.query.cornerId

  const [data, setData] = useState<Data | undefined>()
  const [isLoading, setLoading] = useState(true)
 
  useEffect(() => {
    fetch('/api/')
      .then((res) => res.json())
      .then((data) => {
        setData(data)
        setLoading(false)
      })
  }, [])
 
  if (isLoading) return <p>Loading...</p>
  if (!data || !id) return <p>No profile data</p>

  return (
    <div className={"flex flex-col h-screen bg-white"}>
      {id}
    </div>
  )
}

export default CornerDetailedPage
