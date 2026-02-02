import { headers } from "next/headers";

export function getBaseUrl() {
  const hdrs = headers();
  const forwardedProto = hdrs.get("x-forwarded-proto") || "http";
  const host = hdrs.get("host") || "localhost:3000";
  return `${forwardedProto}://${host}`;
}
