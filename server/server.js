const express = require("express");
const { chromium } = require("playwright");
const cors = require("cors");
// const path = require("path");
// const { dirname } = require("path");
// const { fileURLToPath } = require("url");


const options = {
  origin: "*", // 모든 출처 허용
  methods: ["GET", "POST"], // 허용할 HTTP 메서드
  allowedHeaders: ["Content-Type"], // 허용할 헤더
};

const app = express();
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
    await browser.close();
  }
});

// 서버 시작
const PORT = 3001;
app.listen(PORT, () => {
  console.log(`서버가 실행 중입니다: http://localhost:${PORT}`);
});
