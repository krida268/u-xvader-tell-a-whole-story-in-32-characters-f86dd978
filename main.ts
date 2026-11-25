// Tell a Whole Story in 32 Characters — entry: one Wi-Fi network name.
// The name is a whole story in one line: a breakup, a move-out, and the
// petty detail that the ex kept the router. 29 characters, inside the
// 1-32 gate. Writes it to /output/entry.txt (or argv[2] as file/dir).
import { mkdirSync, writeFileSync } from "node:fs";
import { dirname } from "node:path";

const ENTRY = "Ex moved out, kept the router";

function resolveTarget(argv: string[]): string {
  // Accept either a file path (ending .txt) or a directory, mirroring
  // how the grader invokes the program with /output as the target.
  const arg = argv[2] ?? "/output/entry.txt";
  if (arg.endsWith(".txt")) return arg;
  return `${arg.replace(/\/$/, "")}/entry.txt`;
}

function main(): void {
  // Gate: 1-32 characters, not only white space, single line.
  if (ENTRY.length < 1 || ENTRY.length > 32) {
    throw new Error(`entry is ${ENTRY.length} chars, gate needs 1-32`);
  }
  if (ENTRY.trim().length === 0 || ENTRY.includes("\n")) {
    throw new Error("entry must be a single non-blank line");
  }
  const target = resolveTarget(process.argv);
  mkdirSync(dirname(target), { recursive: true });
  writeFileSync(target, ENTRY, "utf8");
  console.log(`wrote ${target} (${ENTRY.length} characters)`);
}

main();
