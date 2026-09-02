import { execSync } from "child_process";
import fs from "fs";
import path from "path";

const apiPath = path.join("src", "app", "api");
const apiBackup = path.join("src", "app", "_api_backup");
const moved = fs.existsSync(apiPath);

if (moved) {
  fs.renameSync(apiPath, apiBackup);
}

try {
  execSync("next build", {
    stdio: "inherit",
    env: {
      ...process.env,
      GITHUB_PAGES: "true",
      NEXT_PUBLIC_BASE_PATH: "/property-management",
    },
  });
} finally {
  if (moved && fs.existsSync(apiBackup)) {
    fs.renameSync(apiBackup, apiPath);
  }
}
