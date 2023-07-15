import { Injectable } from '@nestjs/common';
import puppeteer from 'puppeteer-core';
@Injectable()
export class AppService {
  async scraping(url: string) {
    const browserOptions = {
      headless: false,
      defaultViewport: null,
      executablePath: '/usr/bin/brave',
      args: ['--no-sandbox', '--unlimited-storage'],
    };

    const browser = await puppeteer.launch(browserOptions);

    browser.on('disconnected', () => {
      console.log('Browser was disconnected.');
    });

    console.log('Configured puppeteer.');
    const page = await browser.newPage();
    await page.goto(url, {
      waitUntil: 'domcontentloaded',
    });

    try {
      const product_name = await page.evaluate((element) => {
        return element.textContent;
      }, (await page.$x('//*[@id="pdp_comp-product_content"]/div/h1'))[0]);
      const product_price = await page.evaluate((element) => {
        return element.textContent;
      }, (await page.$x('//*[@id="pdp_comp-product_content"]/div/div[2]/div'))[0]);
      const product_description = await page.evaluate((element) => {
        return element.textContent;
      }, (await page.$x('//*[@id="pdp_comp-product_detail"]/div[2]/div[2]/div/span/span/div'))[0]);
      await browser.close();
      return {
        product_name,
        product_price,
        product_description,
      };
    } catch (err) {
      console.log(err);
    }
  }
}
