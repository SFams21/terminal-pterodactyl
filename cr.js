process.on('uncaughtException', console.error);
const os = require("os");
const fs = require("fs");
const { execSync } = require("child_process")

const args = process.argv.slice(2)

if (/install/.test(args[0])) {
	const baseURL = "https://github.com/cloudflare/cloudflared/releases/latest/download/cloudflared-";
	const arch = os.arch();
	const platform = os.platform();
	let URL;
	if (arch == "x64" && platform == "linux") URL = baseURL + "linux-amd64";
	else if (arch == "arm" && platform == "linux") URL = baseURL + "linux-arm";
	else if (arch == "arm64" && platform == "linux") URL = baseURL + "linux-arm64";
	else if (arch == "x64" && platform == "win32") URL = baseURL + "windows-amd64.exe";
	else {
		throw new Error("Perangkat anda tidak mendukung untuk menggunakan ini!");
	};
	try {
		execSync(`wget -O cf ${URL}`);
		execSync('chmod +x cf');
		execSync("export PATH=$PATH:cf");
		console.log("Success installed cf!")
	} catch (e) {
		throw e?.message || e
	}
} else if (/start/.test(args[0])) {
	if (!fs.existsSync("./cloudflared")) throw new Error("cloudflared belum terinstall, silahkan install terlebih dahulu!");
	console.log("starting...");
} else {
	const helper = `
••••••••••••••••••••••••••••••••••••••••••••••••
• Example: node cloudflare.js [--ARGUMENTS]

• ARGUMENTS:

--install
--start

• USAGE:
node cloudflare.js --install

••••••••••••••••••••••••••••••••••••••••••••••••
'`.trim();
	throw helper;
};
