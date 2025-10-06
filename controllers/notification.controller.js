import Joi from "joi";

import { Notification } from "../models/notifications/Notification.js";
import { ApiResponse } from "../utils/ApiReponse.js";

export const notificationSeenHandle = async (req, res) => {
  try {
    // console.log(`id ------------>`, req.params.id);
    const { id } = req.params;
    const schema = Joi.object({
      id: Joi.string().required(),
    });

    const { error } = schema.validate({ id });
    if (error)
      return res
        .status(400)
        .json({ status: false, message: error.details[0].message });

    const notification = await Notification.findOne({
      _id: id,
      user: req.user.id,
    });
    if (!notification)
      return res
        .status(404)
        .json(new ApiResponse(404, {}, `Notification not found`));

    notification.isRead = true;
    await notification.save();

    
    return res
      .status(201)
      .json(new ApiResponse(200, {}, `notification seen successfully`));
  } catch (error) {
    console.log(`error while seeing notification`, error);
    return res
      .status(501)
      .json(new ApiResponse(500, {}, `Internal server error`));
  }
};
