import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import "./globals.css";
// Combine class names (you can use a utility like 'clsx' or just inline them)
import { cn } from '@/lib/utils';
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import { connectToMongoDB } from "@/lib/mongodb";
import { PollProvider } from "@/context/PollContext";

export const metadata: Metadata = {
  title: "Sayso",
  description: "Enhancive poll-chat application",
};

// Manrope font configuration
const fontHeading = Manrope({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-heading', // Ensure that you use the variable in your CSS file
});

const fontBody = Manrope({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-body',
});


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  connectToMongoDB();
  return (
    <html lang="en">
      <body className={cn(
        'antialiased',           // Applies the anti-aliasing effect for better font rendering
        fontHeading.variable,     // Uses the heading font variable
        fontBody.variable         // Uses the body font variable
      )}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <PollProvider>
          {children}
          </PollProvider>
        </ThemeProvider>
        <Toaster position="top-center"/>
      </body>
    </html>
  );
}