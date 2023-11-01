"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var client_1 = require("@prisma/client");
// eslint-disable-next-line import/no-mutable-exports
var prisma;
if (process.env.NODE_ENV === "production") {
  prisma = new client_1.PrismaClient();
} else {
  if (!global.prisma) {
    global.prisma = new client_1.PrismaClient();
  }
  prisma = global.prisma;
}
exports.default = prisma;
