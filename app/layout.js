import { Poppins } from 'next/font/google'
import "./globals.css";
import Sidebar from './components/Layout/Sidebar';


export const metadata = {
  description: 'Painel administrativo escolar',
};

const poppins = Poppins ({
  weight: ['400', '500', '600', '700'],
  subsets: ['latin'],
})

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${poppins.className} flex min-h-screen bg-[#F5F3FF]`}
      >
        {/* Sidebar fixa à esquerda */}
        <Sidebar />

        {/* Conteúdo principal */}
        <main className="flex-1 p-6">{children}</main>
      </body>
    </html>
  )
}
