const fs = require('fs');
const axios = require('axios');
let out;

async function master () {
    path = process.argv[2];
    if (path === "--out") {
        out = true;
        const toRead = process.argv[4];
        await determine(toRead);
   
    }
    else {
        determine(path)
    }
}

async function determine (path) {
  if (path.slice(0, 4) === 'http') {
    await webCat(path);
  } else {
    cat(path);
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





function cat (path) {
  console.log('inside cat function')
  //FUNCTION STOPS HERE
  fs.readFile(path, 'utf8', function(err, data) {
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
        console.log('not out')
          process.exit(0);
      }
  }
})
}



async function webCat(url) {
    console.log(url)
    console.log('inside webcat url function')
    try {
      let resp = await axios.get(url);
      console.log(resp.data);
        
      if (out === true) {
        console.log("Inside 'out' in webcat 'try' block")
        write(resp.data);
    }
    } catch (err) {
      console.error(`Error fetching ${url}: ${err}`);
      process.exit(1);
    }
}
master()