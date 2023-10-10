<h1 align="center">
  <img
      src="https://readme-typing-svg.demolab.com?font=Roboto+Slab&color=9f4bff&size=30&center=true&vCenter=true&width=450&lines=Vite++React++TailwindCSS+Starter;"
      alt="Vite + React + TailwindCSS Starter"
  />
</h1>
  <br/>

<div align="center">
  <img
    alt="GitHub repo size"
    src="https://img.shields.io/github/repo-size/purnasth/vite-react-tailwind-starter?color=9f4bff&logo=github&style=for-the-badge&logoColor=9f4bff"
  />
  <img
    alt="GitHub forks"
    src="https://img.shields.io/github/forks/purnasth/vite-react-tailwind-starter?color=9f4bff&logo=github&style=for-the-badge&logoColor=9f4bff"
  />
  <img
    alt="GitHub Repo stars"
    src="https://img.shields.io/github/stars/purnasth/vite-react-tailwind-starter?color=9f4bff&logo=github&style=for-the-badge&logoColor=9f4bff"
  />
  <img
    alt="Last commit"
    src="https://img.shields.io/github/last-commit/purnasth/vite-react-tailwind-starter?color=9f4bff&logo=git&logoColor&style=for-the-badge"
  />
  <img
    alt="Commit activity"
    src="https://img.shields.io/github/commit-activity/m/purnasth/vite-react-tailwind-starter?color=9f4bff&logo=git&logoColor&style=for-the-badge"
  />
</div>
<br />

<p align="center">This template provides a stater setup to get React working in Vite with TailwindCSS installed.</p>


---
## Getting Started`*`

### 1. Clone this repo`*`

```sh
git clone https://github.com/purnasth/vite-react-tailwind-starter.git
```

### 2. Install and Run`*`

Run the following commands in your terminal:

```sh
npm install
npm run dev
```

- <b><em>`npm install`</em></b> to install the node_modules on your local repo which has been .gitignore in this github repo.
- <b><em>`npm run dev`</em></b> for running this in your browser, by default it opens in port http://localhost:5173/

------
## Codes Used

<b>`NOTE:`
<em>
Please disregard these below provided codes if you've already completed the first two steps of the "Getting Started" section. It's only meant for those interested in manually creating a Vite + React project with TailwindCSS.
</em>
</b>

### Install vite + react

```sh
npm create vite@latest ./
# Select a framework: React
# Select a variant: JavaScript + SWC
npm install
npm run dev
```

### Install tailwindCSS

```sh
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

### Replace <em>`tailwind.config.js`</em> inner codes with

```
/** @type {import('tailwindcss').Config} \*/
export default {
content: [
"./index.html",
"./src/**/\*.{js,ts,jsx,tsx}",
],
theme: {
extend: {},
},
plugins: [],
}
```

### Paste these lines in <em>`index.css`</em>

```
@tailwind base;
@tailwind components;
@tailwind utilities;
```

### Import react icons

```sh
npm install react-icons --save
```

### Import axios

```sh
npm install axios
```
---
<!--

<details>
<summary><h4>Install vite + react</h4></summary>
<br/>
<p>
npm create vite@latest ./
<br/>
Select a framework: React
<br/>
Select a variant: JavaScript + SWC
<br/>
npm install
<br/>
npm run dev
</p>
<br/>
</details>
<details>
<summary><h4>Install tailwindCSS</h4></summary>
<br/>
<p align="center">
npm install -D tailwindcss postcss autoprefixer
<br/>
npx tailwindcss init -p
</p>
<br/>
<br/>
<h4 align="center">Replace tailwind.config.js inner codes with</h4>
<br/>
<p align="center">
/** @type {import('tailwindcss').Config} \*/ <br/>
export default { <br/>
content: [ <br/>
"./index.html", <br/>
"./src/**/\*.{js,ts,jsx,tsx}", <br/>
], <br/>
theme: { <br/>
extend: {}, <br/>
}, <br/>
plugins: [], <br/>
} <br/>
</p>

<br/>
<h4 align="center">Paste these lines in index.css</h4>
<br/>
<br/>
<p align="center">
@tailwind base;<br/>
@tailwind components;<br/>
@tailwind utilities;<br/>
</p>

</details>

<details>
<summary><h4>Import react icons</h4></summary>
<br/>
<p align="center">
npm install react-icons --save</p>

<br/>
</details>

<details>
<summary><h4>Import axios</h4></summary>
<br/>
<p align="center">
npm install axios
</p>

<br/>
</details> -->



⭐ Star this repo on GitHub — it helps!