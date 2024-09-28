import {NextPage} from "next";
import dynamic from "next/dynamic";
import {useLoadCorners} from "@/api/useLoadCorners";
import {useRouter} from "next/router";
import {MarkerProps} from "@/components/Marker";
import {colorToHex, priceFactorToColor} from "@/util/noiseValueToColor";

const DynamicMapComponent = dynamic(() => import('../components/Map'), {
  ssr: false, // Disable SSR for this component
});

const IndexPage: NextPage = () => {
  const data = useLoadCorners()
  const router = useRouter()

  if (data === undefined) {
    // TODO improve
    return <div>Laden...</div>
  }

  const mappedData: MarkerProps[] = data.map(corner => ({
    position: corner.position,
    iconColor: colorToHex(priceFactorToColor(corner.priceFactor)),
    children: (
      <div className={"flex flex-col gap-y-2"}>
        <h6 className={"text-lg font-bold"}>{corner.name}</h6>
        <button onClick={() => router.push(`/corner/${corner.id}`)}>{"Auswählen"}</button>
      </div>
    ),
    priceFactor: corner.priceFactor
  }))

  return (
    <div className={"flex flex-col h-screen bg-black"}>
      <DynamicMapComponent markers={mappedData}/>
    </div>
  )
}

export default IndexPage
