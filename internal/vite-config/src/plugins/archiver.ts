import type { PluginOption } from 'vite';

import type { ArchiverPluginOptions } from '../typing';

import fs from 'node:fs';
import fsp from 'node:fs/promises';
import { join, resolve } from 'node:path';

import { ZipArchive } from 'archiver';

export const viteArchiverPlugin = (
  options: ArchiverPluginOptions = {},
): PluginOption => {
  let isWatchMode = false;
  let folderToZip = 'dist';

  return {
    apply: 'build',
    closeBundle: {
      handler() {
        const { name = 'dist', outputDir = '.' } = options;

        return new Promise<void>((resolve, reject) => {
          setTimeout(async () => {
            const zipOutputDir = join(process.cwd(), outputDir);
            const zipOutputPath = join(zipOutputDir, `${name}.zip`);
            try {
              await fsp.mkdir(zipOutputDir, { recursive: true });
            } catch {
              // ignore
            }

            try {
              await zipFolder(folderToZip, zipOutputPath);
              console.log(`Folder has been zipped to: ${zipOutputPath}`);
              resolve();
            } catch (error) {
              if (isWatchMode) {
                console.error('Error zipping folder:', error);
                resolve();
              } else {
                reject(error);
              }
            }
          }, 0);
        });
      },
      order: 'post',
    },
    configResolved(config) {
      isWatchMode = !!config.build.watch;
      folderToZip = resolve(config.root, config.build.outDir || 'dist');
    },
    enforce: 'post',
    name: 'vite:archiver',
  };
};

async function zipFolder(
  folderPath: string,
  outputPath: string,
): Promise<void> {
  return new Promise((resolve, reject) => {
    const output = fs.createWriteStream(outputPath);

    const archive = new ZipArchive({
      zlib: { level: 9 }, // 设置压缩级别为 9 以实现最高压缩率
    });

    output.on('close', () => {
      console.log(
        `ZIP file created: ${outputPath} (${archive.pointer()} total bytes)`,
      );
      resolve();
    });

    output.on('error', reject);

    archive.on('error', (err) => {
      reject(err);
    });

    archive.pipe(output);

    // 使用 directory 方法以流的方式压缩文件夹，减少内存消耗
    archive.directory(folderPath, false);

    // 流式处理完成
    archive.finalize().catch(reject);
  });
}
