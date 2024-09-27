import {NextPage} from "next";
import {useRouter} from 'next/router'
import {Position} from "@/components/Marker";
import {NoiseIndicator} from "@/components/NoiseIndicator";
import BarChart from "@/components/BarChart";
import {useLoadCornerDetails} from "@/api/useLoadCornerDetails";

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

const CornerDetailsPage: NextPage = () => {
  const router = useRouter()
  const id = router.query.cornerId as string | undefined


  const {corner, isLoading} = useLoadCornerDetails(id)


  // if (isLoading) return <p>Loading...</p>
  // if (!data || !id) return <p>No profile data</p>

  const chartData = [
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
    <div className={"flex flex-col h-screen bg-black items-center p-5 gap-y-8"}>
      <h1 className={"text-3xl font-bold"}>{corner?.name}</h1>
      <NoiseIndicator sliceCount={25} percentage={corner?.noise_value ?? 0} max={100}/>
      <div className={"w-full h-full max-w-[500px]"}>
        <BarChart
          data={chartData}
          labels={chartData.map(() => "")}
        />
      </div>
    </div>
  )
}

export default CornerDetailsPage
