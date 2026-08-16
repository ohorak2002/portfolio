# Deploying to GitHub Pages

Your GitHub account is **ohorak2002**, and you already have a site at
`http://ohorak2002.github.io/`. That means the repo `ohorak2002.github.io`
probably already exists.

> **⚠️ Read this first.** The steps below *replace* whatever is currently at
> `ohorak2002.github.io`. If there's something there you want to keep, back it
> up before you push. If the old site was just a placeholder, carry on.

## Option A — you want to replace the existing site (most likely)

Point this folder at your existing repo and force the first push:

```bash
git remote add origin https://github.com/ohorak2002/ohorak2002.github.io.git
```

```bash
git branch -M main
```

Look at what's already there before you overwrite it:

```bash
git fetch origin && git log --oneline origin/main
```

If you're happy to replace it:

```bash
git push -u origin main --force
```

## Option B — keep the old site, put this one at a sub-path

Create a **new** empty repo called `portfolio` at
https://github.com/new, then:

```bash
git remote add origin https://github.com/ohorak2002/portfolio.git
```

```bash
git branch -M main
```

```bash
git push -u origin main
```

Your site will live at `https://ohorak2002.github.io/portfolio`.

## Turn on Pages

1. Open the repo on GitHub
2. **Settings** → **Pages**
3. Under **Source**, choose **GitHub Actions** — *not* "Deploy from a branch"

That's the one step people get wrong. The workflow at
`.github/workflows/deploy.yml` handles the rest.

## Watch it deploy

The **Actions** tab shows the run. It takes about 40 seconds. When it's green,
your site is live at the URL in the run summary.

## Making changes later

```bash
git add -A
```

```bash
git commit -m "Update projects"
```

```bash
git push
```

Every push to `main` redeploys. Give it a minute, then hard-refresh
(<kbd>Ctrl+Shift+R</kbd>) if you still see the old version.

---

## Optional: a custom domain

If you buy a domain (e.g. `orenhorak.com`):

1. Create a file called `CNAME` in the repo root containing only your domain
2. At your registrar, add these DNS records:

   | Type | Name | Value |
   |---|---|---|
   | A | @ | 185.199.108.153 |
   | A | @ | 185.199.109.153 |
   | A | @ | 185.199.110.153 |
   | A | @ | 185.199.111.153 |
   | CNAME | www | `ohorak2002.github.io` |

3. In **Settings → Pages**, enter the domain and tick **Enforce HTTPS** once
   the certificate is issued (can take up to an hour).

## Troubleshooting

**Red X in Actions** — click the failed run. Usually Pages is still set to
"Deploy from a branch" instead of "GitHub Actions".

**404 after a green deploy** — check Settings → Pages for the exact URL.

**Photo doesn't load** — confirm `assets/profile.jpg` was committed:
`git ls-files assets` should list it.

**Site looks stale** — GitHub Pages caches hard. Hard-refresh, or open it in a
private window.
