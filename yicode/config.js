// 外部模块
import os from 'os';
import { resolve } from 'path';
import fs from 'fs-extra';
import * as _ from 'lodash-es';
// let schemeUtils = require('schema-utils');

// 内部模块
import { rootDir, srcDir, cliDir } from './paths.js';
import { relativePath, fn_firname } from './utils.js';
// let yicodeScheme = require('./scheme.js');

/**
 * 处理yiocde-cli安装位置和项目位置，不在同一个盘符的问题
 * 比如：./D:\codes\project\test1\yicode.config.js
 * 需要去掉前面的 ./
 */
let _relativePath = relativePath(fn_firname(import.meta.url), resolve(rootDir, 'yicode.config.js'));
if (_relativePath.indexOf(':') !== -1) {
    _relativePath = _relativePath.replace('./', 'file://');
}

// 项目配置
const { default: projectConfig } = await import(_relativePath);

const yicodeConfig = {
    // 项目类型
    projectType: '',
    /**
     * 描述：是否开启手机自适应模式
     * 默认值：false
     */
    px2viewport: {
        enable: false,
        options: {}
    },
    eslint: {
        options: {
            // 检测根目录
            cwd: srcDir,
            // 检测的扩展文件
            extensions: ['.js', '.vue'],
            // 解析插件的相对路径，指定为yipck-cli目录，可以减少项目的依赖
            resolvePluginsRelativeTo: cliDir,
            // 是否自动修复
            fix: false,
            // 修复的类型
            fixTypes: ['problem', 'suggestion', 'layout'],
            // 是否缓存
            cache: true,
            cacheLocation: resolve(rootDir, '.cache', '.eslintcache'),
            overrideConfigFile: resolve(cliDir, '.eslintrc.js'),
            // 只检测改变的文件，一开始启动不检测
            lintDirtyModulesOnly: true,
            // 并行数量
            threads: os.cpus().length
        }
    },
    stylelint: {
        options: {
            configFile: resolve(cliDir, 'stylelint.config.js'),
            context: srcDir,
            configBasedir: cliDir,
            cache: true,
            fix: true,
            cacheLocation: resolve(rootDir, '.cache'),
            // 只检测改变的文件
            lintDirtyModulesOnly: true
        }
    },
    webpack: {
        // 全局模块，增加2个默认垫片模块，测试
        providePlugin: {
            process: 'process/browser.js',
            Buffer: ['buffer', 'Buffer']
        },
        // 外部链接
        externals: {},
        // 开发配置
        devServer: {}
    }
};

// schemeUtils.validate(yicodeScheme, yicodeConfig, { name: '[ yicode.config.js ]' });

// 配置合并
export default _.merge(yicodeConfig, projectConfig);
