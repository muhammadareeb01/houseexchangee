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
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="nl">
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
