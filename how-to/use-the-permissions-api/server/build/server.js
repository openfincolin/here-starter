"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable linebreak-style */
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const PORT = 3000;
app.use(express_1.default.static("./public"));
app.listen(PORT, () => {
    console.log("App is listening on port 3000.");
    console.log("Please open your browser and navigate to http://localhost:3000");
});
//# sourceMappingURL=server.js.map