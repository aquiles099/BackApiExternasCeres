"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const API_1 = __importDefault(require("./app/API"));
const prod = process.argv[0] === '/root/.nvm/versions/node/v14.15.0/bin/node';
if (prod) {
    API_1.default.listen(API_1.default.get('port'), () => {
        console.log('                                                                  ()_()');
        console.log(`app corriendo en el puerto http://localhost:${API_1.default.get('port')} leoM             (o.o)`);
        console.log('                                                                  (|_|)*');
    });
}
else {
    API_1.default.listen(API_1.default.get('port'), () => {
        console.log('                                                                  ()_()');
        console.log(`app corriendo en el puerto http://localhost:${API_1.default.get('port')} leoM             (o.o)`);
        console.log('                                                                  (|_|)*');
    });
}
//# sourceMappingURL=app.js.map