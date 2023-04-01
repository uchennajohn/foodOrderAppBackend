"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetFoods = exports.AddFood = exports.UpdateVendorService = exports.UpdateVendorCoverImage = exports.UpdateVendorProfile = exports.GetVendorProfile = exports.VendorLogin = void 0;
const models_1 = require("../models");
const utility_1 = require("../utility");
const VendorLogin = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const validateResult = utility_1.vendorLoginSchema.validate(req.body, utility_1.option);
        if (validateResult.error) {
            return res.status(400).json({
                Error: validateResult.error.details[0].message,
            });
        }
        const existingVendor = await models_1.Vendor.findOne({ email: email });
        if (existingVendor) {
            const validation = await (0, utility_1.validatePassword)(password, existingVendor.password, existingVendor.salt);
            if (validation) {
                const signature = await (0, utility_1.Generatesignature)({
                    _id: existingVendor._id,
                    email: existingVendor.email,
                    name: existingVendor.name
                });
                return res.status(200).json({
                    message: "You have successfully logged in",
                    signature,
                });
            }
            else {
                return res.json({ "message": "Login  Credentials not valid" });
            }
        }
        return res.json({ "message": "Vendor not found" });
    }
    catch (error) {
        res.status(500).json({
            Error: "Internal server Error",
            route: "/vendor/login",
        });
    }
};
exports.VendorLogin = VendorLogin;
const GetVendorProfile = async (req, res, next) => {
    try {
        const user = req.user;
        if (user) {
            const existingVendor = await models_1.Vendor.findById({ _id: user._id });
            res.json(existingVendor);
        }
        return res.json({ "message": "Vendor information not found" });
    }
    catch (error) {
        res.status(500).json({
            Error: "Internal server Error",
            route: "/vendor/profile",
        });
    }
};
exports.GetVendorProfile = GetVendorProfile;
const UpdateVendorProfile = async (req, res, next) => {
    try {
        const { foodTypes, name, phone, address } = req.body;
        const user = req.user;
        if (user) {
            const existingVendor = await models_1.Vendor.findById({ _id: user._id });
            if (existingVendor) {
                existingVendor.name = name;
                existingVendor.foodType = foodTypes;
                existingVendor.phone = phone;
                existingVendor.address = address;
                const updateVendor = await existingVendor.save();
                return res.json(updateVendor);
            }
            res.json(existingVendor);
        }
        return res.json({ "message": "Vendor information not found" });
    }
    catch (error) {
        res.status(500).json({
            Error: "Internal server Error",
            route: "/vendor/profile",
        });
    }
};
exports.UpdateVendorProfile = UpdateVendorProfile;
const UpdateVendorCoverImage = async (req, res, next) => {
    try {
        const user = req.user;
        if (user) {
            const vendor = await models_1.Vendor.findById({ _id: user._id });
            if (vendor) {
                const files = req.files;
                const images = files.map((file) => file.filename);
                vendor.coverImage.push(...images);
                const result = await vendor.save();
                return res.json(result);
            }
        }
        return res.json({ "message": "Something went wrong with add food" });
    }
    catch (error) {
        res.status(500).json({
            Error: "Internal server Error",
            route: "/vendor/profile",
        });
    }
};
exports.UpdateVendorCoverImage = UpdateVendorCoverImage;
const UpdateVendorService = async (req, res, next) => {
    try {
        const { foodTypes, name, phone, address } = req.body;
        const user = req.user;
        if (user) {
            const existingVendor = await models_1.Vendor.findById({ _id: user._id });
            if (existingVendor) {
                existingVendor.serviceAvailable = !existingVendor.serviceAvailable;
                const updateVendor = await existingVendor.save();
                return res.json(updateVendor);
            }
            res.json(existingVendor);
        }
        return res.json({ "message": "Vendor information not found" });
    }
    catch (error) {
        res.status(500).json({
            Error: "Internal server Error",
            route: "/vendor/service",
        });
    }
};
exports.UpdateVendorService = UpdateVendorService;
const AddFood = async (req, res, next) => {
    try {
        const user = req.user;
        if (user) {
            const { name, description, readyTime, foodType, price, category } = req.body;
            const vendor = await models_1.Vendor.findById({ _id: user._id });
            if (vendor) {
                const files = req.files;
                const images = files.map((file) => file.filename);
                const createdFood = await models_1.Food.create({
                    vendorId: vendor._id,
                    name: name,
                    description: description,
                    foodType: foodType,
                    images: images,
                    price: price,
                    category: category,
                    readyTime: readyTime,
                    rating: 0
                });
                vendor.foods.push(createdFood);
                const result = await vendor.save();
                return res.json(result);
            }
        }
        return res.json({ "message": "Something went wrong with add food" });
    }
    catch (error) {
        res.status(500).json({
            Error: "Internal server Error",
            route: "/vendor/food",
        });
    }
};
exports.AddFood = AddFood;
const GetFoods = async (req, res, next) => {
    try {
        const user = req.user;
        if (user) {
            const food = await models_1.Food.find({ vendorId: user._id });
            if (food) {
                return res.json(food);
            }
        }
    }
    catch (error) {
        res.status(500).json({
            Error: "Internal server Error",
            route: "/vendor/food",
        });
    }
};
exports.GetFoods = GetFoods;
