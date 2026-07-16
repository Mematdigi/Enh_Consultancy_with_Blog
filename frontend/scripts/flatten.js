const fs = require("fs");
const path = require("path");

const dist = path.join(__dirname, "../dist");

const entries = fs.readdirSync(dist);

entries.forEach((entry) => {
    const full = path.join(dist, entry);

    if (!fs.statSync(full).isDirectory()) return;

    const indexFile = path.join(full, "index.html");

    if (!fs.existsSync(indexFile)) return;

    fs.renameSync(indexFile, path.join(dist, `${entry}.html`));

    fs.rmSync(full, {
        recursive: true,
        force: true
    });

    console.log(`✔ ${entry}`);
});