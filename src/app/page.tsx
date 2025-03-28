import Hero from "./components/Hero";
import Layout from "./components/Layout";
import SocialLinks from "./components/SocialLinks";

export default function Home() {
  return (
    <Layout>
      <Hero />
      <SocialLinks />
    </Layout>
  );
}
