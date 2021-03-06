import { resolve } from 'path';
import { srcDir } from '../paths.js';
export default {
    loader: 'sass-loader',
    options: {
        sourceMap: process.env.NODE_MODE === 'development' ? true : false,
        additionalData: `@import "@/styles/variable.scss";`
    }
};
