// Sends a correctly signed request to the /api/revalidate webhook endpoint,
// mimicking Sanity's signature scheme (HMAC-SHA256 over `${timestamp}.${body}`).
// Usage: node scripts/test-revalidate.mjs
import { createHmac } from "node:crypto";
import { readFileSync } from "node:fs";

const env = readFileSync(new URL("../.env.local", import.meta.url), "utf8");
const secret = env.match(/^SANITY_REVALIDATE_SECRET=(.+)$/m)?.[1]?.trim();
if (!secret) throw new Error("SANITY_REVALIDATE_SECRET not found in .env.local");

const body = JSON.stringify({ _type: "manual-test" });
const timestamp = Date.now();
const signature = createHmac("sha256", secret)
	.update(`${timestamp}.${body}`)
	.digest("base64")
	.replace(/\+/g, "-")
	.replace(/\//g, "_")
	.replace(/=+$/, "");

const res = await fetch("https://www.ulommiri.com/api/revalidate", {
	method: "POST",
	headers: {
		"Content-Type": "application/json",
		"sanity-webhook-signature": `t=${timestamp},v1=${signature}`,
	},
	body,
});

console.log("HTTP status:", res.status);
console.log("Response:", await res.text());
