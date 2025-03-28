/** @jsx jsx */
import { jsx } from 'hono/jsx'

export const ItemDetailPage = (props: { id: string }) => {
  // サンプルデータ
  const item = {
    id: parseInt(props.id),
    title: `アイテム${props.id}`,
    description: `これはアイテム${props.id}の詳細な説明です。`,
    details: 'ここにはアイテムの詳細情報が表示されます。'
  }

  return (
    <div class="container mx-auto px-4 py-8">
      <div class="mb-6">
        <a href="/" class="text-blue-600 hover:text-blue-800">
          ← 一覧に戻る
        </a>
      </div>
      <div class="border rounded-lg p-6 shadow-sm">
        <h1 class="text-3xl font-bold mb-4">{item.title}</h1>
        <p class="text-gray-600 mb-6">{item.description}</p>
        <div class="bg-gray-50 p-4 rounded">
          <h2 class="text-xl font-semibold mb-2">詳細情報</h2>
          <p>{item.details}</p>
        </div>
      </div>
    </div>
  )
} 