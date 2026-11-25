// The Funniest AI Out-of-Office Reply
// Writes one out-of-office auto-reply line (under 160 chars) to /output/entry.txt.
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const REPLY =
  "Out of office until Monday. Your message is important to me, which is why I've filed it under 'later' — a folder I never open.";

const outDir = process.env.OUTPUT_DIR ?? "/output";

// Gate validation: entry must be UTF-8, 1–160 chars, not only whitespace,
// and must not carry surrounding whitespace (the sealed scorer rejects it).
if (REPLY.length < 1 || REPLY.length > 160) {
  throw new Error(`entry length ${REPLY.length} is outside the 1–160 char gate`);
}
if (REPLY.trim().length === 0) {
  throw new Error("entry must not be only whitespace");
}
if (REPLY !== REPLY.trim()) {
  throw new Error("entry must not have surrounding whitespace");
}
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), REPLY, "utf8");
console.log(REPLY);
