import {NextPage} from "next";
import {useRouter} from 'next/router'
import {NoiseIndicator} from "@/components/NoiseIndicator";
import PriceUpdateBar from "@/components/PriceUpdateBar";
import BarChart from "@/components/BarChart";
import {useLoadCornerDetails} from "@/api/useLoadCornerDetails";
import {BASE_URL, Meassurement} from "@/api/types";
import {ChevronLeft, Frown, Meh, Smile, Share2} from "lucide-react";
import LoadingSpinner from "@/components/LoadingSpinner";
import Infobox from "@/components/Infobox";
import {tw, tx} from "@twind/core";
import {priceFactorToColor} from "@/util/priceFactorToColor";
import {useState} from "react";
import {Modal} from "@/components/modal/modal";
import QRCode from "react-qr-code";

type HistogramTab = "hour" | "day" | "week"

const CornerDetailsPage: NextPage = () => {
  const router = useRouter()
  const id = router.query.cornerId as string | undefined
  const [histogramTab, setHistogramTab] = useState<HistogramTab>("hour")
  const [isShowingShare, setIsShowingShare] = useState(false)
  const {corner, isLoading} = useLoadCornerDetails(id)
  const [isShowingFeedBack, setIsShowingFeedBack] = useState(false);

  if (isLoading) return <LoadingSpinner/>
  if (!corner) return <LoadingSpinner/>

  let chartData = corner.noise_value_hour.map((measurement: Meassurement) => measurement.value)
  let chartDataLabels = corner.noise_value_hour.map(() => "")
  if (histogramTab === "day") {
    chartData = corner.noise_value_day.map((measurement: Meassurement) => measurement.value)
    chartDataLabels = corner.noise_value_day.map((value) => {
      const hour = new Date(value.timestamp).getHours()
      if (hour % 6 === 0) {
        return hour.toString()
      }
      return ""
    })
  } else if (histogramTab === "week") {
    const daysOfWeek: { [key: number]: string } = {
      0: 'So', // Sunday
      1: 'Mo', // Monday
      2: 'Di', // Tuesday
      3: 'Mi', // Wednesday
      4: 'Do', // Thursday
      5: 'Fr', // Friday
      6: 'Sa', // Saturday
    };
    chartData = corner.noise_value_week.map((measurement: Meassurement) => measurement.value)
    chartDataLabels = corner.noise_value_week.map((value) => daysOfWeek[new Date(value.timestamp).getDay()])
  }

  function sendFeedback(rating: number) {
    console.log("feedback sent " + rating)
    fetch(`${BASE_URL}/api/feedback`, {method: "POST", body: JSON.stringify({corner: id, loudness: rating})})
    setIsShowingFeedBack(false)
  }


  return (
    <div className={"flex flex-col h-full items-center p-5 gap-y-8"}>
      <div className={"flex flex-row gap-x-4 w-full justify-between items-center"}>
        <button
          className={"flex flex-row items-center justify-center min-w-[28px] w-7 h-7 rounded-full bg-white text-black"}
          onClick={() => {
            router.push("/")
          }}
        >
          <ChevronLeft size={24} strokeWidth={3} className={"-translate-x-[1px]"}/>
        </button>
        <h1 className={"text-2xl font-bold"}>{corner?.name}</h1>
        <div className={"w-7 h-7 min-w-[28px]"}/>
      </div>
      <div className={"max-w-[500px] w-full"}>
        <PriceUpdateBar/>
      </div>
      <div className={"flex flex-row items-center justify-center gap-x-2"}>
        <span className={"text-lg"}>Preis Faktor:</span>
        <span className={"font-helvetica"}>
          x
          <span className={tw(`text-[${priceFactorToColor(corner.price_factor)}] font-bold text-xl`)}>
             {corner.price_factor.toFixed(1)}
          </span>
        </span>
      </div>
      <NoiseIndicator sliceCount={25} db={corner?.noise_value ?? 0}/>
      <Infobox db={corner?.noise_value ?? 0} className={"max-w-[500px]"}/>
      <div className={"w-full h-full max-w-[500px]"}>
        <div className={"grid grid-cols-3 p-1 w-full rounded-lg gap-x-1 bg-[#38393D] text-white mb-4"}>
          <button className={tx("hover:bg-[#777777] rounded-lg py-1", {"bg-[#636366]": histogramTab === "hour"})}
                  onClick={() => setHistogramTab("hour")}>1h
          </button>
          <button className={tx("hover:bg-[#777777] rounded-lg py-1", {"bg-[#636366]": histogramTab === "day"})}
                  onClick={() => setHistogramTab("day")}>24h
          </button>
          <button className={tx("hover:bg-[#777777] rounded-lg py-1", {"bg-[#636366]": histogramTab === "week"})}
                  onClick={() => setHistogramTab("week")}>Woche
          </button>
        </div>
        <BarChart
          data={chartData}
          labels={chartDataLabels}
        />
      </div>
      <button className={"max-w-[500px] w-full flex flex-row justify-center gap-x-4 bg-[#636366] hover:bg-[#777777] py-3 px-4 rounded-md"}
              onClick={() => setIsShowingShare(true)}>
        <Share2/>
        Teilen
      </button>
      <button className="max-w-[500px] w-full rounded-lg gap-x-1 bg-[#636366] hover:bg-[#777777] text-white mb-4 py-3 px-4"
              onClick={() => setIsShowingFeedBack(true)}>
        Feedback geben
      </button>

      <Modal
        isOpen={isShowingFeedBack}
        onCloseClick={() => setIsShowingFeedBack(false)}
        onBackgroundClick={() => setIsShowingFeedBack(false)}
        id="feedbackModal"
        modalClassName={"!bg-background !text-white"}
        titleText={"Feedback"}
      >
        <div className="flex flex-row justify-around items-center gap-x-2 min-h-[100px] px-4 w-full">
          <button onClick={() => sendFeedback(1)}>
            <Frown size={32} className={"text-negative hover:opacity-80"}/>
          </button>
          <button onClick={() => sendFeedback(2)}>
            <Meh size={32} className={"text-neutral hover:opacity-80"}/>
          </button>
          <button onClick={() => sendFeedback(3)} >
            <Smile size={32} className={"text-positive hover:opacity-80"}/>
          </button>
        </div>
      </Modal>
      <Modal id={"shareModal"} isOpen={isShowingShare} onBackgroundClick={() => setIsShowingShare(false)}>
        <QRCode value={window.location.toString()}/>
      </Modal>
    </div>
  )
}

export default CornerDetailsPage
