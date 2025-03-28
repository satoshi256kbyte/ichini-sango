import { html } from 'hono/html';

export const aboutPage = () => {
  return html`
    <div class="about-page">
      <h2>このサイトについて</h2>
      <p>
        「いちにさんGo」は、最新のウェブ技術を活用したサーバーレスWebアプリケーションです。
      </p>
      
      <h3>技術スタック</h3>
      <ul>
        <li><strong>AWS Lambda</strong>: サーバーレスコンピューティングサービス</li>
        <li><strong>Hono</strong>: 軽量で高速なWebフレームワーク</li>
        <li><strong>TypeScript</strong>: 静的型付けによる安全なJavaScript</li>
      </ul>
      
      <h3>アーキテクチャ</h3>
      <p>
        このウェブサイトは1つのAWS Lambda関数で動作しています。Honoフレームワークによるルーティングで
        複数のページを提供し、MPAとして機能します。HTMLはサーバーサイドでレンダリングされ、クライアントに
        配信されます。
      </p>
      
      <h3>パフォーマンス</h3>
      <p>
        Honoフレームワークの高速な処理と、AWS Lambdaの柔軟なスケーリングにより、
        高いパフォーマンスとコスト効率を実現しています。
      </p>
    </div>
  `;
};
