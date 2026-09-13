// Google Apps Script Web App backend for the product-showcase site.
// Bind this script to your Google Sheet (Extensions > Apps Script).
// Sheet must have a tab named "Products" with header row:
// ID | 名稱 | 價格 | 描述 | 圖片網址 | 上架

const SHEET_NAME = 'Products';
const SECRET = 'CHANGE_ME_TO_A_RANDOM_STRING'; // must match admin.html

function doGet(e) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEET_NAME);
  const rows = sheet.getDataRange().getValues();
  const [header, ...data] = rows;
  const products = data
    .filter(r => r[0] !== '') // skip blank rows
    .map(r => ({
      id: r[0],
      name: r[1],
      price: r[2],
      description: r[3],
      image: r[4],
      onShelf: r[5] === true || r[5] === 'TRUE' || r[5] === '上架',
    }))
    .filter(p => p.onShelf);

  return ContentService
    .createTextOutput(JSON.stringify({ products }))
    .setMimeType(ContentService.MimeType.JSON);
}

function doPost(e) {
  const body = JSON.parse(e.postData.contents);
  if (body.token !== SECRET) {
    return ContentService
      .createTextOutput(JSON.stringify({ error: 'unauthorized' }))
      .setMimeType(ContentService.MimeType.JSON);
  }

  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEET_NAME);
  const lastRow = sheet.getLastRow();
  const nextId = lastRow; // header is row 1, so lastRow count works as running id
  sheet.appendRow([
    nextId,
    body.name,
    body.price,
    body.description,
    body.image,
    true,
  ]);

  return ContentService
    .createTextOutput(JSON.stringify({ ok: true }))
    .setMimeType(ContentService.MimeType.JSON);
}
