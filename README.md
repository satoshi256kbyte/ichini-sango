# Ichini Sango

AWS Lambda + Hono + TypeScriptを使用したMPA（Multi-Page Application）プロジェクトです。

## 技術スタック

- AWS Lambda
- Hono (Web Framework)
- TypeScript
- Serverless Framework
- esbuild

## 必要条件

- Node.js (v18以上)
- npm
- AWS CLI (デプロイ用)

## インストール

```bash
npm install
```

## 開発

開発サーバーを起動するには：

```bash
npm run dev
```

## ビルド

プロジェクトをビルドするには：

```bash
npm run build
```

## デプロイ

AWS Lambdaにデプロイするには：

```bash
npm run deploy
```

## プロジェクト構造

```
.
├── src/           # ソースコード
├── dist/          # ビルド成果物
├── esbuild.js     # esbuild設定
├── serverless.yml # Serverless Framework設定
└── tsconfig.json  # TypeScript設定
```

## ライセンス

ISC
