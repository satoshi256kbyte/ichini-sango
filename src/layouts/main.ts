import { html } from 'hono/html';

interface LayoutProps {
  title: string;
  content: any; // HtmlEscapedString を any に変更
}

export const mainLayout = ({ title, content }: LayoutProps) => {
  return html`
    <!DOCTYPE html>
    <html lang="ja">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>${title} | いちにさんGo</title>
        <link rel="stylesheet" href="/styles.css" />
      </head>
      <body>
        <header>
          <div class="container">
            <h1>いちにさんGo</h1>
            <nav>
              <ul>
                <li><a href="/">ホーム</a></li>
                <li><a href="/about">このサイトについて</a></li>
                <li><a href="/contact">お問い合わせ</a></li>
              </ul>
            </nav>
          </div>
        </header>
        
        <main>
          <div class="container">
            ${content}
          </div>
        </main>
        
        <footer>
          <div class="container">
            <p>&copy; ${new Date().getFullYear()} いちにさんGo. All rights reserved.</p>
          </div>
        </footer>
      </body>
    </html>
  `;
};
