import{_ as s,c as i,o as a,a1 as l}from"./chunks/framework.D_thBnQr.js";const y=JSON.parse('{"title":"JOIN語法","description":"","frontmatter":{},"headers":[],"relativePath":"SQL/join.md","filePath":"SQL/join.md"}'),n={name:"SQL/join.md"},h=l(`<h1 id="join語法" tabindex="-1">JOIN語法 <a class="header-anchor" href="#join語法" aria-label="Permalink to &quot;JOIN語法&quot;">​</a></h1><p>SQL 中的 JOIN 用於將來自兩個或多個表的數據結合起來。以下是常見的 JOIN 類型及其使用方式。</p><h3 id="語法" tabindex="-1">語法 <a class="header-anchor" href="#語法" aria-label="Permalink to &quot;語法&quot;">​</a></h3><div class="language-sql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">sql</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">SELECT</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> columns</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">FROM</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> table1</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">JOIN</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> table2 </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">ON</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> condition;</span></span></code></pre></div><ul><li>將另一張表加入後，會根據條件比較對應欄位的數據。</li></ul><h2 id="_1-inner-join" tabindex="-1">1. INNER JOIN <a class="header-anchor" href="#_1-inner-join" aria-label="Permalink to &quot;1. INNER JOIN&quot;">​</a></h2><ul><li>只有在 <code>ON</code> 條件成立的情況下，兩表的記錄才會被保留下來。</li></ul><div class="language-sql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">sql</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">SELECT</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> *</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">FROM</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> Orders</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">INNER JOIN</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> Customers </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">ON</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> Orders</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">.</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">CustomerID</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> Customers</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">.</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">CustomerID</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span></code></pre></div><h2 id="_2-outer-join" tabindex="-1">2. OUTER JOIN <a class="header-anchor" href="#_2-outer-join" aria-label="Permalink to &quot;2. OUTER JOIN&quot;">​</a></h2><h4 id="left-outer-join" tabindex="-1">LEFT OUTER JOIN <a class="header-anchor" href="#left-outer-join" aria-label="Permalink to &quot;LEFT OUTER JOIN&quot;">​</a></h4><ul><li>以左邊的表為主，保留左邊表的所有記錄，即使沒有匹配的記錄也會顯示 <code>NULL</code>。</li></ul><div class="language-sql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">sql</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">SELECT</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> *</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">FROM</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> Customers</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">LEFT OUTER JOIN</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> Orders </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">ON</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> Customers</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">.</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">CustomerID</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> Orders</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">.</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">CustomerID</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span></code></pre></div><ul><li>特點： <ul><li>主要資料表在左邊，保留左邊表的所有資料。</li><li>當 <code>ON</code> 條件不成立時，左邊表的欄位仍會保留，右邊表的值顯示 <code>NULL</code>。</li><li>結果集通常比 INNER JOIN 包含更多的記錄，因為不匹配的也會留下。</li></ul></li></ul><h4 id="right-outer-join" tabindex="-1">RIGHT OUTER JOIN <a class="header-anchor" href="#right-outer-join" aria-label="Permalink to &quot;RIGHT OUTER JOIN&quot;">​</a></h4><ul><li>以右邊的表為主，保留右邊表的所有記錄，即使沒有匹配的記錄也會顯示 <code>NULL</code>。</li></ul><div class="language-sql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">sql</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">SELECT</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> *</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">FROM</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> Orders</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">RIGHT OUTER JOIN</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> Customers </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">ON</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> Orders</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">.</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">CustomerID</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> Customers</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">.</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">CustomerID</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span></code></pre></div><ul><li>特點： <ul><li>主要資料表在右邊，保留右邊表的所有資料。</li><li>當 <code>ON</code> 條件不成立時，右邊表的欄位仍會保留，左邊表的值顯示 <code>NULL</code>。</li><li>等價於左表和右表對調後的 LEFT OUTER JOIN。</li></ul></li></ul><div class="language-sql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">sql</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">SELECT</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> *</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">FROM</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> Customers</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">LEFT OUTER JOIN</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> Orders </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">ON</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> Customers</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">.</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">CustomerID</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> Orders</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">.</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">CustomerID</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span></code></pre></div><h2 id="_3-cross-join" tabindex="-1">3. CROSS JOIN <a class="header-anchor" href="#_3-cross-join" aria-label="Permalink to &quot;3. CROSS JOIN&quot;">​</a></h2><ul><li>兩表相互比對，生成所有排列組合的記錄。</li></ul><div class="language-sql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">sql</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">SELECT</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> *</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">FROM</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> Employees</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">CROSS JOIN</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> Projects;</span></span></code></pre></div><ul><li>特點： <ul><li>假如 <code>table1</code> 有 9 筆資料，<code>table2</code> 有 9 筆資料，CROSS JOIN 後會產生 81 筆資料。</li><li>使用情境：例如員工配對玩遊戲，或是客戶購買產品的各種排列組合。</li></ul></li></ul><h3 id="比較運算符" tabindex="-1">比較運算符 <a class="header-anchor" href="#比較運算符" aria-label="Permalink to &quot;比較運算符&quot;">​</a></h3><ul><li><code>&lt;&gt;</code> 表示 &quot;不等於&quot; 的比較運算符。</li></ul><div class="language-sql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">sql</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">SELECT</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> *</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">FROM</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> Products</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">WHERE</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> Price </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">&lt;&gt;</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> 100</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span></code></pre></div><h2 id="範例總結" tabindex="-1">範例總結 <a class="header-anchor" href="#範例總結" aria-label="Permalink to &quot;範例總結&quot;">​</a></h2><div class="language-sql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">sql</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">-- INNER JOIN 範例</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">SELECT</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> Orders</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">.</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">OrderID</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">Customers</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">.</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">CustomerName</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">FROM</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> Orders</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">INNER JOIN</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> Customers </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">ON</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> Orders</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">.</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">CustomerID</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> Customers</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">.</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">CustomerID</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">-- LEFT OUTER JOIN 範例</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">SELECT</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> Customers</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">.</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">CustomerName</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">Orders</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">.</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">OrderID</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">FROM</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> Customers</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">LEFT OUTER JOIN</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> Orders </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">ON</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> Customers</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">.</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">CustomerID</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> Orders</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">.</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">CustomerID</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">-- RIGHT OUTER JOIN 範例</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">SELECT</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> Orders</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">.</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">OrderID</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">Customers</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">.</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">CustomerName</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">FROM</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> Orders</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">RIGHT OUTER JOIN</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> Customers </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">ON</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> Orders</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">.</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">CustomerID</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> Customers</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">.</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">CustomerID</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">-- CROSS JOIN 範例</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">SELECT</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> Employees</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">.</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">EmployeeName</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">Projects</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">.</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">ProjectName</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">FROM</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> Employees</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">CROSS JOIN</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> Projects;</span></span></code></pre></div>`,27),t=[h];function k(e,p,r,d,E,g){return a(),i("div",null,t)}const c=s(n,[["render",k]]);export{y as __pageData,c as default};
