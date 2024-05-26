import{_ as a,c as n,o as s,a1 as l}from"./chunks/framework.D_thBnQr.js";const _=JSON.parse('{"title":"char  / varchar /  nvarvchar","description":"","frontmatter":{},"headers":[],"relativePath":"SQL/char.md","filePath":"SQL/char.md"}'),e={name:"SQL/char.md"},c=l(`<h1 id="char-varchar-nvarvchar" tabindex="-1">char / varchar / nvarvchar <a class="header-anchor" href="#char-varchar-nvarvchar" aria-label="Permalink to &quot;char  / varchar /  nvarvchar&quot;">​</a></h1><p>概觀</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>主要的區別在於CHAR是固定長度的字串，而VARCHAR和NVARCHAR是變動長度的字串。</span></span>
<span class="line"><span></span></span>
<span class="line"><span>VARCHAR和NVARCHAR通常更加靈活，因為它們只使用實際需要的儲存空間</span></span>
<span class="line"><span></span></span>
<span class="line"><span>而CHAR則始終使用指定的固定空間</span></span>
<span class="line"><span></span></span>
<span class="line"><span>另外，NVARCHAR用於支援Unicode字符集</span></span>
<span class="line"><span></span></span>
<span class="line"><span>因此如果您的應用需要處理多語言或特殊字符</span></span>
<span class="line"><span></span></span>
<span class="line"><span>使用NVARCHAR是一個不錯的選擇。</span></span></code></pre></div><ol><li><strong>CHAR：</strong><ul><li>固定長度字串資料型態。</li><li>需要指定固定的長度，不論實際存入的字串長度為何，都會以指定的長度進行存儲。</li><li>例如，<code>CHAR(10)</code> 將永遠存儲10個字元的字串。</li></ul></li><li><strong>VARCHAR：</strong><ul><li>變動長度字串資料型態。</li><li>存儲實際長度的字串，因此可以節省儲存空間，特別是對於儲存長度可變的字串。</li><li>例如，<code>VARCHAR(255)</code> 可以存儲長度最多為255個字元的字串。</li></ul></li><li><strong>NVARCHAR：</strong><ul><li>變動長度Unicode字串資料型態。</li><li>類似於VARCHAR，但它支援Unicode字符集（例如中文、日文等）。</li><li>例如，<code>NVARCHAR(50)</code> 可以存儲最多50個Unicode字元的字串。</li></ul></li></ol>`,4),i=[c];function p(r,t,o,h,d,A){return s(),n("div",null,i)}const v=a(e,[["render",p]]);export{_ as __pageData,v as default};
