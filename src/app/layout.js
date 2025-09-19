import ThemeProvider from "@/components/theme-provider";
import "./globals.css";
import '@/style/index.scss'
import { Toaster } from 'react-hot-toast';

export const metadata = {
  title: "Meeting",
  description: "Write your app description",
};

export default async function RootLayout({ children }) {
  return (
    <html
      // 💡 Prevent next-themes hydration warning
      suppressHydrationWarning
    >
      <body
        // 💡 Prevent hydration warnings caused by third-party extensions, such as Grammarly.
        suppressHydrationWarning
      >
        <ThemeProvider>
          <Toaster />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}