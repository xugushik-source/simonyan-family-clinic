import type { ReactNode } from "react";

// Root layout — required by the App Router whenever a root page.tsx
// exists. The real <html>/<body> and everything else lives in
// [locale]/layout.tsx; this only serves the "/" redirect fallback,
// which never actually renders any content (redirect() throws first).
export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html>
      <body>{children}</body>
    </html>
  );
}
