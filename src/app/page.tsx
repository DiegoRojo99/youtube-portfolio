import Hero from "./components/Hero";
import Layout from "./components/Layout";
import SocialLinks from "./components/SocialLinks";
import LatestYouTubeVideo from "./components/YouTube/LatestYouTubeVideo";

export default function Home() {
  return (
    <Layout>
      <Hero />
      <LatestYouTubeVideo />
      <SocialLinks />
    </Layout>
  );
}
