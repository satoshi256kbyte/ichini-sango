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
    <div class="min-h-screen flex flex-col">
      <header class="bg-blue-600 text-white">
        <div class="container mx-auto px-4 py-4 flex items-center">
          <a href="/" class="mr-4 hover:text-blue-200">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
          </a>
          <h1 class="text-xl font-semibold">Ichini Sango</h1>
        </div>
      </header>

      <main class="flex-1 container mx-auto px-4 py-8">
        <div class="bg-white rounded-lg shadow-lg p-6">
          <h2 class="text-3xl font-bold mb-4">{item.title}</h2>
          <p class="text-gray-600 text-lg mb-6">{item.description}</p>
          
          <div class="bg-gray-50 p-6 rounded-lg">
            <h3 class="text-xl font-semibold mb-4">プランニングポーカーを開始</h3>
            <form action="/poker/start" method="post" class="space-y-4">
              <div>
                <label for="url" class="block text-sm font-medium text-gray-700">URL</label>
                <input
                  type="url"
                  name="url"
                  id="url"
                  required
                  class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  placeholder="https://example.com"
                />
              </div>
              
              <div>
                <label for="participants" class="block text-sm font-medium text-gray-700">参加人数</label>
                <input
                  type="number"
                  name="participants"
                  id="participants"
                  min="2"
                  value="5"
                  class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
              
              <div>
                <label for="options" class="block text-sm font-medium text-gray-700">数字の選択肢</label>
                <input
                  type="text"
                  name="options"
                  id="options"
                  value="1 2 3 5 8 13"
                  class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  placeholder="スペース区切りで数字を入力"
                />
              </div>
              
              <button
                type="submit"
                class="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                プランニングポーカーを開始
              </button>
            </form>
          </div>
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