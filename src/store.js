export default {
    users: [
        {
            id: 1,
            email: "demo1@demo.com",
            nickname: "demo1",
            password: "P@ssword1234",
            dateCreated: "2017-04-13"
        },
        {
            id: 2,
            email: "demo2@demo.com",
            nickname: "demo2",
            password: "P@ssword1234",
            dateCreated: "2018-04-13"
        },
        {
            id: 3,
            email: "demo3@demo.com",
            nickname: "demo3",
            password: "P@ssword1234",
            dateCreated: "2019-04-13"
        },
        {
            id: 4,
            email: "demo4@demo.com",
            nickname: "demo4",
            password: "P@ssword1234",
            dateCreated: "2020-04-13"
        }
    ],
    categories: [
        {
            id: 1,
            title: "Breakfast"
        },
        {
            id: 2,
            title: "Entree"
        },
        {
            id: 3,
            title: "Dessert"
        },
        {
            id: 4,
            title: "Drink"
        },
        {
            id: 5,
            title: "Side"
        },
        {
            id: 6,
            title: "Snack"
        }
    ],
    tags: [
        {
            id: 1,
            title: "Vegan"
        },
        {
            id: 2,
            title: "Asian"
        },
        {
            id: 3,
            title: "Italian"
        },
        {
            id: 4,
            title: "Low-Carb"
        },
        {
            id: 5,
            title: "Dairy-Free"
        },
        {
            id: 6,
            title: "Gluten-Free"
        },
    ],
    recipes: [
        {
            id: 1,
            userId: 1,
            categoryId: 1,
            title: "Test 1",
            description: "A delicious Test Recipe"
        },
        {
            id: 2,
            userId: 2,
            categoryId: 2,
            title: "Test 2",
            description: "A delicous test recipe number 2!",
        },
        {
            id: 3,
            userId: 3,
            categoryId: 3,
            title: "Test 3",
            description: "A delicous test recipe number 3!",
        },
        {
            id: 4,
            userId: 4,
            categoryId: 4,
            title: "Test 4",
            description: "A delicous test recipe number 4!",
        },
    ],
    ingredients: [
        {
            id: 1,
            recipeId: 1,
            title: "Ingredient 1",
            amount: "a pinch"
        },
        {
            id: 2,
            recipeId: 1,
            title: "Ingredient 2",
            amount: "a pinch"
        },
        {
            id: 3,
            recipeId: 1,
            title: "Ingredient 3",
            amount: "a pinch"
        },
        {
            id: 4,
            recipeId: 2,
            title: "Ingredient 1",
            amount: "a pinch"
        },
        {
            id: 5,
            recipeId: 2,
            title: "Ingredient 2",
            amount: "a pinch"
        },
        {
            id: 6,
            recipeId: 2,
            title: "Ingredient 3",
            amount: "a pinch"
        },
        {
            id: 7,
            recipeId: 3,
            title: "Ingredient 1",
            amount: "a pinch"
        },
        {
            id: 8,
            recipeId: 3,
            title: "Ingredient 2",
            amount: "a pinch"
        },
        {
            id: 9,
            recipeId: 3,
            title: "Ingredient 3",
            amount: "a pinch"
        },
        {
            id: 10,
            recipeId: 4,
            title: "Ingredient 1",
            amount: "a pinch"
        },
        {
            id: 11,
            recipeId: 4,
            title: "Ingredient 2",
            amount: "a pinch"
        },
        {
            id: 12,
            recipeId: 4,
            title: "Ingredient 3",
            amount: "a pinch"
        },
    ],
    steps: [
        {
            id: 1,
            recipeId: 1,
            text: "Step 1"
        },
        {
            id: 2,
            recipeId: 1,
            text: "Step 2"
        },
        {
            id: 3,
            recipeId: 1,
            text: "Step 3"
        },
        {
            id: 4,
            recipeId: 2,
            text: "Step 1"
        },
        {
            id: 5,
            recipeId: 2,
            text: "Step 2"
        },
        {
            id: 6,
            recipeId: 2,
            text: "Step 3"
        },
        {
            id: 7,
            recipeId: 3,
            text: "Step 1"
        },
        {
            id: 8,
            recipeId: 3,
            text: "Step 2"
        },
        {
            id: 9,
            recipeId: 3,
            text: "Step 3"
        },
        {
            id: 10,
            recipeId: 4,
            text: "Step 1"
        },
        {
            id: 11,
            recipeId: 4,
            text: "Step 2"
        },
        {
            id: 12,
            recipeId: 4,
            text: "Step 3"
        },
    ],
    comments: [
        {
            id: 1,
            recipeId: 1,
            userId: 2,
            comment: "Delicious!"
        },
        {
            id: 2,
            recipeId: 1,
            userId: 4,
            comment: "Pretty good!"
        },
        {
            id: 3,
            recipeId: 2,
            userId: 3,
            comment: "Not bad!"
        },
        {
            id: 4,
            recipeId: 2,
            userId: 1,
            comment: "My attempt did not go well..."
        },
        {
            id: 5,
            recipeId: 3,
            userId: 2,
            comment: "Meh"
        },
        {
            id: 6,
            recipeId: 3,
            userId: 4,
            comment: "Yum"
        },
        {
            id: 7,
            recipeId: 4,
            userId: 1,
            comment: "I think something went wrong..."
        },
        {
            id: 8,
            recipeId: 4,
            userId: 3,
            comment: "My version!"
        },
    ],
    recipeTags: [
        {
            recipeId: 1,
            tagId: 1,
        },
        {
            recipeId: 1,
            tagId: 2,
        },
        {
            recipeId: 2,
            tagId: 2,
        },
        {
            recipeId: 2,
            tagId: 3,
        },
        {
            recipeId: 3,
            tagId: 3,
        },
        {
            recipeId: 3,
            tagId: 4,
        },
        {
            recipeId: 4,
            tagId: 4,
        },
        {
            recipeId: 4,
            tagId: 5,
        },
    ]
}