## Create Next.js For Meeting-Room

```bash
# D:/code> 
npx create-next-app@latest meeting-room --use-npm
√ Would you like to use TypeScript? ... No
√ Which linter would you like to use? » Biome
√ Would you like to use Tailwind CSS? ... Yes
√ Would you like your code inside a `src/` directory? ... Yes
√ Would you like to use App Router? (recommended) ... Yes
√ Would you like to use Turbopack? (recommended) ... Yes
√ Would you like to customize the import alias (`@/*` by default)? ... Yes
√ What import alias would you like configured? ... @/*
# Done Get Project
Creating a new Next.js app in D:\BeeData\code-dev\meeting-room.
# go to Project next.js
cd meeting-room
```
## Getting More Library

```bash
# 1. Install Component UI Framework as RizzUI https://www.rizzui.com
npm install @mui/material @emotion/react @emotion/styled @mui/icons-material

#@mui/material → core MUI components
#@emotion/react & @emotion/styled → required by MUI for styling
#@mui/icons-material → MUI icons
# Other Component UI Framework AntDesign, PrimeReact, MUI as 
#https://ant.design
#https://primereact.org
#https://mui.com
# 2. Install icon
npm install @heroicons/react lucide-react lucide-react
# 3. install advance CSS as SCSS
npm install sass
```

## Getting Started

First, run the development server:

```bash
npm run dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file

## Learn More

Notic:
- Custome Project as Much as You want by this starter Theme Project by ຈານ Bee
- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.


## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
