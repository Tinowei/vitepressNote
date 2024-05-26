# 子查詢
## 子查詢Subquery 

>select語法裡面再有select語法
>>FROM 後面加入一個子查詢也可以 -> 延伸 Derived Table

1. ex : 抓訂單表，不能用join，新增一個欄位表示客戶名字 ，另一個欄位表示客戶的傳真
```sql
	SELECT
		o.OrderID AS N'訂單編號',
		o.OrderDate AS N'訂單日期',
		o.CustomerID AS N'客戶編號',
		(SELECT 
			c.CompanyName 
		 FROM Customers c
		 WHERE c.CustomerID=o.CustomerID) AS N'客戶名字',
		 (SELECT 
			c.Fax 
		  FROM Customers c 
		  WHERE c.CustomerID=o.CustomerID ) AS N'客戶的傳真'
	FROM Orders o
	ORDER BY o.OrderID

```
 等於以下使用JOIN的語法
```sql
	SELECT
		o.OrderID AS N'訂單編號',
		o.OrderDate AS N'訂單日期',
		o.CustomerID AS N'客戶編號',
		c.CompanyName AS N'客戶名字',
		c.Fax AS N'客戶的傳真'
	FROM Orders o
	INNER JOIN Customers c ON o.CustomerID=c.CustomerID
	ORDER BY o.OrderID
```

2. ex2 : 列出CustomerID,CompanyName,TotalOrders 算各客戶的訂單數量
```sql
	SELECT 
	 c.CustomerID,
	 c.CompanyName,
	 (SELECT
		COUNT(o.OrderID)
	   FROM Orders o
	   WHERE o.CustomerID = c.CustomerID) AS TotalOrders
	FROM Customers c
	ORDER BY TotalOrders
```
3. ex3 : 列出客戶的訂單數量為0的資料
```sql
	SELECT 
	 c.CustomerID,
	 c.CompanyName
	
	FROM Customers c
	WHERE (SELECT
		COUNT(o.OrderID)
	   FROM Orders o
	   WHERE o.CustomerID = c.CustomerID) =0 
	   -- 做了91次，每一次都去找是不是等於零
```

4. ex4 : 抓到所有客戶資料表中住在London或是Paris的客戶
	1. IN(' ', ' ', ' ',....) 在某個範圍內
```sql
	SELECT 
	*
	FROM Customers
	WHERE City IN('London','Paris')
```
5. 找出訂單超過十五筆的客戶所在城市(城市不重複)
```sql
	SELECT 
	*
	FROM Customers
	WHERE City IN(SELECT DISTINCT
	 --c.CustomerID,
	 --c.CompanyName,
	 c.City N'訂單超過十五筆的客戶所在城市(城市不重複)'
	FROM Customers c
	WHERE (SELECT
		COUNT(o.OrderID)
	   FROM Orders o
	   WHERE o.CustomerID = c.CustomerID) >=15)
```


6. 抓到從今天起算距離最近的那天的所有訂單
```sql
	--我寫的是以下
	SELECT
		*
	FROM Orders
	WHERE OrderID IN(SELECT TOP 4
			o.OrderID
		 FROM Orders o
		 ORDER BY o.OrderDate DESC) 
	ORDER BY OrderDate DESC
	
	--用函數 ，找出距離今天最近的那一天的日期
	SELECT
		MAX(CAST(OrderDate AS date))
	FROM Orders
	
	SELECT
		*
	FROM Orders
	WHERE OrderDate IN(SELECT
						MAX(CAST(OrderDate AS date)) --先轉成日期
						 FROM Orders
					) 
	ORDER BY OrderDate DESC
```

7. 找出每一個客戶最近一次購買過的訂單
```sql
	SELECT
		o.CustomerID,
		o.OrderDate
	FROM Orders o
	WHERE CAST(o.OrderDate AS date)=(SELECT
										MAX(CAST(OrderDate AS date))
									 FROM Orders
									 WHERE CustomerID=o.CustomerID)
	
	--先做小範圍
	SELECT
		--OrderDate,
		MAX(CAST(OrderDate AS date))
	FROM Orders
	WHERE CustomerID='VINET'
```
8. 算訂單的總金額 (總訂單有2155筆，可以用SUM去算總銷售額)
```sql
	SELECT
		o.CustomerID,
		SUM(od.UnitPrice *od.Quantity*(1-od.Discount)) AS N'總購買金額'
	FROM [Order Details] od  
	INNER JOIN Orders o ON od.OrderID=o.OrderID
	GROUP BY o.CustomerID
```

9. 找出沒有訂單的客戶
	1. tips：NOT EXISTS  的用法
```sql
	SELECT
		c.*
	FROM Customers c
	WHERE (
		SELECT 
			COUNT(o.OrderID)
		FROM Orders o
		WHERE c.CustomerID = o.CustomerID)=0
	--另解
	
	SELECT
		c.*
	FROM Customers c
	WHERE NOT EXISTS (
		SELECT
			*
		FROM Orders
		WHERE CustomerID = c.CustomerID
)
```


