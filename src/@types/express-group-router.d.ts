declare module "express-group-router" {
  import { Router } from "express";

  class ExpressGroupRouter {
    group(path: string, callback: (router: Router) => void): void;
    init(): Router;
  }

  export default ExpressGroupRouter;
}
