// Native
const https = require("https");
const { basename, extname, resolve, join: pathJoin } = require("path");

// Packages
const fs = require("fs-extra");
const split = require("split");
const ProgressBar = require("progress");
const { yellow, green, gray, bold } = require("chalk");

const baseURL = "https://unicode.org/Public/emoji/11.0/";
const output = "./emoji-sequences";
const getBaseName = file => basename(file, extname(file));

const files = [
  "emoji-sequences.txt",
  "emoji-zwj-sequences.txt",
  "emoji-variation-sequences.txt"
];

const log = (indentation, ...argv) => {
  console.log("  ".repeat(indentation), ...argv);
};

const toNumber = x => parseInt(x, 16);
const toHex = x => x.toString(16);
const sliceTo = (ch, str) => {
  const chPos = str.indexOf(ch);
  return chPos >= 0 ? str.slice(0, chPos) : str;
};

const getRemoteFile = async uri => {
  const bar = new ProgressBar(gray(":bar :received/:filesize"), {
    total: 100,
    width: 30
  });
  let codeOfMaxLength = {
    length: 0
  };
  return new Promise(function(resolve, reject) {
    https
      .get(uri, res => {
        const filesize = parseInt(res.headers["content-length"], 10);
        let received = 0;
        bar.tick(10, { received, filesize });
        const result = {};

        res
          .on("data", function(chunk) {
            received += chunk.length;
            bar.tick(chunk.length / filesize * 90, {
              received,
              filesize
            });
          })
          .pipe(split())
          .on("data", function(line) {
            line = line.trim();
            if (line.length === 0 || line[0] === "#") return;

            const [_, type, name] = line.split(";");

            const codePoints = _.trim()
            .split(" ")
            .map(toNumber);

            const codes = codePoints.map(toHex);

            const content = String.fromCodePoint(...codePoints);

            if (codes.length > codeOfMaxLength.length) {
              codeOfMaxLength.length = codes.length;
              codeOfMaxLength.content = content;
              codeOfMaxLength.codes = codes;
            }
            const key = codes.join(" ");
            result[key] = {
              content,
              type: (type || "").trim(),
              name: sliceTo("#", name || "").trim()
            };
          })
          .on("error", function(err) {
            reject(err);
          })
          .on("end", function() {
            log(
              1,
              gray(`The sequence of '${
                codeOfMaxLength.content
              }' has max code length`),
              bold(green(codeOfMaxLength.length))
            );
            resolve(result);
          });
      })
      .on("error", function(err) {
        reject(err);
      });
  });
};

async function main() {
  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    const uri = baseURL + file;
    log(0, bold(green(`${i + 1}/${files.length}:`)), bold(file));
    log(1, gray("Downloading"), yellow(uri));
    const result = await getRemoteFile(uri);
    const outputFile = pathJoin(output, getBaseName(file) + ".json");
    await fs.writeFile(outputFile, JSON.stringify(result, null, 2), "utf-8");
    log(1, "File saved to", bold(green(outputFile)));
  }
}

main();
