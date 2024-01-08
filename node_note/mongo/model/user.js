const { Schema } = require("mongoose");
const mongoose = require("mongoose");
const UserSchema = new Schema(
  {
    username: {
      type: String, //字符串类型
      trim: true, // 去前后空格
      lowercase: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
      validate: {
        validator() {
          return true; // 校验成功返回true
        },
      },
    },
    age: {
      type: Number,
      min: 5,
      max: 100,
    },
    gender: {
      type: Number,
      enum: [0, 1],
    },
    birthtime: {
      type: Date,
      default: Date.now,
    },
    address: Object,
  },
  {
    timestamps: {
      // 增加创建和 更新的时间
      createdAt: "create",
      updatedAt: "update",
    },
  }
);
// 类增加方法, 基本用不到  pre  post 钩子
function plugin(Schema) {
  Schema.statics.findByUsername = function (username) {
    return this.findOne({ username });
  };
  Schema.methods.saveMD5 = function () {
    this.password = require("crypto")
      .createHash("md5")
      .update(this.password)
      .digest("hex");
    return this.save();
  };
}

UserSchema.plugin(plugin);
// xxx.plugin
// 骨架 -》 模型来操作数据库, 集合名默认 users
module.exports = mongoose.model("User", UserSchema);
