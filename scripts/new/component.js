import fs from 'fs-extra';
import { join, resolve } from 'path';
import { template } from 'lodash-es';
import ora from 'ora';
import chalk from 'chalk';
import { webpackDir } from '../../yicode/paths.js';
import { relativePath, fn_firname } from '../../yicode/utils.js';
const spinner = ora();
export async function newComponent(options) {
    let dirPath = options.newPath;
    if (options.componentType === 'pageComponent') {
        dirPath = join(dirPath, 'components');
    }
    fs.ensureDirSync(dirPath);

    // 创建页面
    let htmlFilePath = join(dirPath, options.fileNames.camelCaseName + '.vue');
    if (fs.existsSync(htmlFilePath) === false) {
        let compTemplate = options.componentType === 'globalComponent' ? 'globalComponentTemplate' : 'pageComponentTemplate';
        const { componentTemplate } = await import(relativePath(fn_firname(import.meta.url), resolve(webpackDir, 'template', `${compTemplate}.js`)));
        let htmlFileData = template(componentTemplate)(options.fileNames);
        fs.outputFileSync(htmlFilePath, htmlFileData);
        spinner.succeed(chalk.green(chalk.blue(options.fileNames.camelCaseName + '.vue') + ' 组件创建成功'));
    } else {
        spinner.warn(chalk.green(chalk.yellow(options.fileNames.camelCaseName + '.vue') + ' 组件已存在'));
    }
}
