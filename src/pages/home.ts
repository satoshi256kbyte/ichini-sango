import { html } from 'hono/html';

export const homePage = () => {
  return html`
    <div class="home-page">
      <h2>ようこそ、いちにさんGo へ！</h2>
      <p>
        このサイトは AWS Lambda と Hono、TypeScript を使って構築された MPA（マルチページアプリケーション）です。
        1つの Lambda 関数で複数のページを提供しています。
      </p>
      <div class="features">
        <div class="feature">
          <h3>🚀 高速レスポンス</h3>
          <p>Hono フレームワークによる高速なレスポンスを実現しています。</p>
        </div>
        <div class="feature">
          <h3>🛠 TypeScript</h3>
          <p>型安全なコードで堅牢なアプリケーションを構築。</p>
        </div>
        <div class="feature">
          <h3>☁️ サーバーレス</h3>
          <p>AWS Lambda でスケーラブルなアプリケーションを実現。</p>
        </div>
      </div>
    </div>
  `;
};
