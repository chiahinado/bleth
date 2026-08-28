# BLETHLAND 新サイトマップ

- 作成日: 2026-08-28
- 公開先: GitHub Pagesのプロジェクトサイト `/bleth/`
- 新サイト配置: `docs/`
- 旧サイト原本: `blethland/`（読み取り専用）
- 旧HTML: 70ページ
- 方針: 旧ページをそのまま複製せず、内容量と安全性に応じて統合する

## 1. 確定した統合方針

- トップの遊園地マップを基準ビジュアルとし、各ページを同じBLETHLAND内の別アトラクションとして構成する。
- トップは遊園地マップ内のホットスポットだけで移動できる構成とし、下部の重複リンクカードとホバー演出は置かない。
- マップ画像左上の `HISTORICAL ARCHIVE` は表示せず、右上の `LAST UPDATED 2004.08.29` は画像ではなくHTMLテキストで表示する。
- 明るい配色、太い色枠、立体的な看板UI、手描きイラストの質感を全ページで維持する。
- セクション固有色は `LIVE ARCHIVE`＝青、`MEMBERS`＝緑、`MUSIC`＝ピンク、`SHOWS`＝オレンジ、`EXTRAS`＝紫・緑とする。
- メンバープロフィールは旧5ページを `/members/` の1ページへ統合する。
- メンバー写真と紹介文は掲載せず、担当と名前だけを表示する。
- 各ページのヒーロータイトルは背景イラストを覆いすぎない大きさと高さに統一する。
- メンバー紹介には名前とパートだけを掲載する。
- 誕生日、血液型、身体情報、愛車、家族・ペット、恋愛、住所・地域、勤務先などの私的情報は掲載しない。
- 当時の悪ノリ、内輪向けの冗談、現在の本人像と誤認される古い自己紹介は削除する。
- お化け屋敷の人物写真 `ghost01.jpg`〜`ghost03.jpg` は非公開とし、公開用ディレクトリへコピーしない。
- お化け屋敷は新しい背景、イラスト、文字演出だけで再構築する。
- お化け屋敷の人物写真以外の旧サイト内写真は原則掲載可能とする。
- 公開用画像は原本と分離し、EXIFなどの付帯メタデータを除去する。
- BLETHの楽曲、歌詞、音源は公開可能とする。第三者紹介文と個人情報を含む展示は別途確認する。
- 旧サイト内の外部フォーム、BBS、メール、アクセス解析、外部CGIは引き継がない。

## 2. 新サイトの全体構成

| 新ルート | ページ数 | 状態 | 内容 |
|---|---:|---|---|
| `/` | 1 | 公開 | 遊園地マップによるアトラクション入口 |
| `/live/` | 1 | 公開 | ライブ年表 |
| `/live/{date}/` | 16 | 公開 | 旧詳細ページが存在するライブ |
| `/members/` | 1 | 公開 | 全メンバーをまとめて紹介 |
| `/music/` | 1 | 公開 | 楽曲一覧 |
| `/music/{slug}/` | 9 | 公開 | 各楽曲の歌詞、クレジット、音源 |
| `/shows/` | 1 | 公開 | 旧公演案内4ページを年代別に統合 |
| `/extras/` | 1 | 公開 | 特別展示の入口 |
| `/extras/quiz/` | 1 | 公開 | クイズと結果6ページを統合 |
| `/extras/fortune/` | 1 | 公開 | 占い・おみくじ結果を統合 |
| `/extras/haunted-house/` | 1 | 公開 | 新規イラストだけで再構築 |
| `/extras/copybands/` | 1 | 公開保留 | 第三者紹介11ページを安全に統合 |
| `/fanclub/` | 1 | 公開 | ファンクラブの歴史展示 |
| `/links/` | 1 | 公開 | 確認済みリンクと旧バナー資料 |
| `/404.html` | 1 | 公開 | GitHub Pages用404ページ |

新規の `/extras/` を含め、公開保留のコピーバンド展示を除く初期構成は36ページ。コピーバンド展示を公開すると37ページになる。これとは別に技術ページとして `404.html` を置く。

## 3. グローバルナビゲーション

主要ナビゲーション:

1. `LIVE ARCHIVE`
2. `MEMBERS`
3. `MUSIC`
4. `SHOWS`
5. `EXTRAS`

補助ナビゲーション:

- `I LOVE BLETH`
- `LINKS`

すべての内部リンクはGitHub Pagesの `/bleth/` 配下で壊れないよう、相対パスを基本とする。

## 4. 旧70ページから新ルートへの対応

### 4.1 トップ（旧2ページ → 新1ページ）

| 旧ページ | 新ルート | 扱い |
|---|---|---|
| `blethland/index.html` | `/` | サイト名、更新日、主要コンテンツを再編集 |
| `blethland/01_menu.html` | `/` | 5つのアトラクションをトップへ統合 |

### 4.2 クイズ（旧7ページ → 新1ページ）

| 旧ページ | 新ルート | 扱い |
|---|---|---|
| `blethland/00_01_ticket.html` | `/extras/quiz/` | 問題と選択肢を再編集 |
| `blethland/an01.html` | `/extras/quiz/` | 画面内の結果表示へ統合 |
| `blethland/an02.html` | `/extras/quiz/` | 同上 |
| `blethland/an03.html` | `/extras/quiz/` | 同上 |
| `blethland/an04.html` | `/extras/quiz/` | 同上 |
| `blethland/an05.html` | `/extras/quiz/` | 同上 |
| `blethland/an06.html` | `/extras/quiz/` | 同上 |

外部通信は行わず、ブラウザ内だけで完結させる。

### 4.3 お化け屋敷（旧1ページ → 新1ページ）

| 旧ページ | 新ルート | 扱い |
|---|---|---|
| `blethland/00_02_ghost.html` | `/extras/haunted-house/` | 新しいイラストと文字演出で再構築 |

公開禁止アセット:

- `blethland/web_illust_jpg/ghost01.jpg`
- `blethland/web_illust_jpg/ghost02.jpg`
- `blethland/web_illust_jpg/ghost03.jpg`

この3点は公開用素材の選定、画像加工、生成AIの参照対象からも除外する。

### 4.4 メンバー（旧5ページ → 新1ページ）

| 旧ページ | 新ルート内の表示先 |
|---|---|
| `blethland/02_00_sho.html` | `/members/#sho` |
| `blethland/02_01_dai.html` | `/members/#daigo` |
| `blethland/02_02_masa.html` | `/members/#masaho` |
| `blethland/02_05_tatsu.html` | `/members/#tatsuya` |
| `blethland/02_06_maki.html` | `/members/#makiko` |

個別URLは作らない。担当と名前だけのカードを1ページ内に並べる。

旧トップの「6人組」とプロフィール5人分の不一致が解決するまで、人数を本文に記載しない。

### 4.5 ライブ（旧17ページ → 新17ページ）

| 旧ページ | 新ルート |
|---|---|
| `blethland/03_history.html` | `/live/` |
| `blethland/03_history/03_h990611.html` | `/live/1999-06-11/` |
| `blethland/03_history/03_h990829.html` | `/live/1999-09-11/` |
| `blethland/03_history/03_h991211.html` | `/live/1999-12-11/` |
| `blethland/03_history/03_h000110.html` | `/live/2000-01-10/` |
| `blethland/03_history/03_h000326.html` | `/live/2000-03-26/` |
| `blethland/03_history/03_h000401.html` | `/live/2000-04-01/` |
| `blethland/03_history/03_h000611.html` | `/live/2000-06-11/` |
| `blethland/03_history/03_h000915.html` | `/live/2000-09-15/` |
| `blethland/03_history/03_h001223.html` | `/live/2000-12-23/` |
| `blethland/03_history/03_h010113.html` | `/live/2001-01-13/` |
| `blethland/03_history/03_h010303.html` | `/live/2001-03-03/` |
| `blethland/03_history/03_h010401.html` | `/live/2001-04-01/` |
| `blethland/03_history/03_h010715.html` | `/live/2001-07-15/` |
| `blethland/03_history/03_h010801.html` | `/live/2001-08-01/` |
| `blethland/03_history/03_h010804.html` | `/live/2001-08-04/` |
| `blethland/03_history/03_h011222.html` | `/live/2001-12-22/` |

`03_h990829.html` はファイル名と実際の公演日が一致しない。本文と旧一覧に合わせ、URLは `1999-09-11` とする。

2002年以降など、旧一覧にだけ存在して詳細ページのない公演は `/live/` の年表項目として掲載し、内容が増えるまで空の詳細ページを作らない。

### 4.6 楽曲（旧10ページ → 新10ページ）

| 旧ページ | 新ルート |
|---|---|
| `blethland/04_00musicmenu.html` | `/music/` |
| `blethland/04_02_fy.html` | `/music/for-you/` |
| `blethland/04_03_ss.html` | `/music/summer-side/` |
| `blethland/04_04_fm.html` | `/music/first-memory/` |
| `blethland/04_05_fw.html` | `/music/free-way/` |
| `blethland/04_06_sy.html` | `/music/say-yeah/` |
| `blethland/04_07_cl.html` | `/music/cloudy/` |
| `blethland/04_08_nm.html` | `/music/namida-no-egao/` |
| `blethland/04_09_pr.html` | `/music/precious/` |
| `blethland/04_10_ck.html` | `/music/chikai/` |

歌詞は全9曲を掲載する。旧RealMedia音源3曲はMP3へ変換して掲載し、MIDI、携帯向け音源はそのまま再生対象にしない。

### 4.7 公演案内（旧4ページ → 新1ページ）

| 旧ページ | 新ルート |
|---|---|
| `blethland/05_liveinfo.html` | `/shows/` |
| `blethland/05_01.html` | `/shows/` |
| `blethland/05_02_2003.html` | `/shows/` |
| `blethland/05_03_2004.html` | `/shows/` |

現在の公演予定と誤認されないよう、年代別の公演記録として表示する。

### 4.8 バナー・リンク（旧2ページ → 新1ページ）

| 旧ページ | 新ルート |
|---|---|
| `blethland/06_02_banner.html` | `/links/#banners` |
| `blethland/06_link.html` | `/links/` |

旧バナーはBLETHLANDの歴史素材として表示できる。外部リンクは現在の所有者と内容を確認できたものだけ掲載する。

### 4.9 GLAYコピーバンド企画（旧11ページ → 新1ページ・公開保留）

| 旧ページ | 新ルート |
|---|---|
| `blethland/08_glaycopy.html` | `/extras/copybands/` |
| `blethland/08_copyband/08_01_ju.html` | `/extras/copybands/#ju` |
| `blethland/08_copyband/08_02_pn.html` | `/extras/copybands/#pn` |
| `blethland/08_copyband/08_03_sq.html` | `/extras/copybands/#sq` |
| `blethland/08_copyband/08_04_fe.html` | `/extras/copybands/#fe` |
| `blethland/08_copyband/08_05_in.html` | `/extras/copybands/#in` |
| `blethland/08_copyband/08_06_ds.html` | `/extras/copybands/#ds` |
| `blethland/08_copyband/08_07_la.html` | `/extras/copybands/#la` |
| `blethland/08_copyband/08_09_cu.html` | `/extras/copybands/#cu` |
| `blethland/08_copyband/08_10_ra.html` | `/extras/copybands/#ra` |
| `blethland/08_copyband/08_11_Ar.html` | `/extras/copybands/#ar` |

第三者の連絡先、居住地域、メンバー募集、外部URLは掲載しない。紹介文の再掲載可否が決まるまでルート自体を公開しない。

### 4.10 占い・おみくじ（旧8ページ → 新1ページ）

| 旧ページ | 新ルート |
|---|---|
| `blethland/09_fortune.html` | `/extras/fortune/` |
| `blethland/o02.htm` | `/extras/fortune/` |
| `blethland/nenga/o31.htm` | `/extras/fortune/` |
| `blethland/nenga/o43.htm` | `/extras/fortune/` |
| `blethland/nenga/o62.htm` | `/extras/fortune/` |
| `blethland/nenga/o76.htm` | `/extras/fortune/` |
| `blethland/nenga/o84.htm` | `/extras/fortune/` |
| `blethland/nenga/o95.htm` | `/extras/fortune/` |

生年月日、性別などの入力は求めず、ブラウザ内のランダム演出にする。結果を保存・送信しない。

### 4.11 ファンクラブ（旧3ページ → 新1ページ）

| 旧ページ | 新ルート |
|---|---|
| `blethland/10_fanclub.html` | `/fanclub/` |
| `blethland/10_fanclubform.html` | `/fanclub/` |
| `blethland/10_thanks.html` | `/fanclub/` |

登録フォームと送信完了機能は再現しない。名称、当時の特典、案内内容だけを歴史展示として再編集する。

## 5. 旧ページ数の照合

| 旧ページ群 | 旧ページ数 |
|---|---:|
| トップ | 2 |
| クイズ | 7 |
| お化け屋敷 | 1 |
| メンバー | 5 |
| ライブ | 17 |
| 楽曲 | 10 |
| 公演案内 | 4 |
| バナー・リンク | 2 |
| GLAYコピーバンド企画 | 11 |
| 占い・おみくじ | 8 |
| ファンクラブ | 3 |
| **合計** | **70** |

## 6. 公開素材ルール

| 素材 | 方針 |
|---|---|
| `blethland/` 原本 | 読み取り専用。編集・移動・削除しない |
| お化け屋敷の人物写真3点 | 非公開。`docs/` へコピーしない |
| その他の旧サイト内写真 | 原則掲載可能 |
| 写真の公開用コピー | EXIFなどの付帯メタデータを除去 |
| 旧背景・アトラクションイラスト | 直接流用せず、現代の画風で新規制作 |
| ロゴ | `BLETHLAND` 表記を維持して新規制作 |
| 歌詞・音源 | 公開可能。歌詞9曲と変換済みMP3音源3曲を掲載 |
| 第三者プロフィール・リンク | 内容を確認できるまで非公開 |
| 個人情報を含むフォーム | 再公開しない |

## 7. `docs/` の推奨構成

```text
docs/
├── index.html
├── 404.html
├── assets/
│   ├── css/
│   │   └── main.css
│   ├── js/
│   │   └── main.js
│   ├── images/
│   │   ├── common/
│   │   ├── live/
│   │   ├── members/
│   │   ├── music/
│   │   ├── shows/
│   │   └── extras/
│   └── audio/
├── live/
├── members/
├── music/
├── shows/
├── extras/
│   ├── quiz/
│   ├── fortune/
│   └── haunted-house/
├── fanclub/
└── links/
```

`docs/` には公開可能と判断したファイルだけを置く。旧サイト原本からの一括コピーは行わない。

## 8. 実装順

1. `docs/index.html` と共通CSSを作り、トップとナビゲーションをレスポンシブ対応する。
2. `/members/` を1ページ構成で実装し、公開項目の粒度を確認する。
3. `/live/` とライブ詳細の共通テンプレートを作る。
4. `/music/` と楽曲詳細の共通テンプレートを作る。
5. `/shows/`、`/fanclub/`、`/links/` を統合ページとして作る。
6. クイズ、おみくじ、お化け屋敷を外部通信なしで実装する。
7. 公開保留素材が `docs/` に混入していないことを検査する。
