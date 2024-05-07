# UniGuesser - Next.js Project

This Next.js project is bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app). It's set up to work well in VSCode but is compatible with any IDE.

## Prerequisites

Before you start, make sure you have Node.js installed on your computer. You can download and install it from [nodejs.org](https://nodejs.org/).

## Setting Up Your Development Environment

1. **Open the project in your IDE:**
   - Make sure to open the terminal in the project directory (typically named `uniguesser-next`).

2. **Install dependencies:**
   - Run the following command to install the necessary Node packages:
     ```bash
     npm install
     ```

3. **Start the development server:**
   - You can use any of the following commands, depending on your package manager:
     ```bash
     npm run dev
     yarn dev
     pnpm dev
     bun dev
     ```
   - Visit [http://localhost:3000](http://localhost:3000) in your browser to see the project live.

## Learning Resources

- **[Next.js Documentation](https://nextjs.org/docs)** - Learn about Next.js features and API.
- **[Learn Next.js](https://nextjs.org/learn)** - An interactive tutorial for beginners.
- **[Learn React](https://react.dev/learn)** - Essential for understanding the underlying library.
- **[Typescropt](https://www.typescriptlang.org/docs/handbook/jsx.html)** --Typesaftey
- **[Tailwind](https://v2.tailwindcss.com/docs)** --styling
## Project Structure Overview

Here’s a brief overview of the key directories and files in this project:

- **`public/`** - Contains all static resources like images.
- **`app/`** - The main project directory with several important subdirectories:
  - **`components/`** - Reusable UI pieces, similar to classes in Java, used across different pages.
  - **`types/`** - If you're using TypeScript, this is where you can define types for your components.
  - **`globals.css`** - For traditional CSS styling; alternatively, consider using [Tailwind CSS](https://v2.tailwindcss.com/docs) for more convenient styling.
  - **`layout.tsx`** - The root component that wraps other page contents.
  - **`page.tsx`** - Represents the homepage or other specific pages of your site.

### Example of a Simple Component in TypeScript

Here's a basic example of a React component in TypeScript, which you can expand and include in any page:

```tsx
export default function Hi() {
  // JavaScript function to find maximum in an array
  const findMax = (arr: number[]) => {
    return Math.max(...arr);
  };

  // Example array and result calculation
  const result = findMax([1, 2, 3, 4, 5]);

  // The component returns HTML and can utilize JavaScript results
  return (
    <div>Hello, this is a simple component.</div>
    <div>Maximum value: {result}</div>
  );
}
```

Creating Additional Pages
To add a new page (e.g., www.domain.com/impressum):

1. Create a new directory under app/ with the desired path name (impressum).
2. Inside this directory, create a page.tsx file.
3. Import any components you need and structure your page as follows:

import Header from "../../components/utils/Header";
import Footer from "../../components/utils/Footer";

```export default function ImpressumPage() {
  return (
    <main className="flex min-h-screen flex-col items-center w-full">
      <Header />
      <h1>Impressum</h1>
      <Footer />
    </main>
  );
}
```

## Conclusion
Start by exploring the given examples and modify them according to your project needs. Watching some introductory YouTube videos on React and Next.js can be very helpful. Remember, practice is key when learning new technologies!
