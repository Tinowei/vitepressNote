# JOIN語法

SQL 中的 JOIN 用於將來自兩個或多個表的數據結合起來。以下是常見的 JOIN 類型及其使用方式。

### 語法
```sql
SELECT columns
FROM table1
JOIN table2 ON condition;
```
- 將另一張表加入後，會根據條件比較對應欄位的數據。

## 1. INNER JOIN

- 只有在 `ON` 條件成立的情況下，兩表的記錄才會被保留下來。

```sql
SELECT *
FROM Orders
INNER JOIN Customers ON Orders.CustomerID = Customers.CustomerID;
```

## 2. OUTER JOIN

#### LEFT OUTER JOIN

- 以左邊的表為主，保留左邊表的所有記錄，即使沒有匹配的記錄也會顯示 `NULL`。

```sql
SELECT *
FROM Customers
LEFT OUTER JOIN Orders ON Customers.CustomerID = Orders.CustomerID;
```

- 特點：
  - 主要資料表在左邊，保留左邊表的所有資料。
  - 當 `ON` 條件不成立時，左邊表的欄位仍會保留，右邊表的值顯示 `NULL`。
  - 結果集通常比 INNER JOIN 包含更多的記錄，因為不匹配的也會留下。

#### RIGHT OUTER JOIN

- 以右邊的表為主，保留右邊表的所有記錄，即使沒有匹配的記錄也會顯示 `NULL`。

```sql
SELECT *
FROM Orders
RIGHT OUTER JOIN Customers ON Orders.CustomerID = Customers.CustomerID;
```

- 特點：
  - 主要資料表在右邊，保留右邊表的所有資料。
  - 當 `ON` 條件不成立時，右邊表的欄位仍會保留，左邊表的值顯示 `NULL`。
  - 等價於左表和右表對調後的 LEFT OUTER JOIN。

```sql
SELECT *
FROM Customers
LEFT OUTER JOIN Orders ON Customers.CustomerID = Orders.CustomerID;
```

## 3. CROSS JOIN

- 兩表相互比對，生成所有排列組合的記錄。

```sql
SELECT *
FROM Employees
CROSS JOIN Projects;
```

- 特點：
  - 假如 `table1` 有 9 筆資料，`table2` 有 9 筆資料，CROSS JOIN 後會產生 81 筆資料。
  - 使用情境：例如員工配對玩遊戲，或是客戶購買產品的各種排列組合。

### 比較運算符

- `<>` 表示 "不等於" 的比較運算符。

```sql
SELECT *
FROM Products
WHERE Price <> 100;
```

## 範例總結

```sql
-- INNER JOIN 範例
SELECT Orders.OrderID, Customers.CustomerName
FROM Orders
INNER JOIN Customers ON Orders.CustomerID = Customers.CustomerID;

-- LEFT OUTER JOIN 範例
SELECT Customers.CustomerName, Orders.OrderID
FROM Customers
LEFT OUTER JOIN Orders ON Customers.CustomerID = Orders.CustomerID;

-- RIGHT OUTER JOIN 範例
SELECT Orders.OrderID, Customers.CustomerName
FROM Orders
RIGHT OUTER JOIN Customers ON Orders.CustomerID = Customers.CustomerID;

-- CROSS JOIN 範例
SELECT Employees.EmployeeName, Projects.ProjectName
FROM Employees
CROSS JOIN Projects;
```
