import {NextPage} from "next";
import {NoiseIndicator} from "@/components/NoiseIndicator";

const CornerPage: NextPage = () => {
  return (
    <div className={"flex flex-col h-screen bg-black"}>
      <NoiseIndicator sliceCount={25} value={0.9} max={100}/>
    </div>
  )
}

export default CornerPage
