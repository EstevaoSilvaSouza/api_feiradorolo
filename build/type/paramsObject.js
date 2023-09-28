"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.objectParams = void 0;
const objectParams = (params) => {
    if (!params.limit) {
        throw ({ error: 'Parametros invalidos' });
    }
    else if (params.take >= 150 || params.limit.lenght >= 150) {
        throw ({ error: 'Indices invalidos nos parametros' });
    }
    else if (typeof params.take !== 'number' || typeof params.limit !== 'number') {
        throw ({ error: 'Parametros precisa ser numero' });
    }
    const Take = params.take;
    const Limit = params.limit;
    return {
        take: Take,
        limit: Limit
    };
};
exports.objectParams = objectParams;
