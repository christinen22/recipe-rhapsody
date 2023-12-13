import Image from "next/image";

function HomePage() {
  return (
    <main>
      <h2>Recipe Rhapsody</h2>
      <Image
        src="/images/hero-img.jpg"
        width={1000}
        height={760}
        className="hidden md:block"
        alt="Image of food"
      />
    </main>
  );
}

export default HomePage;
