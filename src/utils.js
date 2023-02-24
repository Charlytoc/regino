
const fs = require('fs');
const path = require('path');

const walk = function(dir, done) {
  var results = [];
  fs.readdir(dir, function(err, list) {
    if (err) return done(err);
    var pending = list.length;
    if (!pending) return done(null, results);
    list.forEach(function(file) {
      file = path.resolve(dir, file);
      fs.stat(file, function(err, stat) {
        if (stat && stat.isDirectory()) {
          walk(file, function(err, res) {
            results = results.concat(res);
            if (!--pending) done(null, results);
          });
        } else {
          results.push(file);
          if (!--pending) done(null, results);
        }
      });
    });
  });
};

const createJSON =(content, fileName, path) => {
    if (!fs.existsSync(path)) fs.mkdirSync(path);
    fs.writeFileSync(path+"/"+fileName+".json", JSON.stringify(content, null, 2));
};

const createHTML =(fileName) => {
    let templateContent = fs.readFileSync("template.html", {encoding: 'utf8'});
    templateContent = templateContent.replace("{{style}}", `<link href="/src/pages/${fileName}.css" rel="stylesheet"/>`)
    templateContent = templateContent.replace("{{script}}", `<script src="/src/pages/${fileName}.js"></script>`)
    fs.writeFileSync("./"+fileName+".html", templateContent);
};

const readManifest = () => {
  if (!fs.existsSync("manifest.json")) throw Error('manifest.json file not found');
  const manifest = JSON.parse(fs.readFileSync("manifest.json"));
  
  if(!manifest.output) throw Error("manifest.json is missing output property")
  return manifest;
}

module.exports = { walk, createJSON, readManifest, createHTML }