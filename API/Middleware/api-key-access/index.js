"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const models_1 = require("../../db/models");
/**
 * este middleware es para detectar si el key q llega por query es correcto
 */
exports.default = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const keyApiAccess = req.query.keyApiAccess;
        console.log(req.query);
        const today = new Date().toISOString();
        const keyValid = yield models_1.KeyApiAccess.findOne({
            keyAccess: keyApiAccess,
            dateExpire: { $gte: today }
        });
        console.log(keyValid);
        if (keyValid) {
            next();
        }
        else
            throw { status: false, message: 'Acceso no permitido, ApiKey inválido', code: 401 };
    }
    catch (err) {
        next(err);
    }
});
//# sourceMappingURL=index.js.map