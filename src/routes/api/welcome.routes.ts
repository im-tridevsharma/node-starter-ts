import ExpressGroupRouter from "express-group-router";
import welcomeController from "../../controllers/welcome.controller";

const router = new ExpressGroupRouter();

// Handle all the welcome routes
router.group("/welcome", (welcomeRouter) => {
  welcomeRouter.get("/", welcomeController.sayWelcome);
});

const welcomeRouteHandler = router.init();

export default welcomeRouteHandler;
