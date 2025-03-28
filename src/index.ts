import { serve } from '@hono/node-server';
import { Hono } from 'hono';
import { handle } from 'hono/aws-lambda';
import type { APIGatewayProxyEvent, Context } from 'aws-lambda';
import { html } from 'hono/html';

// レイアウト関数
import { mainLayout } from './layouts/main';

// ページコンポーネント
import { homePage } from './pages/home';
import { aboutPage } from './pages/about';
import { contactPage } from './pages/contact';

// Honoのインスタンス作成
const app = new Hono();

// ルーティング設定
app.get('/', (c) => {
  return c.html(
    html`${mainLayout({
      title: 'ホーム',
      content: homePage()
    })}`
  );
});

app.get('/about', (c) => {
  return c.html(
    html`${mainLayout({
      title: 'このサイトについて',
      content: aboutPage()
    })}`
  );
});

app.get('/contact', (c) => {
  return c.html(
    html`${mainLayout({
      title: 'お問い合わせ',
      content: contactPage()
    })}`
  );
});

// スタイリングを追加
app.get('/styles.css', (c) => {
  return c.text(`
    :root {
      --primary-color: #3b82f6;
      --text-color: #333;
      --bg-color: #f9fafb;
    }
    
    body {
      font-family: "Helvetica Neue", Arial, sans-serif;
      line-height: 1.6;
      color: var(--text-color);
      background-color: var(--bg-color);
      margin: 0;
      padding: 0;
    }
    
    .container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 0 20px;
    }
    
    header {
      background-color: var(--primary-color);
      color: white;
      padding: 1rem 0;
    }
    
    nav ul {
      display: flex;
      list-style: none;
      margin: 0;
      padding: 0;
    }
    
    nav ul li {
      margin-right: 1.5rem;
    }
    
    nav a {
      color: white;
      text-decoration: none;
    }
    
    nav a:hover {
      text-decoration: underline;
    }
    
    main {
      padding: 2rem 0;
    }
    
    footer {
      background-color: #f1f5f9;
      padding: 1rem 0;
      text-align: center;
      border-top: 1px solid #e2e8f0;
      margin-top: 2rem;
    }

    .contact-form {
      margin-top: 2rem;
    }

    .form-group {
      margin-bottom: 1rem;
    }

    .form-group label {
      display: block;
      margin-bottom: 0.5rem;
      font-weight: bold;
    }

    .form-group input,
    .form-group textarea {
      width: 100%;
      padding: 0.5rem;
      border: 1px solid #ddd;
      border-radius: 4px;
    }

    .submit-btn {
      background-color: var(--primary-color);
      color: white;
      border: none;
      padding: 0.75rem 1.5rem;
      border-radius: 4px;
      cursor: pointer;
      font-size: 1rem;
    }

    .submit-btn:hover {
      opacity: 0.9;
    }

    .features {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 2rem;
      margin-top: 2rem;
    }

    .feature {
      padding: 1.5rem;
      background-color: white;
      border-radius: 8px;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    }

    .feature h3 {
      margin-top: 0;
    }
  `, {
    headers: {
      'Content-Type': 'text/css'
    }
  });
});

// Lambda関数のハンドラ
export const handler = handle(app);

// ローカル開発用のサーバー設定
if (process.env.NODE_ENV === 'development') {
  console.log('開発サーバーを起動します: http://localhost:3000');
  serve({
    fetch: app.fetch,
    port: 3000,
  });
}
