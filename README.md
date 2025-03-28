# Ichini Sango

AWS Lambda + Hono + TypeScriptを使用したMPA（Multi-Page Application）プロジェクトです。

## 技術スタック

- AWS Lambda
- Hono (Web Framework)
- TypeScript
- Serverless Framework
- esbuild
- AWS CDK (Infrastructure as Code)
- Amazon API Gateway

## 必要条件

- Node.js (v18以上)
- npm
- AWS CLI (デプロイ用)
- AWS CDK CLI (`npm install -g aws-cdk`)

## インストール

```bash
npm install
```

## 開発

開発サーバーを起動するには：

```bash
npm run dev:all
```

このコマンドは以下の2つのプロセスを同時に開始します：

- ファイルの変更を監視して自動ビルド
- 開発サーバーの起動

サーバーが起動したら、ブラウザで <http://localhost:3000> にアクセスしてください。

## ビルド

プロジェクトをビルドするには：

```bash
npm run build
```

## デプロイ

### Serverless Frameworkを使用したデプロイ

AWS Lambdaにデプロイするには：

```bash
npm run deploy
```

### AWS CDKを使用したデプロイ

1. CDKプロジェクトの依存関係をインストール：

```bash
cd cdk
npm install
```

2. CDKのブートストラップを実行（初回のみ）：

```bash
npx cdk bootstrap
```

3. スタックをデプロイ：

```bash
npx cdk deploy
```

4. デプロイの確認：

```bash
npx cdk ls
```

デプロイが完了すると、以下のような形式でAPI Gatewayのエンドポイントが表示されます：

```
https://[api-id].execute-api.[region].amazonaws.com/prod/
```

## プロジェクト構造

```
.
├── src/           # ソースコード
├── dist/          # ビルド成果物
├── cdk/           # AWS CDK設定
│   ├── bin/       # CDKアプリケーションのエントリーポイント
│   ├── lib/       # CDKスタック定義
│   ├── package.json # CDKプロジェクトの依存関係
│   └── tsconfig.json # CDKプロジェクトのTypeScript設定
├── esbuild.js     # esbuild設定
├── serverless.yml # Serverless Framework設定
└── tsconfig.json  # TypeScript設定
```

## ライセンス

ISC
