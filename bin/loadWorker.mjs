import cheerio from "cheerio";
import fetch from "node-fetch";
import fs from "fs";

const elmLogoRoot = process.env.ELM_LOGO_ROOT;
const localWorkerPath = "build/worker.js";

if (elmLogoRoot === undefined) {
  console.error("set ELM_LOGO_ROOT to the URL of an elm-logo instance");

  process.exit(1);
}

async function main() {
  const response = await fetch(elmLogoRoot);
  const body = await response.text();

  console.info(`read index.html from ${elmLogoRoot}`);

  const $ = cheerio.load(body);
  const link = $("script");
  const remoteAppScriptPath = link.attr("src");
  const remoteAppScriptUrl = elmLogoRoot + remoteAppScriptPath;

  const appScriptResponse = await fetch(remoteAppScriptUrl);
  const appScript = await appScriptResponse.text();

  console.info(`read app.js from ${remoteAppScriptUrl}`);

  const workerRegex = /new Worker\("(\S+)"\)/;
  const match = appScript.match(workerRegex);

  if (match !== null) {
    const [, remoteWorkerPath] = match;

    const remoteWorkerScriptUrl = elmLogoRoot + remoteWorkerPath;

    const workerScriptResponse = await fetch(remoteWorkerScriptUrl);
    const workerScript = await workerScriptResponse.text();

    console.info(`read worker from ${remoteWorkerScriptUrl}`);

    await fs.promises.writeFile(localWorkerPath, workerScript);

    console.info(`wrote worker to ${localWorkerPath}`);
  }
}

main();
