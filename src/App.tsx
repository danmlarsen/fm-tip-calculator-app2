import Calculator from "./components/Calculator";
import Logo from "./ui/Logo";

function App() {
  return (
    <main className="flex min-h-screen bg-cyan-300 md:items-center md:px-6">
      <div className="mx-auto grid w-full max-w-[57.5rem] grid-rows-[9rem_auto] md:grid-rows-[auto_1fr] md:gap-[5.4375rem]">
        <div className="flex items-center justify-center">
          <Logo />
        </div>
        <Calculator />
      </div>
    </main>
  );
}

export default App;
