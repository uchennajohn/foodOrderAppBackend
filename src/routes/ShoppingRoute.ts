import express,{Request, Response, NextFunction} from "express"
import { GetFoodAvailability, GetFoodIn30Mins, GetFoodMoreThan30Mins, GetTopRestaurants, RestaurantById, SearchFoods } from "../controllers"


const router = express.Router()


//food availability

router.get('/:pincode', GetFoodAvailability)

//Top Restaurants
router.get('/top-restaurants/:pincode', GetTopRestaurants)
// food available in 30 mins

router.get('/foods-in-30-mins/:pincode', GetFoodIn30Mins)

router.get('/foods-more-than-30-mins/:pincode', GetFoodMoreThan30Mins)
//Search Food

router.get('/search/:pincode', SearchFoods)

//Find Restaurant by ID
router.get('/restaurant/:id', RestaurantById)

export {router as ShoppingRoute}