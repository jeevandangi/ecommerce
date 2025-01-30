import { Router } from "express";
import { initiateEsewaPayment } from "../controller/esewa.controller.js";


const esewaRouter = Router()



esewaRouter.route("/generate-signature").post(initiateEsewaPayment);




export { esewaRouter }