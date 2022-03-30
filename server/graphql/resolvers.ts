export const resolvers = {
  Query: {
    user() {
      return {
        name: "Chomp",
        age: 47,
        friends: ["Alli", "Jaws"],
      };
    },
  },
};
