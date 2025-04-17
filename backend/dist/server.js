"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// server.ts
var import_express2 = __toESM(require("express"));

// routes/imageRoutes.ts
var import_express = __toESM(require("express"));

// utils/cloudinary.ts
var import_cloudinary = require("cloudinary");
var import_dotenv = __toESM(require("dotenv"));
import_dotenv.default.config();
import_cloudinary.v2.config({
  cloud_name: process.env["CLOUDINARY_CLOUD_NAME"],
  api_key: process.env["CLOUDINARY_API_KEY"],
  api_secret: process.env["CLOUDINARY_API_SECRET"]
});
var cloudinary_default = import_cloudinary.v2;

// controllers/imageController.ts
var deleteImage = async (req, res) => {
  const { public_id } = req.body;
  if (!public_id) {
    return res.status(400).json({ error: "public_id is required" });
  }
  try {
    const result = await cloudinary_default.uploader.destroy(public_id);
    return res.json({ result });
  } catch (error) {
    console.error("Cloudinary deletion error:", error);
    return res.status(500).json({ error: "Failed to delete image from Cloudinary" });
  }
};

// routes/imageRoutes.ts
var router = import_express.default.Router();
router.post("/delete", deleteImage);
var imageRoutes_default = router;

// server.ts
var import_cors = __toESM(require("cors"));
var app = (0, import_express2.default)();
app.use((0, import_cors.default)());
app.use(import_express2.default.json());
app.use("/api/image", imageRoutes_default);
app.listen(3e3, () => console.log("Server running on http://localhost:3000"));
