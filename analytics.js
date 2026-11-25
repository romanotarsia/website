// Visitor statistics (GoatCounter: no cookies, no personal data).
// Page views are counted by GoatCounter's own script, loaded in each page.
// This file adds one thing: clicks on PDFs (e.g. the CV) and on links to
// other sites (papers on SSRN, Google Scholar, LinkedIn...) are counted as
// events, so the dashboard shows which documents and papers people open.
document.addEventListener("click", function (e) {
	var link = e.target.closest && e.target.closest("a[href]");
	if (!link || !window.goatcounter || !window.goatcounter.count) return;

	var url;
	try {
		url = new URL(link.href, location.href);
	} catch (err) {
		return;
	}
	if (url.protocol !== "http:" && url.protocol !== "https:") return; // skip mailto: etc.

	var external = url.hostname !== location.hostname;
	var pdf = /\.pdf$/i.test(url.pathname);
	if (!external && !pdf) return; // in-page navigation is already a page view

	window.goatcounter.count({
		path: (external ? "link: " + url.hostname + url.pathname + url.search : "download: " + url.pathname),
		title: (link.textContent || "").trim().slice(0, 200),
		event: true,
	});
});
