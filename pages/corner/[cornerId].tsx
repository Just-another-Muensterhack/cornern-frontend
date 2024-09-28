import {NextPage} from "next";
import {useRouter} from 'next/router'
import {NoiseIndicator} from "@/components/NoiseIndicator";
import Timebar from "@/components/Timebar";
import BarChart from "@/components/BarChart";
import {useLoadCornerDetails} from "@/api/useLoadCornerDetails";
import { Meassurement } from "@/api/types";


const CornerDetailsPage: NextPage = () => {
  const router = useRouter()
  const id = router.query.cornerId as string | undefined

  const {corner, isLoading} = useLoadCornerDetails(id)

  if (isLoading) return <p>Loading...</p>
  if (!corner || !id) return <p>No profile data</p>

  const chartData = corner?.noise_value_hour.map((measurement: Meassurement) => measurement.value)
  const chartDataLabels = corner?.noise_value_hour.map(() => "")

  return (
    <div className={"flex flex-col h-screen bg-black items-center p-5 gap-y-8"}>
      <h1 className={"text-3xl font-bold"}>{corner?.name}</h1>
      <NoiseIndicator sliceCount={25} percentage={corner?.noise_value ?? 0} max={100}/>
      <Timebar />
      <div className={"w-full h-full max-w-[500px]"}>
        <BarChart
          data={chartData}
          labels={chartDataLabels}
        />
      </div>
    </div>
  )
}

export default CornerDetailsPage
