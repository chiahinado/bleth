import { existsSync, readdirSync, readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const docsRoot = path.join(projectRoot, "docs");
const files = [];

const walk = (directory) => {
  for (const entry of readdirSync(directory, { withFileTypes: true })) {
    const target = path.join(directory, entry.name);
    if (entry.isDirectory()) walk(target);
    else files.push(target);
  }
};

walk(docsRoot);

const failures = [];
const externalPattern = /^(?:https?:|mailto:|tel:|data:|javascript:)/;

for (const file of files.filter((target) => target.endsWith(".html"))) {
  const source = readFileSync(file, "utf8");
  for (const match of source.matchAll(/(?:href|src)="([^"]+)"/g)) {
    const reference = match[1].split("#")[0].split("?")[0];
    if (!reference || externalPattern.test(reference)) continue;

    let target;
    if (reference.startsWith("/bleth/")) {
      target = path.join(docsRoot, reference.slice(7));
    } else if (reference.startsWith("/")) {
      continue;
    } else {
      target = path.resolve(path.dirname(file), reference);
    }

    if (reference.endsWith("/")) target = path.join(target, "index.html");
    if (!existsSync(target)) failures.push(`${path.relative(docsRoot, file)} -> ${reference}`);
  }
}

for (const file of files.filter((target) => target.endsWith(".css"))) {
  const source = readFileSync(file, "utf8");
  for (const match of source.matchAll(/url\(["']?([^"')]+)["']?\)/g)) {
    const reference = match[1].split("#")[0].split("?")[0];
    if (!reference || /^(?:https?:|data:)/.test(reference)) continue;
    const target = path.resolve(path.dirname(file), reference);
    if (!existsSync(target)) failures.push(`${path.relative(docsRoot, file)} -> ${reference}`);
  }
}

if (failures.length) {
  console.error(failures.join("\n"));
  process.exitCode = 1;
} else {
  const htmlCount = files.filter((target) => target.endsWith(".html")).length;
  console.log(`Local references OK: ${htmlCount} HTML pages`);
}
