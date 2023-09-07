import { NextApiRequest, NextApiResponse } from "next";
import websiteScraper from "./websiteScraper";
import { jsonArrType, jsonWebArrType } from "@/components/ultils/scraper/type";

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  type scraperType = ReturnType<typeof websiteScraper>
  let resScraper: jsonWebArrType[] = [];
  const { query } = req;
  const { url, Name, nameLabel, title, price, href, desc, image, headers, email } = query;
  let nameLabelConv = "";
  if (nameLabel && typeof (nameLabel) === "string") {
    nameLabelConv = nameLabel;
  }
  function strBool(str: string | string[] | undefined): boolean {
    if (str === "true") {
      return true
    } else {
      return false
    }

  }
  try {

    if (typeof (url) === "string" && url && typeof (url) !== "object") {
      resScraper = await websiteScraper([url], strBool(Name), nameLabelConv, strBool(title), strBool(price), strBool(href), strBool(desc), strBool(image), strBool(headers), strBool(email));
    } else if (typeof (url) === "object" && url) {
      resScraper = await websiteScraper(url, Boolean(Name), nameLabelConv, Boolean(title), Boolean(price), Boolean(href), Boolean(desc), Boolean(image), Boolean(headers), Boolean(email));
    }

    return res.status(200).json({ res: "success", data: resScraper });
  } catch (error) {
    return res.status(400).json({ message: "not found" })
  }

}

export default handler