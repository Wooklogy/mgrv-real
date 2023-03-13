const fs = require("fs");
// const { mkdirp } = require("mkdirp");
const {
    loadSpreadsheet,
    NOT_AVAILABLE_CELL,
    columnHeaders,
    lngs,
    sheetId,
    sheetDocId,
    localesPath,
    ns,
} = require("./i18next.config");

async function fetchTranslationsFromSheetToJson(doc) {
    const sheet = doc.sheetsById[0];
    if (!sheet) {
        return {};
    }

    const lngsMap = {};
    const rows = await sheet.getRows();
    rows.forEach((row) => {
        const key = row[columnHeaders.key];
        lngs.forEach((lng) => {
            const translation = row[columnHeaders[lng]];

            if (!lngsMap[lng]) {
                lngsMap[lng] = {};
            }
            // NOT_AVAILABLE_CELL("_N/A") means no related language
            if (translation === NOT_AVAILABLE_CELL) {
                lngsMap[lng][key] = " "; // prevent to remove undefined value like ({"key": undefined})
            } else {
                lngsMap[lng][key] = translation || ""; // prevent to remove undefined value like ({"key": undefined})
            }
        });
    });

    return lngsMap;
}
// function checkAndMakeLocaleDir(dirPath, subDirs) {
//     return new Promise((resolve) => {
//         subDirs?.forEach((subDir, index) => {
//             mkdirp.sync(`${dirPath}/${subDir}`, (err) => {
//                 if (err) {
//                     throw err;
//                 }

//                 if (index === subDirs.length - 1) {
//                     resolve();
//                 }
//             });
//         });
//     });
// }
async function updateJsonFromSheet() {
    // await checkAndMakeLocaleDir(localesPath, lngs);

    const doc = await loadSpreadsheet();
    const lngsMap = await fetchTranslationsFromSheetToJson(doc);

    fs.readdir(localesPath, (error, lngs) => {
        if (error) {
            throw error;
        }

        lngs.forEach((lng) => {
            const localeJsonFilePath = `${localesPath}/${lng}/${ns}.json`;

            const jsonString = JSON.stringify(lngsMap[lng], null, 2);

            fs.writeFile(localeJsonFilePath, jsonString, "utf8", (err) => {
                if (err) {
                    throw err;
                }
            });
        });
    });

    console.log("번역 시트 업데이트가 완료되었습니다. ");
}

updateJsonFromSheet();
