const { Schema } = require("mongoose");
const mongoose = require("mongoose");

// 自动生成一个 _id
// user_id 引用的是user 表中的 _id
const ArtcleSchema = new Schema({
  title: String,
  content: String,
  user_id: {
    type: mongoose.SchemaTypes.ObjectId, // 固定的标识
    // ref: "User", // 来创建两张表的关系的
  },
});

module.exports = mongoose.model("Article", ArtcleSchema, "article"); // 固定的名字
