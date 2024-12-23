import Calculator from "./components/Calculator";
import Logo from "./ui/Logo";

function App() {
  return (
    <main className="flex min-h-screen bg-cyan-300 md:items-center md:px-6">
      <div className="mx-auto grid w-full max-w-[920px] grid-rows-[144px_auto]">
        <div className="flex items-center justify-center">
          <Logo />
        </div>
        <Calculator />
      </div>
    </main>
  );
}

export default App;
