import Link from "next/link";

export default function GlobalNotFound() {
  return (
    <html lang="ru">
      <body
        style={{
          display: "flex",
          minHeight: "100vh",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "system-ui, sans-serif",
          background: "#fbfaf7",
          color: "#1c2420",
        }}
      >
        <p style={{ fontSize: "3rem", fontWeight: 600, color: "#c3d7c8" }}>404</p>
        <h1 style={{ fontSize: "1.25rem", fontWeight: 600 }}>Страница не найдена</h1>
        <Link href="/ru" style={{ marginTop: "1.5rem", color: "#3b6347", fontWeight: 600 }}>
          На главную
        </Link>
      </body>
    </html>
  );
}
