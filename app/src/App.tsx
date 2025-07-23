import { Footer } from "./components/footer";

function App() {
  return (
    <div className="flex flex-col w-screen h-screen justify-between items-center">
      <div className="max-w-[90vw] lg:max-w-md">
        <h1 className="text-3xl font-bold pt-72">Johan Wieslander</h1>

        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam,
          quos.
        </p>

        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam,
          quos.
        </p>
      </div>
      <Footer />
    </div>
  );
}

export default App;
