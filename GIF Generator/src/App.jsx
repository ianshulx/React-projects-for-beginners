import Random from "./components/Random";
import Tag from "./components/Tag";

export default function App() {
  return (
    <div className="w-full h-full flex flex-col background items-center">
      <h1 className="bg-white w-11/12 text-center mt-[40px] px-[25px] py-[10px] rounded-lg text-3xl font-bold">RANDOM GIFS</h1>

      <div className="w-1/2 flex flex-col items-center gap-y-10 mt-[30px]">
        <Random />
        <Tag />
        
      </div>
    </div>
    
  );
}
