"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RestaurantById = exports.GetFoodMoreThan30Mins = exports.GetFoodIn30Mins = exports.SearchFoods = exports.GetTopRestaurants = exports.GetFoodAvailability = void 0;
const models_1 = require("../models");
const GetFoodAvailability = async (req, res, next) => {
    try {
        const pincode = req.params.pincode;
        const result = await models_1.Vendor.find({ pincode: pincode, serviceAvailable: true })
            .sort([['rating', 'descending']])
            .populate('foods');
        if (result.length > 0) {
            return res.status(200).json(result);
        }
        return res.status(400).json({ "message": "Data not found" });
    }
    catch (error) {
    }
};
exports.GetFoodAvailability = GetFoodAvailability;
const GetTopRestaurants = async (req, res, next) => {
    try {
        const pincode = req.params.pincode;
        const result = await models_1.Vendor.find({ pincode: pincode, serviceAvailable: true })
            .sort([['rating', 'descending']])
            .limit(1);
        if (result.length > 0) {
            return res.status(200).json(result);
        }
    }
    catch (error) {
    }
};
exports.GetTopRestaurants = GetTopRestaurants;
const SearchFoods = async (req, res, next) => {
    try {
        const pincode = req.params.pincode;
        const result = await models_1.Vendor.find({ pincode: pincode, serviceAvailable: true })
            .populate('foods');
        if (result.length > 0) {
            let foodResult = [];
            result.map(item => foodResult.push(...item.foods));
            return res.status(200).json(foodResult);
        }
    }
    catch (error) {
    }
};
exports.SearchFoods = SearchFoods;
const GetFoodIn30Mins = async (req, res, next) => {
    try {
        const pincode = req.params.pincode;
        const result = await models_1.Vendor.find({ pincode: pincode, serviceAvailable: true })
            .populate('foods');
        if (result.length > 0) {
            let foodResult = [];
            result.map(vendor => {
                const foods = vendor.foods;
                foodResult.push(...foods.filter(food => food.readyTime <= 30));
            });
            return res.status(200).json(foodResult);
        }
    }
    catch (error) {
    }
};
exports.GetFoodIn30Mins = GetFoodIn30Mins;
const GetFoodMoreThan30Mins = async (req, res, next) => {
    try {
        const pincode = req.params.pincode;
        const result = await models_1.Vendor.find({ pincode: pincode, serviceAvailable: true })
            .populate('foods');
        if (result.length > 0) {
            let foodResult = [];
            result.map(vendor => {
                const foods = vendor.foods;
                foodResult.push(...foods.filter(food => food.readyTime > 30));
            });
            return res.status(200).json(foodResult);
        }
    }
    catch (error) {
    }
};
exports.GetFoodMoreThan30Mins = GetFoodMoreThan30Mins;
const RestaurantById = async (req, res, next) => {
    try {
        const id = req.params.id;
        const result = await models_1.Vendor.findById({ _id: id }).populate('foods');
        if (result) {
            return res.status(200).json(result);
        }
    }
    catch (error) {
    }
};
exports.RestaurantById = RestaurantById;
