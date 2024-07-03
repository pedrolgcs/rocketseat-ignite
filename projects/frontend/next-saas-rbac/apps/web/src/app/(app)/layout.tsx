export default function AppLayout({
  children,
  sheet,
}: Readonly<{
  children: React.ReactNode
  sheet?: React.ReactNode
}>) {
  return (
    <>
      {children}
      {sheet}
    </>
  )
}
