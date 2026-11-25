const http = require("node:http");
const fs = require("node:fs");
const path = require("node:path");
const root = path.resolve(__dirname, "..");
const types = { ".html": "text/html; charset=utf-8", ".js": "text/javascript; charset=utf-8", ".css": "text/css; charset=utf-8", ".png": "image/png", ".md": "text/plain; charset=utf-8" };
http.createServer((request, response) => {
	let target;
	try { target = path.resolve(root, "." + decodeURIComponent(new URL(request.url, "http://localhost").pathname)); }
	catch { response.writeHead(400).end(); return; }
	if (target !== root && !target.startsWith(root + path.sep)) { response.writeHead(403).end(); return; }
	if (target === root) target = path.join(root, "index.html");
	fs.readFile(target, (error, bytes) => {
		if (error) { response.writeHead(404).end("Not found"); return; }
		response.writeHead(200, { "Content-Type": types[path.extname(target)] || "application/octet-stream", "Cache-Control": "no-store" });
		response.end(bytes);
	});
}).listen(8000, "127.0.0.1", () => console.log("Bad Therapist: http://127.0.0.1:8000"));
