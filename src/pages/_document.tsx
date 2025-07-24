import Document, { Html, Head, Main, NextScript } from "next/document"

export default class MyDocument extends Document {
  render() {
    return (
      <Html lang="en" className="scroll-smooth">
        <Head>
          <meta charSet="utf-8" />
          <script
            dangerouslySetInnerHTML={{
              __html: `
if (localStorage.theme === "light") {
  document.documentElement.classList.remove("dark")
  document.documentElement.style.setProperty("color-scheme", "light")
} else {
  document.documentElement.classList.add("dark")
  document.documentElement.style.setProperty("color-scheme", "dark")
}
          `,
            }}
          />
        </Head>
        <body className="h-dvh [&>div]:h-full">
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}
