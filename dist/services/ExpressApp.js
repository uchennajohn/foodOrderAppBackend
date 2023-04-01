"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const path_1 = __importDefault(require("path"));
const routes_1 = require("../routes");
exports.default = async (app) => {
    app.use(body_parser_1.default.json());
    app.use(body_parser_1.default.urlencoded({ extended: true }));
    app.use('/images', express_1.default.static(path_1.default.join(__dirname, 'images')));
    app.use('/vendor', routes_1.VendorRoute);
    app.use('/admin', routes_1.AdminRoute);
    app.use('/shopping', routes_1.ShoppingRoute);
    app.use('/customer', routes_1.CustomerRoute);
    return app;
};
