import ThemeProvider from "@/components/theme-provider";
import "./globals.css";
import '@/style/index.scss'

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
            {children}
        </ThemeProvider>
      </body>
    </html>
  );
}