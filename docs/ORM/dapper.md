# Dapper學習筆記
## 前言

ADO.NET 是什麼 ？
- 微軟最一開始2001年，用來對資料庫(SqlServer, XML,MySql, ...)連線進行CRUD的技術。
- 與資料庫直接溝通，不會有效能折損，因此最有效率的會是ADO.NET 
- 微軟以**ADO.NET**為基礎 推出**Entity Framework** ->微軟的ORM
- 目前我們用到的Entity Framework or Dapper 在底層都會被轉成ADO.NET，EntityFramework 轉換的東西會有最佳化的問題，因此可能會有效能上的折損

用ADO.NET的問題點：
對資料庫溝通的技術沒有抽象化，代表換一個資料庫就要重寫一次程式，這是一個問題，
因此出現了ORM(程式與資料庫溝通的代理人)

***ORM 的出現***
理念 : 希望跟資料庫做一個隔離，讓資料庫可以被抽換，而不需要完全重寫程式
例：EFCore(Entity Framework Core)
``C# Linq 語法``  <--> ``Entity Framework Core(ORM)轉換成ADO.NET`` <--> ``資料庫(可以被抽換 MySql , Oracle , ...)``

***比較***
```
ADO.NET => 原生SQL語法 => Sql Server

EF   => Linq =>  ADO.NET +  原生SQL語法 => Sql Server

Dapper => 原生SQL語法  => Sql Server
```


## 什麼是Dapper ?

- Dapper is a Micro ORM
- 體積小，速度快
- **須明確宣告SQL命令字串（和資料庫有相依）**
- Entity Framework 將抽象化後端資料庫平台（和資料庫無相依，資料庫動，程式不用跟著動）

## Dapper與EF的差異
Entity Framework資料庫存取四要素：DataModal , DBContext ,資料庫連線 , DI註冊。

- Dapper沒有DBContext，因此也不需要DBContext作為對資料庫的中樞
- Dapper也不需要在DBContext註冊DBSet< T > Data Model
- Dapper不支援EF core First Migration
- Dapper不一定要Data Model(因為他沒有DBContext) ，他支援dynamic type （ef 要對資料庫做存去一定要有DataModel 因為ef 對資料庫溝通的中樞在DbContext，因此需要有dataModel去做資料承接）
- Dapper的CRUD語法較像直傳SQL Statement 給資料庫 ; 而EF則較常用Linq或ORM操作方式，後續Provider在轉換成特定資料庫語法。
- MVC的Scaffolding 只支援EF DbContext 及 Data Model的模式
- Dapper效能比EF快

因此要用Dapper的前提？ 還是需要先用Ef做Scaffold 和Migration 倒出DataModel。


## 使用Dapper https://dappertutorial.net/dapper
1. 建立資料庫連線物件 SqlConnection
2. 建立SQL命令字串 string sql = ...
3. 將SQL命令字串傳遞給Query( sql ) 等方法做查詢
![[使用Dapper的三步驟.png]]
### Install Dapper and SqlClient in  NuGet
1. Dapper
2. Microsoft.Data.SqlClient
## Dapper 內建的九種方法
1. Execute 新增,刪除,修改
2. ExecuteReader
3. ExecuteScalar
4. Query
5. QueryFirst
6. QueryFirstOrDefault
7. QuerySingle
8. QuerySingleOrDefault
9. QueryMultiple

### Query< T >() 回傳強型別
執行查詢，並回傳強型別物件
什麼是強型別查詢？ 
-> 查詢結果的回傳一定要有一個事先宣告好的模型來承接回傳的結果

(資料庫連線物件需要很重要的東西->連線字串)

```c#
static string connString = @"Server=xx.xxx.xx.x;User=username;Password=password;Database=NorthwindNEW;Trusted_Connection=false;TrustServerCertificate=true;MultipleActiveResultSets=true";

```

```C#
//#1.查詢 --> 回傳List<Employee>強型別
static void QueryStrongTyped()
{
	List<Employee> employees = null;
	//建立SqlConnection物件需要連線字串
	using (SqlConnection conn = new SqlConnection(connString))
	{
		string sql = "select * from Employees";
		employees = conn.Query<Employee>(sql).ToList();
	}

	foreach (var emp in employees)
	{
		Console.WriteLine($"{emp.EmployeeID}, {emp.Title}, {emp.City}, {emp.Country}");
	}

	Console.ReadKey();
}
```

### Query() -回傳dynamic List
執行查詢，回傳一個dynamic動態型別物件
什麼是動態型別？
->***事先不需要宣告模型來承接***
```
優點：當要對數個資料表選取任意的欄位，不需要對每個組合的查詢都建一個Model
```
缺點 : 因為沒有模型，因此無法使用.來選取屬性(沒有intellisense)，打錯字也無法檢查

```c#
//#2. Dynamic
static void QueryDynamicTyped()
{
	using (SqlConnection conn = new SqlConnection(connString))
	{
		string sql = "select * from Employees";
		var employees = conn.Query(sql).ToList();

		foreach (var emp in employees)
		{
			Console.WriteLine($"{emp.EmployeeID}, {emp.Title}, {emp.City}, {emp.Country}");
		}
	}
}
```

### QueryFirstOrDefault( )
執行查詢，並回傳第一筆資料（多筆回傳第一筆）
```C#
static void QueryFirstRecord(){
	using (SqlConnection conn = new SqlConnection(connString)){
		string sql = "select * from Employees where Country='UK'";
		//查詢第一筆資料
		var emp = conn.QueryFirstOrDefault<Employee>(sql);
		
	Console.WriteLine($"{emp.EmployeeID}, {emp.LastName}, {emp.Title},  {emp.City}, {emp.Country}");
	}
}
```

### QuerySingleOrDefault( )
查詢唯一一筆的資料，若有多筆會跳錯誤
```c#
static void QuerySingleRecord()
{
	using (SqlConnection conn = new SqlConnection(connString))
	{
		string sql = "select * from Employees where LastName=@lastname";

		Employee emp = conn.QuerySingleOrDefault<Employee>(sql, new { lastname="King" });

		Console.WriteLine($"{emp.EmployeeID}, {emp.LastName},{emp.FirstName},{emp.Title}, {emp.City}, {emp.Country}");

		Console.ReadKey();
	}
}
```

### 指定多重參數
```c#
//#5 , 指定多重參數
static void QueryParameters()
{
	List<Employee> employees;
	using (SqlConnection conn = new SqlConnection(connString))
	{
		string sql = "select * from Employees where ";
		sql += "Country=@country and TitleOfCourtesy=@titleOfCourtesy";
		employees = conn.
			Query<Employee>(sql, new { country="USA", titleOfCourtesy= "Ms."}).ToList();
	}

	foreach (var emp in employees)
	{
		Console.WriteLine($"{emp.EmployeeID}, {emp.LastName}, {emp.Title}, {emp.Country}, {emp.TitleOfCourtesy}");
	}
}
```

### 傳遞參數集合做查詢

```c#
//#6, 傳遞參數集合作查詢
static void QueryParameterList()
{
	List<Employee> employees = null;

	using (SqlConnection conn = new SqlConnection(connString))
	{
		string sql = "Select * from Employees Where EmployeeID in @IDs";
		employees = conn.Query<Employee>(sql, new { IDs = new int[] { 1, 3, 5 } }).ToList();
	}

	foreach (var emp in employees)
	{
		Console.WriteLine($"{emp.EmployeeID}, {emp.LastName}, {emp.Title}, {emp.Country}");
	}

	Console.WriteLine("--------------------------------------");

	employees = null;

	using (SqlConnection conn = new SqlConnection(connString))
	{
		string sql = "Select * from Employees Where LastName in @LastName";
		employees = conn.Query<Employee>(sql, new { LastName = new[] { "Fuller", "King" } }).ToList();
	}

	foreach (var emp in employees)
	{
		Console.WriteLine($"{emp.EmployeeID}, {emp.LastName}, {emp.Title}, {emp.Country}");
	}
}
```

### 查詢預存程序
查詢SQL Server資料庫Stored Procedure預存程序。呼叫FindEmployeeByName預存程序，並傳遞參數![[SQLServer的預存程序.png]]

```c#
//#7, 查詢預存程序
static void QuerySP()
{
	using (SqlConnection conn = new SqlConnection(connString))
	{
		var emp = conn.Query<Employee>("FindEmployeeByName",
			new { LastName = "King", FirstName = "Robert" },
			commandType: CommandType.StoredProcedure
			).FirstOrDefault();

		Console.WriteLine($"{emp.EmployeeID}, {emp.FirstName}, {emp.LastName}, {emp.Country}");
	}

	Console.ReadKey();
}
```


### QueryAsync非同步查詢

```C#
//#8, QueryAsync非同步查詢
static void QueryAsyncStrongTyped()
{
	string sql = "select * from Employees";

	using (SqlConnection conn = new SqlConnection(connString))
	{
		List<Employee> employees = conn.QueryAsync<Employee>(sql).Result.ToList();

		foreach (var emp in employees)
		{
			Console.WriteLine($"{emp.EmployeeID}, {emp.Title}, {emp.City}, {emp.Country}");
		}
	}
}
```

### Execute( ) 執行Insert

```c#
static void Main(string[] args)
{
	Employee emp = new Employee()
	{
		FirstName = "大衛",
		LastName = "王",
		Title ="CEO",
		Country = "USA"
	};

	int rows = ExecuteInsert(emp);

	if(rows >0){
		//todo:處理成功寫入的事情
	}
	
	Console.WriteLine($"影響{rows}筆資料");
	Console.ReadKey();
}

//#9 Insert
static int ExecuteInsert(Employee emp)
{
	int affectedRow = 0;

	using (SqlConnection conn = new SqlConnection(connString))
	{
		string sql = "INSERT INTO Employees(FirstName, LastName, Title, Country) VALUES ( @FirstName, @LastName, @Title, @Country)";

		affectedRow = conn.Execute(sql, new
		{
			emp.FirstName, emp.LastName, emp.Title, emp.Country
		});
	}


	return affectedRow;
}
```

### Execute()執⾏Update

```C#
//#10, Execute()執行Update
static int ExecuteUpdate(Employee emp)
{
   int affectedRow = 0;

   using (SqlConnection conn = new SqlConnection(connString))
   {
	   string sql = "Update Employees Set FirstName=@FirstName, LastName=@LastName, Title=@Title, Country=@Country WHERE EmployeeID = @EmployeeID";

	   affectedRow = conn.Execute(sql, new
	   {
		   FirstName = emp.FirstName,
		   LastName = emp.LastName,
		   Title = emp.Title,
		   Country = emp.Country,
		   EmployeeID = emp.EmployeeID
	   });
   }

   return affectedRow;
}
```

### Execute()執行Delete

```C#
//#11, Execute()執行Delete
static int ExecuteDelete(Employee emp)
{
   int affectedRow = 0;

   using (SqlConnection conn = new SqlConnection(connString))
   {
	   string sql = "delete from Employees Where EmployeeID = @EmployeeID";
	   affectedRow = conn.Execute(sql, new { EmployeeID = emp.EmployeeID });
   }

   return affectedRow;
}
```

## 關於資料庫交易 

>多筆資料
>跨多表資料

當異動的資料只有一筆時，假設此資料有99個欄位，Sql保證 當中間有失敗就不會認列。
但是當一次要異動多筆資料時，就需要包交易。


### 資料庫交易-使用SqlTransaction
```C#
//#12.資料庫交易-使用SqlTransaction
static void DBTransaction()
{
	string sql = "Insert into Employees (FirstName, LastName) Values (@FirstName, @LastName)";
	using (SqlConnection conn = new SqlConnection(connString))
	{
		conn.Open();
		using (SqlTransaction tran = conn.BeginTransaction())
		{
			try
			{
				int affectedRow = conn.Execute(sql, new { FirstName = "Mark", LastName = "Lee" }, transaction: tran);

				tran.Commit();

				Console.WriteLine($"影響{affectedRow}筆資料!");
			}
			catch (Exception ex)
			{
				tran.Rollback();
				Console.WriteLine(ex.ToString());
			}
		}
		conn.Close();
	}
}
```


### 資料庫交易-使用TransactionScope
```C#
//13.資料庫交易-使用TransactionScope
static void DBTransactionScope()
{
    string sql = "Insert into Employees (FirstName, LastName) Values (@FirstName, @LastName)";
    using (SqlConnection conn = new SqlConnection(connString))
    {
        conn.Open();
        using (TransactionScope tranScope = new TransactionScope())
        {
            try
            {
                int affectedRow = conn.Execute(sql, new { FirstName = "Mary", LastName = "Tseng" });

                tranScope.Complete();

                Console.WriteLine($"影響{affectedRow}筆資料!");
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.ToString());
            }
        }
        conn.Close();
    }
}
```
