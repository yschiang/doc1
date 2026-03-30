# Doc 1 — 高階設計

## 部署到 GitHub Pages

### 1. 建立 GitHub repo

```bash
cd doc1-site
git init
git add .
git commit -m "init"
git remote add origin git@github.com:<your-org>/<repo-name>.git
git push -u origin main
```

### 2. 改 base path

編輯 `vite.config.js`，把 `base` 改成你的 repo 名稱：

```js
base: '/<repo-name>/',
```

### 3. 啟用 GitHub Pages

GitHub repo → Settings → Pages → Source 選 **GitHub Actions**

### 4. Push

```bash
git add . && git commit -m "deploy" && git push
```

GitHub Actions 會自動 build + deploy。

URL：`https://<your-org>.github.io/<repo-name>/`

## 本地開發

```bash
npm install
npm run dev
```
