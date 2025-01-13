const express = require("express");
const { chromium } = require("playwright");
const cors = require("cors");
const path = require("path");

const app = express();
app.use(cors());
app.use(express.json());

// 정적 파일 제공 설정 (CSS 파일 포함)
app.use(
  "/sri_css",
  express.static(path.join(__dirname, "public", "sri_css"), {
    setHeaders: (res, filePath) => {
      // CSS 파일의 MIME 유형을 명시적으로 설정
      if (filePath.endsWith(".css")) {
        res.setHeader("Content-Type", "text/css");
      }
    },
  })
);

// 외부 사이트 크롤링 API
app.post("/crawler", async (req, res) => {
  let { url } = req.body;

  const isValidUrl = (url) => {
    if (!/^https?:\/\//i.test(url)) {
      url.includes("localhost") ? (url = url) : (url = `https://${url}`);
    }
    return /^https?:\/\/\S+$/i.test(url) || /^localhost(:\d+)?(\/\S*)?$/i.test(url);
  };

  // URL 유효성 검사
  if (!url || !isValidUrl(url)) {
    return res.status(400).json({ error: "유효한 URL을 입력하세요." });
  }

  try {
    // https://가 없으면 자동으로 추가한 URL을 사용하도록 처리
    if (!/^https?:\/\//i.test(url)) {
      url.includes("localhost") ? (url = url) : (url = `https://${url}`);
    }

    // Playwright 브라우저 시작
    const browser = await chromium.launch({ headless: false }); // 헤드리스 모드
    const page = await browser.newPage();

    // 페이지 로드
    await page.goto(url, { waitUntil: "load", timeout: 10000, redirect: "follow" });

    // HTML 추출
    const html = await page.content();

    // 상대 경로로 되어있는 CSS 파일의 href를 절대 경로로 변환
    const baseUrl = new URL(url); // 기본 URL을 추출 (절대 경로로 변환할 때 사용)
    const staticHTML = html.replace(
      /href="\/(.*?)"/g,
      (match, p1) => `href="${baseUrl.origin}/${p1}"`
    );

    // CSS 추출
    const styles = await page.$$eval("link[rel='stylesheet'], style", (styles) =>
      styles.map((el) => (el.tagName === "LINK" ? el.href : el.outerHTML))
    );

    // JavaScript 스크립트 제거 (필요 시 클라이언트에서 선택적으로 처리 가능)
    const cleanedHTML = staticHTML.replace(/<script[\s\S]*?<\/script>/gi, ""); // 모든 script 태그 제거

    // 브라우저 닫기
    await browser.close();

    // HTML과 CSS 데이터를 반환
    res.status(200).json({ html: cleanedHTML, css: styles });
  } catch (error) {
    console.error("페이지 크롤링 중 오류 발생:", error.message);
    res.status(500).json({ error: "크롤링 중 문제가 발생했습니다. 다시 시도해 주세요." });
  }
});

// 서버 시작
const PORT = 3001;
app.listen(PORT, () => {
  console.log(`서버가 실행 중입니다: http://localhost:${PORT}`);
});
