import Image from "next/image";
// import Nav from "./Nav";

export default function Hero() {
  const backgroundStyle = {
    backgroundImage: "url('/dark-photo.jpeg')",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    height: "100vh",
  };

  return (
    <>
      {/* <Nav /> */}
      <section style={backgroundStyle} className="relative flex flex-col items-center justify-center text-center text-white">
        <div className="absolute top-0 left-0 w-full h-full bg-black opacity-50"></div>
        <div className="relative z-10">
          <h1 className="text-7xl md:text-9xl font-bold">Santiago Mercadal</h1>
          {/* <p className="text-xl mt-4">YouTuber, diseñador gráfico</p> */}
        </div>
        <div className="absolute bottom-4 right-4 flex gap-2 z-10">
          <a href="https://www.youtube.com/@santimercadal" target="_blank" className="text-white my-auto">
            <Image src="/youtube-icon.png" alt="YouTube" width={24} height={24} />
          </a>
          <a href="https://tiktok.com/@smercadal" target="_blank" className="text-white">
            <Image src="/tiktok-icon.svg" alt="TikTok" width={24} height={24} />
          </a>
          <a href="https://www.instagram.com/santimercadal" target="_blank" className="text-white">
            <Image src="/instagram-icon.png" alt="Instagram" width={24} height={24} />
          </a>
        </div>
      </section>
    </>
  );
}