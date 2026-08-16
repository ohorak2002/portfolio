# Deploying to GitHub Pages

The repo is already set up — a workflow at `.github/workflows/deploy.yml`
publishes the site every time you push to `main`. You just need to create the
GitHub repo and turn Pages on.

## 1. Create the repository on GitHub

Go to https://github.com/new and create an **empty** repo (no README, no
`.gitignore`, no licence — the local folder already has everything).

Two naming options:

- **`<your-username>.github.io`** → site lives at `https://<username>.github.io`
- **anything else**, e.g. `portfolio` → site lives at `https://<username>.github.io/portfolio`

The first one is the cleaner URL. Pick that unless you have a reason not to.

## 2. Push the code

Run these from the `portfolio` folder, replacing the URL with your own:

```bash
git remote add origin https://github.com/YOUR-USERNAME/YOUR-REPO.git
```

```bash
git branch -M main
```

```bash
git push -u origin main
```

## 3. Turn on Pages

1. Open your repo on GitHub
2. **Settings** → **Pages** (left sidebar)
3. Under **Source**, choose **GitHub Actions** — *not* "Deploy from a branch"
4. That's it. No other settings.

## 4. Watch it deploy

Go to the **Actions** tab. The "Deploy to GitHub Pages" run takes about 40
seconds. When it's green, your site is live at the URL shown in the run summary.

## Making changes after that

```bash
git add -A
```

```bash
git commit -m "Update projects"
```

```bash
git push
```

Every push to `main` redeploys automatically. Give it a minute, then hard-refresh
(<kbd>Ctrl+Shift+R</kbd>) if you still see the old version.

---

## Optional: a custom domain

If you own a domain (e.g. `orenhorak.com`):

1. Create a file called `CNAME` in the repo root containing only your domain:
   ```
   orenhorak.com
   ```
2. At your domain registrar, add these DNS records:

   | Type | Name | Value |
   |---|---|---|
   | A | @ | 185.199.108.153 |
   | A | @ | 185.199.109.153 |
   | A | @ | 185.199.110.153 |
   | A | @ | 185.199.111.153 |
   | CNAME | www | `YOUR-USERNAME.github.io` |

3. Back in **Settings → Pages**, enter the domain and tick **Enforce HTTPS**
   once the certificate is issued (can take up to an hour).

## Troubleshooting

**Actions tab shows a red X** — click the failed run and read the error. The
most common cause is Pages still being set to "Deploy from a branch" instead of
"GitHub Actions" (step 3).

**404 after a successful deploy** — you're probably at the wrong URL. Check
Settings → Pages for the exact address.

**Fonts or styles missing** — check that `css/` and `js/` were actually
committed: `git status` should show nothing untracked.

**Site looks stale** — GitHub Pages caches hard. Hard-refresh, or open the site
in a private window to confirm.
