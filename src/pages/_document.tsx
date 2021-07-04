import Document, { Html, Head, Main, NextScript, DocumentContext } from 'next/document'

class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    return await Document.getInitialProps(ctx)
  }

  render() {
    return (
      <Html lang="pt-BR">
        <Head>
          <meta name="viewport" content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no" />
          <meta name="description" content="LetMeAsk" />
          <meta name="keywords" content="Pergunta, conversa, Q&A, realtime, pessoas, dúvidas" />
          <meta name="application-name" content="LetmeAsk APP" />
          <meta name="apple-mobile-web-app-title" content="LetMeAsk" />
          <meta name="apple-mobile-web-app-capable" content="yes" />
          <meta name="apple-mobile-web-app-status-bar-style" content="default" />
          <meta name="mobile-web-app-capable" content="yes" />
          <meta name="msapplication-navbutton-color" content="#835afd" />
          <meta name="msapplication-TileColor" content="#fff" />
          <meta name="msapplication-TileImage" content="/assets/images/ms-icon-144x144.png" />
          <meta name="msapplication-config" content="/assets/images/browserconfig.xml" />
          <meta name="theme-color" content="#fff" />

          <link rel="apple-touch-icon" href="/assets/images/apple-icon.png" />
          <link rel="apple-touch-icon" sizes="76x76" href="/assets/images/apple-icon-76x76.png" />
          <link rel="apple-touch-icon" sizes="120x120" href="/assets/images/apple-icon-120x120.png" />
          <link rel="apple-touch-icon" sizes="152x152" href="/assets/images/apple-icon-152x152.png" />
          <link rel="apple-touch-icon" sizes="180x180" href="/assets/images/apple-icon-180x180.png" />

          <link rel="icon" sizes="192x192" href="/assets/images/android-icon-192x192.png" />
          <link rel="icon" sizes="144x144" href="/assets/images/android-icon-144x144.png" />

          <link rel="icon" type="image/png" sizes="32x32" href="/assets/images/favicon-32x32.png" />
          <link rel="icon" type="image/png" sizes="16x16" href="/assets/images/favicon-16x16.png" />
          <link rel="icon" type="image/png" sizes="96x96" href="/assets/images/favicon-96x96.png" />
          <link rel="shortcut icon" href="/assets/images/favicon.ico" />
          <link rel="mask-icon" color="#5bbad5" href="/assets/images/safari-pinned-tab.svg" />
          <link rel="manifest" href="/manifest.json" />

          {/* Redes sociais */}
          <meta property="og:url" content="https://letmeask-e1f94.web.app/" />
          <meta property="og:type" content="website" />
          <meta property="og:title" content="Letmeask" />
          <meta property="og:site_name" content="Letmeask" />
          <meta property="og:description" content="Crie sala de perguntas e respostas ao vivo" />
          <meta property="og:image" content="https://letmeask-e1f94.web.app/assets/images/letmeask-rede.jpg" />
          <meta property="og:image:secure_url" content="https://letmeask-e1f94.web.app/assets/images/letmeask-rede.jpg" />
          <meta property="og:image:alt" content="Thumbnail" />
          <meta property="og:image:type" content="image/jpg" />
          <meta property="og:image:width" content="1200" />
          <meta property="og:image:height" content="630" />

          <meta name="twitter:title" content="Letmeask" />
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:site" content="Letmeask" />
          <meta name="twitter:creator" content="@aln_maurofranco" />
          <meta name="twitter:image" content="https://letmeask-e1f94.web.app/assets/images/letmeask-rede.jpg" />
          <meta name="twitter:image:src" content="https://letmeask-e1f94.web.app/assets/images/letmeask-rede.jpg" />
          <meta name="twitter:image:alt" content="Thumbnail" />
          <meta name="twitter:image:width" content="1200" />
          <meta name="twitter:image:height" content="620" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument
