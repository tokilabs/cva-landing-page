const fs = require("fs");
const path = require("path");

const sourcePath = path.join(
  __dirname,
  "src",
  "home-app-landing-onePage.html"
);
const destPath = path.join(__dirname, "dist", "index.html");

fs.copyFile(sourcePath, destPath, (err) => {
  if (err) throw err;
  console.log("landing-page has been copied to /dist");
});
