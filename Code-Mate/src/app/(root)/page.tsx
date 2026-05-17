import Header from "./_components/Header";
import OuputPanel from "./_components/OuputPanel";
import EditorPanel from "./_components/EditorPanel";


export default function Home() {
  return (
    <div className="min-h-screen">
      <div className="max-w-[1800px] mx-auto p-4">
        <Header/>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <EditorPanel/>
            <OuputPanel/>
        </div>
      </div>
    </div>
  );
}
