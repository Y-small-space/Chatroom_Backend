// 为什么需要buffer？
// Buffer是我们node中的处理二进制数据的对象,展现形式是16进制 （进制转化）。
//  就是为了js在我们node中运行的时候可以有处理二进制数据的能力 （
// Blob 不能直接进行文件的处理， 
// ArrayBuffer 不能直接操作二进制数据，buffer就是可以直接处理）


// 进制之间的关系  （100块 表现成2张50， 10张10块） 可以通过不同的方式表现相同内容 

// 255 
// 11111111
// ff

// 进制如何转化的? 

// 二进制都是以0b开头的  任意进制转换十进制 方案 （乘权求和法）

// 1          0         0
// 1*2^2  +   0*2^1   +  0*2^0  =4
// 1           1        0
// 1*2^2   +  1*2^1  +  0  = 6
// 当前位的值 * 进制^(所在位-1) 累加

// ff
// 15 * 16^1 +  15 * 16^0
// 反过来 我希望将10进制转换成任意进制怎么算（反向取余）

// 0b 2进制  0  8进制  0x 16进制  

console.log(parseInt('010101', 2))
console.log(parseInt('10', 8))
console.log(parseInt('0x16', 16)); // 将任意进制转换成10进制

console.log((100).toString(16)); //  可以转换成其他任意进制

console.log(0.2 + 0.2); // 进制转化导致  需要将0.1放入到内存中
console.log((0.1).toString(2))
console.log((0.2).toString(2))

// 小数转整数，采用的方式是乘二取整法

// 0.1
// 0.1 * 2 = 0.2    0
// 0.2 * 2 = 0.4    0
// 0.4 * 2 = 0.8    0
// 0.8 * 2 = 0.6    1
// 0.6 * 2 = 0.2    1
// 0.0001100110011001100110011001100110011001100110011001101
// 0.001100110011001100110011001100110011001100110011001101

// 0.30000000000000004

// 进制 -》 “编码”
// 常见的编码有哪些？ utf8  gb2312  unicode ascii (我们node默认只支持utf8)

// 最早编码采用的是ascii  字节-》 1个字节由8个位组成    11111111 -》 255  127个
// 01111111

// gb2312 简体中文，用两个字节来表示  < 127 *  11111111  (取值范围大概在 （255-127)*255)
// gbk 扩展字体 在基础上，支持了繁体，日语，韩语。。
// gb18030
// unicode 将所有的符号全部统一管理
// utf组织 基于unicode来进行编码的  1-4个字节来进行标识 
// 1个字节就是基于ascii  3个字节就是一个汉字  （gbk编码一个汉字是两个字节, node中不支持gbk编译）

// base64编码 (传输问题) （base32编码） 基于转换规则来编码的

// 1个字节8个位， 1个汉字由3个字节组成  1个汉字是24个位
// 64 ？ 每一个字节不得大于64

// 缺点就是以前是3个字节 -> 4个字节 大了1/3
console.log(Buffer.from('帅')) // 0xe5 0xb8 0x85
console.log((0xe5).toString(2))
console.log((0xb8).toString(2))
console.log((0x85).toString(2))
// 00111001   00011011  00100010    00000101
console.log(parseInt('00111001', '2'))
console.log(parseInt('00011011', '2'))
console.log(parseInt('00100010', '2'))
console.log(parseInt('00000101', '2'))
// 57 27 34 5
let code = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
code += code.toLowerCase();
code += '0123456789' // 62
code += '+/'; // 64
console.log(code[57] + code[27] + code[34] + code[5]); // 5biF

// 如何实现一个base32 00001111

// 一个汉字三个字节 
console.log(Buffer.from('帅'))
console.log(Buffer.from('5BIF')) // base64不能转化大文件