import Joi from "joi";
import { ApiResponse } from "../utils/ApiReponse.js";

export const swapTokenController = async (req, res) => {
  try {
    const {from, to} = req.body;
    const schema = Joi.object({
      from: Joi.string().required(),
      to: Joi.string().required(),
    })

    const { error } = schema.validate(req.body);
    if (error) 
      return res
        .status(400)
        .json(new ApiResponse(400, {}, error.details[0].message));
    
    
    
    return res
      .status(201)
      .json(new ApiResponse(200, {}, `swapping token successfully`));
  } catch (error) {
    console.log(`Error while swapping the token :`, error);
    return res
      .status(501)
      .json(new ApiResponse(500, {}, `Internal Server Error`));
  }
};
