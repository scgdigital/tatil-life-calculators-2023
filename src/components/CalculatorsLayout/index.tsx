import { Navbar } from "../Navbar/Navbar";

export const CalculatorsLayout = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <Navbar />
      <main className="flex flex-col items-center justify-center flex-1 px-20 text-center">
        {children}
      </main>
    </div>
  );
};
