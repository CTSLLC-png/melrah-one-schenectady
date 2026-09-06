import './globals.css'

export const metadata = {
  title: 'ONE SCHENECTADY | Melrah Community Sustainability Initiative',
  description: 'A free, nonpartisan community sustainability initiative of Melrah Environmental Services.'
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
