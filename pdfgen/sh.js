const chromeLauncher = require('chrome-launcher');
const CDP = require('chrome-remote-interface');
const fs = require('fs');

/**
 * Launches a debugging instance of Chrome.
 * @param {boolean=} headless True (default) launches Chrome in headless mode.
 *     False launches a full version of Chrome.
 * @return {Promise<ChromeLauncher>}
 */
function launchChrome() {
    return chromeLauncher.launch({
        chromeFlags: [
            '--disable-gpu',
            '--no-sandbox',
            '--headless',
        ]
    });
}

(async function() {

    const chrome = await launchChrome();
    const protocol = await CDP({port: chrome.port});

    // Extract the DevTools protocol domains we need and enable them.
    // See API docs: https://chromedevtools.github.io/devtools-protocol/
    const {Page, Runtime} = protocol;
    await Promise.all([Page.enable(), Runtime.enable()]);

    Page.navigate({url: 'http://localhost:8000'});

    // Wait for window.onload before doing stuff.
    Page.loadEventFired(async () => {
        const pdf = await Page.printToPDF({displayHeaderFooter: 'false', printBackground: 'false', pageRanges: "1"});
        fs.writeFile("/out/joshchorltonresume.pdf", Buffer.from(pdf.data, 'base64'), { flag: 'w' }, function(err) {
            if(err) {
                return console.log(err);
            }

            console.log("The file was saved!");
            protocol.close();
            chrome.kill(); // Kill Chrome.
        });
    });
})();
