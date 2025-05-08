// path.js
//网络请求路径放在这个文件
const base = {
  baseUrl: "/api",
  bookShow: "/book",
  register: "/user/register",
  searchBook: "/book/bookname",
  login: "/user/login",
  broBook: "/book/borrow",
  addBook: "/book/add",
  xiuBook: "/book/changing",
  delBook: "/book/delete",
  searchkind: "/book/sort",
  //借书时生成历史记录
  buildBook: "/book/build1",
  //还书
  returnBook: "/book/return",
  //还书时加上还书日期
  build2: "/book/build2",
  //所有历史记录
  build3Book: "/book/build3",
  //全部的用户
  user: "/user",
  //提出反馈
  questBook: "/book/quest",
};
export default base;
