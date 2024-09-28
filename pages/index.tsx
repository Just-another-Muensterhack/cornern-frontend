import {NextPage} from "next";
import dynamic from "next/dynamic";
import {useLoadCorners} from "@/api/useLoadCorners";
import {useRouter} from "next/router";
import {MarkerProps} from "@/components/Marker";
import {colorToHex, priceFactorToColor} from "@/util/noiseValueToColor";
import LoadingSpinner from "@/components/LoadingSpinner";
import Image from "next/image";
import PriceUpdateBar from "@/components/PriceUpdateBar";
import {ChevronRight} from "lucide-react";

const DynamicMapComponent = dynamic(() => import('../components/Map'), {
  ssr: false, // Disable SSR for this component
});

const IndexPage: NextPage = () => {
  const data = useLoadCorners()
  const router = useRouter()

  if (data === undefined) {
    return <LoadingSpinner/>
  }

  const mappedData: MarkerProps[] = data.map(corner => ({
    position: corner.position,
    iconColor: colorToHex(priceFactorToColor(corner.price_factor)),
    children: (
      <div className={"flex flex-col gap-y-2"}>
        <h6 className={"text-lg font-bold"}>{corner.name}</h6>
        <button
          className={"flex flex-row justify-between items-center px-4 py-2 rounded font-bold text-white gradient-button"}
          onClick={() => router.push(`/corner/${corner.id}`)}
        >
          {"Let's go!"}
          <ChevronRight/>
        </button>
      </div>
    ),
    priceFactor: corner.price_factor
  }))

  return (
    <>
      <div className={"absolute flex flex-col gap-y-6 items-center top-5 h-[9%] z-[10000] w-full"}>
        <div className={"w-7/12"}>
          <PriceUpdateBar/>
        </div>
      </div>
      <Image
        src={"/banner.png"}
        alt={"banner von corndex"}
        className={"absolute left-[8px] bottom-[8px] z-[10000]"}
        width={150}
        height={30}
      />
      <div className={"relative flex flex-col h-screen bg-black"}>
        <DynamicMapComponent
          center={[51.95145364769459, 7.638705915143061]}
          zoom={16}
          markers={mappedData}
        />
      </div>
    </>
  )
}

export default IndexPage
