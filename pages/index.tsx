import {NextPage} from "next";
import dynamic from "next/dynamic";

const DynamicMapComponent = dynamic(() => import('../components/map'), {
  ssr: false, // Disable SSR for this component
});

const IndexPage: NextPage = () => {
  return (
    <div className={"flex flex-col h-screen bg-black"}>
      <DynamicMapComponent/>
    </div>
  )
}

export default IndexPage
