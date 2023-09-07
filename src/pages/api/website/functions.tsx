import { hType, returnHtmlType, getAttribType, headersType } from "@/components/ultils/scraper/type";
import { ElementHandle } from "puppeteer";

export function clipText(text: string): string {
    let arrReturn: string[] = [];
    let arr: string[] = text.split(" ");
    arr.forEach((word, index) => {
        let lenWord = word.split("");
        if (lenWord.length > 20 && lenWord.length < 30) {
            arrReturn.push(`${word}\n`);
        } else if (lenWord.length > 20 && lenWord.length < 40) {
            let temWd1: string = lenWord.splice(0, 20, "\n").slice(0, 21).join("");
            let temWd2: string = lenWord.splice(0, 22, "\n").slice(22, 40).join("");
            arrReturn.push([temWd1 + "\n", temWd2 + "\n"].join(""));
        } else if (lenWord.length > 40 && lenWord.length < 70) {
            let temWd1: string = lenWord.splice(0, 20, "\n").slice(0, 21).join("");
            let temWd2: string = lenWord.splice(0, 22, "\n").slice(23, 42).join("");
            let temWd3: string = lenWord.splice(0, 43, "\n").slice(43, 69).join("");
            arrReturn.push([temWd1 + "\n", temWd2 + "\n", temWd3 + "\n"].join(""));
        } else if (lenWord.length > 90) {

            let temWd1: string = lenWord.slice(0, 21).splice(0, 20, "\n").join("");
            let temWd2: string = lenWord.slice(22, 41).splice(0, 40, "\n").join("");
            let temWd3: string = lenWord.slice(42, 70).join("");
            console.log(temWd1, temWd2, temWd3, "together", [temWd1, temWd2, temWd3].join(""));
            arrReturn.push([temWd1 + "\n", temWd2 + "\n", temWd3 + "\n"].join(""));

        }
        else {
            arrReturn.push(word);
        }
    });
    return arrReturn.join("")
}
export function desc_func(
    // pDesc:HTMLElement[] | string[],
    divDesc: HTMLElement[] | string[]
): returnHtmlType[] {
    let arr: returnHtmlType[] = [];

    if (divDesc.length > 0) {
        divDesc.forEach((el, index) => {
            if (typeof (el) === "string" && el.split("").length > 0 && el !== " ") {
                arr.push({ id: index, el: "desc", text: el })
            }
        });
    }
    return arr
}
export function image_func(img: HTMLElement[] | string[]): returnHtmlType[] {
    let arr: returnHtmlType[] = [];
    if (img.length > 0) {
        img.forEach((el, index) => {
            if (typeof (el) === "string" && el.split("").length > 1 && el.startsWith("http")) {
                arr.push({ id: index, el: "image", text: el });
            } else {
                arr.push({ id: index, el: "image", text: null });
            }
        });
    }
    return arr
}
export function href_func(Href: HTMLElement[] | HTMLAnchorElement[] | string[]): returnHtmlType[] {
    let arr: returnHtmlType[] = [];
    if (Href.length > 0) {
        Href.forEach((el, index) => {

            if (typeof (el) === "string" && el.startsWith("https")) {
                arr.push({ id: index, el: "href", text: el });
            }
        });
    }
    return arr
}
export function emailNoneAnchor_func(
    divEmail: HTMLElement[] | string[],
    Href: HTMLAnchorElement[] | string[],

): returnHtmlType[] {
    let arr: returnHtmlType[] = [];
    if (divEmail.length > 0) {
        divEmail.forEach((el, index) => {
            if (typeof (el) === "string" && el.split("").length > 0) {

                arr.push({ id: index, el: "email", text: el })
            }
        });
    }
    if (Href.length > 0) {
        Href.forEach((el, index) => {
            if (typeof (el) === "string" && el.split("").length > 0 && el.includes("mail")) {
                let mailto = el.split(":")[1]

                arr.push({ id: index, el: "email", text: mailto })
            }
        });
    }

    return arr
}
export function email_func(Email: HTMLAnchorElement[]): returnHtmlType[] {
    let arr: returnHtmlType[] = [];
    if (Email.length > 0) {
        Email.forEach((el, index) => {
            let check: boolean = el.getAttribute("mailto") ? true : false;
            if (el && check) {
                let email = el.getAttribute("mailto")
                arr.push({ id: index, el: "email", text: email })
            }
        });
    }
    return arr
}
export function price_func(
    divPrice: HTMLElement[] | string[],
): returnHtmlType[] {
    let arr: returnHtmlType[] = [];
    if (divPrice.length > 0) {
        divPrice.forEach((el, index) => {
            if (typeof (el) === "string" && el.split("").length > 0) {
                arr.push({ id: index, el: "price", text: el });
            } else {
                arr.push({ id: index, el: "price", text: null });
            }
        });
    }


    return arr
}
export async function name_func(
    divName: getAttribType[],
    select: string

): Promise<returnHtmlType[]> {
    let arr: returnHtmlType[] = [];
    if (divName.length > 0) {
        divName.forEach((el, index) => {
            let check = el.attr.includes(select)
            if (check) {
                arr.push({ id: index, el: "Name", text: el.text })
            } else {
                arr.push({ id: index, el: "Name", text: `${select} not found` })
            }
        });
    }


    return arr
}
export function title_func(
    h3: HTMLElement[] | string[],
    h1: HTMLElement[] | string[],
    h2: HTMLElement[] | string[]
): returnHtmlType[] {
    let arr: returnHtmlType[] = [];
    if (h1.length > 0) {
        h1.forEach((el, index) => {
            // console.log(el);
            if (typeof (el) === "string" && el.split("").length > 0) {
                arr.push({ id: index, el: "title", text: el })
            }
        });
    }
    if (h2.length > 0) {
        h2.forEach((el, index) => {

            if (typeof (el) === "string" && el.split("").length > 0) {
                arr.push({ id: index, el: "title", text: el })
            }
        });
    }
    if (h3.length > 0) {
        h3.forEach((el, index) => {

            if (typeof (el) === "string" && el.split("").length > 0) {
                arr.push({ id: index, el: "title", text: el })
            }
        });
    }
    return arr
}
export function h_func(
    h1: HTMLElement[],
    h2: HTMLElement[],
    h3: HTMLElement[]
): returnHtmlType[] {
    let arr: returnHtmlType[] = [];
    if (h1.length > 0) {
        h1.forEach((el, index) => {
            if (el.textContent) {
                arr.push({ id: index, el: "h", text: el.textContent })
            }
        });
    }
    if (h2.length > 0) {
        h2.forEach((el, index) => {
            if (el.textContent) {
                arr.push({ id: index, el: "h", text: el.textContent })
            }
        });
    }
    if (h3.length > 0) {
        h3.forEach((el, index) => {
            if (el.textContent) {
                arr.push({ id: index, el: "h", text: el.textContent })
            }
        });
    }
    return arr
}
export function headers_func(header: any): { key: string, value: string }[] {

    let objHeader = JSON.parse(header);

    let arr: { key: string, value: string }[] = [];
    for (const [key, value] of JSON.parse(header)) {
        arr.push({ key: key, value: value })
        console.log(key)

    }
    return arr
}