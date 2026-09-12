import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

export default createMiddleware(routing);

export const config = {
  // Exclude API/internal paths and anything with a file extension
  // (sitemap.xml, robots.txt, icon.png, …). Locale-scoped metadata routes
  // like /[locale]/opengraph-image are intentionally left in scope so they
  // get a proper locale prefix.
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
};
