import { merge } from 'lodash-es';
import shell from 'shelljs';
import inquirer from 'inquirer';
import { getEnvNames } from '../../yicode/utils.js';
import { buildMain } from './index.js';

// 使用产品模式
shell.env['NODE_MODE'] = 'production';

// 提示参数收集
let promptParams = {};

export async function prompt(options) {
    // 合并参数
    promptParams = merge(promptParams, options);

    /**
     * ==========================================
     * 选择环境变量文件
     * ==========================================
     */
    const _envFile = await inquirer.prompt([
        {
            type: 'list',
            name: 'envFile',
            choices: getEnvNames(),
            message: '选择使用的环境变量文件'
        }
    ]);
    promptParams = merge(promptParams, _envFile);

    // 默认使用开发者模式
    shell.env['NODE_MODE'] = 'production';
    // 选择的环境变量文件
    shell.env['NODE_ENV_FILE'] = promptParams.envFile;

    /**
     * ==========================================
     * 选择是否启动分析模式
     * ==========================================
     */
    const _isAnalyzer = await inquirer.prompt([
        {
            type: 'confirm',
            name: 'isAnalyzer',
            message: '是否启动分析模式？（默认：否）',
            default: false
        }
    ]);
    promptParams = merge(promptParams, _isAnalyzer);
    // 是否启动分析模式
    shell.env['NODE_ANALYZER'] = promptParams.isAnalyzer;

    // 开发脚本
    buildMain(promptParams);
}
