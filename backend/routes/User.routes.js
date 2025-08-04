import express from "express"
import { getCurrentUser} from "../controllers/user.controllers.js"
import isAuth from "../middlewares/isAuth.js"
import upload from "../middlewares/multer.js"
import { updateAssistant } from "../controllers/user.controllers.js"
import { askToAssistant } from "../controllers/user.controllers.js"

const UserRouter = express.Router()


UserRouter.get("/current",isAuth,getCurrentUser)

UserRouter.post("/update",isAuth,upload.single("assistantImage"),updateAssistant)

UserRouter.post("/asktoassistant",isAuth,askToAssistant)




export default UserRouter