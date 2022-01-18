import Head from "next/head";
import Link from "next/link";

export default function Custom404() {
  return (
  <>
    <Head>
      <title>COMPNITE.PL - Błąd 500</title>
    </Head>
    <div className="grid place-content-center h-full mt-24">
      <div className="flex flex-col items-center">
        <h1 className="font-semibold text-4xl md:text-7xl text-center text-green-900">Błąd 500</h1>
        <p className="mt-1 text-lg text-center md:text-xl md:mt-3">Wystąpił problem po naszej stronie. Wróc za jakiś czas!</p>
        <Link href={'/'}>
          <a className="mt-8 border-2 border-green-900 bg-green-100 w-fit px-4 py-2 rounded font-semibold transition duration-500 transform hover:-translate-y-1">
            Powrót do strony głównej
          </a>
        </Link>
      </div>
    </div>
  </>)
}