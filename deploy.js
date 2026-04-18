require('dotenv').config();
const FtpDeploy = require("ftp-deploy");
const ftpDeploy = new FtpDeploy();

const config = {
    user: process.env.FTP_USER,
    password: process.env.FTP_PASSWORD,
    host: process.env.FTP_HOST,
    port: 21,
    localRoot: __dirname,
    remoteRoot: "/public_html/", // Altere para "/" se não estiver usando a pasta public_html
    // include: ["*", "**/*"],      // this would upload everything except dot files
    include: ["index.html", "style.css", "script.js", "assets/**"],
    // e.g. exclude: ["dist/**/*.map", "node_modules/**", "node_modules/**/.*", ".git/**"]
    exclude: ["node_modules/**", ".git/**", "deploy.js", "package.json", "package-lock.json", "Landing_Page_Sisi_Siqueira.zip"],
    // delete ALL existing files at remoteRoot before uploading?
    deleteRemote: false,
    // Passive mode is forced (EPSV command is not sent)
    forcePasv: true,
    // use sftp or ftp
    sftp: false,
};

ftpDeploy
    .deploy(config)
    .then((res) => console.log("Upload concluído com sucesso:", res))
    .catch((err) => console.log("Erro no upload:", err));

ftpDeploy.on("uploading", function (data) {
    console.log(`Subindo: ${data.transferredFileCount} de ${data.totalFilesCount} - ${data.filename}`);
});

ftpDeploy.on("uploaded", function (data) {
    console.log(`Concluído: ${data.filename}`);
});

ftpDeploy.on("upload-error", function (data) {
    console.log(`Erro ao subir ${data.filename}: ${data.err}`);
});
