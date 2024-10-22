/*
 *   Copyright (c) 2024 Dilshan Ramesh
 *   All rights reserved.
 */
import { IPagination } from "./modules/common/common.interface";

declare module "express-serve-static-core" {
    interface Request {
        auth: any;
        pageable: IPagination;
    }
}