# GitHub Pages 更新流程

這份網站目前部署在：

`https://yueruiew5468-pixel.github.io/financialstatementanalysis/`

GitHub repository：

`https://github.com/yueruiew5468-pixel/financialstatementanalysis`

## Codex 更新方式

目前這個工作區可以由 Codex 直接更新 GitHub 上的文字檔，例如：

- `index.html`
- `style.css`
- `app.js`
- `analysis-engine.js`
- `README.md`
- `GITHUB_PAGES_DEPLOY.md`

更新後 GitHub Pages 會自動從 `main` branch 的 repository root 發布，通常等待 1-2 分鐘並重新整理頁面即可看到新版本。

## 本地 Git 設定

這個資料夾已接上 GitHub remote：

```bash
git remote -v
```

預期會看到：

```bash
origin  https://github.com/yueruiew5468-pixel/financialstatementanalysis.git
```

如果本機已設定 GitHub 帳號或 token，後續可用標準流程更新：

```bash
git status
git add app.js style.css index.html
git commit -m "Update financial analysis site"
git push origin main
```

如果 `git push` 要求帳號或 token，表示本機尚未完成 GitHub 認證；這種情況 Codex 仍可透過 GitHub connector 協助上傳文字檔。

## 手動備援方式

如果需要手動上傳，請使用：

`dist/github-pages-upload`

把該資料夾內的所有內容上傳到 GitHub repository 的最上層。重點是 `index.html` 必須在 repository root，不要把整個資料夾再包一層上傳。

## 發布後檢查

1. 打開 `https://yueruiew5468-pixel.github.io/financialstatementanalysis/`
2. 重新整理頁面，必要時清除快取
3. 檢查首頁是否載入公司資料
4. 檢查「AI 財報分析摘要」與「匯出分析報告」
5. 手機寬度檢查底部按鈕與摘要卡片是否正常
