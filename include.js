/*
	If an html file includes this script, then any element in that file
	that has the "data-include" attribute will be replaced with the corresponding
	html from the `includes` table.
	
	It's recursive, so includes can contain more includes.
*/

let navbar = `
<div id="links">
	<h1>Cool Website</h1>
	<h4>Links:</h4>
	<nav>
		<a href="home.html">Home</a>
	</nav>
</div>
`;

let includes = {
	"navbar": navbar
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
