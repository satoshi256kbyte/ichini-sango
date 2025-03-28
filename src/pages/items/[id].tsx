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
            <h3 class="text-xl font-semibold mb-4">詳細情報</h3>
            <p class="text-gray-700">{item.details}</p>
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