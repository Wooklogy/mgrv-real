const { GoogleSpreadsheet } = require("google-spreadsheet");
const path = require("path");
const creds = require("./.credentials/credentials.json");

// 사용할 언어
const lngs = ["ko-KR", "en-US"];
// 번역 파일이름
const ns = "common";
// 시트아이디
const sheetDocId = "1K9cTuThqKDJOGPQMqLeLrAo0CwlKAGPvuxx6Uu0ctlA";
const sheetId = "0";
const NOT_AVAILABLE_CELL = "_N/A";
const localesPath = path.join(process.cwd(), "public", "locales");
const columnHeaders = {
  key: "key",
  "ko-KR": "ko-KR",
  "en-US": "en-US",
};

async function loadSpreadsheet() {
  // spreadsheet key is the long id in the sheets URL
  const doc = new GoogleSpreadsheet(sheetDocId);

  // load directly from json file if not in secure environment
  await doc.useServiceAccountAuth(creds);

  await doc.loadInfo(); // loads document properties and worksheets

  return doc;
}

module.exports = {
  lngs,
  ns,
  loadSpreadsheet,
  NOT_AVAILABLE_CELL,
  sheetDocId,
  sheetId,
  columnHeaders,
  localesPath,
};
