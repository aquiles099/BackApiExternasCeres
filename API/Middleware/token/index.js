"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const list_1 = __importDefault(require("./list"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const key = '_secreto';
/**
 * este middleware es para detectar que la ruta requiere un token valido
 * y lo procesa
 */
exports.default = (req, res, next) => {
    try {
        // define and valid route
        const route = req.path.split('/');
        const result = (() => {
            if (list_1.default.includes(route[1]))
                return true;
            else if (req.path === '/auth/newPassword' && req.method === 'PATCH')
                return true;
            else
                return false;
        })();
        if (result) {
            // valid token
            if (req.headers.token) {
                const token_route = req.headers.token;
                const token = jsonwebtoken_1.default.verify(token_route, key);
                req.headers.token = token;
                next();
                //
            }
            else
                throw { status: false, message: 'El JWT es requerido para esta ruta', code: 401 };
        }
        else {
            //
            next();
        }
    }
    catch (err) {
        next(err);
    }
};
//# sourceMappingURL=index.js.map