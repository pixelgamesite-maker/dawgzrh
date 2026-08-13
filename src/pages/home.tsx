import { useEffect, useState } from "react";
import { FONT_LINK } from "../theme";
import Header from "../components/Header";
import Hero from "../components/Hero";
import Ticker from "../components/Ticker";
import About from "../components/About";
import Gallery from "../components/Gallery";
import Breeds from "../components/Breeds";
import Token from "../components/Token";
import Roadmap from "../components/Roadmap";
import Faq from "../components/Faq";
import { ClosingCta, Footer, Taskbar } from "../components/Footer";
import WhitelistModal from "../components/whitelist/WhitelistModal";
import "../styles/global.css";

export default function Home() {
  const [wlOpen, setWlOpen] = useState(false);
  const open = () => setWlOpen(true);

  useEffect(() => {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = FONT_LINK;
    document.head.appendChild(link);
    return () => {
      document.head.removeChild(link);
    };
  }, []);

  return (
    <>
      <Header onApply={open} />
      <main>
        <Hero onApply={open} />
        <Ticker />
        <About />
        <Gallery />
        <Ticker reverse />
        <Breeds />
        <Token />
        <Roadmap />
        <Faq />
        <ClosingCta onApply={open} />
      </main>
      <Footer />
      <Taskbar onApply={open} />
      <WhitelistModal open={wlOpen} onClose={() => setWlOpen(false)} />
    </>
  );
}
