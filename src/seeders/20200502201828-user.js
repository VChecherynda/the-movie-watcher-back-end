"use strict";

// import UUIDV4 from "uuid/v4";
// import bcrypt from "bcryptjs";

// module.exports = {
//   up: async queryInterface => {
//     const hashedPassword = await bcrypt.hash("123456", 12);

//     return queryInterface.bulkInsert("users", [
//       {
//         id: UUIDV4(),
//         name: "Vadym",
//         email: "test@email.com",
//         password: hashedPassword,
//         createdAt: new Date(),
//         updatedAt: new Date()
//       }
//     ]);
//   },
//   down: async queryInterface => {
//     return queryInterface.bulkDelete("users", null, {});
//   }
// };
