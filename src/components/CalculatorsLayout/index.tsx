import Image from "next/image";
import { Navbar } from "../Navbar/Navbar";
import tatilBg from "@/assets/svg/cityBg.svg";
export const CalculatorsLayout = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 relative">
      <Navbar />
      <main className="flex flex-col items-center pt-[26px] flex-1 px-20 text-center">
        {children}
      </main>
      <div className="absolute h-[30vh] w-full bottom-0 overflow-visible select-none -z-10">
        <Image src={tatilBg} alt="tatil-bg" fill className="bg-repeat-x object-cover overflow-visible object-bottom "/>
      </div>
    </div>
  );
};
