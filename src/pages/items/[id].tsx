import { jsx } from 'hono/jsx'

interface PokerState {
  isStarted: boolean;
  url: string;
  participants: number;
  options: string[];
  votes: Record<number, string | null>;
  isRevealed: boolean;
}

export const ItemDetailPage = (props: { id: string }) => {
  // サンプルデータ
  const item = {
    id: parseInt(props.id),
    title: `アイテム${props.id}`,
    description: `これはアイテム${props.id}の詳細な説明です。`,
    details: 'ここにはアイテムの詳細情報が表示されます。'
  }

  // クライアントサイドのスクリプト
  const clientScript = `
    let pokerState = {
      isStarted: false,
      url: '',
      participants: 5,
      options: ['1', '2', '3', '5', '8', '13'],
      votes: {},
      isRevealed: false
    };

    /**
     * 全員が投票したかどうかをチェック
     * @returns {boolean} 全員が投票した場合はtrue、そうでない場合はfalse
     */
    function checkAllVoted() {
      return Object.keys(pokerState.votes).length === pokerState.participants;
    }

    /**
     * 投票結果を表示
     */
    function revealVotes() {
      pokerState.isRevealed = true;
      // 全員の投票結果を表示
      Array.from({ length: pokerState.participants }).forEach((_, index) => {
        const row = document.querySelector(\`tr[data-participant="\${index}"]\`);
        if (row) {
          const buttonsCell = row.querySelector('td:last-child');
          if (buttonsCell) {
            if (pokerState.votes[index]) {
              buttonsCell.innerHTML = \`<span class="text-lg font-semibold">\${pokerState.votes[index]}</span>\`;
            } else {
              buttonsCell.innerHTML = '<span class="text-gray-500">未投票</span>';
            }
          }
        }
      });

      updateRevealButton(false);

      // 採用ボタンを追加
      const tableContainer = document.getElementById('poker-table');
      if (tableContainer && !tableContainer.querySelector('.adopt-button-container')) {
        const adoptButton = document.createElement('div');
        adoptButton.className = 'adopt-button-container mt-6 text-center';
        adoptButton.innerHTML = \`
          <div class="space-y-4">
            <h3 class="text-xl font-semibold">投票結果から採用する値を選択してください</h3>
            <div class="flex justify-center space-x-2">
              \${Array.from(new Set(Object.values(pokerState.votes).filter(Boolean)))
                .sort((a, b) => parseInt(a) - parseInt(b))
                .map(value => \`
                <button
                  type="button"
                  onclick="handleAdopt('\${value}')"
                  class="w-12 h-12 rounded-full bg-blue-100 text-blue-700 hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors text-lg font-semibold"
                >
                  \${value}
                </button>
              \`).join('')}
            </div>
          </div>
        \`;
        tableContainer.appendChild(adoptButton);
      }
    }

    function handleAdopt(value) {
      // 採用された値を表示
      const tableContainer = document.getElementById('poker-table');
      if (tableContainer) {
        const adoptButton = tableContainer.querySelector('.adopt-button-container');
        if (adoptButton) {
          adoptButton.innerHTML = \`
            <div class="text-center">
              <h3 class="text-xl font-semibold mb-2">採用された値</h3>
              <div class="text-3xl font-bold text-blue-600">\${value}</div>
            </div>
          \`;
        }
      }
    }

    /**
     * プランニングポーカーを開始
     * @param {Event} e イベントオブジェクト
     */
    function handleStartPoker(e) {
      e.preventDefault();
      const form = e.target;
      const formData = new FormData(form);
      
      // 状態を更新
      pokerState.isStarted = true;
      pokerState.url = formData.get('url');
      pokerState.participants = parseInt(formData.get('participants'));
      pokerState.options = formData.get('options').split(' ').filter(Boolean);
      pokerState.votes = {};
      pokerState.isRevealed = false;

      // 画面を更新
      updateView();

      // 結果表示ボタンを追加（まだ存在しない場合のみ）
      const tableContainer = document.getElementById('poker-table');
      if (tableContainer && !tableContainer.querySelector('.reveal-button-container')) {
        const revealButton = document.createElement('div');
        revealButton.className = 'reveal-button-container mt-6 text-center';
        revealButton.innerHTML = \`
          <button
            onclick="revealVotes()"
            class="bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-colors"
          >
            投票を打ち切って結果を表示
          </button>
        \`;
        tableContainer.appendChild(revealButton);
      }
    }

    /**
     * 結果表示ボタンの表示/非表示を更新
     * @param {boolean} isVisible 表示/非表示の状態
     */
    function updateRevealButton(isVisible) {
      const tableContainer = document.getElementById('poker-table');
      if (!tableContainer) return;

      let revealButton = tableContainer.querySelector('.reveal-button-container');
      if (revealButton) {
        revealButton.style.display = isVisible ? 'block' : 'none';
      }
    }

    /**
     * 投票を更新
     * @param {number} participantIndex 参加者のインデックス
     * @param {string} value 投票値
     */
    function handleVote(participantIndex, value) {
      // 投票を更新
      pokerState.votes[participantIndex] = value;
      
      // 該当の行のボタンの状態を更新
      const row = document.querySelector(\`tr[data-participant="\${participantIndex}"]\`);
      if (row) {
        // ボタン群を非表示に
        const buttonsCell = row.querySelector('td:last-child');
        if (buttonsCell) {
          buttonsCell.innerHTML = '<span class="text-gray-500">投票済み</span>';
        }
      }

      // 全員が投票したかチェック
      if (checkAllVoted()) {
        revealVotes();
        updateRevealButton(false);
      }
    }

    /**
     * 画面を更新
     */
    function updateView() {
      const formContainer = document.getElementById('poker-form');
      const tableContainer = document.getElementById('poker-table');
      
      if (pokerState.isStarted) {
        formContainer.style.display = 'none';
        tableContainer.style.display = 'block';
        
        // テーブルの内容を更新
        const urlElement = document.getElementById('poker-url');
        if (urlElement) {
          urlElement.textContent = pokerState.url;
          urlElement.href = pokerState.url;
        }
        
        // 参加者数に応じて行を更新
        const tbody = document.getElementById('poker-table-body');
        if (tbody) {
          tbody.innerHTML = Array.from({ length: pokerState.participants })
            .map((_, index) => \`
              <tr data-participant="\${index}" class="hover:bg-gray-50">
                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  参加者 \${index + 1}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-center">
                  <div class="flex justify-center space-x-2">
                    \${pokerState.options.map(option => \`
                      <button
                        type="button"
                        value="\${option}"
                        onclick="handleVote(\${index}, '\${option}')"
                        class="w-8 h-8 rounded-full bg-gray-100 text-gray-700 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
                      >
                        \${option}
                      </button>
                    \`).join('')}
                  </div>
                </td>
              </tr>
            \`).join('');
        }
      } else {
        formContainer.style.display = 'block';
        tableContainer.style.display = 'none';
      }
    }
  `

  return (
    <div class="min-h-screen flex flex-col">
      <header class="bg-blue-600 text-white">
        <div class="container mx-auto px-4 py-4 flex items-center">
          <a href="/" class="mr-4 hover:text-blue-200">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
          </a>
          <h1 class="text-xl font-semibold">プランニングポーカー with Backlog</h1>
        </div>
      </header>

      <main class="flex-1 container mx-auto px-4 py-8">
        <div class="bg-white rounded-lg shadow-lg p-6">
          <h2 class="text-3xl font-bold mb-4">{item.title}</h2>
          <p class="text-gray-600 text-lg mb-6">{item.description}</p>
          
          <div id="poker-form" class="bg-gray-50 p-6 rounded-lg">
            <h3 class="text-xl font-semibold mb-4">プランニングポーカーを開始</h3>
            <form onsubmit="handleStartPoker(event)" class="space-y-4">
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

          <div id="poker-table" class="bg-gray-50 p-6 rounded-lg" style="display: none;">
            <div class="mb-6">
              <h3 class="text-xl font-semibold mb-2">PBIタイトル</h3>
              <p class="text-gray-600">
                <a id="poker-url" href="#" target="_blank" rel="noopener noreferrer" class="text-blue-600 hover:text-blue-800 hover:underline"></a>
              </p>
            </div>
            
            <div class="overflow-x-auto">
              <table class="min-w-full divide-y divide-gray-200">
                <tbody id="poker-table-body" class="bg-white divide-y divide-gray-200">
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>

      <footer class="bg-white border-t">
        <div class="container mx-auto px-4 py-4">
          <p class="text-center text-gray-600">プランニングポーカー with Backlog</p>
        </div>
      </footer>

      <script dangerouslySetInnerHTML={{ __html: clientScript }} />
    </div>
  )
} 