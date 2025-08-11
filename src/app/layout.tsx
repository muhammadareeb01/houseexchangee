import "./globals.css";
import Header from "@/components/layout/Header";
import Navigation from "@/components/layout/Navigation";
import { MenuProvider } from "@/lib/contexts/MenuContext";
import { AuthProvider } from "@/lib/contexts/AuthContext"; // Import AuthProvider
import ContentWrapper from "@/components/layout/ContentWrapper";
import MainContent from "@/components/layout/MainContent";

export const metadata = {
  title: "mijnwoningruil.nl",
  description: "Housing exchange platform",
  icons: {
    icon: '/images/logos/favicon.ico',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="nl">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;1,400&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:ital,wght@0,400;0,500;0,600;0,700;1,400&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400;1,500;1,600;1,700&display=swap" rel="stylesheet" />
      </head>
      <body className="bg-[#f4f3f6] text-gray-800">
        <AuthProvider>
          <MenuProvider>
            <ContentWrapper>
              <Header />
              <MainContent>{children}</MainContent>
              <Navigation />
            </ContentWrapper>
          </MenuProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
