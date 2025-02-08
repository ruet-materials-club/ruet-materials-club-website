import dynamic from "next/dynamic";
const Icon = dynamic(() => import("./Icon"));

export default function Header() {
  return (
    <>
      <header className="flex min-h-svh flex-col items-center justify-center gap-4 p-4 text-center">
        <Icon />
        <h1 className="text-4xl font-bold md:text-6xl">RUET Materials Club</h1>
        <div className="text-2xl md:text-3xl">Learning. Linking. Leading.</div>
      </header>
    </>
  );
}
