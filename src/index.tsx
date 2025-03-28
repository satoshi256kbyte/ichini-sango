/** @jsx jsx */
import { jsx } from 'hono/jsx'
import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import { handle } from 'hono/aws-lambda'
import type { APIGatewayProxyEvent, Context } from 'aws-lambda'
import { jsxRenderer } from 'hono/jsx-renderer'
import { DefaultLayout } from './layouts/default'
import { IndexPage } from './pages/index'
import { ItemDetailPage } from './pages/items/[id]'

// Honoのインスタンス作成
const app = new Hono()

// JSXレンダラーの設定
app.get('*', jsxRenderer(({ children }) => {
  return (
    <DefaultLayout>
      {children}
    </DefaultLayout>
  )
}))

// ルーティング設定
app.get('/', (c) => c.render(<IndexPage />))
app.get('/items/:id', (c) => c.render(<ItemDetailPage id={c.req.param('id')} />))

// Lambda関数のハンドラ
export const handler = handle(app)

// ローカル開発用のサーバー設定
if (process.env.NODE_ENV === 'development') {
  console.log('開発サーバーを起動します: http://localhost:3000')
  serve({
    fetch: app.fetch,
    port: 3000,
  })
} 