import {NextPage} from "next";
import dynamic from "next/dynamic";
import {useLoadCorners} from "@/api/useLoadCorners";
import {useRouter} from "next/router";
import {MarkerProps} from "@/components/Marker";
import {colorToHex, priceFactorToColor} from "@/util/noiseValueToColor";
import LoadingSpinner from "@/components/LoadingSpinner";
import Image from "next/image";
import PriceUpdateBar from "@/components/PriceUpdateBar";

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
        <button onClick={() => router.push(`/corner/${corner.id}`)}>{"Auswählen"}</button>
      </div>
    ),
    priceFactor: corner.price_factor
  }))

  return (
    <>
      <div className={"absolute flex flex-col gap-y-6 items-center top-[40px] h-[9%] z-[10000] w-full"}>
        <Image
          src={"/banner.png"}
          alt={"banner von corndex"}
          className={"h-[5vh] min-h-[50px] w-auto"}
          width={350}
          height={80}
        />
        <div className={"w-4/5"}>
          <PriceUpdateBar />
        </div>
      </div>
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
