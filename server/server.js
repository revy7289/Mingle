import express from "express";
import { Client } from "@notionhq/client";
import { chromium } from "playwright";
import cors from "cors";
// const path = require("path");
// const { dirname } = require("path");
// const { fileURLToPath } = require("url");

import dotenv from "dotenv";
dotenv.config();

const options = {
  origin: "*", // 모든 출처 허용
  methods: ["GET", "POST"], // 허용할 HTTP 메서드
  allowedHeaders: ["Content-Type"], // 허용할 헤더
  credentials: true,
};

const notion = new Client({ auth: process.env.NTN_KEY });
const app = express();
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ limit: "10mb", extended: true }));
app.use(cors(options));
app.use(express.json());

// // 정적 파일 제공 설정 (CSS 파일 포함)
// const __dirname = dirname(fileURLToPath(import.meta.url));

// app.use(
//   "/sri_css",
//   express.static(path.join(__dirname, "public", "sri_css"), {
//     setHeaders: (res, filePath) => {
//       // CSS 파일의 MIME 유형을 명시적으로 설정
//       if (filePath.endsWith(".css")) {
//         res.setHeader("Content-Type", "text/css");
//         res.setHeader("Access-Control-Allow-Origin", "*");
//       }
//     },
//   })
// );

// 외부 사이트 크롤링 API
app.post("/crawler", async (req, res) => {
  let { url } = req.body;

  const isValidUrl = (url) => {
    url = /^https?:\/\//i.test(url) ? url : `https://${url}`;
    return /^https?:\/\/\S+$/i.test(url) || /^localhost(:\d+)?(\/\S*)?$/i.test(url);
  };

  // URL 유효성 검사
  if (!url || !isValidUrl(url)) {
    return res.status(400).json({ error: "유효한 URL을 입력하세요." });
  }

  // Playwright 브라우저 시작
  const browser = await chromium.launch({ headless: false }); // 헤드리스 모드

  try {
    // https://가 없으면 자동으로 추가한 URL을 사용하도록 처리
    url = /^https?:\/\//i.test(url) ? url : `https://${url}`;

    // 페이지 로드
    const page = await browser.newPage();
    await page.goto(url, { waitUntil: "networkidle", timeout: 10000, redirect: "follow" });

    // 페이지 캡처 (스크린샷)
    const screenshotBuffer = await page.screenshot({
      fullPage: true, // 페이지 전체 캡처
      type: "png", // PNG 형식
    });

    // // HTML 추출 및 정제
    // const html = await page.content();

    // // 상대 경로로 되어있는 CSS 파일의 href를 절대 경로로 변환
    // const baseUrl = new URL(url); // 기본 URL을 추출 (절대 경로로 변환할 때 사용)
    // const staticHTML = html
    //   // .replace(/url\("\/(.*?)"\)/g, (match, p1) => `url("${baseUrl.origin}/${p1}")`)
    //   // .replace(/href="\/(.*?)"/g, (match, p1) => `href="${baseUrl.origin}/${p1}"`)
    //   .replace(/src="\/(.*?)"/g, (match, p1) => `src="${baseUrl.origin}/${p1}"`);

    // // JavaScript 스크립트 제거 (필요 시 클라이언트에서 선택적으로 처리 가능)
    // const cleanedHTML = staticHTML.replace(/<script[\s\S]*?<\/script>/gi, ""); // 모든 script 태그 제거

    // // CSS 추출
    // const styles = await page.$$eval("link[rel='stylesheet'], style", (styles) =>
    //   styles.map((el) => (el.tagName === "LINK" ? el.href : el.outerHTML))
    // );

    // // 모든 이미지 URL 배열 추출
    // const imageUrls = await page.$$eval(
    //   imageSelector,
    //   (imgs) => imgs.map((img) => img.src).filter((src) => src) // src가 있는 경우만 필터링
    // );

    // // 각 이미지를 다운로드하여 데이터 배열에 저장
    // const images = [];
    // for (const imageUrl of imageUrls) {
    //   try {
    //     const response = await page.goto(imageUrl);
    //     const buffer = await response.body();
    //     const contentType = response.headers()["content-type"];
    //     images.push({ url: imageUrl, contentType, buffer });
    //   } catch (error) {
    //     console.error(`이미지 다운로드 실패: ${imageUrl}`, error.message);
    //   }
    // }

    // // HTML, CSS, 이미지 데이터를 반환
    // res.status(200).json({
    //   html: cleanedHTML,
    //   css: styles,
    //   images: images.map((img) => ({
    //     url: img.url,
    //     contentType: img.contentType,
    //     base64: img.buffer.toString("base64"), // Base64 인코딩된 이미지 데이터
    //   })),
    // });

    // 캡처된 이미지 반환
    res.status(200).json({
      image: screenshotBuffer.toString("base64"), // Base64로 인코딩된 스크린샷
    });

    // 브라우저 닫기
    await browser.close();
  } catch (error) {
    console.error("페이지 크롤링 중 오류 발생:", error.message);
    res.status(500).json({ error: "크롤링 중 문제가 발생했습니다. 다시 시도해 주세요." });
  } finally {
    if (browser) {
      await browser.close();
    }
  }
});

app.post("/notion", async (req, res) => {
  const { db, popupData, url, thumbnail, username } = req.body;

  const playground = process.env.DB_PLAY;
  const gallery = process.env.DB_GALL;
  const user = process.env.DB_USER;

  let database;
  switch (db) {
    case "playground":
      database = playground;
      break;
    case "gallery":
      database = gallery;
      break;
    case "user":
      database = user;
      break;
    default:
      return res.status(400).json({ success: false, error: `Unknown database: ${db}` });
  }

  try {
    // 데이터베이스에서 가장 최근에 생성된 페이지를 가져와서 순번을 계산
    const pages = await notion.databases.query({
      database_id: database,
      sorts: [
        {
          property: "Index",
          direction: "descending",
        },
      ],
      page_size: 1, // 가장 최근 페이지 1개만 가져오기
    });

    // 가장 최근 페이지의 Index 값 가져오기 (없으면 0으로 설정)
    const lastIndex = pages.results.length > 0 ? pages.results[0].properties.Index.number : 0;

    // 새로운 순번 계산
    const newIndex = lastIndex + 1;

    // URL과 Thumbnail 청크를 동적으로 추가할 children 배열 생성
    const children = [
      {
        object: "block",
        type: "paragraph",
        paragraph: {
          rich_text: [
            {
              type: "text",
              text: {
                content: `Desc: ${popupData.popupDesc}`,
              },
            },
          ],
        },
      },
    ];

    // URL 청크를 2000자 이하로 나누어 추가
    if (url && url.length > 0) {
      const chunkedUrl = splitText(url, 1980);
      chunkedUrl.forEach((chunk) => {
        children.push({
          object: "block",
          type: "paragraph",
          paragraph: {
            rich_text: [
              {
                type: "text",
                text: {
                  content: `URL: ${chunk}`,
                },
              },
            ],
          },
        });
      });
    }

    // 이미지 청크를 2000자 이하로 나누어 추가
    if (thumbnail && thumbnail.length > 0) {
      const chunkedImg = splitText(thumbnail, 1980);
      chunkedImg.forEach((chunk) => {
        children.push({
          object: "block",
          type: "paragraph",
          paragraph: {
            rich_text: [
              {
                type: "text",
                text: {
                  content: `Thumbnail: ${chunk}`,
                },
              },
            ],
          },
        });
      });
    }

    // 새 페이지 생성
    const response = await notion.pages.create({
      parent: { database_id: database },
      properties: {
        // 제목 (타입: title)
        Title: {
          title: [
            {
              type: "text",
              text: {
                content: popupData.popupTitle,
              },
            },
          ],
        },
        // Username (타입: text)
        Username: {
          rich_text: [{ text: { content: username } }],
        },
        Index: {
          number: newIndex, // Index 속성은 숫자(Number)로 설정
        },
      },
      children: children, // 동적으로 생성된 children을 사용
    });

    res.status(200).json({ success: true, data: response });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// 텍스트를 2000자 이하로 쪼개는 함수
function splitText(text, maxLength) {
  const chunks = [];
  let i = 0;
  while (i < text.length) {
    chunks.push(text.slice(i, i + maxLength));
    i += maxLength;
  }
  return chunks;
}

app.get("/notion", async (req, res) => {
  const { username } = req.query; // 쿼리 파라미터로 Username 가져오기

  try {
    // 데이터베이스에서 모든 페이지 가져오기
    const pages = await notion.databases.query({
      database_id: process.env.DB_PLAY, // playground 데이터베이스 ID
    });

    // Username 필터 적용
    const filteredPages = pages.results.filter((page) => {
      const pageUsername = page.properties.Username?.rich_text[0]?.text?.content || "";
      return username ? pageUsername === username : true; // username이 제공되었으면 필터
    });

    const pagesWithChildren = await Promise.all(
      filteredPages.map(async (page) => {
        const children = await notion.blocks.children.list({
          block_id: page.id, // 페이지 ID
        });

        return {
          ...page,
          children: children.results,
        };
      })
    );

    res.status(200).json(pagesWithChildren);
  } catch (error) {
    console.error("Error fetching Notion data:", error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// 서버 시작
const PORT = 3001;
app.listen(PORT, () => {
  console.log(`서버가 실행 중입니다: http://localhost:${PORT}`);
});
