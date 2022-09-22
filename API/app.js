"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const https_1 = __importDefault(require("https"));
const fs_1 = __importDefault(require("fs"));
const API_1 = __importDefault(require("./app/API"));
const logger_js_1 = __importDefault(require("./logger.js"));
const prod = process.argv[0] === '/root/.nvm/versions/node/v14.15.0/bin/node';
if (prod) {
    API_1.default.listen(API_1.default.get('port'), () => {
        const options = {
            key: fs_1.default.readFileSync('/etc/letsencrypt/live/externo.devceres.cloud/privkey.pem'),
            cert: fs_1.default.readFileSync(' /etc/letsencrypt/live/externo.devceres.cloud/cert.pem'),
        };
        https_1.default.createServer(options, API_1.default).listen(API_1.default.get('port'), () => {
            console.log('                                                                  ()_()');
            console.log(`app corriendo en el puerto http://localhost:${API_1.default.get('port')}    (o.o)`);
            console.log('                                                                  (|_|)*');
        });
    });
}
else {
    API_1.default.listen(API_1.default.get('port'), () => {
        logger_js_1.default.info('Server running on port %d', API_1.default.get('port'));
        console.log('                                                                  ()_()');
        console.log(`Server running on http://localhost:${API_1.default.get('port')}             (o.o)`);
        console.log('                                                                  (|_|)*');
    });
}
//# sourceMappingURL=app.js.map