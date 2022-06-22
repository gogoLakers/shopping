// Mock对象中有一个mock方法(这里大写区分)
import Mock from 'mockjs';
// 引入json数据(json文件默认对外---默认暴露 )图片类似
import banner from './banner.json';
import floor from './floor.json';
Mock.mock('/mock/banner', { code: 200, data: banner });
Mock.mock('/mock/floor', { code: 200, data: floor });