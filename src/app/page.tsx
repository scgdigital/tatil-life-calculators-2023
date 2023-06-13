import { WholeLifeContent } from "@/parts/products/WholeLife/WholeLifeContent";
import { store } from "@/store";
import { setEnums } from "@/store/enumsSlice";

const fakeGetEnums = async () => {
  const response = await fetch("https://jsonplaceholder.typicode.com/users/1");
  const data = await response.json();
  return data;
};

export default async function Home() {
  const enumsData = await fakeGetEnums();
  store.dispatch(setEnums(enumsData));

  return (
    <main className="max-w-[590px] mx-auto flex-shrink-0 flex-grow">
      <WholeLifeContent data={store.getState()} />
    </main>
  );
}
