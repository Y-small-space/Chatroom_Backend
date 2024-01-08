const mongoose = require("mongoose");
const UserModel = require("./model/user");
const ArticleModel = require("./model/article");
mongoose
  .connect("mongodb://127.0.0.1/lesson")
  .then(() => {
    console.log("数据库链接成功");
  })
  .catch((err) => {
    console.log("数据库链接失败");
  });
// 根据我们的需要创建集合结构

// const users = [];
// for (let i = 0; i < 30; i++) {
//   users.push({ username: "ZS" + i, password: "xxx", age: i + 5, gender: 0 });
// }

// (async () => {
//   // 插入后返回的是差入后的结果， 多个数据先维护成数组在进行操作
//   const r = await UserModel.create(users);
//   console.log(r);
//   mongoose.disconnect();
// })();

// 查询 常见操作  并且 | 或者 | 正则

const limit = 5;
const currentPage = 2;
(async () => {
  // const r = await UserModel.find({ username: "zs0", age: 6 });
  //   const r = await UserModel.find({
  //     $or: [{ username: "zs0" }, { username: "zs1" }],
  //   });
  //   const r = await UserModel.find({ username: new RegExp("zs") }); // 模糊查询
  //   const r = await UserModel.updateOne(
  //     { username: "zs0" },
  //     { address: { num: 1 } }
  //   );
  //   const r = await UserModel.findOne({ "address.num": 1 });
  //   // findOne findById
  //   console.log(r);
  // UserModel.deleteOne deleteMany
  // 分页查询
  //   let r = await UserModel.find()
  //     .skip((currentPage - 1) * limit)
  //     .limit(limit)
  //     .sort({ age: -1 });
  //   console.log(r);
  //   mongoose.disconnect();
  // 关联查询
  // 文档   和 模型都可以操作数据库
  //   let user = await UserModel.findOne({ username: "zs0" });
  //   user.age = 99; // 修改后直接保存自己
  //   await user.save();
  //   let article = await ArticleModel.create({
  //     title: "我爱你",
  //     content: "我真的很爱你",
  //     user_id: user._id,
  //   });
  //   console.log(article);
  //
  // 我知道了文章的id ， 我想知道谁写的怎么办？64c3cc41dc87b40dfe6f3d7a
  //   const { user_id } = await ArticleModel.findById("64c3cc41dc87b40dfe6f3d7a");
  //   const user = await UserModel.findById(user_id, { username: 1 });
  // 直接将user_id 字段换成引用的对象 ， populate老写法 因为需要再schema中定义ref 不优雅
  //   let user = await ArticleModel.findById("64c3cc41dc87b40dfe6f3d7a").populate(
  //     "user_id"
  //   );
  //   console.log(user.user_id.username);
  //   mongoose.disconnect();

  let article = await ArticleModel.aggregate([
    // mongo中原生的查询方法
    {
      // 关联关系
      $lookup: {
        from: "users",
        localField: "user_id",
        foreignField: "_id", // 这来描述关联关系
        as: "user", // 查询后的结果放到user中
      },
    },
    {
      $match: {
        _id: new mongoose.Types.ObjectId("64c3cc41dc87b40dfe6f3d7a"),
      },
    },
    {
      $project: {
        user: 1,
      },
    },
    // $group分组 , 可以支持分页，所有的都可以用聚合函数来实现
    { $limit: 1 },
    { $skip: 1 },
  ]);
  console.log(article);

  // 模型、 实例 （写项目的时候会用到）

  // 实例 小的  save()   模型 大的find()

  // 类本身扩展

  const user = await UserModel.findByUsername("zs0"); // 查询的结果是一个doc文档，不是真实的对象
  // 查询后向修改对象中的数据返回 需要转成对象在蔡总
  //   console.log({ ...user.toObject(), a: 1 });
  //   console.log(user.username);
  console.log(user);
  // await new UserModel({ username: "xxx", password: "xxx", age: 10 }).saveMD5();
  //   console.log(user);
  mongoose.disconnect();
})();
