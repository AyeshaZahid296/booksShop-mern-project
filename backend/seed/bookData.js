const booksData =
    [
        {
            title: "The Sealed Nectar",
            author: "Safiur Rahman Mubarakpuri",
            description: "Biography of Prophet Muhammad (PBUH) which won first prize in a competition by Muslim World League.",
            price: 25.99,
            rating: 4.9,
            coverImage: "https://m.media-amazon.com/images/I/51QnXuJxRQL._SY425_.jpg",
            category: "islamic",
            language: "english",
            stock: 50
        },
        {
            title: "Riyadus Saliheen",
            author: "Imam Nawawi",
            description: "Classic collection of hadith on ethics, manners, worship, and Islamic conduct.",
            price: 18.50,
            rating: 4.8,
            coverImage: "https://m.media-amazon.com/images/I/41X5Y5GZ5ZL._SY425_.jpg",
            category: "islamic",
            language: "english",
            stock: 35
        },
        // Add 8 more Islamic books...

        // Psychology Books (10)
        {
            title: "Thinking, Fast and Slow",
            author: "Daniel Kahneman",
            description: "Explores the two systems that drive the way we think—System 1 (fast, intuitive) and System 2 (slow, analytical).",
            price: 12.99,
            rating: 4.6,
            coverImage: "https://m.media-amazon.com/images/I/41CPf7W1YhL._SY425_.jpg",
            category: "psychology",
            language: "english",
            stock: 40
        },
        {
            title: "The Power of Habit",
            author: "Charles Duhigg",
            description: "Explores the science behind why habits exist and how they can be changed.",
            price: 11.25,
            rating: 4.5,
            coverImage: "https://m.media-amazon.com/images/I/51e7Zqk0QRL._SY425_.jpg",
            category: "psychology",
            language: "english",
            stock: 30
        },
        // Add 8 more Psychology books...

        // Academic Books (10)
        {
            title: "Calculus: Early Transcendentals",
            author: "James Stewart",
            description: "Comprehensive calculus textbook with clear explanations and numerous practice problems.",
            price: 199.99,
            rating: 4.7,
            coverImage: "https://m.media-amazon.com/images/I/51Q5ZQ5ZQZL._SY425_.jpg",
            category: "academic",
            language: "english",
            stock: 20
        },
        {
            title: "Principles of Economics",
            author: "N. Gregory Mankiw",
            description: "Introductory economics textbook that explains fundamental economic concepts.",
            price: 149.99,
            rating: 4.6,
            coverImage: "https://m.media-amazon.com/images/I/51Q5ZQ5ZQZL._SY425_.jpg",
            category: "academic",
            language: "english",
            stock: 25
        },
        // Add 8 more Academic books...

        // Fiction Books (10)
        {
            title: "The Alchemist",
            author: "Paulo Coelho",
            description: "A shepherd boy's journey to find worldly treasure leads him to discover his personal legend.",
            price: 9.99,
            rating: 4.7,
            coverImage: "https://m.media-amazon.com/images/I/51Q5ZQ5ZQZL._SY425_.jpg",
            category: "fiction",
            language: "english",
            stock: 60
        },
        {
            title: "1984",
            author: "George Orwell",
            description: "Dystopian novel about totalitarianism, mass surveillance, and repressive regimentation.",
            price: 7.99,
            rating: 4.8,
            coverImage: "/images/1984.png",
            category: "fiction",
            language: "english",
            stock: 45
        },
        // Add 8 more Fiction books...

        // Biography Books (10)
        {
            title: "The Autobiography of Malcolm X",
            author: "Malcolm X, Alex Haley",
            description: "Powerful story of the African-American activist's life and spiritual transformation.",
            price: 12.99,
            rating: 4.8,
            coverImage: "https://m.media-amazon.com/images/I/51Q5ZQ5ZQZL._SY425_.jpg",
            category: "biography",
            language: "english",
            stock: 30
        },
        {
            title: "Long Walk to Freedom",
            author: "Nelson Mandela",
            description: "Autobiography of the anti-apartheid revolutionary and former President of South Africa.",
            price: 14.95,
            rating: 4.9,
            coverImage: "https://m.media-amazon.com/images/I/51Q5ZQ5ZQZL._SY425_.jpg",
            category: "biography",
            language: "english",
            stock: 25
        },
        // Add 8 more Biography books...

        // Self-Help Books (10)
        {
            title: "Atomic Habits",
            author: "James Clear",
            description: "A guide to building good habits and breaking bad ones through tiny changes.",
            price: 11.99,
            rating: 4.8,
            coverImage: "https://m.media-amazon.com/images/I/51Q5ZQ5ZQZL._SY425_.jpg",
            category: "self-help",
            language: "english",
            stock: 55
        },
        {
            title: "The 7 Habits of Highly Effective People",
            author: "Stephen R. Covey",
            description: "Classic book presenting a principle-centered approach for solving personal and professional problems.",
            price: 15.99,
            rating: 4.7,
            coverImage: "https://m.media-amazon.com/images/I/51Q5ZQ5ZQZL._SY425_.jpg",
            category: "self-help",
            language: "english",
            stock: 40
        }
    ];

module.exports = booksData;
