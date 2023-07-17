import Footer from "@/components/Footer";
import "./global.css";
import Navbar from "@/components/Navbar";
export const metadata = {
  title: "Flexibble",
  description: "Get Discover The more authentic & aesthetic projects",
  author: "Muhammad Owais",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        <main> {children}</main>
        <Footer />
      </body>
    </html>
  );
}
