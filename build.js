const path = require("path");
const { walk, createJSON, readManifest, createHTML } = require("./src/utils.js");

const manifest = readManifest();

walk('src/pages', function(err, files) {
    if (err){
        console.log("Error scanning markdown files");
        process.exit(1);
    } 

    let _pages = files.filter(
        (f) =>
          (f.indexOf(".js") > 1 || f.indexOf(".js") > 1) &&
          true
      ).map(_path => path.basename(_path).split(".")[0]);
    let _styles = files.filter(
        (f) =>
          (f.indexOf(".css") > 1 || f.indexOf(".css") > 1) &&
          true
      ).map(_path => path.basename(_path).split(".")[0]);

    const _build = {
        pages: _pages.map(c => ({
            name: c,
            hasStyles: _styles.find(s => s == c) != null,
        }))
    }
    try{
        createJSON(_build, "build", manifest.output);
        for(pageName of _pages) createHTML(pageName, manifest.output);
        console.log("The _build.json file was created!");
        process.exit(0);
    }
    catch(error){
        console.log(error);
        process.exit(1);
    }
});