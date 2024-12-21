import Calculator from "./components/Calculator";
import Logo from "./ui/Logo";

function App() {
  return (
    <main className="flex min-h-screen bg-cyan-300">
      <div className="grid w-full grid-rows-[144px_auto]">
        <div className="flex items-center justify-center">
          <Logo />
        </div>
        <Calculator />
      </div>
    </main>
  );
}

export default App;
