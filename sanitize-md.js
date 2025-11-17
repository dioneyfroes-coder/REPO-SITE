import fs from "fs";
import path from "path";

const ROOT = "./docs-source";

// Padrões perigosos para MDX
const RE_TAG = /<([A-Za-z][A-Za-z0-9]*)([^>]*?)>/g;           // <Tag ...>
const RE_SELF_CLOSE = /<([A-Za-z][A-Za-z0-9]*)([^>]*?)\/>/g; // <Tag .../>
const RE_SHORT_TAG = /<([A-Z])>/g;                           // <T>
const RE_EQ_ATTR = /<([^>\s]+)=([^>]+)>/g;                   // <x=y>

function sanitize(md) {
  return md
    // Remove tags JSX-like
    .replace(RE_SELF_CLOSE, "`<$1$2/>`")
    .replace(RE_TAG, "`<$1$2>`")
    .replace(RE_SHORT_TAG, "`<$1>`")
    .replace(RE_EQ_ATTR, "`<$1=$2>`");
}

function walk(dir) {
  const entries = fs.readdirSync(dir);
  for (const e of entries) {
    const full = path.join(dir, e);
    const stat = fs.statSync(full);

    if (stat.isDirectory()) {
      walk(full);
    } else if (full.endsWith(".md")) {
      const original = fs.readFileSync(full, "utf8");
      const cleaned = sanitize(original);

      if (cleaned !== original) {
        fs.writeFileSync(full, cleaned, "utf8");
        console.log("Sanitized:", full);
      }
    }
  }
}

console.log("Sanitizing markdown…");
walk(ROOT);
console.log("Done.");
