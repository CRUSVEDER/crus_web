import Head from "next/head"
import Script from "next/script"
import { useRouter } from "next/router"

const Meta = () => {
  const router = useRouter()

  return (
    <>
      <Head>
        <link rel="apple-touch-icon" sizes="180x180" href="/favicon/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon/favicon-16x16.png" />
        <link rel="manifest" href="/favicon/site.webmanifest" />
        <link rel="mask-icon" href="/favicon/safari-pinned-tab.svg" color="#5bbad5" />
        <link rel="shortcut icon" href="/favicon/favicon.ico" />
        <meta name="msapplication-TileColor" content="#d9d9d9" />
        <meta name="msapplication-config" content="/favicon/browserconfig.xml" />
        <meta name="theme-color" content="#ffffff" />

        <link rel="alternate" type="application/rss+xml" href="api/rss" />
        <meta name="description" content={`CRUSVEDER`} />

        <meta property="og:type" content="profile" />
        <meta property="og:title" content="CRUSVEDER" />
        <meta property="og:description" content="CyberSecurity Professional" />
        <meta property="og:url" content={`https://crus.live/${router.pathname}`} />
        <meta property="profile:first_name" content="Yash" />
        <meta property="profile:last_name" content="Gholap" />
        <meta property="profile:username" content="CRUSVEDER" />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content="CRUSVEDER" />
        <meta name="twitter:site" content="@CRUSVEDER" />
        <meta name="darkreader-lock" />
        <title>Yash.</title>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "http://schema.org/",
              "@type": "Person",
              name: "Yash Gholap",
              image: "https://crus.live/assets/img/avatar.png",
              url: "https://crus.live/",
              jobTitle: "CyberSecurity Professional",
              sameAs: [
                "https://github.com/CRUSVEDER",
              ],
            }),
          }}
        />
      </Head>
      <Script src="/r.js" data-site-id="1" defer></Script>
    </>
  )
}

export default Meta
