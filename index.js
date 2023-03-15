#!/usr/bin/env node
const { JavaCaller } = require('java-caller');

(async () => {
    const java = new JavaCaller({
        jar: './pkg/bfg-1.14.0.jar',
        rootPath: __dirname
    });

    const argv = process.argv.slice(2)

    const { status, stdout, stderr } = await java.run(argv);
    console.log(stderr)
    console.log(stdout)
})();
