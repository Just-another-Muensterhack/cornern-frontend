import {NextPage} from "next";
import { useRouter } from 'next/router'
import {NoiseIndicator} from "@/components/NoiseIndicator";
import BarChart from "@/components/BarChart";

export type Data = {
    id: string,
    name: string,
    lat: number,
    lon: number,
}

const CornerDetailedPage: NextPage = () => {
  const router = useRouter()
  const id = router.query.cornerId

  /*
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
 */

  const data = [
    20,
    40,
    45,
    46,
    47,
    51,
    53,
    58,
    52,
    61,
    54,
    71,
    73,
    85,
  ]

  return (
    <div className={"flex flex-col h-screen"}>
      {id}
      <NoiseIndicator sliceCount={25} value={0.9} max={100}/>
      <BarChart
        data={data}
        labels={data.map(() => "")}
      />
    </div>
  )
}

export default CornerDetailedPage
