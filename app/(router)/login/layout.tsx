export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="login-page d-flex w-100 h-100 justify-content-center align-items-center">
      {children}
    </main>
  );
}
