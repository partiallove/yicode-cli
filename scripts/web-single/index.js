// 自带模块
let path = require('path');

// 第三方模块
let _ = require('lodash');
let fs = require('fs-extra');
let commander = require('commander');
let { table } = require('table');
let execa = require('execa');
let inquirer = require('inquirer');
let chalk = require('chalk');
let shell = require('shelljs');
let updateNotifier = require('update-notifier');

// 配置相关
let yicodePaths = require('../../yicode/helper/paths.js');
let yicodePackage = require(path.resolve(yicodePaths.cliDir, 'yicode', 'helper', 'package.js'));
let yicodeConfig = require(path.resolve(yicodePaths.cliDir, 'yicode', 'helper', 'config.js'));
let yicodeUtils = require(path.resolve(yicodePaths.cliDir, 'yicode', 'helper', 'utils.js'));

// 提示参数收集
let promptParams = {};

// web命令行提示
module.exports = function yicodeTemplateWebSingle() {
    inquirer
        .prompt([
            {
                type: 'list',
                name: 'command',
                message: '请选择一个命令',
                choices: [
                    {
                        name: 'dev' + chalk.cyanBright('  在本机环境进行开发调试'),
                        value: 'dev'
                    },
                    {
                        name: 'build' + chalk.cyanBright('  发布到线上（测试/正式）服务器环境'),
                        value: 'build'
                    },
                    {
                        name: 'new' + chalk.cyanBright('  创建新的（页面/组件路由/指令/过滤器）文件'),
                        value: 'new'
                    },
                    {
                        name: 'rename' + chalk.cyanBright('  重命名（页面/组件路由/指令/过滤器）文件'),
                        value: 'rename'
                    },
                    {
                        name: 'tpl' + chalk.cyanBright('  下载项目模板（管理后台/web/小程序/接口等）'),
                        value: 'tpl'
                    }
                ]
            }
        ])
        .then((answer) => {
            promptParams = _.merge(promptParams, answer);
            require(path.resolve(yicodePaths.cliDir, 'scripts', yicodeConfig.projectType, promptParams.command, 'index.js'))(promptParams);
        });
};
