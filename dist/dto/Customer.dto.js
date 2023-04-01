"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateCustomerInputs = exports.Length = exports.IsEmpty = exports.IsEmail = void 0;
const class_validator_1 = require("class-validator");
var class_validator_2 = require("class-validator");
Object.defineProperty(exports, "IsEmail", { enumerable: true, get: function () { return class_validator_2.IsEmail; } });
Object.defineProperty(exports, "IsEmpty", { enumerable: true, get: function () { return class_validator_2.IsEmpty; } });
Object.defineProperty(exports, "Length", { enumerable: true, get: function () { return class_validator_2.Length; } });
class CreateCustomerInputs {
    email;
    password;
    phone;
}
__decorate([
    (0, class_validator_1.IsEmail)()
], CreateCustomerInputs.prototype, "email", void 0);
__decorate([
    (0, class_validator_1.Length)(6, 12)
], CreateCustomerInputs.prototype, "password", void 0);
__decorate([
    (0, class_validator_1.Length)(7, 12)
], CreateCustomerInputs.prototype, "phone", void 0);
exports.CreateCustomerInputs = CreateCustomerInputs;
