const fs = require('fs');
const axios = require('axios');

let out;

function master () {
    let path = process.argv[2];
    if (path === "--out") {
        out = true;
        const toRead = process.argv[4];
        determine(toRead);
        process.exit(0);
    }
    else {
        determine(path)
    }
}

function write (data) {
    const outputFile = process.argv[3];
    fs.writeFile(`${outputFile}`, `${data}`, "utf8", function(err) {
        if (err) {
          console.error(err);
          process.exit(1);
        }
        else {
        console.log('Successfully wrote to file!');
        }
      });
}

function determine (path) {
if (path.slice(0, 4) === 'http') {
  webCat(path);
} else {
   cat(path);
}
}


function cat (path) {
    return fs.readFile(path, 'utf8', function(err, data) {
    console.log("inside readfile function")
    if (err) {
      console.error(err);
      process.exit(1);
    }
    else {
        console.log(`file contents: ${data}`);
        if (out === true) {
            write(data)
        }
        else {
            process.exit(0);
        }
        
    }
})
}



async function webCat(url) {
    console.log(url)
    console.log('inside url function')
    try {
      let resp = await axios.get(url);
      console.log(resp.data);
        
      if (out === true) {
        console.log("AFSDASDFASDFAS")
        write(resp.data);
    }
    } catch (err) {
      console.error(`Error fetching ${url}: ${err}`);
      process.exit(1);
    }
}
master()