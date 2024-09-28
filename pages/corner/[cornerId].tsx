import {NextPage} from "next";
import {useRouter} from 'next/router'
import {NoiseIndicator} from "@/components/NoiseIndicator";
import PriceUpdateBar from "@/components/PriceUpdateBar";
import BarChart from "@/components/BarChart";
import {useLoadCornerDetails} from "@/api/useLoadCornerDetails";
import {Meassurement} from "@/api/types";
import {ChevronLeft} from "lucide-react";
import LoadingSpinner from "@/components/LoadingSpinner";
import {tw} from "@twind/core";
import {colorToHex, priceFactorToColor} from "@/util/noiseValueToColor";


const CornerDetailsPage: NextPage = () => {
  const router = useRouter()
  const id = router.query.cornerId as string | undefined

  const {corner, isLoading} = useLoadCornerDetails(id)

  if (isLoading) return <LoadingSpinner/>
  if (!corner) return <LoadingSpinner/>

  const chartData = corner.noise_value_hour.map((measurement: Meassurement) => measurement.value)
  const chartDataLabels = corner.noise_value_hour.map(() => "")

  return (
    <div className={"flex flex-col h-screen bg-black items-center p-5 gap-y-8"}>
      <div className={"flex flex-row gap-x-4 w-full justify-between items-center"}>
        <button
          className={"flex flex-row items-center justify-center w-7 h-7 rounded-full bg-white text-black"}
          onClick={() => {
            router.push("/")
          }}
        >
          <ChevronLeft size={24} strokeWidth={3} className={"-translate-x-[1px]"}/>
        </button>
        <h1 className={"text-3xl font-bold"}>{corner?.name}</h1>
        <div className={"w-7 h-7 min-w-[28px]"}/>
      </div>
      <PriceUpdateBar/>
      <div className={"flex flex-row items-center justify-center gap-x-2"}>
        <span className={"text-lg"}>Preis Faktor:</span>
        <span>
          x
          <span className={tw(`text-[${colorToHex(priceFactorToColor(corner.price_factor))}] font-bold text-xl`)}>
             {corner.price_factor.toFixed(1)}
          </span>
        </span>
      </div>
      <NoiseIndicator sliceCount={25} percentage={corner?.noise_value ?? 0} max={100}/>
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
