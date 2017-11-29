const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({args: ['--no-sandbox']});
  const page = await browser.newPage();
  await page.goto('http://0.0.0.0:8000', {waitUntil: 'networkidle2'});
  await page.pdf({path: '/out/joshchorltonresume.pdf', margin: {top: '40px', bottom: '30px', left: '30px', right: '30px'}});

  await browser.close();
})();
