# 使用官方的Node.js镜像作为基础
FROM node:20.11.1

# 设置工作目录
WORKDIR /usr/src/app

# 复制 package.json 和 package-lock.json（如果存在）到工作目录
COPY package*.json ./

# 安装依赖
RUN npm install

# 将应用程序文件复制到工作目录
COPY . .

# 暴露运行时所需的端口
EXPOSE 3000

# 启动应用
CMD ["node", "index.js"]