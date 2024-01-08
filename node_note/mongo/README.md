## 关系型数据库数据库 (RDB)

- mysql sqlserver 用表结构来进行数据的存储，按照固定的结构来存储数据 （行，列）
- 大规模的数据， 高并发的场景关系型数据库 性能差（查询速度慢）（数据量大的情况 拆表 拆库） 使用起来灵活性不高， 扩展不方便， SQL 语句， 适合复杂的关系查询。 事务的支持非常完备，可以保证数据的完整和一致性 。 适合结构性强的数据 适合电商，erp 系统。。。。

## 非关系型数据库

- nosql (无需按照特定的模式来进行存储) 存储的数据格式可以是随意的 redis 键值对 Mongodb(文档)
- 扩展性好，可以水平扩展，扩展起来方便， 查询速度高于 rdb。 缺点就是用的就是自己的语言，事务的支持不是特别完备。
- 读写性能好， 适合存储一些低价值数据 (日志， 爬虫， 分析数据)

> redis + mongodb + mysql

## 增删改查常见的基本操作，数据库的备份 权限

- 安装后 mongod(服务端) mongosh（客户端）

- brew tap mongodb/brew
- brew install mongodb-community@6.0
- brew services start mongodb-community@6.0

## 可视化工具（Navicat Robo3T）

- 链接数据库 mongosh 直接链接即可 mongosh --host "mongodb://远程 ip:27017"
- show dbs 显示所有的数据库(集合)
- use lesson 切换数据库
- db.help()
- show collections 显示所有的集合
- db.collections.help()
- db.dropDatabase()
- db.dropcollections()
- \_id 是唯一标识

权限：（权限可以再 mongo.config 中开启后，重启 mongodb 即可）
数据库备份 mongodump (window 中不会默认安装 mongodump mongoimport mongoexports) 需要自己装https://www.mongodb.com/try/download/bi-connector

恢复数据库 mongorestore 文件夹

数据库的导出 导入 （json，csv 文件）

- 导出 mongoexport --db lesson --collection student --csv -f username,password -o student.csv
- 导入 mongoimport --db lesson --collection student --type csv --headerline --file student.csv

- db.集合名.insert()
- db.集合名.find()
- db.集合名.remove()
- db.集合名.update()

> 通过代码来操作数据库， odm （object document mapping）(数据库， 集合 ， 文档) 关系型数据库 orm

> 有了工具后 可以让 mongodb 更像 关系型数据库（特点就是结构统一） mongoose 可以帮我么做这个事 （自动生成集合结构，限制存储的格式）
