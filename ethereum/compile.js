import path from "path";
import solc from "solc";
import fs from "fs-extra";

const buildPath = path.resolve("build");
fs.removeSync(buildPath);

const campaignPath = path.resolve("contracts", "Campaign.sol");
const source = fs.readFileSync(campaignPath, "utf8");
const output = solc.compile(source, 1).contracts;

fs.ensureDirSync(buildPath);

for (let contract in output) {
  fs.outputJsonSync(
    path.resolve(buildPath, contract.replace(":", "") + ".json"),
    output[contract]
  );
}
