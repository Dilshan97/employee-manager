/*
 *   Copyright (c) 2024 Dilshan Ramesh
 *   All rights reserved.
 */
export const constants = {
    API: {
        PREFIX: "/api/v1"
    },
    MODEL_NAMES: {
        USER: "User",
        AUTH: "Auth"
    },
    USER_ROLES: {
        ADMIN: "admin",
        USER: "user"
    },
    GENDER: {
        MALE: "M",
        FEMALE: "F"
    },
    REGEX_VALIDATIONS: {
        EMAIL: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        NIC: /^[0-9]{9}[vVxX]$/,
        PHONE_NUMBER: /^\+94\d{9}$/
    }
}