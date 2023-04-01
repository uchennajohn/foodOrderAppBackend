"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetVendorById = exports.GetVendors = exports.CreateVendor = void 0;
const utility_1 = require("../utility");
const uuid_1 = __importDefault(require("uuid"));
const models_1 = require("../models");
const CreateVendor = async (req, res, next) => {
    try {
        const { name, address, email, foodType, ownerName, phone, password, pincode } = req.body;
        const validateResult = utility_1.vendorSchema.validate(req.body, utility_1.option);
        if (validateResult.error) {
            return res.status(400).json({
                Error: validateResult.error.details[0].message,
            });
        }
        const existingVendor = await models_1.Vendor.findOne({ email: email });
        if (existingVendor) {
            return res.json({ "message": "Vendor already exists" });
        }
        const uuidVendor = uuid_1.default;
        //generate Salt
        const salt = await (0, utility_1.GenerateSalt)();
        //hash the password 
        const vendorPassword = await (0, utility_1.GeneratePassword)(password, salt);
        const createVendor = await models_1.Vendor.create({
            _id: uuidVendor,
            name: name,
            email: email,
            password: vendorPassword,
            phone: phone,
            address: address,
            ownerName: ownerName,
            foodType: foodType,
            pincode: pincode,
            salt: salt,
            serviceAvailable: false,
            rating: 0,
            coverImage: [],
            foods: []
        });
        res.json(createVendor);
    }
    catch (error) {
        res.status(500).json({
            Error: "Internal server Error",
            route: "/admins/createvendors",
        });
    }
};
exports.CreateVendor = CreateVendor;
const GetVendors = async (req, res, next) => {
    try {
        const vendors = await models_1.Vendor.find();
        if (!vendors) {
            return res.json({ "message": "No vendors found" });
        }
        return res.json(vendors);
    }
    catch (error) {
        res.status(500).json({
            Error: "Internal server Error",
            route: "/admins/getvendors",
        });
    }
};
exports.GetVendors = GetVendors;
const GetVendorById = async (req, res, next) => {
    try {
        const vendorId = req.params.id;
        const vendor = await models_1.Vendor.findById(vendorId);
        if (!vendor) {
            return res.json({ "message": "No vendor found" });
        }
        return res.json(vendor);
    }
    catch (error) {
        res.status(500).json({
            Error: "Internal server Error",
            route: "/admins/getvendor/:id",
        });
    }
};
exports.GetVendorById = GetVendorById;
