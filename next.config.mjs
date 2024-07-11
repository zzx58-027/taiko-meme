// 补齐一点 Vue 生态下的开发体验: https://github.com/unplugin/unplugin-auto-import
import AutoImport from 'unplugin-auto-import/webpack'

// 下面一列的块注释作用: 这个块注释是用来声明配置文件的类型信息。它使用JSDoc注释来指定该配置对象是⁠next模块的⁠NextConfig类型。这样做的目的是为了在IDE中进行类型检查和自动补全，以帮助开发者更好地理解和使用配置文件。
// Bonus, 为何不直接使用 TS? 并非所有项目都使用TypeScript，某些项目可能仍然使用JavaScript作为主要语言。在这种情况下，使用JSDoc注释来添加类型信息是一种补充方法，帮助提供一定程度的类型检查和提示. 另外, 社区中也有关于项目是否使用 Typescript 的讨论. 比如 Svelte 作者宣布项目不使用 Typescript, 认为其影响开发进度.
/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true
  },
  // NextConfig.webpack: https://nextjs.org/docs/app/api-reference/next-config-js/webpack
  webpack: (
    config,
    { buildId, dev, isServer, defaultLoaders, nextRuntime, webpack }
  ) => {
    config.externals.push('pino-pretty', 'lokijs', 'encoding')
    config.plugins.push(
      AutoImport({
        imports: [
          'react',
          {
            react: [['default', 'React']]
          },
          {
            'next/link': [['default', 'NextLink']],
            'next/image': [['default', 'NextImage']],
            'next/script': [['default', 'NextScript']]
          },
          // Type Import
          {
            from: 'react',
            imports: ['FC', 'PropsWithChildren', 'ReactNode'],
            type: true
          },
          {
            from: 'next',
            imports: ['Metadata', 'ResolvingMetadata'],
            type: true
          }
          // Demo: AutoImport *NonComponent* from Local Files; 可通过该方式导入指定文件下的欲导出内容. 因为 dirs 配置项只支持文件夹.
          // {
          //   from: "./src/constants/unocss.ts",
          //   imports: ["UnoAttriesObj", "KeyOfUnoAttri", "AttributifyNames"],
          //   type: true,
          // },
          // Below part doesn't work, it might be a bug. In order to use autoImport, I have to also change the directory structure from `.../ui/font.tsx` to `.../ui/font/index.tsx`.
          // {
          //   from: './src/components/ui/font.tsx',
          //   imports: [
          //     'Font_CoveredByYourGrace',
          //     'Font_Montserrat',
          //     'Font_MochiyPopPOne'
          //   ],
          //   type: false
          // }
        ],
        // dirs 配置项只支持文件夹路径.
        dirs: [
          './src/lib',
          './src/hooks',
          // './src/components/ui' // This way worked.
          './src/components/ui/font', // Work Around for `imports` not work for exports from tsx component.
          './src/components/ui/auto'
        ]
      })
    )
    return config
  }
}

export default nextConfig
