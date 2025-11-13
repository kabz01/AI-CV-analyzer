import Header from "./components/header"
import Hero from "./components/hero"
import About from "./components/about"
import Gallery from "./components/gallery"
import Contact from "./components/contact"
import Footer from "./components/footer"

export default function Page() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <Header />
      <Hero />
      <About />
      <Gallery />
      <Contact />
      <Footer />
    </main>
  )
}
