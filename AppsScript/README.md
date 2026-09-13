# 後台設定步驟（只需做一次）

1. 建一個新的 Google Sheet，第一個工作表改名為 `Products`。
2. 第一列（標題列）依序填入：`ID | 名稱 | 價格 | 描述 | 圖片網址 | 上架`
3. 選單「擴充功能 > Apps Script」，把 `Code.gs` 的內容整個貼進去（覆蓋預設內容）。
4. 把程式碼裡的 `CHANGE_ME_TO_A_RANDOM_STRING` 換成你自己設的一組亂數密碼，例如 `Eh2026Shop!9x`，並記下來（等一下要填到 admin.html）。
5. 點右上角「部署 > 新增部署作業」：
   - 類型選「網頁應用程式」
   - 「執行身份」選你自己
   - 「誰可以存取」選「所有人」
   - 部署後會拿到一個網址，例如 `https://script.google.com/macros/s/xxxxx/exec`
6. 把這個網址填入 `index.html` 和 `admin.html` 裡的 `API_URL` 變數。
7. 之後在 `admin.html` 表單新增商品，或直接在 Sheet 手動加一列，都會顯示在 `index.html` 上。

圖片網址建議：把圖片上傳到 Google Drive，右鍵「共用 > 知道連結的使用者可查看」，再用連結格式
`https://drive.google.com/uc?export=view&id=你的檔案ID`
（檔案ID是分享連結裡 `/d/` 和 `/view` 中間那段）。也可以直接用任何公開圖片網址。
