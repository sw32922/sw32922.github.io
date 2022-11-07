/*
	If an html file includes this script, then any element in that file
	that has the "data-include" attribute will be replaced with the corresponding
	html from the `includes` table.
	
	It's recursive, so includes can contain more includes.
*/

let navbar = `
<div id="links" class="navOrFooter">
	<h1>Cool Website</h1>
	<h4>Links:</h4>
	<nav>
		<a href="home.html">Home</a>,
		<a href="tagExamples.html">HTML tags</a>
	</nav>
	<div id="splashContainer">
		<div id="splash"></div>
	</div>
</div>
`;

let footer = `
<div id="footer" class="navOrFooter">
<div id="badges">


<a href="https://www.defectivebydesign.org/" title="Eliminate DRM!">
<img src="https://defectivebydesign.org/sites/nodrm.civicactions.net/files/images/elim_lg_btn.gif" alt="Eliminate DRM!" width="110" height="32">
</a>

<a href="https://landchad.net/" title="Host your own content!">
<img src="https://lukesmith.xyz/pix/buttons/landchad.gif" alt="Host your own content!" width=88"" height="31">
</a>

<a href="https://based.cooking/" title="Cooking without web obesity">
<img src="https://lukesmith.xyz/pix/buttons/basedcooking.gif" alt="Cooking without web obesity" width="88" height="31">
</a>

<a href="https://www.gnu.org/" title="GNU is Not Unix">
<img src="https://web.archive.org/web/20110902140654im_/http://graphics.rootmode.com/images/button-88x31-gnu-2.png" alt="GNU is Not Unix" width="88" height="31">
</a>

</div>
</div>
`;

let includes = {
	"navbar": navbar,
	"footer": footer
}

function strToElements(html) {
	let tmp = document.createElement("div");
	
	tmp.innerHTML = html;
	
	return tmp.children;
}

function replaceIncludes(doc) {
	for (let el of doc.querySelectorAll("[data-include]")) {
		
		let replacementEls = strToElements( includes[el.getAttribute("data-include")] );
		
		let html = "";
		for (let child of replacementEls) {
			replaceIncludes(child);
			html += child.outerHTML + "\n";
		}
		
		el.outerHTML = html;
	}
}

replaceIncludes(document);

/*
	splash text
*/

let splashTexts = {
	"home.html":
		[
			"Cool Website!",
			"Obnoxious Animations!"
		],
		
	"tagExamples.html":
		[
			`<ul>
				<li>lists!!!!</li>
				<li>lists!!!!!!!!</li>
				<li>lists!!!!!!!!!!!!</li>
			</ul>`
		]
};

let page = window.location.pathname.split("/").pop();

let splashEl = document.getElementById("splash");

let pageSplashTexts = splashTexts[page];
let splash;
if (pageSplashTexts) {
	splashEl.innerHTML = pageSplashTexts[ Math.floor(Math.random() * pageSplashTexts.length) ];
}
