import { WholeLifeContent } from "@/parts/products/WholeLife/WholeLifeContent";

const fakeGetEnums = async () => {
  const response = await fetch("https://jsonplaceholder.typicode.com/users/1");
  const data = await response.json();
  return data;
};

export default async function Home() {
  const enumsData = await fakeGetEnums();

  return (
    <main className="max-w-[590px] mx-auto flex-shrink-0 flex-grow">
      <WholeLifeContent data={enumsData} />
    </main>
  );
}
