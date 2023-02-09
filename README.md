# 中文假字生成器 (Chinese Lorem Ipusm) 

随机生成中文假字，借鉴于[icelam/chinese-lorem-ipsum](https://github.com/icelam/chinese-lorem-ipsum)

## 基本功能 ##
* 生成假字


## 选自 ##
单字选自[3500常用汉字表7000通用汉字](https://faculty.blcu.edu.cn/xinghb/zh_CN/article/167473/content/1045.htm)。


***


### Install ###
* `npm install lipsum-zh`

### Usage ###
支持ESM,CJS,UMD

```js
const lipsum = require('lipsum-zh') 
console.log(lipsum.generateText(20))

//or
import { generateText } from 'lipsum-zh'

//or

console.log(window.lipsumzh.generateText(20))
```