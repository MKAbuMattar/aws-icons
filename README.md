<div align="center">
  <a href="https://aws-icon.vercel.app/">
    <img src="https://raw.githubusercontent.com/MKAbuMattar/aws-icons/main/src/assets/aws-icons.svg" alt="AWS Icons Logo" height="140" />
  </a>

  <h1>AWS Icons</h1>

<a href="https://aws-icon.vercel.app/">https://aws-icon.vercel.app/</a>

  <br/>

  <p>AWS Icons, a Icons library for AWS icons based on the official AWS icon set (SVG), Build from <a href="https://aws.amazon.com/architecture/icons/">AWS Architecture Icons</a></p>
</div>

<div align="center">
  <a href="https://www.npmjs.com/package/aws-icons" target="_blank">
    <img src="https://img.shields.io/badge/npm-%23CB3837.svg?style=for-the-badge&logo=npm&logoColor=white" alt=""/>
  </a>

  <a href="https://github.com/MKAbuMattar/aws-icons" target="_blank">
    <img src="https://img.shields.io/badge/github-%23181717.svg?style=for-the-badge&logo=github&logoColor=white" alt=""/>
  </a>

  <a href="https://github.com/MKAbuMattar/aws-icons/releases">
    <img alt="GitHub release" src="https://img.shields.io/github/v/release/MKAbuMattar/aws-icons?color=%23d52128&label=Latest%20release&style=for-the-badge" />
    </a>

  <a href="/LICENSE">
    <img alt="GitHub" src="https://img.shields.io/github/license/MKAbuMattar/aws-icons?color=%23d52128&style=for-the-badge">
  </a>

  <a href="https://github.com/MKAbuMattar/aws-icons/stargazers">
    <img alt="GitHub Repo stars" src="https://img.shields.io/github/stars/MKAbuMattar/aws-icons?color=%23d52128&label=github%20stars&style=for-the-badge">
  </a>
</div>

## 📦 Installation

```bash
# npm
npm install --save aws-icons

# yarn
yarn add aws-icons

# pnpm
pnpm add aws-icons
```

## CDN

```html
<!-- unpkg -->
<img
  src="https://unpkg.com/aws-icons@latest/icons/ICON_SVG_NAME.svg"
  alt="AWS Icons"
/>

<!-- jsdelivr -->
<img
  src="https://cdn.jsdelivr.net/gh/mkabumattar/aws-icons@latest/icons/ICON_SVG_NAME.svg"
  alt="AWS Icons"
/>
```

## 📖 Usage

### React

```tsx
import ArchitectureAmazonEC2 from 'aws-icons/icons/ArchitectureAmazonEC2.svg';

const App = () => {
  return (
    <div>
      <img src={ArchitectureAmazonEC2} alt="Architecture Amazon EC2" />
    </div>
  );
};

export default App;
```

### React/Next.js

```tsx
import ArchitectureAmazonEC2 from 'aws-icons/icons/ArchitectureAmazonEC2.svg';

const App = () => {
  return (
    <div>
      <img src={ArchitectureAmazonEC2SVG.src} alt="Architecture Amazon EC2" />
    </div>
  );
};

export default App;
```

### Vue.js

```vue
<script setup>
import ArchitectureAmazonEC2 from 'aws-icons/icons/ArchitectureAmazonEC2.svg';
</script>

<template>
  <ArchitectureAmazonEC2 />
</template>
```

### Svelte

```svelte
<script>
  import ArchitectureAmazonEC2 from 'aws-icons/icons/ArchitectureAmazonEC2.svg';
</script>

<main>
  <img src={ArchitectureAmazonEC2} alt="Architecture Amazon EC2" />
</main>
```

### Solid.js

```tsx
import type { Component } from 'solid-js';

import ArchitectureAmazonEC2 from 'aws-icons/icons/ArchitectureAmazonEC2.svg';

const App: Component = () => {
  return (
    <div>
      <img src={ArchitectureAmazonEC2} alt="Architecture Amazon EC2" />
    </div>
  );
};

export default App;
```

### HTML

```html
<!DOCTYPE html>

<html lang="en">
  <head>
    <title>AWS Icons</title>
  </head>

  <body>
    <img
      src="https://unpkg.com/aws-icons@latest/icons/ArchitectureAmazonEC2.svg"
      alt="Amazon EC2"
      type="image/svg+xml"
    />
  </body>
</html>
```

## 📝 License

his project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📜 Credits

- [AWS Architecture Icons](https://aws.amazon.com/architecture/icons/)
