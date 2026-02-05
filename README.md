# ossx-cli

[![npm version][npm-version-src]][npm-version-href]
[![npm downloads][npm-downloads-src]][npm-downloads-href]
[![bundle][bundle-src]][bundle-href]
[![License][license-src]][license-href]

![Feb-05-2026 16-14-51](https://github.com/user-attachments/assets/855f6700-bc4f-454a-80be-8b1568487df1)


将本地构建产物一键上传到对象存储或服务器目录，用于前端/静态站点/资源文件自动化部署流程。

## 安装

``` bash
pnpm add -D ossx-cli
```

## 配置

默认读取项目根目录的 `ossx.config.*`（支持 ts/js/json）。

示例配置：

```ts
import { defineConfig } from 'ossx-cli'

export default defineConfig({
  provider: {
    name: 'aliyun-oss',
    endpoint: 'oss-cn-shenzhen.aliyuncs.com',
    accessKeyId: 'xxxxxxx',
    accessKeySecret: 'xxxxxxx',
    bucket: 'bucket-xxx',
  },
  target: 'dist',
  ignoreFiles: ['*.zip', 'index.html'],
  destination: 'remote-path',
  maxLogfiles: 1,
})
```

支持多provider

``` ts
import { defineConfig } from 'ossx-cli'

export default defineConfig({
  providers: [
    {
      tag: 'config1',
      provider: {
        name: 'aliyun-oss',
        endpoint: 'oss-cn-shenzhen.aliyuncs.com',
        accessKeyId: 'xxxxxxx',
        accessKeySecret: 'xxxxxxx',
        bucket: 'bucket-xxx',
      }
    },
    {
      tag: 'config2',
      provider: {
        name: 'aliyun-oss',
        endpoint: 'oss-cn-shenzhen.aliyuncs.com',
        accessKeyId: 'xxxxxxx',
        accessKeySecret: 'xxxxxxx',
        bucket: 'bucket-xxx',
      }
    }
  ],
  target: 'dist',
  ignoreFiles: ['*.zip', 'index.html'],
  destination: 'remote-path',
  maxLogfiles: 1,
})
```

## 使用

运行命令

```bash
npx ossx
```

指定配置文件：

```bash
npx ossx -c ./ossx.config.ts
```

## License

[MIT](./LICENSE) License © [hackycy](https://github.com/hackycy)

<!-- Badges -->

[npm-version-src]: https://img.shields.io/npm/v/ossx-cli?style=flat&colorA=080f12&colorB=1fa669
[npm-version-href]: https://npmjs.com/package/ossx-cli
[npm-downloads-src]: https://img.shields.io/npm/dm/ossx-cli?style=flat&colorA=080f12&colorB=1fa669
[npm-downloads-href]: https://npmjs.com/package/ossx-cli
[bundle-src]: https://img.shields.io/bundlephobia/minzip/ossx-cli?style=flat&colorA=080f12&colorB=1fa669&label=minzip
[bundle-href]: https://bundlephobia.com/result?p=ossx-cli
[license-src]: https://img.shields.io/github/license/hackycy-collection/ossx-cli.svg?style=flat&colorA=080f12&colorB=1fa669
[license-href]: https://github.com/hackycy-collection/ossx-cli/blob/main/LICENSE
