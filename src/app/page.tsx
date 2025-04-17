import Hero from "./components/Hero";
import Layout from "./components/Layout";
import SocialMediaSection from "./components/SocialMedia/SocialMediaSection";
import LatestYouTubeVideo from "./components/YouTube/LatestYouTubeVideo";
import YouTubePlayListSection from "./components/YouTube/YouTubePlayListSection";

export default function Home() {
  return (
    <Layout>
      <Hero />
      <LatestYouTubeVideo />
      <SocialMediaSection />
      <YouTubePlayListSection 
        playlistId="PLBCFzf3IR5m7y9nVXGOTKRdIbnhl_U-zf" 
        title="España Oculta" 
        imageUrl="" 
        textColor="white" 
      />
      <YouTubePlayListSection 
        playlistId="PLBCFzf3IR5m6C7H1LZsk1w3rbvqzkSWAv" 
        title="Viajes" 
        imageUrl="blue-travel.avif" 
        textColor="white" 
      />
    </Layout>
  );
}
