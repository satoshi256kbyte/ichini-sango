import { jsx } from 'hono/jsx'

export const IndexPage = () => {
  // サンプルデータ
  const items = [
    { id: 1, title: 'アイテム1', description: 'これはアイテム1の説明です。' },
    { id: 2, title: 'アイテム2', description: 'これはアイテム2の説明です。' },
    { id: 3, title: 'アイテム3', description: 'これはアイテム3の説明です。' },
  ]

  return (
    <div class="container mx-auto px-4 py-8">
      <div class="text-center mb-12">
        <h1 class="text-4xl font-bold mb-4">Ichini Sango</h1>
        <p class="text-xl text-gray-600">シンプルで使いやすいWebアプリケーション</p>
      </div>
      <div class="max-w-2xl mx-auto">
        <h2 class="text-2xl font-semibold mb-6">アイテム一覧</h2>
        <div class="grid gap-6">
          {items.map(item => (
            <div class="border rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow bg-white">
              <h3 class="text-xl font-semibold mb-2">{item.title}</h3>
              <p class="text-gray-600 mb-4">{item.description}</p>
              <a href={`/items/${item.id}`} class="text-blue-600 hover:text-blue-800">
                詳細を見る →
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
} 