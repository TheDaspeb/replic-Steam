"use strict";
var __esDecorate = (this && this.__esDecorate) || function (ctor, descriptorIn, decorators, contextIn, initializers, extraInitializers) {
    function accept(f) { if (f !== void 0 && typeof f !== "function") throw new TypeError("Function expected"); return f; }
    var kind = contextIn.kind, key = kind === "getter" ? "get" : kind === "setter" ? "set" : "value";
    var target = !descriptorIn && ctor ? contextIn["static"] ? ctor : ctor.prototype : null;
    var descriptor = descriptorIn || (target ? Object.getOwnPropertyDescriptor(target, contextIn.name) : {});
    var _, done = false;
    for (var i = decorators.length - 1; i >= 0; i--) {
        var context = {};
        for (var p in contextIn) context[p] = p === "access" ? {} : contextIn[p];
        for (var p in contextIn.access) context.access[p] = contextIn.access[p];
        context.addInitializer = function (f) { if (done) throw new TypeError("Cannot add initializers after decoration has completed"); extraInitializers.push(accept(f || null)); };
        var result = (0, decorators[i])(kind === "accessor" ? { get: descriptor.get, set: descriptor.set } : descriptor[key], context);
        if (kind === "accessor") {
            if (result === void 0) continue;
            if (result === null || typeof result !== "object") throw new TypeError("Object expected");
            if (_ = accept(result.get)) descriptor.get = _;
            if (_ = accept(result.set)) descriptor.set = _;
            if (_ = accept(result.init)) initializers.unshift(_);
        }
        else if (_ = accept(result)) {
            if (kind === "field") initializers.unshift(_);
            else descriptor[key] = _;
        }
    }
    if (target) Object.defineProperty(target, contextIn.name, descriptor);
    done = true;
};
var __runInitializers = (this && this.__runInitializers) || function (thisArg, initializers, value) {
    var useValue = arguments.length > 2;
    for (var i = 0; i < initializers.length; i++) {
        value = useValue ? initializers[i].call(thisArg, value) : initializers[i].call(thisArg);
    }
    return useValue ? value : void 0;
};
var __setFunctionName = (this && this.__setFunctionName) || function (f, name, prefix) {
    if (typeof name === "symbol") name = name.description ? "[".concat(name.description, "]") : "";
    return Object.defineProperty(f, "name", { configurable: true, value: prefix ? "".concat(prefix, " ", name) : name });
};
var Juegos;
(function (Juegos) {
    const games = [];
    function addGame(game) {
        games.push(game);
        console.log("Juegos -> agregado:", game.nombre);
    }
    Juegos.addGame = addGame;
    function showGames() {
        console.log("Juegos:");
        console.table(games);
    }
    Juegos.showGames = showGames;
})(Juegos || (Juegos = {}));
var Juegos2;
(function (Juegos2) {
    const games = [];
    function addGame(game) {
        games.push(game);
        console.log("Juegos2 -> agregado:", game.nombre);
    }
    Juegos2.addGame = addGame;
    function showGames() {
        console.log("Juegos2:");
        console.table(games);
    }
    Juegos2.showGames = showGames;
})(Juegos2 || (Juegos2 = {}));
Juegos.addGame({ id: 1, nombre: "Call of Duty" });
Juegos2.addGame({ id: 2, nombre: "FIFA 24" });
Juegos.showGames();
Juegos2.showGames();
function avisoClase(target) {
    console.log("¡Se creó una nueva clase!");
}
let Persona = (() => {
    let _classDecorators = [avisoClase];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var Persona = _classThis = class {
        constructor(nombre) {
            this.nombre = nombre;
        }
    };
    __setFunctionName(_classThis, "Persona");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        Persona = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return Persona = _classThis;
})();
