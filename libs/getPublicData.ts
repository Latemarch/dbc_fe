import fs from "fs";
import path from "path";

export function saveJson(data: unknown, filename = "output.json") {
  const filePath = path.join(process.cwd(), "public", filename);
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2), "utf-8");
}

export function getContents(name: string) {
  if (name.endsWith(".json")) {
    const filePath = path.join(process.cwd(), "public", "contents", name);
    const file = fs.readFileSync(filePath, "utf8");
    return JSON.parse(file);
  } else {
    const filePath = path.join(process.cwd(), "public", "contents", name);
    const file = fs.readFileSync(filePath, "utf8");
    return file;
  }
}
