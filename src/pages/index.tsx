import { jsx } from 'hono/jsx'

export const IndexPage = () => {
  // サンプルデータ
  const items = [
    { id: 1, title: 'アイテム1', description: 'これはアイテム1の説明です。' },
    { id: 2, title: 'アイテム2', description: 'これはアイテム2の説明です。' },
    { id: 3, title: 'アイテム3', description: 'これはアイテム3の説明です。' },
  ]

  return (
    <div class="min-h-screen flex flex-col">
      <header class="bg-blue-600 text-white">
        <div class="container mx-auto px-4 py-4">
          <h1 class="text-xl font-semibold">Ichini Sango</h1>
        </div>
      </header>

      <main class="flex-1 container mx-auto px-4 py-8">
        <div class="text-center mb-12">
          <h2 class="text-3xl font-bold mb-4">アイテム一覧</h2>
          <p class="text-gray-600">利用可能なアイテムの一覧です</p>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {items.map(item => (
            <div key={item.id} class="bg-white rounded-lg shadow-lg flex flex-col">
              <div class="p-6 flex-grow">
                <h3 class="text-xl font-semibold mb-2">{item.title}</h3>
                <p class="text-gray-600">{item.description}</p>
              </div>
              <div class="p-4 border-t">
                <a 
                  href={`/items/${item.id}`}
                  class="block w-full text-center bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition-colors"
                >
                  詳細を見る
                </a>
              </div>
            </div>
          ))}
        </div>
      </main>

      <footer class="bg-white border-t">
        <div class="container mx-auto px-4 py-4">
          <p class="text-center text-gray-600">© 2024 Ichini Sango</p>
        </div>
      </footer>
    </div>
  )
} 