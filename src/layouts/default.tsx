import { jsx } from 'hono/jsx'
import type { FC, PropsWithChildren } from 'hono/jsx'

export const DefaultLayout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <html lang="ja">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Ichini Sango</title>
        <script src="https://cdn.tailwindcss.com"></script>
      </head>
      <body class="bg-gray-50">
        <main>
          {children}
        </main>
        <footer class="bg-white border-t mt-8">
          <div class="container mx-auto px-4 py-4 text-center text-gray-600">
            © 2024 Ichini Sango
          </div>
        </footer>
      </body>
    </html>
  )
} 