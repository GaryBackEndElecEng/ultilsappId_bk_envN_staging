import { jsonWebArrType, returnHtmlType, scraperType, getAttribType } from "@/components/ultils/scraper/type";
const { Cluster } = require('puppeteer-cluster');
import { h_func, name_func, price_func, href_func, desc_func, image_func, email_func, emailNoneAnchor_func, title_func, headers_func } from "./functions";
import { NextRequest } from 'next/server';
import { ElementHandle } from "puppeteer";


type clusterType = ReturnType<typeof Cluster>;




const websiteScraper = async (
  urls: string[] | string,
  Name: boolean,
  nameLabel: string,
  title: boolean,
  price: boolean,
  href: boolean,
  desc: boolean,
  image: boolean,
  headers: boolean,
  email: boolean
): Promise<jsonWebArrType[]> => {
  let items: returnHtmlType[] = [];
  let JsonArr: jsonWebArrType[] = [];
  let getHeaders: object = {};
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
    console.log(`Error web crawling ${data}: ${err.message}`);
  });

  await cluster1.task(async ({ page, data: url }: { page: any, data: any }) => {

    ////----PAGELOOKUP////////////////


    await page.goto(url, { waitUntil: 'domcontentloaded' });
    let body = await page.evaluate(() => { return document.body });
    try {
      if (title) {
        let h3: HTMLElement[] = await page.$$eval("h3", (nodes: HTMLElement[]) => nodes.map(n => n.innerText));
        let h1: HTMLElement[] = await page.$$eval("h1", (nodes: HTMLElement[]) => nodes.map(n => n.innerText));
        let h2: HTMLElement[] = await page.$$eval("h2", (nodes: HTMLElement[]) => nodes.map(n => n.innerText));


        let collector = title_func(h1, h2, h3);
        JsonArr.push({ items: collector });
      }
    } catch (error) {

    }
    try {
      if (price) {
        console.log("price outside")
        let divPrice: HTMLElement[] = await page.$$eval("div[class^='price']", (nodes: HTMLElement[]) => nodes.map(n => n.innerText));
        console.log("price INside", divPrice)

        let collector = price_func(divPrice);
        JsonArr.push({ items: collector });
        console.log("price", price, collector, collector.length)
      }

    } catch (error) {

    }
    try {
      if (desc) {
        let divDesc: HTMLElement[] = await page.$$eval("div", (nodes: HTMLElement[]) => nodes.map(n => n.innerText));

        let collector = desc_func(divDesc);
        JsonArr.push({ items: collector });

      }
    } catch (error) {

    }
    try {
      if (Name && nameLabel) {

        const arr: any = await page.$$eval("div",
          (nodes: HTMLDivElement[], label: string) => nodes.map((n: HTMLDivElement) =>
          ({
            attr: n.getAttribute("class"),
            text: n.textContent,

          })


          ));
        let arr2: getAttribType[] = arr
        let collector = await name_func(arr2, nameLabel);
        JsonArr.push({ items: collector });

      }

    } catch (error) {

    }
    try {
      if (href) {
        let Href: HTMLAnchorElement[] = await page.$$eval("a", (nodes: HTMLAnchorElement[]) => nodes.map(n => n.getAttribute("href")));

        let collector = href_func(Href);
        JsonArr.push({ items: collector });
        if (email) {
          let collector = email_func(Href);
          JsonArr.push({ items: collector });
        }

      }
      // console.log("price",collector)
    } catch (error) {

    }
    try {
      if (image) {
        let div: HTMLImageElement[] = await page.$$eval("img", (nodes: HTMLImageElement[]) => nodes.map(n => n.getAttribute("src")));

        let collector = image_func(div);
        JsonArr.push({ items: collector });

      }
      // console.log("price",collector)
    } catch (error) {

    }
    try {
      if (email) {
        let divEmail: HTMLElement[] = await page.$$eval("div", (nodes: HTMLElement[]) => nodes.filter(n => (n.getAttribute("class")?.includes("mail"))).map(n => n.textContent));
        let Href: HTMLAnchorElement[] = await page.$$eval("a", (nodes: HTMLAnchorElement[]) => nodes.map(n => n.getAttribute("href")));
        let collector = emailNoneAnchor_func(divEmail, Href);
        JsonArr.push({ items: collector });
        console.log("email", email, collector)
      }
    } catch (error) {

    }

    try {
      if (headers) {
        getHeaders = (await page.goto(`${url}`)).request().headers()
        let convert: string = JSON.stringify(getHeaders);
        JsonArr.push({ items: [{ id: 1, el: "headers", text: convert }] })
      }
    } catch (error) {

    }
    ////----PAGELOOKUP////////////////

  });
  let urls2: string[] | string = urls;
  if (urls.length > 0) {
    for (const url of urls2) {

      await cluster1.queue(url);

    }
  } else {
    await cluster1.queue(urls);
  }



  // many more pages

  await cluster1.idle();
  await cluster1.close();
  //   console.log("inside",JsonArr) //good



  return JsonArr
}

export default websiteScraper;