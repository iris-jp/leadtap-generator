# リードタップgenerator
インタラクティブ動画を編集するためのツールになります。

## 編集方法
下記のURLから編集を行います。
[編集する](https://iris-jp.github.io/leadtap-generator/dist/index.html)
※編集してコードを生成するのみであれば、ソースコードをダウンロードをする必要はありません。  
  
## 編集方法
1. 上部の動画を読み込みで動画を読み込む
2. シークバーを動かしインタラクティブ要素を挿入する位置を決定する
3. ボタンA/B　こちらをクリック ポップアップ のいずれかを挿入します。
4. 画像素材の箇所に画像のパスを入力します。絶対パスと相対パスのどちらでも問題ありません。
5. スキップする時間の箇所にURLを入れると指定のURLへ移動へのリンクを作成することができます。秒を入れると指定の時間へ移動します。設置した時間を同一の秒を入れると、そのまま再生されます。
6. こちらをクリックの 左 上 の箇所に値を入れるとおおよその位置に要素を移動することができます。
7. ポップアップ に画像を入れると縦長の画像をスクロールすることが可能です。
8. コードを生成＆保存をクリックするとビューワー用の画像を生成できます。またもう一度アクセスを行うと以前の編集状態を保存することが可能です。

## 設置方法
下記のリードタップviewerを使用してインタラクティブ動画を再生することが可能です。  
リードタップviewerの詳細は下記のリポジトリを確認してください。
[GitHub - iris-jp/leadtap-view](https://github.com/iris-jp/leadtap-view)


## 開発環境は以下
node -v
v11.0.0

npx gulp {タスク名}
https://iwakitakuma33.github.io/debug_repo/dist/

## 著作権について
Code copyright 2019 Interlogic CO., LTD.  
Code released under the MIT license  
https://opensource.org/licenses/mit-license.php
