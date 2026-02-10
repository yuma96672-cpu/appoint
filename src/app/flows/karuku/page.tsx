import FlowViewer from "@/components/flows/FlowViewer";
import config from "@/content/flows/karuku.json";

export default function Page() {
    return <FlowViewer config={config} />;
}
