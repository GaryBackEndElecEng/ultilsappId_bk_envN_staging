import {NextApiRequest,NextApiResponse} from "next";
import scraper , {jsonArrType} from "./amazonscraper";
const handler = async(
  req:NextApiRequest,
  res:NextApiResponse 
  ) => {
    type scraperType=ReturnType<typeof scraper>
    let resScraper:jsonArrType[] = [];
    const {query}=req;
    const {url}=query;
    // console.log(query)
  try {

    if(typeof(url)==="string" && url && typeof(url)!=="object"){
    resScraper= await scraper([url]);
    }else if(typeof(url)==="object" && url){
      resScraper= await scraper(url);
    }
    // console.log(resScraper)
    return res.status(200).json({res:"success",data:resScraper});
  } catch (error) {
    return res.status(400).json({message:"not found"})
  }

}

export default handler