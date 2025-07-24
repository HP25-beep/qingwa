# Developer Log
## Authentication Module
For supabase Authentication setup, see
```
https://supabase.com/ui/docs/nextjs/password-based-auth
```

shadcnUI
```
https://ui.shadcn.com/docs/installation/next
```

Supabase generate database type
```
https://supabase.com/docs/guides/api/rest/generating-types
```

Supabase configure users table, connect it with the auth.users table sign up action
```
https://supabase.com/docs/guides/auth/managing-user-data
```

Some third-part component
```
npm install react-icons --save
npm install @radix-ui/react-dialog
npm install zustand
npm install react-hot-toast
npm install react-hook-form

npm install uniqid
npm install -D @types/uniqid

npm install query-string
npm install @radix-ui/react-slider
npm install use-sound
npm install react-spinners
npm install server-only
```

## FileSystem

0=普通文件夹，1=文件，2=软链接

## Player
Player 的基础是用户端数据库,使用 indexDB 存储媒体元数据

数据的读入: 当按下按钮的时候将元数据存储到 indexDB 中, 
当数据库更新时, 前端刷新播放列表

数据的播放: 前端的播放列表存储音乐id, 当播放到某个id时, 
从数据库读出音频, 根据path字段从数据库的storage里面拉取publicURL.

一个 player 操纵组件, 一个 database 操纵组件, 

usePlayer 用 zustand 管理 player 状态, 管理是否应该更新 playlist

client-side database
```
npm install dexie
npm install dexie-react-hooks
```