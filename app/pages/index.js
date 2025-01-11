import dynamic from "next/dynamic";
import Head from "next/head";

// Dynamically import the Map component to avoid server-side rendering issues
const Map = dynamic(() => import("../components/Map"), { ssr: false });

export default function Home() {
  return (
    <div style={{ height: "100vh" }}>
      <Head>
        <title>Next.js Mapbox Example</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Map />
    </div>
  );
}