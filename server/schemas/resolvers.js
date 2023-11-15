const { default: mongoose } = require("mongoose");
const { User, favoriteRecipe } = require("../models");
const { signToken, AuthenticationError } = require("../utils/auth");

const resolvers = {
  Query: {
    users: async () => {
      return User.find();
    },
    user: async (_, { username }) => {
      return User.findOne({ username });
    },
    recipeById: async (_, { idMeal }) => {
      try {
        const objectId = new mongoose.Types.ObjectId(idMeal);

        // Assuming your favoriteRecipe model has a field named 'AddedOn' for sorting
        const recipe = await favoriteRecipe
          .findOne({ _id: objectId })
          .sort({ AddedOn: -1 });

        return recipe;
      } catch (error) {
        console.error("Error fetching recipe by ID:", error.message);
        throw new Error("Error fetching recipe by ID");
      }
    },
  },

  Mutation: {
    addUser: async (__, { username, email, password }) => {
      const user = await User.create({ username, email, password });
      const token = signToken(user);
      return { token, user };
    },
    login: async (__, { email, password }) => {
      try {
        const user = await User.findOne({ email });

        if (!user) {
          throw new AuthenticationError("Invalid email or password");
        }

        const correctPw = await user.isCorrectPassword(password);

        if (!correctPw) {
          throw new AuthenticationError("Invalid email or password");
        }

        const token = signToken(user);

        return { token, user };
      } catch (error) {
        throw new Error(`Login failed: ${error.message}`);
      }
    },

    addRecipe: async (__, { idMeal }, context) => {
      try {
        // Check if the user is authenticated
        if (!context.user) {
          throw new AuthenticationError(
            "You must be logged in to add a recipe"
          );
        }

        return await User.findOneAndUpdate(
          { _id: context.user._id },
          { $addToSet: { favorites: idMeal } },

          {
            new: true,
            runValidators: true,
          }
        );
      } catch (error) {
        console.error("Error in addRecipe resolver:", error);
        // throw new Error(`Failed to add recipe: ${error.message}`);
      }
    },

    deleteRecipe: async (__, { idMeal }, context) => {
      try {
        // Check if the user is authenticated
        if (!context.user) {
          throw new AuthenticationError(
            "You must be logged in to delete a recipe"
          );
        }
        // Remove the recipe from the user's recipes
        return await User.findOneAndUpdate(
          { _id: context.user._id },
          { $pull: { favorites: idMeal } },
          { new: true }
        );

        // Remove the recipe from the favoriteRecipe collection
        // return await favoriteRecipe.findOneAndDelete({ favorites: idMeal });

        
      } catch (error) {
        throw new Error(`Failed to delete recipe: ${error.message}`);
      }
    },
  },
};
module.exports = resolvers;



  