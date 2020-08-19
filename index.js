const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question('Choose an option:\n 1. Read package.json \n 2. Display OS info \n 3. Start HTTP server \nType a number: ', (answer) =>{

    switch (answer) {
        case '1':
            getPackageJson();
            break;
        case '2':
            displayOsInfo();
            break;
        case '3':
            startServer();
            break;
        default:
            console.log("Not a valid input")
            break;
    }
    rl.close();
});

async function getPackageJson() {
    const fs = require('fs');
    
    const fileStream = fs.createReadStream('package.json');

  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity
  });
  for await (const line of rl) {
    console.log(`${line}`);
  }
}
function displayOsInfo(){
    const os = require('os');

    console.log('SYSTEM MEMORY', (os.totalmem() / 1024 / 1024 / 1024).toFixed(2) + 'GB');
    console.log('FREE MEMORY',  (os.freemem() / 1024 / 1024 / 1024).toFixed(2) + 'GB')
    console.log('CPU CORES', (os.cpus().length));
    console.log('ARCH', (os.arch()));
    console.log('PLATFORM', (os.platform()));
    console.log('RELEASE', (os.release()));
    console.log('USER', (os.homedir()));
}
function startServer(){
    const http = require('http');

    const hostname = '127.0.0.1';
    const port = 3000;

    const server = http.createServer((req, res) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/plain');
        res.end('Hello World');
    });

    server.listen(port, hostname, () => {
        console.log(`Server running at http://${hostname}:${port}}/`);
    });
}
