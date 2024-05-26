# JavaScript學習筆記
## 關於JavaScript
- 輕量腳本語言
- 跨平台
- 物件導向
	- 可寫自己的class
- 主要目的
	- 簡單嵌入其他產品和應用程式（例如：網頁瀏覽器）而設計
- 直譯式(interpreted) 、 Just-in-time即時編譯
	- 編譯式與直譯式的差異
		- 編譯式效能較佳，直譯式較差，因為他看一行編譯一行
		- 編譯式語言在compiler後變數都是確定的，但JS不一定，因此JS不好除錯。
- 具一級函式(first-class functions)語言 ，可以被塞進去變數，也就是可以獨立存在，C#不行
	- 以方法為第一等公民
	- c#寫方法 -> 先寫class > method 

## 關於變數宣告
1. `var`
	1. 宣告一個可以隨意更改其內容的變數，定義了一個全域變數，或是在整個 function 而不管該區塊範圍
	2. 可為global或local(視宣告處而定)，可選擇性設定初始值
```js
function varTest() {
  var x = 1;
  {
	var x = 2; // 這裡的 x 與 function 區塊內部的 x 是一樣的，因此會影function 區塊內所有的x
	console.log(x); // 2
  }
  console.log(x); // 2
}
```
2. `let` 
	1. 可以宣告只能在目前區塊、階段或表達式中作用的變數。
	2. 可為global或local(視宣告處而定)，可選擇性設定初始值
	3. 有block-scoped效應
```js
function letTest() {
  let x = 1;
  {
	let x = 2; // 這裡的 x 與 function 區塊內部的 x 是不同的，只會作用在這層 block 區塊中
	console.log(x); // 2
  }
  console.log(x); // 1
}

```
3. `const`
	1. 常數必須指定初始值
	2. 有block-scoped效應
	3. 宣告一個只可讀取不可更改其內容的常數
	4. 無法重新被assign，但可以透過索引改值，例如：
	   const array=[1,2,3];
	   array=[4,5,6]; // Error
	   array[1]=100;  // Okay
4.  直接指定 （會直接是全域變數）JS裡全域是指window物件

***結論***
```
1. var 和直接指定的宣告，皆是在全域 window上
2. 字串可以使用單引號與雙引號
3. 宣告變數未賦值 -> undefined
```
---
### 討論
- 為什麼let比var好？
	- **區塊級別作用域**
	- **重複聲明**
		- 在相同的作用域內，使用 `let` 不能重複聲明同名變數，而使用 `var` 可以。這有助於防止變數的意外重新賦值。
	```js
	let x = 5;
	let x = 10; // SyntaxError: Identifier 'x' has already been declared
	var y = 5;
	var y = 10; // 沒有錯誤，y 的值被重新賦值為 10
	```
	- ***變數提升***
		- 使用 `var` 宣告的變數會發生提升（hoisting），即它們在函式或全局範圍內的頂部被宣告，但初始化在賦值語句之前。這可能導致在變數賦值之前就訪問變數，其值為 `undefined`。`let` 不會發生提升，它在區塊級作用域中存在"臨時性死區"（Temporal Dead Zone，TDZ），只有在宣告語句執行時才初始化。
	```js
		console.log(a); // undefined
		var a = 5;
		
		console.log(b); // ReferenceError: b is not defined
		let b = 10;
	```

## 變數的命名規則
    必須使用字母、***下底線( _ )***、***錢號（$）***作為開頭
    後面接字元或數字
    區分大小寫

1. camel case 駝峰式命名法 小駝峰(lower camel case)
	``let lastName = 'Kevin';``
2. pascal case 大駝峰式命名法（upper camel case）
	``let LastName= 'John';``
3. Snake Case
	``以小寫單字開頭，若有多個單字則以底線區隔連接
	``let last_name='John';``
4. Kebab Case
	``以小寫單字開頭，若有多個單字則以hyphen區隔連接``
	``此命明方法在JS中不合法、不被接受``
	``let last-name = 'John';``
5. constant 常數命名
	``全大寫方式``
	``const PI=3.14;``
	``const PURE_WEIGHT=10; (UPPER_SNAKE_CASE)``
6. Function 命名
	``Camel Case``
```js
//Function Declaration 
//計算圓的週長:直徑× 圓周率 
function getCircle(r) {
	return r * 2.0 * Math.PI;
}
```
1. Class命名
	``Pascal Case``
	``class CalcRectangle{...}``
2. Boolean 命名
	``可用is或has開頭 ＋ Camel case``
	 ``let isVisible = true;``
3. Private 私有變數命名
	``底線開頭``
	``let _defaultSetting = 3000;``
4. Global全域變數命名
	``全大寫``
	``let DOMAIN ="https://www.codemagic.com.tw";``
---
## 變數的範圍
- ES6 ECMA2015前 沒有 區塊block statement
- block statement 幫我們做好了區塊範圍，在範圍內的變數只要不是在window全域物件上，在外面是無法使用的
--- 
## 關於Debug
三種
- 瀏覽器開發者工具
	- Console頁籤 -- console.log() (.js & .html)
	- Sources頁籤 -- 設定中斷點，進入偵錯模式(.html)
- 在Script中設定debugger關鍵子(.html)

---



## 九種資料與結構型別
### 用``typeof(a)`` or ``typeof a`` 來檢視變數型別
1. 六種資料型別(Primitive Type基本型別，用`typeof`來檢查)
	- undefined : 僅宣告變數，未指派值，系統自會指派值
		- 變數已宣告，但未賦值，或者物件屬性不存在
	- boolean : true or false
	- number :帶正負號的雙精度數字
	-  string : 字串
	- BigInt : 大整數
	- Symbol : 符號
2.  null : 空值 (特殊Primitive型別)
	- typeof(null) === "object"
		- null不是代表沒有，是一種沒有的有，代表一種特殊的基礎型別
		- null 表示一個“空”或”不存在“的特殊值，**表示該變數的值被明確地設定為空或不存在**
1. Function : 函式方法()
2. Object : 物件(結構，常用於資料結構)

### typeof 型別判斷
>說是型別判斷，但實際上應該是判斷值才對，因為javascript中，變數是沒有型別的，值才有。

```js
typeof true; // 'boolean' 
typeof 'Kuro'; // 'string' 
typeof 123; // 'number' 
typeof NaN; // 'number' 
typeof { }; // 'object' 
typeof [ ]; // 'object' 
typeof undefined; // 'undefined' 
typeof window.alert; // 'function' 
typeof null; // 'object'	
```

- 為什麼`typeof NaN`是number ?
	- `NaN` 代表 "Not a Number"，它是一種*特殊的數值*，用來表示一個在數學運算中無法確定結果的值。`NaN` 的型別是 `number`，這是因為 JavaScript 中的所有數值型別都屬於 `number`。
- 為什麼`typeof null` 是object ?
	- JavaScript 的值是由一個表示「型別」的標籤，與實際內容的「值」所組合成的。
		- 物件 (Object) 這個型別的標籤是「0」，而且 null 代表的是空值 (NULL pointer，慣例上會以 0x00 來表示)，於是代表 null 的標籤就與物件的標籤搞混，而有著這樣錯誤的結果
- 如何判別是否為陣列 ?
	- `Array` 定義了 `isArray()` 方法
	```js
	Array.isArray([]); // true 
	Array.isArray([1]); // true 
	Array.isArray(new Array()); // true 
	Array.isArray(); // false 
	Array.isArray({}); // false 
	Array.isArray(null); // false 
	Array.isArray(undefined); // false
	```



***討論***
### undefined v.s.  not defined v.s. null
##### null v.s. undefined
```js
let a = null; // 變數 a 的值是 null
let b;       // 變數 b 的值是 undefined
```

```js
let c = null;
let d;
console.log(c); // null
console.log(d); // undefined
```
**類型：**
- `null` 是一個表示空值的物件，它的類型是 "object"。
- `undefined` 是一個表示未定義值的原始型別，它的類型是 "undefined"。
```js
console.log(typeof null);      // "object"
console.log(typeof undefined); // "undefined"
```
**比較：**
- 在值比較時（使用 `==` 或 `===`），`null` 和 `undefined` 是相等的。
- 注意，使用嚴格相等運算符 `===` 進行比較時，它們的類型也需要相等。
```js
console.log(null == undefined); // true
console.log(null === undefined); // false
```
***結論**
>`null`表示變數是空值，而`undefined`表示變數未賦予值或物件屬性不存在。設計中，通常建議使用 `undefined` 來表示變數的初始狀態，而使用 `null` 來明確地將變數設定為空。

---
## 會被當成false的值
- false
- undefined
- null
- 0
- NaN
- 空字串("")
---
## 為什麼在設計web時，js很常宣告都不給值？
- 因為在web上，通常資料都是動態生成的，會用動態的方式給值，很少會直接assign值，因此沒有必要先給他值，而是讓js自動賦予他一個初始值為undefined，後面再來藉由賦值改變型態，而當我們知道變數的初始值應該是空值時，我們也可以在宣告時就給予他null。
- 當你聲明一個變數而不賦予它一個明確的值時，該變數的初始值就是 `undefined`。這是因為 JavaScript 的設計理念之一是支持動態生成和修改數據，因此開發者可以在運行時動態分配值。
- 實際的開發中，有時候你確實不知道一個變數的初始值應該是什麼，或者你知道該變數將在稍後的代碼中被賦值。在這種情況下，讓變數的初始值為 `undefined` 是合理的。
```js
	let username; 
	// 初始值為 undefined，因為我們還不知道用戶名是什麼
	// 在某個地方後面的代碼中賦值
	username = generateUsername(); 
	// 假設有一個函式生成用戶名
```
- 這種方式使得變數的聲明更加靈活，同時不需要明確指定一個初始值。當然，如果你確實知道變數的初始值應該是空（而不是 `undefined`），那麼使用 `null` 也是可以的。這取決於代碼的設計和需求。
### 為何JS宣告變數不用精確型別 ? 
因為在做網路資料程式時web的資料很常是從網路上來的，我們並不會知道他是物件還是陣列還是字串....等等，而在企業營運上，我們通常上版是一個很大的工程，這時候我們不可能因為資料型別的不同，而常常去改資料的型別，像是C#強型別語言那樣，JS任何型別都能吃，因此這就是js動態型別（Dynamic typing）在寫web上強大的地方。

---
## 字串轉數值
- ``parseInt()``
- ``parseFloat()``
```js
let numStr='123.456';
console.log(numStr);

let intNum=parseInt(numStr);
console.log(intNum); 

let floatNum=parseFloat(numStr);
console.log(floatNum);
```
### 字面值(Literals)


## 流程控制與迭代(Iteration)
- 最基本判斷式與流程控制 -> 區塊陳述式
	- 常見的有： 
	- if...else
	- switch
	- try...catch
	- throw
	- break
	- block
	- continue
	- empty
- Iteration (迭代)
	- while
	- do ... while
	- for
	- **for ... in** 取的是index
	- **for ... of** 取的是item
		- array
		- object
	- for await ... of

迭代forEach
```js
	//3. 動態產生ul>li*3
	
	// let ul = document.createElement('ul');
	// let li1= document.createElement('li');
	// let li2= document.createElement('li');
	// let li3= document.createElement('li');
	
	// document.body.append(ul);
	// ul.append(li1,li2,li3);
	// li1.innerText='Node';
	// li2.innerText='NodeList';bb
	// li3.innerText='HTMLCollection';

//3-1. 使用更技巧的方式動態產生

	let ul =document.createElement('ul');
	let list=['Node','NodeList','HTMLCollection'];
	list.forEach((item,index) => {
		let li = document.createElement('li');
		li.innerText=item;
		ul.append(li);
		});
	
	document.body.append(ul);
```
---

## 定義函式
- 命名統一小寫（小駝峰）
```js
function square(number) {
	return number*number;
}

function add(num1,num2){
	return num1 + num2;
}

let result=square(2);

console.log(result);
console.log(add(10,20));
```


## 運算式與運算子
JavaScript 有以下幾種運算子。 此處將描述運算子以及一些運算子的優先順序。
- [賦值運算子](https://developer.mozilla.org/zh-TW/docs/Web/JavaScript/Guide/Expressions_and_operators#%E8%B3%A6%E5%80%BC%E9%81%8B%E7%AE%97%E5%AD%90)
- [比較運算子](https://developer.mozilla.org/zh-TW/docs/Web/JavaScript/Guide/Expressions_and_operators#%E6%AF%94%E8%BC%83%E9%81%8B%E7%AE%97%E5%AD%90)
- [算術運算子](https://developer.mozilla.org/zh-TW/docs/Web/JavaScript/Guide/Expressions_and_operators#%E7%AE%97%E8%A1%93%E9%81%8B%E7%AE%97%E5%AD%90)
- [位元運算子](https://developer.mozilla.org/zh-TW/docs/Web/JavaScript/Guide/Expressions_and_operators#%E4%BD%8D%E5%85%83%E9%81%8B%E7%AE%97%E5%AD%90)
- [邏輯運算子](https://developer.mozilla.org/zh-TW/docs/Web/JavaScript/Guide/Expressions_and_operators#%E9%82%8F%E8%BC%AF%E9%81%8B%E7%AE%97%E5%AD%90)
- [字串運算子](https://developer.mozilla.org/zh-TW/docs/Web/JavaScript/Guide/Expressions_and_operators#%E5%AD%97%E4%B8%B2%E9%81%8B%E7%AE%97%E5%AD%90)
- [條件（三元）運算子](https://developer.mozilla.org/zh-TW/docs/Web/JavaScript/Guide/Expressions_and_operators#%E6%A2%9D%E4%BB%B6%EF%BC%88%E4%B8%89%E5%85%83%EF%BC%89%E9%81%8B%E7%AE%97%E5%AD%90)
- [逗點運算子](https://developer.mozilla.org/zh-TW/docs/Web/JavaScript/Guide/Expressions_and_operators#%E9%80%97%E9%BB%9E%E9%81%8B%E7%AE%97%E5%AD%90)
- [一元運算子](https://developer.mozilla.org/zh-TW/docs/Web/JavaScript/Guide/Expressions_and_operators#%E4%B8%80%E5%85%83%E9%81%8B%E7%AE%97%E5%AD%90)
- [關係運算子](https://developer.mozilla.org/zh-TW/docs/Web/JavaScript/Guide/Expressions_and_operators#%E9%97%9C%E4%BF%82%E9%81%8B%E7%AE%97%E5%AD%90)

|名稱|簡化的運算子|意義|
|---|---|---|
|[賦值 (en-US)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators#Assignment_operators#assignment "Currently only available in English (US)")|`x = y`|`x = y`|
|[加法 (en-US)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators#Assignment_operators#addition_assignment "Currently only available in English (US)")[賦值 (en-US)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators#Assignment_operators#assignment "Currently only available in English (US)")|`x += y`|`x = x + y`|
|[減法 (en-US)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators#Assignment_operators#subtraction_assignment "Currently only available in English (US)")[賦值 (en-US)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators#Assignment_operators#assignment "Currently only available in English (US)")|`x -= y`|`x = x - y`|
|[乘法 (en-US)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators#Assignment_operators#multiplication_assignment "Currently only available in English (US)")[賦值 (en-US)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators#Assignment_operators#assignment "Currently only available in English (US)")|`x *= y`|`x = x * y`|
|[除法 (en-US)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators#Assignment_operators#division_assignment "Currently only available in English (US)")[賦值 (en-US)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators#Assignment_operators#assignment "Currently only available in English (US)")|`x /= y`|`x = x / y`|
|[餘數 (en-US)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators#Assignment_operators#remainder_assignment "Currently only available in English (US)")[賦值 (en-US)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators#Assignment_operators#assignment "Currently only available in English (US)")|`x %= y`|`x = x % y`|
|[指數 (en-US)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators#Assignment_operators#exponentiation_assignment "Currently only available in English (US)")[賦值 (en-US)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators#Assignment_operators#assignment "Currently only available in English (US)")|`x **= y`|`x = x ** y`|
|[左移賦值 (en-US)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators#Assignment_operators#left_shift_assignment "Currently only available in English (US)")|`x <<= y`|`x = x << y`|
|[右移賦值 (en-US)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators#Assignment_operators#right_shift_assignment "Currently only available in English (US)")|`x >>= y`|`x = x >> y`|
|[無號右移賦值 (en-US)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators#Assignment_operators#unsigned_right_shift_assignment "Currently only available in English (US)")|`x >>>= y`|`x = x >>> y`|
|[位元 AND 賦值 (en-US)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators#Assignment_operators#bitwise_and_assignment "Currently only available in English (US)")|`x &= y`|`x = x & y`|
|[位元 XOR 賦值 (en-US)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators#Assignment_operators#bitwise_xor_assignment "Currently only available in English (US)")|`x ^= y`|`x = x ^ y`|
|[位元 OR 賦值 (en-US)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators#Assignment_operators#bitwise_or_assignment "Currently only available in English (US)")|`x \|= y`|`x = x \| y`|


###  位元運算

| 運算子                                                                                                                                                              | 用法        | 描述                                         |
| ---------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------- | ------------------------------------------ |
| [位元 AND (en-US)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators#bitwise_and "Currently only available in English (US)")             | `a & b`   | 回傳兩個運算元對於每個 bit 做 AND 的結果。                 |
| [位元 OR (en-US)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators#bitwise_or "Currently only available in English (US)")               | `a \| b`  | 回傳兩個運算元對於每個 bit 做 OR 的結果。                  |
| [位元 XOR (en-US)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators#bitwise_xor "Currently only available in English (US)")             | `a ^ b`   | 回傳兩個運算元對於每個 bit 做 XOR 的結果。                 |
| [位元 NOT (en-US)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators#bitwise_not "Currently only available in English (US)")             | `~ a`     | 將運算元中的每個 bit 反轉(1->0,0->1)。                |
| [左移 (en-US)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators#left_shift "Currently only available in English (US)")                  | `a << b`  | 將 `a` 的每個 bit 向左移動 `b` 個 bits，空餘的位數以 0 填滿。 |
| [有號右移 (en-US)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators#right_shift "Currently only available in English (US)")               | `a >> b`  | 將 `a` 的每個 bit 向右移動 `b` 個 bits，空餘位數以最高位補滿。  |
| [以 0 填充的右移 (en-US)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators#unsigned_right_shift "Currently only available in English (US)") | `a >>> b` | 將 `a` 的每個 bit 向右移動 `b` 個 bits，空餘的位數以 0 填滿。 |

|運算子類型|屬於該類別的運算子|
|---|---|
|成員|`. []`|
|呼叫/建立 實例|`() new`|
|反向/增加|`! ~ - + ++ -- typeof void delete`|
|乘法/除法|`* / %`|
|加法/減法|`+ -`|
|位元移動|`<< >> >>>`|
|關係運算子|`< <= > >= in instanceof`|
|相等性|`== != === !==`|
|位元 and|`&`|
|位元 xor|`^`|
|位元 or|`\|`|
|邏輯 and|`&&`|
|邏輯 or|`\|`|
|條件運算子|`?:`|
|指定運算子|`= += -= *= /= %= <<= >>= >>>= &= ^= \|=`|
|逗點運算子|`,`|

JavaScript 提供三種不同的值比較運算操作：
- 嚴格相等 (或稱 "三等於"、"全等") 使用 [=== ](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators#identity "Currently only available in English (US)")
- 一般相等 ("雙等於") 使用 [== ](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators#equality "Currently only available in English (US)")
- 還有 [`Object.is` ](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is "Currently only available in English (US)") (ECMAScript 2015 新加入)

	```js
	let num=15;
	
	let numStr='15';
	
	//嚴格相等
	//不轉型，比較型別
	console.log(num === numStr)
	
	//一般相等
	//js會自動轉型
	console.log(num == numStr)
	
	//ES6出現的
	
	console.log(Object.is(num,numStr))
	```

|比較值 B|   |   |   |   |   |   |
|---|---|---|---|---|---|---|
|||Undefined|Null|Number|String|Boolean|Object|
|比較值 A|Undefined|`true`|`true`|`false`|`false`|`false`|`false`|
|Null|`true`|`true`|`false`|`false`|`false`|`false`|
|Number|`false`|`false`|`A === B`|`A === ToNumber(B)`|`A === ToNumber(B)`|`A == ToPrimitive(B)`|
|String|`false`|`false`|`ToNumber(A) === B`|`A === B`|`ToNumber(A) === ToNumber(B)`|`A == ToPrimitive(B)`|
|Boolean|`false`|`false`|`ToNumber(A) === B`|`ToNumber(A) === ToNumber(B)`|`A === B`|`ToNumber(A) == ToPrimitive(B)`|
|Object|`false`|`false`|`ToPrimitive(A) == B`|`ToPrimitive(A) == B`|`ToPrimitive(A) == ToNumber(B)`|`A === B`|

|x|y|`==`|`===`|`Object.is`|
|---|---|---|---|---|
|`undefined`|`undefined`|`true`|`true`|`true`|
|`null`|`null`|`true`|`true`|`true`|
|`true`|`true`|`true`|`true`|`true`|
|`false`|`false`|`true`|`true`|`true`|
|`"foo"`|`"foo"`|`true`|`true`|`true`|
|`{ foo: "bar" }`|`x`|`true`|`true`|`true`|
|`0`|`0`|`true`|`true`|`true`|
|`+0`|`-0`|`true`|`true`|`false`|
|`0`|`false`|`true`|`false`|`false`|
|`""`|`false`|`true`|`false`|`false`|
|`""`|`0`|`true`|`false`|`false`|
|`"0"`|`0`|`true`|`false`|`false`|
|`"17"`|`17`|`true`|`false`|`false`|
|`[1,2]`|`"1,2"`|`true`|`false`|`false`|
|`new String("foo")`|`"foo"`|`true`|`false`|`false`|
|`null`|`undefined`|`true`|`false`|`false`|
|`null`|`false`|`false`|`false`|`false`|
|`undefined`|`false`|`false`|`false`|`false`|
|`{ foo: "bar" }`|`{ foo: "bar" }`|`false`|`false`|`false`|
|`new String("foo")`|`new String("foo")`|`false`|`false`|`false`|
|`0`|`null`|`false`|`false`|`false`|
|`0`|`NaN`|`false`|`false`|`false`|
|`"foo"`|`NaN`|`false`|`false`|`false`|
|`NaN`|`NaN`|`false`|`false`|`true`|

---
## Array
- old school
```js
	var arr = new Array();
	arr[0]="a";
	arr[1]="b";
	arr[2]="c";

	arr.length; // 3
```

- new -> Array literal (陣列實字)
```js
var arr=[];
arr[0]="a";
arr[0]="b";
arr[0]="c";

a.length; //3
```

```js
var arr=["a","b","c"];
arr.length; //3
```

- `ArrayName.Length`可以取得陣列長度，*也可以被覆寫*
```js
var arr=["a","b","c"];
arr.length ; //3

arr.length = 1 ;
console.log(arr) ; //["a"]

arr.length = 3;
console.log(arr); //["a",undefined,undefined]
```

***一維陣列***
```js
	let array1 = [];  
	let array2 = new Array(); let array3 = new Array(10);
	
	let computer = ['CPU', 'DRAM' , 'SSD', 'Mouse'];  //直接宣告literal
	let comp = new Array('CPU', 'DRAM' , 'SSD', 'GPU');
```

***二維陣列***
```js
	let products = [  
	['CPU', 'DRAM' , 'SSD', 'Mouse'], 
	['BMW', 'Benz', 'Audi', 'Lexus'], 
	['Apple', 'Banana', 'Cherry'] ];
```

***判斷Array陣列型別***
```js
	let array1 = [1, 3, 5, 7]; //顯示型別 - 不精準
	console.log(typeof array1); //判斷是否為Array實例 - 精準
	console.log(array1 instanceof Array); 
	console.log(Array.isArray(array1));
```

***用for迭代陣列（老式）***
```js
	let cars=['BMW','Benz','Audi','Lexus'];
	for(let i=0;i<cars.length;i++){
		console.log(cars[i]);
	}
```
***用forEach迭代陣列（首推）***
```js
	let cars=['BMW','Benz','Audi','Lexus'];
	cars.forEach(function(car,index){
		console.log(index,car,typeof car);
	})
	//或是arrow function
	cars.forEach((car,index)=>{
		console.log(index,car,typeof car);
	})
```

***用for...of迭代陣列***
```js
	const fruits=["Apple", "Mango", "Cherry"];
	for(const fruit of fruits) {
		 console.log(fruit);
	}
	//替for...of加上索引
	for(const [index,fruit] of fruits.entries()){
		console.log(`${index},${fruit}`);
	}
	//[0,'Apple'],[1,'Mango']...
```
- `entries()` 是 JavaScript 陣列（Array）原型上的一個方法。它返回一個陣列迭代器（Array Iterator），該迭代器包含陣列中每個索引/值對的陣列。每個陣列中的元素包含兩個值，分別是索引和相應的元素值。而不需要額外的索引變數。在實際應用中，`entries()` 常用於迭代陣列的鍵/值對。
***動態新增Array元素 -> push()***
```js
	let friends =[];
	let person1 = { 
		id : 1,
	    name : "kevin",
	    email : "kevin@gmail.com"
	};
	let person2 = { 
		id : 2,
	    name : "mary",
	    email : "mary@gmail.com"
	};

	//新增
	friends.push(person1);
	friends.push(person2);
	friends.push(person1,person2);
```

***討論***
- `javascript`的array可以存多種資料嗎？
	- `javascript`中的同一個`array`，可以存放多種的資料型態，但不建議
- 長度可以隨時增加嗎？
	> 可以，當有一個`array`var arr=['a',b','c'];時，`arr.length`為3，此時當我想在`index`5的位置增加資料，`arr[5]='f'`
	> output 為 `["a","b","c",undefined,undefined,"f"]`
	> 
- 如何在`array`末端增加元素？
	- arrayName.push( ) ;
- 如何移除最後一個元素？
	- arrayName.pop( ) ;
- 如何移除`array`首個元素 ?
	- arrayName.shift( ) ;
- 如何在`array`的開頭新增一個或多個元素？
	- arrayName.unshift( 1) ; 
		- 在開頭新增元素1
	-  arrayName.unshift(-2,-1,0) ;
		- 在開頭新增 -2,-1,0
---
## 物件的定義
>C#中的物件，是由欄位、屬性、方法組合而成
JS物件是由properties集合、function() 組合而成

- property除了指定value外，還可以指定function，就變成熟悉的method
- 早期以來JS是prototype-base語言，沒有class關鍵字，而是以function來替代class
- 直到ECMA2015才支援class關鍵字，但涉及瀏覽器相容性問題，例如IE不支援

**Object Literal**
```js
	var person = { name: "Kevin", age: 32,
	               height: 175, weight: 64 };
	//直接指派值給變數即為Literal，但如果用初始化方式就不是
	console.log(person);
	
	var person = {
	    name: "Kevin",
	    age: 32,
	    height: 175,
	    weight: 64,
	    bmi: function () {
			//object literal語法需要用this才能存取到本身屬性
	        return this.weight / ((this.height / 100) ** 2);
	    }
	    //bmi是屬於method
	};
	console.log(person);
	console.log(person.bmi());
```

### 物件及屬性
- old school
```javascript
var person = new Object(); 
	person.name = 'Kuro'; 
	person.job = 'Front-end developer'; 
	person.sayName = function() {
		alert( this.name ); 								 
	};
```
- new
	- Object literal (物件實字)，類似`json`格式的核心語法
```javascript
var person = { 
	name: 'Kuro', 
	job: 'Front-end developer', 
	sayName: function() { 
		alert( this.name ); 
		} 
};
```

### 屬性的存取
- 用 `.` 存取
```javascript
var person =  {
	name:'Tino',
	job: 'Student',
	sayName: fuction() {
		alert(this.name);
	}
};
person.name;   //'Tino'
person.sayName; // 'Tino'
```
- 用`[]`存取
	- 當屬性名稱是數字或是不合法 (如帶有**空白的字串或是數字**)的名稱時非常有用
	- 第二種方式常用於屬性的名稱來自網路資料， 例如JSON ，事後動態帶入;而非事先存在， 或不知屬性名稱，故無法使用第一種方式
```javascript
var person =  {
	name:'Tino',
	job: 'Student',
	sayName: fuction() {
		alert(this.name);
	}
};

person["name"];    //'Tino'
person["sayName"]();//'Tino'
```

```javascript
var ob1={
	"001"="Hello"
}
ob1.001; //SyntaxError:Unexpected number

ob1["001"];  // "Hello"
```

### 存取物件屬性names與values
回傳皆是Array
- Object.keys(物件)
	- 取得所有key名稱
- Object.values(物件)
	- 取得所有value名稱
###  Add a property
- use `=` to assigned;
```javascript
var obj = { }; 
obj.name = 'Object'; 

obj.name; // 'Object'
```
### Delete property
- `delete` obj.name ; 
```js
var obj = { };
obj.name = 'Object';
obj.name; // 'Object' 
delete obj.name; 
obj.name; // 刪除屬性後變成 undefined
```
- 要確認屬性是否存在時，可以去看他印出來的值是否為undefined
- `in` 運算子 與 `hasOwnProperty()` 也是一種方法
```js
var ob1={
	name: 'Tino' 
};

//in 
console.log('name' in ob1);//true
console.log('value' in ob1);//false

//hasOwnProperty()
ob1.hasOwnProperty('name'); //true
ob1.hasOwnProperty('value'); //false
```

---
## Array V.S Object
***差異性***
>陣列可以用foreach迭代，物件沒辦法用迭代！
因此在執行foreach之前要先判斷此資料結構是否是陣列，可以使用`Array.isArray(array_name)`來判斷
### Array 與Object的混合-觀念
- 一般來說設計上，一個資料會以陣列包物件的結構較佳，因為陣列才有許多方法可以調用，例如迭代，而物件沒有。
```js
	let allCities = [  
	{ id: 'taipei', name: '台北' }, //Object1
	{ id: 'taoyuan', name: '桃園' }, //Object2
	{ id: 'taichung', name: '台中' } //Object3
	];
```
- 但是陣列包物件有一個致命缺陷，當資料有多版本問題時無法得知是什麼日期。
- 因此有時會設計成最外層是物件，裡面的每個屬性也是物件，但是主要資料會用物件包陣列的方式來呈現，這樣也同樣能使用陣列的特性來操作資料。
```js
	let cityArray = [
	{ name: 'taipei',
	  ch_name: '台北', 
	  districts: [
		{ id: 'taipei01', district: '中正區' },  
		{ id: 'taipei02', district: '萬華區' },  
		{ id: 'taipei03', district: '信義區' }] },
	
	{ name: 'taoyuan', 
	  ch_name: '桃園', 
	  districts: [
		{ id: 'taoyuan01', district: '桃園市' },  
		{ id: 'taoyuan02', district: '八德市' },  
		{ id: 'taoyuan03', district: '中壢市' }] },
	
	{...} 
	];
```

```js
	//確診,死亡,治癒
	let virus = {
		Taiwan: [41, 1, 12],  
		China: [80134, 2914, 44595], 
		America: [9665, 146, 694]
	}
	//缺點：資料的可讀性非常差，若沒有了註解，則不知道資料所代表的意義
```

---

## 瀏覽器的工作原理
https://developer.mozilla.org/zh-CN/docs/Web/Performance/How_browsers_work#tcp_%E6%8F%A1%E6%89%8B
- 瀏覽器是單執行緒
	- 每一個渲染需排隊
	- 就好比便利商店只有一位店員，有人要結帳，也有人要買咖啡，這時就要排隊
1. 導航
	1. 加載Web的第一步，透過點擊url或超連結等行為
2. DNS查詢
	1. 將一個網址透過DNS查詢，最終會得到此網址的IP位置
	2. 透過主機名稱載入一個頁面通常只需要一次DNS查詢。但是，對於頁面指向不同的主機名，則需要多次DNS查詢。如果字體（字體）、圖像（圖像）、腳本（腳本）、廣告（廣告） ）和網站統計（metric）都有不同的主機名，則需要對每個主機名稱進行DNS查詢。
	3. ![[Pasted image 20231227224803.png]]
3. TCP握手
	1. 取得到伺服器IP位址，瀏覽器就會透過[TCP「三次握手」(en-US)](https://developer.mozilla.org/en-US/docs/Glossary/TCP_handshake "目前僅提供英文（美國）版本")與伺服器建立連線。
	2. 為了讓終端嘗試進行通訊－在瀏覽器和伺服器上透過上層協定[HTTPS](https://developer.mozilla.org/zh-CN/docs/Glossary/HTTPS)在傳送資料之前，可以先設定網路TCP 配置連接的一些參數。
4. TLS協商
	1. 對於透過HTTPS建立的安全連接，還需要進行另一次「握手」。這種握手，或者說[TLS](https://developer.mozilla.org/zh-CN/docs/Glossary/TLS)協商決定，使用哪種密碼對通訊進行加密，驗證伺服器，並在開始實際資料傳輸之前建立安全連接。就需要在實際發送內容請求之前，再往返伺服器五次。
	2. ![[Pasted image 20231227225220.png]]
	3. 建立安全連線對增加了載入頁面的等待時間，對於建立安全的連線來說，以增加等待時間為代價是值得的，因為在瀏覽器和網路伺服器之間傳輸的資料不會被第三方解密。經過8次往返，瀏覽器終於可以發出請求
5.  [解析](https://developer.mozilla.org/zh-CN/docs/Web/Performance/How_browsers_work#%E8%A7%A3%E6%9E%90)
	1. 瀏覽器將透過網路接收的資料轉換為[DOM](https://developer.mozilla.org/zh-CN/docs/Glossary/DOM)和[CSSOM](https://developer.mozilla.org/zh-CN/docs/Glossary/CSSOM)的步驟，透過渲染器把DOM和CSSOM放到螢幕上上一頁成頁面。
	2. 一旦瀏覽器接收到資料的第一塊，它就可以開始解析接收的資訊了。[「解析」](https://developer.mozilla.org/zh-CN/docs/Glossary/Parse)是瀏覽器將透過網路接收的資料轉換為[DOM](https://developer.mozilla.org/zh-CN/docs/Glossary/DOM)和[CSSOM](https://developer.mozilla.org/zh-CN/docs/Glossary/CSSOM)的步驟，透過渲染器把DOM和CSSOM放到螢幕上上一頁成頁面。
	3. DOM 是瀏覽器標記的內部表示。DOM 也是被揭露的，可以透過 JavaScript 中的各種 API 進行 DOM 操作。
	4. 即使請求頁面的 HTML 最大最終的 14KB 資料包，瀏覽器也會開始解析並嘗試根據其擁有的資料進行渲染。這就是為什麼在前面 14KB 中包含瀏覽器開始頁面渲染所需的所有內容，或至少包含頁面模板（第一次渲染所需的CSS和HTML）對於web效能優化來說是很重要的。但是在渲染到螢幕上面之前，HTML、CSS、JavaScript必須被解析完成。
6. 當拿到一份html文件時，瀏覽器所做的事情就是構建一個DOMtree

---

## DOM

- 依照html文件結構，產出一份DOMtree樹狀結構，把節點都放在tree上
- 有DOM，JS才能做互動
- DOM渲染完後，會被放在Document裏面
- 我們所講的DOM全部都在document底下，而document在全域物件window裡

### JS動態設定HTML元素的過程
- DOM 是Document Object Model文件物件模型
- JavaScript利用DOM Selector選取HTML元素
- 然後改變HTML文件結構、Element元素樣式與內容
- 或者從DOM Tree結構中抽取資料

### (Document Object Model) DOM Selector 
>用DOM Selector 選取html元素
>html產生DOM Tree ->JS透過DOM API 操作DOM Tree ->動態新增元素或讀取元素資料。

- 瀏覽器開啟網站的流程
	1. 解析html原始碼
	2. 建構DOM Tree
		1. 解析過程中，瀏覽器會將html文件轉換成一個DOM Tree。每個html 元素標籤都會是tree中的一個節點，元素的屬性和內容值則成為節點的屬性和值。
	3. 樹狀結構建構完成
		1. DOM 樹形成了一個樹狀結構，其中根節點是整個 HTML 文檔。每個 HTML 元素都是樹中的一個節點，並以層次結構表示元素之間的關係。
	4. 進行渲染
		1. 一旦 DOM 樹構建完成，瀏覽器就有了對整個文檔的抽象表示。然後，基於這個 DOM 樹，瀏覽器開始進行渲染，生成頁面上的視覺呈現。
- ***結論***
	- 瀏覽器首先構建 DOM 樹，然後基於 DOM 樹進行渲染，最終呈現在畫面上。當你打開 HTML 文件時，可能會看到在 DOM 構建期間白屏，但這僅是一個瞬間，當 DOM 構建完成並開始渲染時，你將看到頁面的呈現。

### 常見DOM Selectors
- ***整份文件中找***
	- document.querySelector()
		- 回傳第一個符合Selector規則的Element元素
		- 只返回匹配選擇器的第一個元素。如果找不到匹配的元素，則返回 `null`。
	- document/querySelectorAll()
		- 回傳符合Selector規則的NodeList節點集合
		- 返回一個 `NodeList`，其中包含匹配選擇器的所有元素。即使只有一個元素匹配，也會返回包含單一元素的 `NodeList`。
- ***特定元素範圍內找***
	- Element.querySelector()
		- 用於在特定元素內部選擇第一個符合指定 CSS 選擇器的元素。
		- 返回匹配選擇器的第一個子元素。如果找不到匹配的子元素，則返回 `null`。
	- Element.querySelectorAll()
		- 用於在特定元素內部選擇所有符合指定 CSS 選擇器的元素。
		- 返回一個 `NodeList`，其中包含匹配選擇器的所有子元素。即使只有一個子元素匹配，也會返回包含單一元素的 `NodeList`。

- getAttribute()
	- 獲取指定HTML元素的屬性值。
	- **參數：** 接受一個參數，即要獲取的屬性的名稱。
	- **回傳值：** 返回指定屬性的值。如果屬性不存在，則返回 `null`。
- setAttribute()
	- 設置指定HTML元素的屬性值，如果屬性不存在，則會創建該屬性。
	- **參數：** 接受兩個參數，第一個是要設置的屬性的名稱，第二個是要設置的值。
	- **回傳值：** 由於這是一個操作方法，通常不返回任何值，或者可能返回 `undefined`。

### 新增與修改DOM
- document.createElement('標籤')
- setAttribute( , )
	- 新增屬性
		- class、type....
- innerText == innerHTML
		- 放內容進去html標籤裡
- document.querySelector('選擇器')
- append()  v.s. appendChild()
- classList.add() 
	- 新增class屬性
- classList.remove()
	- 移除class屬性
```js
const numInput=document.getElementById('num-input');
const btn1=document.querySelector('.btn-group :nth-child(1)');
const btn2=document.querySelector('.btn-group :nth-child(2)');
const btn3=document.querySelector('.btn-group :nth-child(3)');
//修改DOM
btn1.innerText = '1112';
btn2.style='color:blue;'

//新增一個DOM
//在btn-group裡新增一個button
const btn4=document.createElement('button');
btn4.setAttribute('class','btn');
// 相等於 btn4.classList.add('btn');
btn4.innerText='按鈕4'; //也可以是innerHTML='按鈕4'
//附加到btn-group裡面 append or appenChild(只能新增一個)
document.querySelector('.btn-group').append(btn4);
```

---
### 關於document.write()用法
```js
	//let
	let name="Mary";
	let height=168;
	let gender=false;
	//var
	
	var email='mary@gmail.com'
	document.write(`${name},${height},${gender}`);
	
	document.write("<br>");
	//const
	const pi=3.14
	// pi=3.1415926;
	document.write(pi);
```

### Template Literals (C#叫做字串插值)
```js
	let name = "Kevin"; let age = 32;  
	let gender = true;
	//template literals
    console.log(`${name}, ${age}, ${gender}`);
```


### 設定Elements的HTML與文字
innerHTML & innerText & innerContent
- innerHTML
```js
	<div id="myElement">原始內容</div>
	
	const myElement = document.getElementById('myElement');
	myElement.innerHTML = '<h1>新的內容</h1>';
```
- innerText
	- 用於設置或獲取元素的文本內容。
	- 如果你使用 `innerText` 設置包含 HTML 標記的內容，它會將 HTML 標記視為純文本，而不會解釋為 HTML。
```js
	const element = document.getElementById('myElement');
	element.innerText = '<p>新的文本內容</p>'; // 這會將文字 '<p>新的文本內容</p>' 作為純文本顯示

```
- textContent 
	- 用於設置或獲取元素的文本內容。
	- 會將所有內容（包括 HTML 標記）作為純文本處理。
```js
	const element = document.getElementById('myElement');
	element.textContent = '<p>新的文本內容</p>'; // 這會將文字 '<p>新的文本內容</p>' 作為純文本顯示
```



### appendChild() v.s. append() v.s. prepend()
`appendChild` 和 `append` 是用於在 DOM（Document Object Model） 中插入元素的兩個不同的方法。
>**參數多寡：** `appendChild` 只能接受一個參數，即要附加的節點。而 `append` 可以接受多個參數，可以同時附加多個節點。

-  `appendChild`：`appendChild` 方法是 DOM 中的原生方法，用於將一個已存在的節點（Node）附加到另一個節點的子節點列表的末尾。
	- **支援性：** `appendChild` 是較舊的 DOM 方法，因此支援較為廣泛。
```js
		const parentElement = document.getElementById('parent');
		const childElement = document.createElement('div');
		// 將新建立的 div 元素附加到 parent 元素的子節點列表末尾
		parentElement.appendChild(childElement);

```
-  `append`：是相對較新的方法，它是在 ES2015（ECMAScript 6）中引入的。它不僅可以附加一個節點，還可以附加多個節點，字串也可以，並且支援任意數量的參數。
	- **支援性：** `append` 較新，因此在一些較舊的瀏覽器版本中可能不被支援。
	```js
	const parentElement = document.getElementById('parent');
	const childElement1 = document.createElement('div');
	const childElement2 = document.createElement('span');
	// 將新建立的 div 元素和 span 元素附加到 parent 元素的子節點列表末尾
	parentElement.append(childElement1, childElement2);
	```
- `prepend` : 用於向父節點的子節點列表的開始（首位）插入一個或多個節點的方法。這個方法可以用於在指定父節點的子節點列表的最前面插入新的節點。
	```js
		//2.動態產生div，裡面包3個p
		let div= document.createElement('div');
		let p1 = document.createElement('p');
		let p2 = document.createElement('p');
		let p3 = document.createElement('p');
		let p4 = document.createElement('p');
		div.append(p1,p2,p3);
		p1.innerText='window';
		p2.innerText='document';
		p3.innerText='html';
		p4.innerText='我是p4';
		div.prepend(p4);
		document.body.append(div);
	```
	- `prepend()` 方法是相對新的方法，如果你的應用需要支援舊版瀏覽器，你可能需要使用其他方法來實現相同的效果，比如使用 `insertBefore()`。
### Function 建立三種方式
1. ``Function Declaration(Function Statement)宣告式
```js
	//Function Declaration //計算圓的週長:直徑×圓周率 
	function circle(r) {
		return r * 2.0 * Math.PI; 
	}
	
	function circle(r) {  
		return parseFloat(r) * 2.0 * Math.PI;
	}  
	console.log(circle(5.138)); //32.28300610828872 
	console.log(circle("5.138")); //32.28300610828872
```
1. Function Expression表達式
	1. ``類似變數宣告方式getRectArea``
		```js
			const getRectArea = function (height, width) { 
				return height * width;
			}  
			console.log(getRectArea(3, 4));
		```
	2. ``Arrow Function箭頭函式``
		```js
		//使用箭頭函式  
		const getRectArea2 = (height, width) => {
			return height * width; 
		}
		console.log(getRectArea2(5, 6));
		```
3. Function Constructor 建構函式 (知道就好)
	```js
	//Ex - Function constructor(new關鍵字可省略) 
	//但function名稱會是anonymous  
	const RECT_AREA = new Function('height', 'width',
	'return height * width'); 
	console.log(RectArea(9,7));
	console.log(RectArea.name);
	
	/**Function constructor */
	
	const SUM = new Function('x', 'y', ‘{ return x + y }'); console.log(sum(8, 6));
	```

---
## Event事件
>指在 Web 頁面上發生的事情，這些事情可以是用戶的操作（如點擊按鈕、提交表單、移動滑鼠等）或其他引發的行為（如網頁的載入、時間的流逝等）。在網頁開發中，事件是一種用於處理交互和響應的概念。

>當特定的事件發生時，瀏覽器就會生成一個事件對象（Event Object），開發者可以通過 JavaScript 代碼來監聽這些事件並執行相應的操作。事件可以來自多種來源，例如用戶的操作、瀏覽器的內部行為、或是外部的 API 請求。

- 在HTML attribute屬性指定事件處理器
- 用JS指定HTML元素attribute屬性的事件
- ***使用addEventListener()方法註冊是較佳的寫法***

### addEventListener
>`addEventListener` 是 JavaScript 中用來監聽事件的方法，允許你指定一個事件（比如點擊、鍵盤按下、頁面載入等），以及當該事件發生時要執行的函式。

```js
要監聽事件的 DOM 元素.addEventListener(監聽的事件類型，例如 "click"、"keydown"、"change",事件發生時要執行的函式(事件處理器或回調函式))

target.addEventlistener(type,listener[,options]);
```

***在function中，通常會傳一個參數近來叫做event -> `function(e){}`***
#### 事件名稱
1. click
2. load
	1. 當有用到外部資源時，想確保外部資源全部都載入才執行動作，可以用load事件包裹

### removeEventListener() 
>事件移除方法
移除也是要帶兩個參數，原因在於JS是可以在同一個tag上註冊多個事件，因此需要明確指出需要刪除哪一個

```js
btn3.addEventListener('mouseover',displayMsg);
function displayMsg(){
	alert("Mouse Over事件觸發");
}

btn3.removeEventListener('mouseover',displayMsg);
```

##### parseInt() parse()
```js
	let num = '20';
	console.log(num);
	console.log(parseInt(num));
```
### 事件對象

### 事件冒泡
---

## 觀念釐清
- HTML的目的是為了要產生DOM Tree，在瀏覽器上運作的是DOM Tree，不是HTML，因此當我透過JS在DOM Tree 上動態新增或刪除節點，html文件是不會被影響的，因為他只是在最一開始幫助產生DOM的文件，而使用者看到的網站是靠DOM在運作的。

- 為什麼電商網站的DOM Tree 上的資料，在原始碼上沒有？因爲原始碼只產生layout，沒有產生內容，內容是由JS動態從遠端呼叫資料拉回到本機瀏覽器，再去產生的。（原因是內容資料那麼多，一個一個打上去是要花一輩子嗎？？）
- 類別與物件的關係
	- 類別是為了產生物件，物件才能拿出來操作
	- console.dir(物件名稱)
		- 可以查看物件的屬性
- 用var宣告的變數
	- 都會被附加在window
	- window.變數名稱
- 為什麼function參數前不用加var或let ?
	- 因為js是動態的，即使你先宣告了，只要資料一改，他的型態就換了
- 為什麼全域變數都只宣告未給值？querySelector選取器都盡量寫在ㄎwindow.onload之後？
	- 因為要防止瀏覽器DOM還沒生成，JS就跑完了，這樣網站就會出錯
---

## padStart() 方法
>將字串填充到指定的長度
- 字串方法，必須要在字串上調用
```js
for (let i = 1; i < 1010; i++) {
	let fileName = i.toString().padStart(3, '0');

	let pathFile = `https://assets.pokemon.com/assets/cms2/img/pokedex/detail/${fileName}.png`;
	// 其他程式碼（這裡省略）
}

```
1. `i.toString()`: 將數字 `i` 轉換為字串。這是因為 `padStart` 是字串方法，所以必須在字串上調用。
    
2. `.padStart(3, '0')`: 使用 `padStart` 方法，將字串填充到指定的長度為 3。如果原始字串的長度不足 3，則在左側（開頭）使用字符 '0' 進行填充。這確保 `fileName` 的長度始終為 3。
---

## childNodes 返回一個NodeList
>獲取某個節點的所有子節點的屬性。這個屬性返回的是包含所有子節點的 NodeList，這是一個類陣列對象。

**獲取子節點列表：** `node.childNodes` 返回一個 NodeList，其中包含了 `node` 節點的所有子節點。這些子節點包括元素節點、文本節點、註釋節點等。
```js
	var childNodesList = node.childNodes;
```
**篩選子節點類型：** 因為 `childNodes` 返回的是包含所有類型的子節點，你可能需要根據需要篩選特定類型的子節點。可以使用 `nodeType` 屬性進行區分，例如，`nodeType` 為 1 表示元素節點。
```js
	var elementNodes = Array.from(node.childNodes).filter(child =>       child.nodeType === 1);
```
**獲取子節點數量：** `node.childNodes.length` 返回 `node` 節點的子節點數量。
```js
	var numberOfChildNodes = node.childNodes.length;
```
**遍歷子節點：** 你可以使用迴圈來遍歷 `node` 節點的所有子節點。
```js
	for (var i = 0; i < node.childNodes.length; i++) {
	    var childNode = node.childNodes[i];
	    // 在這裡處理每個子節點
	}
```
**注意事項：** `childNodes` 返回的是動態的 NodeList，這表示它會反映當前節點的子節點狀態。如果節點的子節點發生變化，`childNodes` 也會相應地更新。

---

## ClassName v.s. ClassList()
- **className:**
	- 獲取或設定元素的 CSS 類別
	```js
	// 獲取元素的 className
	let currentClassName = element.className;
	// 設定元素的 className
	element.className = 'new-class';
	```
	- `className` 屬性會返回一個包含元素所有類別的字串，並且可以直接設定一個包含所有要添加的類別的字串。
- **classList:**
	- 是一個 DOMTokenList 對象，提供了一組方法來新增、移除和切換類別，以及檢查元素是否包含某個類別。
	```js
	// 獲取元素的 classList
	let classes = element.classList;
	
	// 新增類別
	element.classList.add('new-class');
	
	// 移除類別
	element.classList.remove('old-class');
	
	// 切換類別（如果有則刪除，如果沒有則新增）
	element.classList.toggle('active');
	
	// 檢查是否包含某個類別
	let hasClass = element.classList.contains('check-class');
	
	```
	- `classList` 提供了方便的方法來操作類別，並且可以單獨添加或刪除一個類別，而不需要處理整個類別字串。它還提供了 `toggle` 方法，可以方便地切換類別的狀態。

---
## hasAttribute() 和 removeAttribute()
- ### `hasAttribute()`
	- 用來檢查元素是否包含指定的屬性。它返回一個布林值，如果元素包含指定的屬性，則返回 `true`，否則返回 `false`。
	```js
	var result = document.getElementById('myElement').hasAttribute('data-custom');
	console.log(result); // 如果元素包含 data-custom 屬性，返回 true；否則返回 false
	```
- ### `removeAttribute()`
	- 用來移除元素的指定屬性。當你想要清除或刪除元素的某個屬性時，可以使用這個方法。
	```js
	document.getElementById('myElement').removeAttribute('data-custom');
	```

---

## Node / NodeList / HTMLCollection
- 節點 Node
	- `querySelector()` 選取單數，故回傳的是Node
	- 什麼是Node節點?
		- 一個HTML元素就是一個Node節點 
		- 一個document也是node
	- nodeName屬性 -> 顯示Node Element名稱
	- nodeType屬性 -> 顯示value值
		- `1` 代表元素節點，這意味著該節點是一個 HTML 元素，例如 `<div>`、`<p>`、`<span>` 等。
		- `3`（文字節點）
- 節點集合 NodeList
	- `querySelectorAll()` 選取複數，故回傳NodeList節點集合
- HTML集合 HTMLCollection
	- `getElementByTagName`
	- `querySelector().Children`
- Object.prototype.constructor
	```js
	let obj1 = {};
	console.log(obj1.constructor.name); //Object
	console.log(obj1.constructor === Object); //true
	
	  
	let array1 = [];
	console.log(array1.constructor.name); //Array
	console.log(array1.constructor === Array);//true
	  
	let user = "Kevin";
	console.log(user.constructor.name); //String
	console.log(user.constructor === String);//true
	```
## window物件
>window是什麼？
代表著包含DOM文件(document)視窗
window.document屬性指向載入到該視窗中的DOM document文件
document.defaultView屬性則可以取得其所屬的window物件

**window > document > DOM
- window物件含有眾多屬性、事件與方法
- window.document屬性**指向一份DOM文件**
- DOM代表網頁Page，DOM呈現HTML文件
- 透過DOM可以存取或操作HTML


### ***思考***
 - document vs. window.document =>相同的意思
#### 1. 請說明 window 與 document 二者關係，有何不同?

- **關係**：
  - `window` 物件代表整個瀏覽器視窗，包含所有全域變數、函數以及 DOM 文件。
  - `document` 是 `window` 物件的一個屬性，指向載入到該視窗中的 DOM 文件。

- **不同**：
  - `window` 是更高層級的物件，包含許多屬性、方法和事件，控制整個瀏覽器環境。
  - `document` 則是專注於網頁內容的呈現和操作，主要處理 HTML 文件的結構和內容。

#### 2. 請說明後三行指令有什麼相同/不同? 誰揭露得更精確?

```javascript
console.log(window);
console.log(window.document);
console.log(document);
console.dir(document);
```

- **相同**：
  - `console.log(window.document)` 和 `console.log(document)` 顯示的內容基本相同，因為 `document` 是 `window.document` 的簡寫。
  
- **不同**：
  - `console.log(window)`：顯示整個 `window` 物件，包含所有屬性和方法。
  - `console.log(window.document)` 和 `console.log(document)`：顯示 `document` 物件，專注於 DOM 文件。
  - `console.dir(document)`：更具技術性，呈現 `document` 物件的屬性和方法，以樹狀結構顯示，揭露更詳細的資訊。

- **揭露更精確**：
  - `console.dir(document)` 更精確地揭露 `document` 物件的內部結構，適合開發者進一步探索和調試。

#### 3. 你認為的 document 是什麼? 和 HTML 是同一個東西?

- **document**：
  - `document` 是一個 JavaScript 物件，代表當前載入的 HTML 文件，是 DOM（Document Object Model）的一部分。
  
- **HTML**：
  - HTML 是一種標記語言，用於定義網頁的結構和內容。

- **關係**：
  - `document` 和 HTML 並不是同一個東西。HTML 文件經過瀏覽器解析後，生成 `document` 物件，這個物件讓開發者可以使用 JavaScript 操作和修改網頁內容。

#### 4. 你所認知的 HTML 存在哪裡?

- **HTML 文件存在哪裡**：
  - HTML 文件以文本格式存在於網頁伺服器上，當瀏覽器請求網頁時，伺服器會將 HTML 文件傳送到瀏覽器。
  - 瀏覽器接收到 HTML 文件後，會解析並生成對應的 DOM 結構，該結構以 `document` 物件的形式存在於瀏覽器內存中。

#### 5. 所有的callback function 都只能有一行敘述式，超過就要給箭頭函式大括號
在 JavaScript 中，箭頭函式（arrow function）的語法可以簡化單行的回呼函式（callback function）。當箭頭函式的主體只有一行敘述時，可以省略大括號和 `return` 關鍵字。但如果有多行敘述，就需要使用大括號包裹整個函式主體。以下是具體的說明和範例：

##### 單行敘述的箭頭函式

如果箭頭函式只有一行敘述，可以省略大括號和 `return`，函式會自動返回該敘述的結果。

```javascript
// 單行箭頭函式
let numbers = [1, 2, 3, 4];
let squares = numbers.map(x => x * 2);
console.log(squares); // [2, 4, 6, 8]
```

##### 多行敘述的箭頭函式

如果箭頭函式有多行敘述，就需要使用大括號包裹並顯式使用 `return` 返回值（如果需要返回值）。

```javascript
// 多行箭頭函式
let numbers = [1, 2, 3, 4];
let squares = numbers.map(x => {
    let result = x * 2;
    return result;
});
console.log(squares); // [2, 4, 6, 8]
```

##### 範例對比

**單行回呼函式：**

```javascript
// 單行回呼函式
let numbers = [1, 2, 3, 4];

// 使用單行箭頭函式
let squares = numbers.map(x => x * 2);
console.log(squares); // [2, 4, 6, 8]
```

**多行回呼函式：**

```javascript
// 多行回呼函式
let numbers = [1, 2, 3, 4];

// 使用多行箭頭函式
let squares = numbers.map(x => {
    let result = x * 2;
    console.log(`Processing number: ${x}`); // 額外的敘述
    return result;
});
console.log(squares); // [2, 4, 6, 8]
```

##### 總結

- **單行敘述**：箭頭函式只有一行敘述時，可以省略大括號和 `return`，例如 `x => x * 2`。
- **多行敘述**：箭頭函式有多行敘述時，需要使用大括號包裹並顯式返回值（如果需要），例如：

  ```javascript
  x => {
      let result = x * 2;
      return result;
  }
  ```

這樣的語法使得箭頭函式在處理簡單的回呼函式時更加簡潔，而在處理複雜的邏輯時也能保持清晰。

---

##### window物件屬性
- window.document
- window.location 設定瀏覽器網址
	- window.location="網址"
	- window.location.assign("網址")
	- location = "網址"
	- location.reload() 重新載入網頁
- window.history 操控瀏覽器上一頁、下一頁
- window.localStorage 本地儲存
- window.screen
##### window.history - 操控瀏覽器歷史紀錄
- window.history.back() 回到上一頁
- window.history.go() 帶-1的話等同back()
- window.history.forward() 移往下一夜
- window.history.go() 帶1等同forward()


##### window視窗的開啟與關閉
- window.open()
- window.close()
```js
<label for="targetUrl">網址</label>
<input type="text" id="targetUrl" name="targetUrl">
<br />
<button id='btnOpen'>開啟新視窗</button>
<button id='btnClose'>關閉目前視窗</button>
<button id='btnLoad'>視窗載入新網址</button>

<script>
// window.open('');
let btnOpen = document.getElementById('btnOpen');
let btnClose = document.getElementById('btnClose');
let btnLoad = document.getElementById('btnLoad');
let newWindow;
//open
btnOpen.addEventListener("click",()=>{
	window.open(document.getElementById('targetUrl').value);
});

//close
btnClose.addEventListener("click",()=>{
	window.close();
});

//location
btnLoad.addEventListener("click", function(){
	window.location=document.getElementById('targetUrl').value;
});
```


---

## modules模組、模塊 - 建立可重複使用的JS模組
- 定義 :
	- 模組也是一個.js檔
	- 將function定義在模組中，讓function可重複使用
	- .html檔需要宣告`<script type="module">` ，並且引入模組檔案與特定function後，才能使用模組的function
- 注意事項：
	- 本地測試module時，會遇到CORS錯誤，因此需要用Web Server執行測試，不能用瀏覽器檔案方式
	- module功能指導入到單一script範圍內，也就是說只有script範圍中才能存取modules功能
	- 多個module script範圍，彼此也無法存取
	```js
	function $g(selector){
	//nodelist至少包含一個node - Element object //如果沒有符合的，則會是一個empty NodeList
	let nodelist = document.querySelectorAll(selector);
	if(nodelist.length==0){
		return null;
	}
	return nodelist.length == 1 ? nodelist[0]: nodelist;
	}
	export { $g };
	```

	```js
	<script>
		let h1, ps, ul, btn;
	</script>
	
	<script type="module">
	//匯入
	import { $g } from "../modules/helpers.js";
	// let h1, ps, ul, btn;
	window.onload=function(){
	btn = document.querySelector("button");
	
	
	btn.addEventListener("click", showInfo);
	
	}
	
	  
	
	function showInfo(){
	// h1 = document.querySelector("h1");
	h1 = $g("h1");
	// ps = document.querySelectorAll("p");
	ps = $g("p");
	// ul = document.querySelector("ul");
	ul = $g("ul");
	console.log("* Node - ELEMENT_NODE:");
	//H1, Node - ELEMENT_NODE
	
	console.log(`${h1} , ${h1.nodeName}, ${h1.nodeType}`);
	
	console.log("* NodeList:");
	
	//P, NodeList - 支援forEach
	
	console.log(`${ps} , ${ps.nodeName}, ${ps.nodeType}`);
	
	  
	
	ps.forEach((p, index)=>{
	
	console.log(`${index}, ${p} , ${p.nodeName}, ${p.nodeType}`);
	
	});
	
	  
	
	//UL
	
	console.log("* Node:");
	
	console.log(`${ul} , ${ul.nodeName}, ${ul.nodeType}`);
	
	console.log("* NodeList:");
	
	console.log(ul.childNodes);
	
	console.log("* HTMLCollection:");
	
	console.log(ul.children);
	
	  
	
	[...ul.children].forEach(item=>{
	
	console.log(item.innerText);
	
	});
	
	}
	
	</script>
	```

---

## event.preventDefault()
>於阻止事件的默認行為的方法。當一個事件被觸發時，瀏覽器通常會執行與該事件相關聯的默認行為。例如，當點擊一個連結時，瀏覽器會導航到連結指定的 URL。使用 `preventDefault()` 方法可以取消這種默認行為。
>
```js
	<a href="https://www.example.com" id="myLink">Click me</a> 
	
	var myLink = document.getElementById('myLink'); myLink.addEventListener('click', function(event) { 
	// 阻止默認的連結導航行為 
	event.preventDefault(); 
	// 這裡可以添加自定義的行為 
	console.log('Link clicked, but navigation prevented!'); });
```
---
## setTimeout() & setInterval() 定時器
- setTimeout()   只能執行一次
```js
<h1>setTimeout() - 定時器</h1>
<button onclick="Start()">Start</button>
<button onclick="Stop()">Clear</button>
<script>
const colors = ["green", "blue", "yellow", "red", "orange", "pink", "purple", "white", "black"];
  
let timeoutId;
function Start(){
	timeoutId = setTimeout(changeColor,500);
}

function Stop(){
	clearTimeout(timeoutId);

	document.body.style.backgroundColor = "white";

	alert("setTimeout已清除");
}

function changeColor(){
	
	let random = getRandom(0, 8);
	
	document.body.style.backgroundColor = colors[random];
	
	console.log(random);

}

  

function getRandom(min, max){
	return Math.floor(Math.random() * (max-min) + min);
}
</script>
```

- setInterval()
	- 固定時間間隔就執行一次

---

## getElementById vs. getElementByTagName
- getElementById() :
	- 回傳單一Element
- getElementsByTagName() :
	- 獲取指定標籤名的所有元素
	- 回傳的是一個 HTMLCollection 物件
	```js
		var elements = document.getElementsByTagName(tagName);
	```
	- `tagName`: 要獲取的元素的標籤名，例如 `"div"`, `"p"`, `"a"` 等。
- getElementsByClassName() :
	- 是一個 Document 物件的方法，透過元素的 class 名稱獲取一個 HTMLCollection，其中包含所有擁有指定 class 的元素。
	```html
	<!DOCTYPE html>
	<html lang="en">
	<head>
	  <meta charset="UTF-8">
	  <meta name="viewport" content="width=device-width, initial-scale=1.0">
	  <title>getElementsByClassName Example</title>
	  <style>
	    .highlight {
	      color: red;
	      font-weight: bold;
	    }
	  </style>
	</head>
	<body>
	
	  <p class="highlight">This paragraph is highlighted.</p>
	  <p>This paragraph is not highlighted.</p>
	
	  <script>
	    // 獲取所有擁有 "highlight" class 的元素
	    var highlightedElements = document.getElementsByClassName('highlight');
	
	    // 對這些元素進行操作
	    for (var i = 0; i < highlightedElements.length; i++) {
	      highlightedElements[i].style.backgroundColor = 'yellow';
	    }
	  </script>
	
	</body>
	</html>
	```

- document.forms[" "] :
	- 是 Document 物件的屬性，用來獲取表單（form）的 HTMLCollection。你可以使用索引或表單的 name 屬性來訪問其中的特定表單。
```html
<!DOCTYPE html>

<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>document.forms Example</title>
</head>

<body>

  

<form name="myForm">

<label for="username">Username:</label>

<input type="text" id="username" name="username">

<br>

<label for="password">Password:</label>

<input type="password" id="password" name="password">

<br>

<input type="submit" value="Submit">

</form>

  

<script>

// 使用索引訪問表單

var firstForm = document.forms[0];

console.log(firstForm.id); // 獲取第一個表單的 id

  

// 使用 name 屬性訪問表單

var myForm = document.forms["myForm"];

console.log(myForm.elements["username"].value); // 獲取特定表單元素的值

</script>

  

</body>

</html>
```

## 什麼是prototype ?
- JavaScript 中，每個物件都有一個原型（prototype）連結，它是實現物件繼承的機制。
	- 原型是一種指令，允許物件繼承另一個物件的屬性和方法。JavaScript 是基於原型的語言，原型機制是實現繼承的基礎。
- 每個 JavaScript 物件（除了一些基礎物件，如 `Object`）都有一個指向原型物件的連結。這個連結定義了該物件的原型鏈，這是一系列原型物件的連結，最終指向 `null`。
	- 訪問物件的屬性或方法時，JavaScript 引擎首先在物件本身查找，然後順著原型鏈向上查找，直到找到屬性或方法或到達原型鏈的末尾。
- ### Prototype 屬性
	- 指向原型物件的指標。通過使用 `new` 關鍵字調用函數創建的物件將繼承該函數的 `prototype`。
	- 這個例子中，`Person.prototype` 是一個包含 `sayHello` 方法的物件，通過 `new Person()` 創建的物件 `person1` 繼承了 `Person.prototype`，因此可以調用 `sayHello` 方法。
```js
	function Person(name) {
	  this.name = name;
	}
	
	// 將一個方法添加到 Person 的 prototype
	Person.prototype.sayHello = function() {
	  console.log('Hello, ' + this.name);
	};
	
	// 創建一個 Person 物件
	var person1 = new Person('Alice');
	person1.sayHello(); // 輸出: Hello, Alice

```

- ### 原型鏈
	- 由物件的原型組成的鏈狀結構，通過它實現了物件之間的繼承。
		- 訪問物件的屬性或方法時，JavaScript 引擎首先在物件本身查找，然後順著原型鏈向上查找，直到找到對應的屬性或方法，或者到達原型鏈的末尾。
		- 這個例子中，`student` 物件的原型是 `person`，而 `person` 物件的原型是 `obj`。這形成了一個原型鏈，使得 `student` 物件可以訪問 `obj`、`person` 的屬性，以及自身的屬性。
```js
	// 創建一個物件 obj
	var obj = {
	  name: 'Object'
	};
	
	// 創建一個物件 person，它的原型是 obj
	var person = Object.create(obj);
	person.age = 25;
	
	// 創建一個物件 student，它的原型是 person
	var student = Object.create(person);
	student.grade = 'A';
	
	console.log(student.name); // 在 obj 中找到 name 屬性
	console.log(student.age);  // 在 person 中找到 age 屬性
	console.log(student.grade); // 在 student 中找到 grade 屬性

```

---
##  搜尋Array內的項目相關語法
- ##### `Array.prototype.indexOf()` -----相似於C#: `Array.IndexOf()`
	- 找第n筆資料的索引位置
	- 找到則回傳索引位置
	- 找不到回傳-1
```js
	const numArr = [20, 12, 3, 1, 18, 3];
	console.log("numArr:");
	console.log(numArr);
	console.log("------");
	
	console.log("找到第一個數字3所在的索引:");
	//TODO
	// console.log(numArr.indexOf(3));
	let indexOfNum3 = numArr.indexOf(3);
	console.log(indexOfNum3); //2
	
	console.log("找到第一個數字100所在的索引:(找不到)");
	//TODO
	console.log(numArr.indexOf(100)); //-1
```
- ##### `Array.prototype.lastIndexOf()` ----相似於C#: `Array.LastIndexOf()`
	- 找重複中的最後一個
	- 找不到回傳-1
```js
	const numArr = [20, 12, 3, 1, 18, 3];
		console.log("numArr:");
		console.log(numArr);
		console.log("------");
	console.log("找到最後一個數字3所在的索引:");
	//TODO
	console.log(numArr.lastIndexOf(3));
	
	console.log("找到最後一個數字100所在的索引:(找不到)");
	//TODO
	console.log(numArr.lastIndexOf(100));
	console.log("------");
```
- ##### `Array.prototype.find()` ----相似於C#: `Enumerable.First()`
	- 找到會回傳那個數字
	- 找不到會回傳undefined
```js
	const numArr = [20, 12, 3, 1, 18, 3];
	console.log("numArr:");
	console.log(numArr);
	console.log("------");
	
	console.log("找第一個奇數:");
	//TODO
	let firstOddNum = numArr.find((num)=>num%2!=0);
	console.log(firstOddNum);
	
	console.log("找第一個大於30的數:(找不到)");
	//TODO
	let firstBiggerThan30 = numArr.find(num=> num>30);
	console.log(firstBiggerThan30);
	
	console.log("------");
```

- ##### `Array.prototype.filter()` ----相似於C#: `Enumerable.Where()`
	- 找得到會回傳符合的資料包成一個array
	- 找不到會回傳一個empty Array 
```js
       const peopleArr = [
                {
                    name: "Bill",
                    age: 47,
                },
                {
                    name: "John",
                    age: 37,
                },
                {
                    name: "Tom",
                    age: 48,
                },
                {
                    name: "David",
                    age: 36,
                },
                {
                    name: "Bill",
                    age: 35,
                },
            ];

            console.log('取得年紀超過40歲的人名，並且將結果用 " & " 分隔:');
            //TODO
            //
            //1.取得40歲以上的人 (過濾)
            let ageBiggerThan40=peopleArr.filter(p=>p.age>40);
            console.log(ageBiggerThan40);

```
- ##### `Array.prototype.includes()` ----相似於C#: `Enumerable.Contains()`
	- 回傳的是布林值
	- 有沒有包含那個資料
```js
	const numArr = [20, 12, 3, 1, 18, 3];
	
	console.log("numArr:");
	
	console.log(numArr);
	
	console.log("------");
	let target = 13; //可以修改此值試試看結果
	
	console.log(`Array內是否有指定的項目(${target})`);
	
	let result = numArr.includes(target);
	
	if (result) {
	
	console.log(`numArr內有 ${target}`);
	
	} else {
	
	console.log(`numArr內沒有 ${target}`);
	
	}
```

- ##### `Array.prototype.some()` ----相似於C#: `Enumerable.Any()`
	- 只要找到其中有符合的就可以使用
	- 回傳的是布林值
```js
	const peopleArr = [
		{
		name: "Bill",
		age: 47,
		},
		{
		name: "John",
		age: 37,
		},
		{
		name: "Tom",
		age: 48,
		},
		{
		name: "David",
		age: 36,
		},
		{
		name: "Bill",
		age: 35,
		},
		];
	
	console.log("peopleArr內容:");
	
	console.log(peopleArr);
	
	console.log("------")
	//some
	console.log("是否有任何一個年紀大於40的人:");
	//TODO
	console.log(peopleArr.some(ob=>ob.age>40));
	
	console.log("是否有任何一個名字叫做 Andy 的人:");
	//TODO
	console.log(peopleArr.some(ob=>ob.name=="Andy"));
```
- ##### `Array.prototype.every()` ----相似於C#: `Enumerable.All()`
	- 找所有全部符合
	- 回傳布林值
```JS
	console.log("是否所有人年紀都小於20:");
	//TODO
	console.log(peopleArr.every(ob=>ob.age<20));
	  
	console.log("是否所有人年紀為30以上, 50歲以下(大於等於30,小於50)");
	//TODO
	console.log(peopleArr.every(ob=>ob.age>=30 && ob.age<50));
```

## 陣列排序 `Array.prototype.sort()`
- 相似於C#: `Enumerable.OrderBy()`
- 會改變原本Array內容。
    - 預設排序方式：將元素轉為字串後，依據 `UTF-16` 編碼小到大排序。
    - 無法保證排序的空間複雜度及時間複雜度(因可能有不同的排序演算法，所以不保證效能，但結果會一樣)。
    - `compareFn(a, b)`:自訂排序的函式
        - `回傳 > 0` : `a` 在 `b` 後，`[b, a]`。
        - `回傳 < 0` : `a` 在 `b` 前，`[a, b]`。
        - `回傳 === 0`: 保持原本`a`,`b`順序。
- [MDN: Array.prototype.sort()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/sort)
```js
const numArr = [3, 2, 1, 6, 8, 11];

console.log("numArr內容:");

console.log(numArr);

console.log("------")

  

console.log('numArr從小到大排序(預設排序行為)');

console.log('因為他預設是先將元素轉為字串後，依據 UTF-16 編碼小到大排序。');

console.log(numArr.sort());

console.log('numArr從小到大排序(compareFn)');

console.log(numArr.sort((a,b) => a-b));

//隨機從資料裡拿出兩個內容來比

//只要回傳大於零，a就會被擺在後面

//小於零，a就會被擺在b前面

  

console.log('numArr從大到小排序(compareFn)');

console.log(numArr.sort((a,b) => b-a));

  

console.log(numArr.sort(orderByDesc));

function orderByDesc(a,b){

if(a===b) return 0;

if(a>b){

return -1;

}

if(a<b){

return 1;

}

//return b-a ;

}

console.log('-------');

  

const peopleArr = [

{

name: "Bill",

age: 47,

},

{

name: "John",

age: 37,

},

{

name: "Tom",

age: 48,

},

{

name: "David",

age: 36,

},

{

name: "Bill",

age: 35,

},

];

  

console.log('將peopleArr依據年紀從大到小排');

const copyPeopleArr = Array.from(peopleArr);

console.log(copyPeopleArr.sort((a,b)=>b.age-a.age));

```

## 其他陣列相關語法
- ##### `Array.prototype.map()` ----相似於C#: `Enumerable.Select()`
	- map也是一種迭代的方式，因此參數也有index可以用
```js
 const peopleArr = [
                {
                    name: "Bill",
                    age: 47,
                },
                {
                    name: "John",
                    age: 37,
                },
                {
                    name: "Tom",
                    age: 48,
                },
                {
                    name: "David",
                    age: 36,
                },
                {
                    name: "Bill",
                    age: 35,
                },
            ];

            console.log("peopleArr內容:");
            console.log(peopleArr);

            console.log("從peopleArr取得名字");
            //TODO
            //舊方法：用foreach
            const nameArr=[];
            peopleArr.forEach(item=>{
                nameArr.push(item.name);
            });
            console.log(nameArr);
            //新方法：用map() -> 也是一種迭代方式所以也有index參數可用
            // const nameArrByMap = peopleArr.map(p =>{
            //     return p.name;
            // })

            const nameArrByMap = peopleArr.map(p => p.name);
            console.log(nameArrByMap);
            console.log('------');
            console.log("從peopleArr取得原本內容後新增id, id從1開始");
            //TODO
                //map一種迭代方式所以也有index參數可用
            const obArr=peopleArr.map((p,index)=> {
                // return {
                //     name : p.name,
                //     age : p.age,
                //     id: index+1
                // };
                //因為p是peopleArr迭代出的每一個物件，可以用展開式
                return {
                    ...p,
                    id : index+1 
                }
            });
            console.log(obArr);

```
- ##### `Array.from()` ----淺拷貝
	- 會產出新的Array
	- 將可迭代的物件或者類陣列(NodeList)轉換為Array
	- 接受一個類陣列對象或可迭代對象作為參數，並返回一個新的陣列。你還可以提供一個映射函數，用於對每個元素進行轉換。
```js
	// 類陣列對象
	const arrayLikeObject = { 0: 'apple', 1: 'orange', 2: 'banana', length: 3 };
	
	// 使用 Array.from() 將其轉換為陣列
	const newArray = Array.from(arrayLikeObject);
	
	console.log(newArray); // ['apple', 'orange', 'banana']

```
- ##### `Array.prototype.join()` ----相似於C#: `String.Join()`
	- 把一堆東西組成字串
```js
const peopleArr = [
                {
                    name: "Bill",
                    age: 47,
                },
                {
                    name: "John",
                    age: 37,
                },
                {
                    name: "Tom",
                    age: 48,
                },
                {
                    name: "David",
                    age: 36,
                },
                {
                    name: "Bill",
                    age: 35,
                },
            ];

            console.log('取得年紀超過40歲的人名，並且將結果用 " & " 分隔:');
            //TODO
            //
            //1.取得40歲以上的人 (過濾)
            let ageBiggerThan40=peopleArr.filter(p=>p.age>40);
            console.log(ageBiggerThan40);

            //2.取得人名 (取物件的指定屬性)
            let nameArr=ageBiggerThan40.map(p=>p.name);
            console.log(nameArr);

            //3.使用Array.prototype.join()處理
            const result=nameArr.join('&');
            console.log(result);

            console.log('------');

            //串起來！！！
            console.log(
                peopleArr
                    .filter(p=>p.age>40)
                    .map(p=>p.name)
                    .join('&'));

```

- ##### `Array.prototype.concat()` ----相似於C#: `Enumerable.Concat()`
	-  會回傳新的陣列，也可以用來複製陣列(淺拷貝)
```js
        const array1 = [1, 2, 3];
        const array2 = [4, 5, 6];
        //  concat -> array1+array2
        const array3 = array1.concat(array2);
        console.log(array1);
        console.log(array2);
        console.log(array3);
        const array4 = array1.concat();//做了淺拷貝
        console.log(array4);
        

        const array5=[].concat(array2);
        console.log(array5);

        const array6=array1.concat(7,8,9,array2);
        console.log(array6);
```

- ##### `Array.prototype.slice()` ----相似於C#: `Enumerable.Skip()`,`Enumerable.Take()`
	- 會回傳新的陣列，也可以用來複製陣列(淺拷貝)。
	- 與`Array.prototype.splice()`不同之處在於`splice`會修改原本陣列的內容。
```js
            //slice() 回傳新的Array ！！！！
            //slice(start) 回傳從指定索引值開始(start)到最後一個項目的新Array
            //slice(start, end)回傳從指定索引值開始(start)到 end值處的索引(不包含索引end)的新Array
            const animals = ["ant", "bison", "camel", "duck", "elephant"];
            console.log('animals的內容:');
            console.log(animals);
            // Expected output: Array ["ant", "bison", "camel", "duck", "elephant"]
            console.log("------");

            // TODO: Expected output: Array ["ant", "bison", "camel", "duck", "elephant"]
            console.log(animals.slice());

            // TODO: Expected output: Array ["camel", "duck", "elephant"]
            console.log(animals.slice(2)); // 只取含指定索引位置開始和之後的資料

            // TODO: Expected output: Array ["camel", "duck"]
            console.log(animals.slice(2,4)); //取含指定索引位置開始，到索引-1的位置

            // TODO: Expected output: Array ["bison", "camel", "duck", "elephant"]
            console.log(animals.slice(1,5));//第二個參數寫很大，若沒有值，就只會拿既有的值出來

            console.log("------");
            console.log('slice 後 animals 的內容:(不會被修改)');
            console.log(animals);
            // Expected output: Array ["ant", "bison", "camel", "duck", "elephant"]

```

- #### 關於`Array.prototype.reduce()`:[Array.prototype.reduce()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce) ----相似於C#: `Enumerable.Aggregate()`
```js
 //要用reduce一定要有個陣列，因爲他是陣列裡的方法
            const numArr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
            const initialValue = 0;
            const sumWithInitial = numArr.reduce(
                (accumulator, currentValue) => accumulator + currentValue,
                initialValue
            );
            console.log(sumWithInitial);
            
            console.log("------");

            console.log("reduce without initial value:");
            //箭頭函式在這是reduce的第一個參數
                numArr.reduce((acc, current, currentIdx) => {
                    console.log(
                        `acc: ${acc}, current: ${current}, currentIdx: ${currentIdx}`
                    );
                    return acc + current;
                });
                console.log("------");

                console.log("reduce with initial value:");
                numArr.reduce((acc, current, currentIdx) => {
                    console.log(
                        `acc: ${acc}, current: ${current}, currentIdx: ${currentIdx}`
                    );
                    return acc + current;
                }, 0);

                console.log("------");

                //計算總和
                const sumResult=numArr.reduce((pre,curr)=> pre+curr);
                console.log(sumResult);

                //攤平陣列
                const my2DArr=[[1,3],[5,7]];
                console.log(my2DArr);
                const my2DArrTo1DArr = my2DArr.reduce((pre,curr)=>{
                    //index=0 
                    //pre:[]
                    //curr:[1,3]
                    //----------
                    //index=1
                    //pre:[1,3]
                    //curr:[5,7]
                    return pre.concat(curr) 
                    //第一圈 ： [].concat([1,3])==>[1,3] 
                    //第二圈 ： [1,3].concat([5,7])==>[1,3,5,7] 
                },[]);
               
                console.log(my2DArrTo1DArr)


```
### new Set()
- 是產生一個 Set 物件。Set 是一種集合型別，它可以包含各種數據類型，並確保其中的值是唯一的，不會重複。
- 不是陣列！！！如果想要將 Set 轉換為陣列，你可以使用 `Array.from()` 或展開運算符 `...`。
```js
 const uniqueNumbers = new Set([1, 2, 3, 1, 2, 4]);
        //Set集合型別，不是陣列
        console.log('判斷uniqueNumbers是否是Array')
        console.log(Array.isArray(uniqueNumbers));//false
        // 使用 Array.from() 將 Set 轉換為陣列
        const uniqueArray = Array.from(uniqueNumbers);
        console.log(uniqueArray); // [1, 2, 3, 4]
```

