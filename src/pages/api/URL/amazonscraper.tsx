import { itemType } from "@/components/ultils/scraper/type";
import React from 'react';
const { Cluster } = require('puppeteer-cluster');




type clusterType = ReturnType<typeof Cluster>;
export type jsonArrType = {
  items: itemType[]
}



var url: string;

const getScraper = async (urls: string[]): Promise<jsonArrType[]> => {
  let items: itemType[] = [];
  let JsonArr: jsonArrType[] | never = [];
  let count = 0;
  const maxCount = 2;
  let count2 = 0;
  let count3 = 0;
  const cluster1: clusterType = await Cluster.launch({
    concurrency: Cluster.CONCURRENCY_PAGE,
    maxConcurrency: 2,
    monitor: false,
    puppeteerOptions: {
      // headless:true,
      defaultViewport: false,
      userDataDir: "/tmp"
    }
  });
  // Event handler to be called in case of problems
  cluster1.on('taskerror', (err: any, data: any) => {
    console.log(`Error crawling ${data}: ${err.message}`);
  });

  await cluster1.task(async ({ page, data: url }: { page: any, data: any }) => {

    ////----PAGELOOKUP////////////////

    await page.goto(url, { waitUntil: 'domcontentloaded' });
    while (count < maxCount) {
      let productHandles = await page.$$(' div#gridItemRoot');
      if (!(productHandles.length > 0)) {
        productHandles = await page.$$("div#search > div > div> div > span > div > div");

      }
      console.log(productHandles)

      for (const producthandle of productHandles) {
        let id = count2;
        let title = "null";
        let price = "null";
        let image = "null";
        let href = "null";
        //pass teh single handle below
        // console.log("inside",producthandle)
        try {
          href = await page.evaluate((el: any) => el.querySelector("a.a-link-normal").getAttribute("href"), producthandle);
          // console.log("href",href)
        } catch (error) {

        }
        try {
          title = await page.evaluate((el: any) => el.querySelector("a.a-link-normal > span >div").textContent, producthandle);
          // console.log("title",title)
        } catch (error) {

        }
        try {
          price = await page.evaluate((el: any) => el.querySelector("a.a-link-normal > div > span > span").textContent, producthandle);
          // console.log("price",price)
        } catch (error) {

        }
        try {
          image = await page.evaluate((el: any) => el.querySelector("a.a-link-normal >div > img").getAttribute("src"), producthandle);
          // console.log("image",image)
        } catch (error) {

        }
        if (title !== "null" && typeof (items) === 'object') {
          // console.log("items",items) // works
          items.push({ id: count2, title: title, price: price, image: image, href: href });
          count2++;
        }


      }


      count++;
      JsonArr.push({ items: items });
    }

    count3++;





    ////----PAGELOOKUP////////////////

  });
  let urls2: string[] = urls;
  for (const url of urls2) {

    await cluster1.queue(url);

  }



  // many more pages

  await cluster1.idle();
  await cluster1.close();
  //   console.log("inside",JsonArr) //good



  return JsonArr
}

export default getScraper;