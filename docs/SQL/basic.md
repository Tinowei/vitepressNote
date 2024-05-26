# SQL學習筆記
## 基本語法 SELECT ... FROM ... WHERE ... 
```
選取 ...
從 ...表
條件 ...
```
> 撈取資料時，從select選擇要的欄位，並標示從哪一張表(from)
> 
- 選擇指定欄位
	```sql
	SELECT column1 , column2,...,
	FROM table_name ;
	```
- 選擇全部欄位
	```sql
	SELECT *
	FROM table_name ;
	```
- 剔除重複的資料進行撈取
	```sql
	SELECT DISTINCT
		column1,
		column2,
		...
	FROM table_name ;
	```
- 驗證是否有重複的資料
	- 透過COUNT來確認
```sql
SELECT
	COUNT(column1) 
	--計算指定資料表 (`table_name`) 中某個欄位(`column1`) 的總行數。
FROM
table_name ;

SELECT
COUNT(DISTINCT column1)
--計算欄位column1中不同值的總數
FROM table_name ;
```
- WHERE 條件 (針對要撈取的欄位進行條件過篩)
	- if 的意思
	```sql
	SELECT column1 , column2
	FROM table_name
	WHERE condition ;
	```
- ORDER BY
	- ASC
	- DESC
	- 多個排序條件
	```sql
	SELECT DISTINCT
	
	Country,
	
	Region,
	
	City
	
	FROM Customers
	
	ORDER BY Country DESC, Region, City ;
	```
- INSERT INTO (根據欄位插入新的資料)
	- INSERT INTO 表格名稱（欄位名稱1,...）
	  VALUES ('Fedex',...)
	 - 自動識別欄位表示我不需要特別給他值，他會自己加，但不一定會連號，只會保證不重複
	 - 可以一次新增多筆
	```sql
	INSERT INTO table_name(column1,column2)
	VALUES (value1,value2) ;
	```
	- 插入識別欄位
		- SELECT IDENTITY_INSERT  table ON
		  ...
		  SET IDENTITY_INSERT  table OFF
		```sql
			SELECT IDENTITY_INSERT  table ON
			INSERT INTO table_name(ID,column1,column2)
			VALUES (4,value1,value2) 
			SET IDENTITY_INSERT  table OFF;
		```
- IS NULL  & IS NOT NULL
	- 用來判斷空值與否
	- 因為一般的operator無法用來判斷NULL
- SELECT + TOP N
	- 抓前Ｎ個的資料
- SELECT + TOP N WITH TIES （把與最後同資料的留下）
	- 常常會有抓前Ｎ比資料時，發現第Ｎ筆資料後面有一筆或兩筆是一樣的值，這時候就可以也把他們都列出來。
- 找區間資料  (很常用在資料分頁)
  OFFSET N ROWS 
  FETCH NEXT a ROWS ONLY
	- 偏移N，加a
	- 要先做排序
- 欄位相加的情況下，若其中有欄位是空值，那新的欄位也會是空值
	- solution : 
		- column1 + ISNULL( column2,N'') AS new_column
			- ISNULL( column2,N'') ->當column2為空值時用後面的N''取代，若有值，則用值。
			- 此時當column2為空值時，new_column還是會把column1的值印出來
- UPDATE 
	- 指定PK=4的資料做修改
		```sql
		UPDATE Shippers
		SET
			CompanyName='New Company',
			Phone='02-44444444'
		WHERE ShipperID=4;
		```
	- 若條件不是PK則有可能會改多筆資料
		```sql
		UPDATE Shippers
		SET
			CompanyName='New Company',
			Phone='02-44444444'
		WHERE CompanyName LIKE 'Shipper#%'; 
		--開頭為Shipper#的資料都會被做修改
		```
- DELETE
	```sql
	DELETE FROM Shippers
	WHERE ShipperID=4;

	DELETE FROM Shippers
	WHERE CompanyName LIKE'Shipper#%';
	```

## 型態轉換  CAST and CONVERT

- CAST(column1 AS  new Type)
	```sql
	CAST (expression AS data_type(length))
	```
- CONVERT
	```sql
	CONVERT(data_type, expression [, style])
	```
	- 將一個日期字符串轉換為日期類型：
		```sql
		SELECT CONVERT(DATE, '2023-01-01') AS ConvertedDate;
		```
	

## COLLATE (定序)
- COLLATE 


## 字串相加
- +
- CONCAT(COL1 ,COL2) AS New_col
	- 其中一欄位是空值，那他就會變空白，New_col還是會印出東西

## String Functions
1. **CONCAT()**
	1. 用於連接兩個或多個字串
	```sql
	SELECT CONCAT('Hello', ' ', 'World') AS Result;
	```
2. SUBSTRING
	1. 用於提取子字串
	```sql
	SELECT SUBSTRING('abcdef', 2, 3) AS Result;  -- 從第2個位置開始，提取3個字符
	
	```
3. **LEFT()或RIGHT()**
	1. 用於提取字串的左部分或右部分。
	```sql
	SELECT LEFT('abcdef', 3) AS Result;  -- 提取左邊的3個字符
	```
4. **LENGTH() 或 LEN**
	1. 用於獲取字串的長度
	```sql
	SELECT LENGTH('Hello') AS Result;  -- 返回5
	```
5. **UPPER() 或 LOWER**
	1. 用於將字串轉換為全大寫或全小寫
	```sql
	SELECT UPPER('hello') AS Result;  -- 返回HELLO
	```
1. **TRIM() 或 LTRIM() 或 RTRIM**
	1. 用於去除字串前後的空格
	```sql
	SELECT TRIM('   Hello   ') AS Result;  -- 返回'Hello'
	```
7. **LTRIM() 和 RTRIM()**
	1. 用於去除字串左邊或右邊的空格
	```sql
	SELECT LTRIM('   Hello') AS Result;  -- 返回'Hello'
	```
8. **REPLACE()**
	1. 用於替換字串中的特定子字串
	```sql
	SELECT REPLACE('Hello, World!', 'World', 'Universe') AS Result; -- 'Universe World!'
	```
9. **CHARINDEX() 或 POSITION（根據資料庫）**
	1. 用於查找字串中的子字串的位置
	```sql
	SELECT CHARINDEX('l', 'Hello') AS Result;  -- 返回3
	```

## LIKE
>比較字串是否符合某種格式

- **百分比符號 `%`：**
	- 零個或多個任意字符
	```sql
	SELECT * FROM Products WHERE ProductName LIKE 'App%';
	-- 查詢商品表中開商品名稱為App開頭的資料
	```
- **底線 `_`：**
	- 表示單個任意字符
	```sql
	SELECT * FROM Customers WHERE ContactName LIKE 'J_hn';
	--選擇所有聯繫人名稱第一個字母是 "J"，第三個字母是 "h"，第四個是n的客戶。
	```
- **結合 `%` 和 `_`：**
	- 進行更複雜的模式匹配
	```sql
	SELECT * FROM Products WHERE ProductName LIKE 'App%e_';
	--選擇所有產品名稱以 "App" 開頭，倒數第二個字符為e的資料
	```
- - **中括號`[]` :**
	- 代表一個字元，裡面可以放一個區間也可以放單個字母
	```sql
	SELECT * FROM TableName WHERE ColumnName LIKE '[aeiou]%';
	--找到由a,e,i,o,u五個字母開頭的資料
	```
	- '`[^a-i%]`':
		- 表是不是由a到i開頭的資料
- **NOT LIKE：**
	- 使用 `NOT LIKE` 來查詢不匹配模式的行
	```sql
	SELECT * FROM Customers WHERE ContactName NOT LIKE 'A%';
	--選擇所有聯繫人名稱不是Ａ開頭的資料
	```
- **處理名名稱裡有特殊符號的方法：**
	- e.g. Go%ogle
		- `WHERE CompanyName LIKE '%\%%' ESCAPE '\'`
	- ESCAPE  '#' 代表溢出字元為＃
		- `WHERE CompanyName LIKE '%#%%' ESCAPE '#'`

## DateTime Functions
- **取得系統日期和時間值：**
	- - `GETDATE()`：返回當前日期和時間（根據伺服器的時區）。
	- `GETUTCDATE()`：返回當前的協調世界時 (UTC) 時間。
	```sql
	SELECT GETDATE() AS CurrentDateTime, GETUTCDATE() AS CurrentUTCDateTime;
	```
- **取得日期和時間部分：**
	- `DATENAME`：返回日期或時間部分的名稱。
	- `DATEPART`：返回日期或時間部分的整數值。
	```sql
	SELECT
	DATENAME(YEAR, GETDATE()) AS CurrentYear,
	DATEPART(MONTH, GETDATE()) AS CurrentMonth,
	DATEPART(Day, GETDATE()) As CurrentDay;
	```
- **從部分取得日期和時間值：**
	- `DATETIME2FROMPARTS`：根據指定的部分（年、月、日、時、分、秒、毫秒）創建 `datetime2` 值。
	- `DATEFROMPARTS`：根據指定的部分（年、月、日）創建 `date` 值。
	```sql
	SELECT
	DATETIME2FROMPARTS(2023, 12, 7, 15, 30, 0, 0,0) AS CustomDateTime,
	DATEFROMPARTS(2023, 12, 7) AS CustomDate;
	```
- **計算日期和時間差異：**
	- `DATEDIFF`：計算兩個日期或時間之間的差異。
	- `DATEDIFF_BIG`：類似 `DATEDIFF`，但返回 `bigint` 型別。
	```sql
		SELECT DATEDIFF(DAY, '2023-01-01', GETDATE()) AS DaysDifference;
	```
- **修改日期和時間值：**
	 - `DATEADD`：將指定的時間間隔添加到日期或時間值。
	- `EOMONTH`：返回指定日期所在月份的最後一天的日期。
	```sql
	SELECT 
	DATEADD(MONTH, 1, GETDATE()) AS OneMonthLater, EOMONTH(GETDATE()) AS LastDayOfMonth;
	
	```
- **驗證日期和時間值：**
	- `ISDATE`：檢查指定的表達式是否為有效的日期或時間。
		- True : 1
		- False : 0
	```sql
	SELECT ISDATE('2023-12-07') AS IsValidDate;
	```
## CASE Expressions
- 語法
```sql
	SELECT
	    column1,
	    column2,
	    CASE
	        WHEN condition1 THEN 'Result1'
	        WHEN condition2 THEN 'Result2'
	        ELSE 'DefaultResult'
	    END AS NewColumn
	FROM
	    YourTable;

```

>Products表按照產品價格由大排到小
>再多一個欄位，超過十塊錢的產品顯示很貴
>十塊到五塊顯示普通
>低於五塊顯示便宜
```sql
SELECT
	p.ProductID,
	p.ProductName,
	p.UnitPrice,
	CASE
		WHEN UnitPrice >= 10 THEN N'貴'
		WHEN p.UnitPrice >= 5 THEN N'普通'
		ELSE N'便宜'
	END AS N'等級'
	FROM Products AS p
	ORDER BY p.UnitPrice DESC;
```
>再多二個欄位顯示折扣數和折扣後價格
>*別名不能拿來算！！*
```sql
SELECT
	p.ProductID,
	p.ProductName,
	p.UnitPrice,
	CASE
		WHEN UnitPrice >= 10 THEN N'貴'	
		WHEN p.UnitPrice >= 5 THEN N'普通'
		ELSE N'便宜'
	END AS N'等級',
	CASE
		WHEN p.UnitPrice >=10 THEN 0.8
		WHEN p.UnitPrice >=5 THEN 0.9
	ELSE 1
	END AS N'折扣',
	CASE
		WHEN p.UnitPrice >=10 THEN (p.UnitPrice*0.8)
		WHEN p.UnitPrice >=5 THEN (p.UnitPrice*0.9)
	ELSE p.UnitPrice
	END AS N'折扣後價格'
	FROM Products AS p
	ORDER BY p.UnitPrice DESC;
```



## Practice

1. 拿Products表中的CategoryID去Categories表去找CategoryName
	```sql
	SELECT
		p.ProductID,
		p.ProductName,
		--p.CategoryID,
		p.UnitPrice,
		--c.CategoryID AS N'Categories的CategoryID',
		c.CategoryName
	FROM Products AS p
	INNER JOIN Categories c ON p.CategoryID = c.CategoryID ;
	```

2. 撈出產品名稱和價格以及供應公司之名稱
	```sql
	SELECT
	p.ProductID,
	p.ProductName,
	p.UnitPrice,
	s.CompanyName
	FROM Products AS p
	INNER JOIN Suppliers s ON s.SupplierID = p.SupplierID
	Order BY CompanyName;
	```
3. 撈出產品名稱和價格以及供應公司名稱，還有撈出CategoryName類別名稱
	```sql
	SELECT
	p.ProductID,
	p.ProductName,
	p.UnitPrice,
	s.CompanyName AS N'供應商',
	c.CategoryName AS N'產品類別名稱'
	FROM Products AS p
	INNER JOIN Suppliers s ON s.SupplierID = p.SupplierID
	INNER JOIN Categories c ON c.CategoryID=p.CategoryID
	```

4. 哪個客戶（ID）在哪一天（日期）買了什麼產品，單價、數量、折扣、小計、送貨地址？
	```sql
	SELECT
	c.CustomerID,
	c.CompanyName AS N'客戶名稱',
	o.OrderDate AS N'訂購日期',
	p.ProductName As N'產品名稱',
	od.UnitPrice,
	od.Quantity,
	od.Discount,
	(od.UnitPrice * od.Quantity * (1-od.Discount)) AS N'小計',
	o.shipAddress AS N'送貨地址'
	FROM Customers AS c
	INNER JOIN Orders o ON o.CustomerID=c.CustomerID
	INNER JOIN [Order Details] od ON od.OrderID = o.OrderID
	INNER JOIN Products p ON p.ProductID = od.ProductID ;
	```
5. 哪一個客戶買了哪一類的商品 ？ Products ->...-> Categories
	```sql
	SELECT
	c.CustomerID,
	c.CompanyName,
	Categories.CategoryName --AS N'Categories的產品類別名稱'
	FROM Customers c
	INNER JOIN Orders o ON c.CustomerID = o.CustomerID
	INNER JOIN [Order Details] od ON o.OrderID = od.OrderID
	INNER JOIN Products p ON od.ProductID = p.ProductID
	INNER JOIN Categories ON p.CategoryID = Categories.CategoryID ;
	```
6. 當使用LEFT OUTER JOIN時，若有客戶表中的某顧客ID，在訂單表上的找不到相符的顧客ID，亦即為此客戶並沒有下過訂單，但依舊留下這筆資料，只是填入NULL
	```sql
	SELECT
	c.CustomerID,
	c.CompanyName,
	o.OrderID,
	o.orderDate
	FROM Customers c
	LEFT OUTER JOIN Orders o ON o.CustomerID = c.CustomerID
	```
7. 顯示客戶ID和名稱，並找出訂單記錄(沒有下訂單的客戶也要找出來)
	```sql
	SELECT
	c.CustomerID,
	c.CompanyName,
	o.OrderID,
	o.orderDate
	FROM Customers c
	LEFT OUTER JOIN Orders o ON o.CustomerID = c.CustomerID
	```
8. 只顯示出沒有下過訂單的客戶
	1. 先找出沒有下過訂單與下過訂單的客戶，在用IS NULL判斷空值語法過篩
	```sql
	SELECT
	c.CustomerID,
	c.CompanyName,
	o.OrderID,
	o.orderDate
	FROM Customers c
	LEFT OUTER JOIN Orders o ON o.CustomerID = c.CustomerID
	WHERE o.ORderID is NULL ; 
	```
9. 員工配對的組合，須解決員工不能跟自己配對
	```sql
	SELECT
	e1.FirstName,
	e2.FirstName
	FROM Employees e1 CROSS JOIN Employees e2
	WHERE e1.EmployeeID <> e2.EmployeeID ;
	```
10. 找到員工的老闆，並新增一個BossName欄位(老闆因為沒有上司，因此會少一筆)
	1. 自我關聯（self join）
	2. tips : FK = PK (員工表的reportsTo 要等於老闆表的employeeID)
	```sql
	SELECT
	e.EmployeeID,
	e.firstName,
	e.ReportsTo,
	e.ReportsTo,
	N'BossName' = boss.FirstName
	FROM Employees AS e
	INNER JOIN Employees AS boss ON e.ReportsTo = boss.EmployeeID
	```

11. 從員工資料表裡撈取欄位，並新增一個欄位顯示上司名字，老闆也要顯示出來
	1. tips : OUTER JOIN 把不符合的也留下
	```sql
	SELECT
		e.EmployeeID,
		e.firstName,
		e.ReportsTo,
		e.ReportsTo,
		N'BossName' = boss.FirstName
		FROM Employees AS e
		LEFT OUTER JOIN Employees AS boss ON e.ReportsTo = boss.EmployeeID ;
	```

 12. 抓產品表中價格在10~20之間的產品
	 1. tips : Between
		 1.  >= AND <=
		```sql
		SELECT
			*
		FROM Products
		WHERE UnitPrice >=10 AND UnitPrice<=20 ;
		-- = WHERE UnitPrice Between 10 AND 20; 
		```
 13. 抓客戶的城市所在位置是London或Paris 的客戶資料
		```sql
			SELECT
			*
			From Customers
			--WHERE City = N'London' OR City=N'Paris';
			WHere City IN (N'London',N'Paris');
		```

14. 抓19980401之後的訂單
	```sql
	SELECT
	*
	FROM orders AS o WHERE o.orderDate >= '19980401'; --從0401的00:00:00開始撈取
	```

15. 抓19980401～19980430的訂單 (小於最後一天加一天的日期)
	```sql
	SELECT
	
	*
	
	FROM orders AS o WHERE o.orderDate >= '19980401' AND o.orderDate <'19980501';
	```
16. 抓1998年的所有訂單
	```sql
	SELECT
	*
	From orders
	-- WHERE orderDate >='19980101' AND orderDate <'19990101';
	WHERE YEAR(OrderDate)=1998;
	```
17. 抓最貴的前n個產品
	```sql
	SELECT TOP 4
	ProductID,
	ProductName,
	UnitPrice
	FROM Products
	ORDER BY UnitPrice DESC;
	```
18. 選擇指定區間的資料(例如 : 撈出第四貴到第八貴的資料)
	1. tips: offset 3 and add 5 (4,5,6,7,8)
	```sql
	SELECT
	ProductID,
	ProductName,
	UnitPrice
	FROM Products
	ORDER BY UnitPrice DESC
	OFFSET 3 ROWS
	FETCH NEXT 5 ROWS ONLY ;
	```
19. Customers表中，撈出FAX欄位沒有資料的客戶
	```sql
	SELECT
	*
	FROM Customers
	WHERE FAX is NULL;
	```
20. Customers表中，撈出傳真欄位有資料的客戶
	```sql
	SELECT
	*
	FROM Customers
	WHERE FAX IS NOT NULL;
	```
21. 新增一個描述的欄位:格式為" Name is $xxx"
	```sql
	SELECT
	ProductID,
	ProductName,
	UnitPrice,
	ProductName + N' is $' + CAST(UnitPrice AS NVARCHAR(10)) AS Description
	FROM Products
	```
22. 撈取住在倫敦的客戶 (設定定序)
	```sql
	SELECT
	*
	FROM Customers
	WHERE City COLLATE Chinese_Taiwan_Stroke_CS_AI = N'LonDon'
	--CS分大小寫
	```
23. 兩欄位相加，產生新欄位，當前兩個欄位其中一個有空值，新欄位就會是空值 解決辦法如下
	```sql
	SELECT
	Country,Region,
	Country + N' ' + Region AS Location,
	Country + ISNULL(N' ' + Region,N'') AS Location2,
	CONCAT(Country,N' ' + Region) AS Location3
	FROM Customers
	```

## 將字串轉成指定的資料型態 PARSE

**概述**
```
PARSE 函數在SQL Server中的主要用途是將字串轉換為具有指定格式的日期時間或數值型態。
以下是 PARSE函數的用法的解釋說明
```

```sql
SELECT
	PARSE( expression AS data_type [ USING culture ])
```
- `expression`：要解析的字串。
- `data_type`：目標資料型態，可以是日期時間型態（如 `datetime`、`date`、`time`）或數值型態（如 `decimal`、`money`）。
- `culture`：（可選）用於解析的文化設定，確保字串在解析時能夠被正確理解。

**日期時間解析的範例：**
```sql
	PARSE('2023/12/15' AS datetime USING 'de-de') AS ParsedDateTime;
```
這個例子將字串 '2023/12/15' 解析為日期時間型態，使用了德國（'de-de'）的文化設定。

**數值解析的範例：**
```sql
	PARSE(N'¥123456.456' AS money USING 'ja-JP') AS ParsedMoney;
```
這個例子將字串 '¥123456.456' 解析為金額型態，使用了日本（'ja-JP'）的文化設定。

**日期時間和數值的格式控制：**
- `PARSE` 函數允許您通過提供合適的文化設定來解析具有不同格式的日期時間和數值。這是確保解析正確的重要一步。

**異常處理：**
- 如果提供的字串無法成功解析為指定的資料型態，`PARSE` 函數可能會引發異常。因此，您可能需要使用 `TRY_PARSE` 函數，它允許您在解析失敗時返回 NULL 而不是引發異常。

## 轉換型態的兩種方式
https://learn.microsoft.com/zh-tw/sql/t-sql/functions/cast-and-convert-transact-sql?view=sql-server-ver16
- CAST( 要轉的資料 AS Type)
	-  `CAST` 是標準的 SQL 語法，用於將一種資料型態轉換為另一種。
	- 語法：`CAST(expression AS data_type)`
	    例如：
```sql
	SELECT CAST('123' AS INT) AS ConvertedValue;
```

- CONVERT(Type , 要轉的資料,2) //2代表四位數
	- `CONVERT` 是 SQL Server 特有的函數，用於將一種資料型態轉換為另一種，同時可以指定風格(style)。
	    
	- 語法：`CONVERT(data_type, expression, style)`
	  例如：
```sql
	SELECT CONVERT(INT, '123', 2) AS ConvertedValue;
	//這裡的 `2` 代表風格(style)，在這個例子中是指定了四位數。
```
	
這兩種方法都可以用來執行資料型態轉換，選擇使用哪一種通常取決於您的個人偏好或具體的使用情境。值得注意的是，這兩種方法都應該謹慎使用，確保轉換是合理且安全的，以避免資料損失或不正確的結果。



## 轉換資料顯示的格式 FORMAT(資料,‘’轉換格式")
https://learn.microsoft.com/zh-tw/sql/t-sql/functions/format-transact-sql?view=sql-server-ver16
```sql
SELECT  
  CONVERT(nvarchar(500), $3232123456.789012345, 3),  
  CONVERT(money, '¥123,456.456'),  
  GETDATE(),  
  FORMAT(GETDATE(), 'D', 'en-US'),  
  -- D與d的差別在於顯示日期格式時，是顯示日期文字還是數字，例如:December還是顯示12
  FORMAT(GETDATE(), 'd', 'de-de'),  
  FORMAT(GETDATE(), 'D', 'ja-JP'),  
  FORMAT(123456789, '##-##-###-###'),  
  FORMAT(GETDATE(), 'yyyy:MM:dd')

```


## 常數的標示法 t sql to constant
https://learn.microsoft.com/en-us/sql/t-sql/data-types/constants-transact-sql?view=sql-server-ver16

## ISNUMERIC('string') 會判斷括號裡的字串是否是一個數字字串
- 回傳值 : int
	- 1 表示 是符合數字字串 包含浮點數及money
	- 0 表示 不符合數字字串

```sql
	SELECT
		ISNUMERIC('Tino') AS  isnumeric_result; //display 0
        
```

```sql
	SELECT
		ISNUMERIC('101.99') AS  isnumeric_result; //display 1
```

## IIF 回傳一個值，依據前面的自訂邏輯
https://learn.microsoft.com/zh-tw/sql/t-sql/functions/logical-functions-iif-transact-sql?view=sql-server-ver16
`IIF(boolean expression , true_value,false_value)`
```sql
	SELECT 	productid, unitprice, 
			IIF(unitprice > 50, 'high','low') AS pricepoint
			-- 當unitpirce大於50則印出的是high，否則是low，並組成一個新的欄位叫做pricepoint
	FROM Production.Products;
```

## CHOOSE 從數值清單傳回指定之索引的項目
https://learn.microsoft.com/zh-tw/sql/t-sql/functions/logical-functions-choose-transact-sql?view=sql-server-ver16
```sql
	SELECT 
		CHOOSE ( 3, 'Manager', 'Director', 'Developer', 'Tester' ) AS Result;
```

## ISNULL() 判斷欄位資料是否有NULL，有就替換掉指定內容

只能放兩個參數
如果資料表裡的某一欄位的資料有null，就把null替換成指定字串
```sql
	SELECT
		Fax,
		ISNULL(FAX,'N/A')
	FROM Customers
```

```sql
	SELECT
		Fax,
		ISNULL(FAX,'N/A'),
		Country,
		ISNULL(Region,N'是空值'),
		City
	FROM Customers
```


## COALESCE 傳回第一個不是空值的值，否則回傳指定內容

可放Ｎ個參數，也就是說，當設定兩個參數時估能與ISNULL一樣，因此用COALESCE就好
```sql
	SELECT
		Fax,
		ISNULL(FAX,'N/A'),
		Region,
		FAX,
		COALESCE(Region,FAX,N'N/A') AS a,
		--表示當Region FAX都是空值的話在a欄位印出N/A
		-- 當Region 有值時a印出的是Region的值
		-- 當Region沒有值，FAX有值時，a印出的是FAX的值
		-- 當參數都有值時，回傳的依舊是第一個的值 
		City
	FROM Customers
```

## COUNT 算總數
- COUNT( ) 算表格總數量
- COUNT(欄位) 算此欄位的資料總數量
```sql
	select
		COUNT(*) N'客戶數量', 
		COUNT(Fax) N'有傳真的客戶數量'
	FROM Customers
	-- 客戶數量:91
	-- 有傳真的客戶數量:69
```

## GROUP BY 欄位
- 假設欄位A的資料是數字1~8，那他就會分成八堆資料
- 有GROUP BY 的話，SELECT 一定要是**彙總函式**或是**GROUP BY 子句**中
```sql
	SELECT
		c.CategoryName,
		MIN(p.UnitPrice),
		MAX(p.UnitPrice),
		AVG(p.UnitPrice),
		SUM(p.UnitPrice),
		COUNT(*)
	FROM Products p
	INNER JOIN Categories c ON p.CategoryID=c.CategoryID
	GROUP BY c.CategoryName
```

```sql
	SELECT
		COUNT(CustomerID),
		COUNT(DISTINCT CustomerID) //扣除重複的數量
	FROM Orders
```

## WHERE裡面不能有彙總函式，要改用HAVING，而且要放在最後面
HAVING 等於 GROUP BY 的 WHERE
```sql
	SELECT
	c.CategoryName,
	MIN(p.UnitPrice),
	MAX(p.UnitPrice),
	AVG(p.UnitPrice),
	SUM(p.UnitPrice),
	COUNT(*)
	FROM Products p
	INNER JOIN Categories c ON p.CategoryID=c.CategoryID
	GROUP BY c.CategoryName -- 到這有八筆資料
	HAVING AVG(p.UnitPrice)>30 --到這篩選掉剩下3家
```








觀念釐清
```c#
long no1=1234;//在記憶體裡面他就是存了1234
int  no2=(int)no1;//ok 把它看成int的1234，差別只是long比較多byte，因此轉成int後只是把後面多的byte去掉而已。
//因此要能使用(int)必須要是他在記憶體本身就是被看成數字，而字串在記憶體中是編碼。

string s="1234";//因為他是字串，所以在記憶體裡面他存的是unicode編碼，假設1代表著60000，那當1這個字串轉換成int時就會變成數字60000，因此會錯。
int  no3= (int)s;//error
int  no4=int.Parse(s);/ok

DateTime d = new DateTime(2023,12,15);
int no5=(int)d;//error 因為日期在記憶體中不是數字。
int no6=int.Parse(d);//error
```

SQL字串裡面若有出現單引號的必要，就加上兩個單引號即可



