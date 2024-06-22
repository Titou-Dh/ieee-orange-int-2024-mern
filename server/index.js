require('dotenv').config();
const express = require("express")
const app = express()
const cors = require('cors');
app.use(express.json());


app.use(cors(
    {
        origin: 'http://localhost:5173',
        methods:["POST", "GET", "DELETE", "PUT"],
        credentials: true
    }
));

const mdb = require("mongoose")

const uri = process.env.MONGODB_URI;


mdb.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => {
        console.log("Connected to MongoDB");
    })
    .catch(err => {
        console.error("Error connecting to MongoDB", err);
        process.exit(1);
    });

const bookModel = require("./models/books")



app.get("/", (req, res) => {
    res.json("Hello")
})

app.get("/books", async (req, res) => {
    const books = await bookModel.find();
    res.json(books)
})



app.post("/createBook", async (req, res) => {
    const book = req.body;
    const newBook = new bookModel(book);
    await newBook.save();
    res.json(req.body)
})





app.delete("/books/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const deletedBook = await bookModel.findByIdAndDelete(id);
        if (!deletedBook) {
            return res.status(404).json({ error: 'Book not found' });
        }
        res.json({ message: 'Book deleted successfully', deletedBook });
    } catch (error) {
        console.error('Error deleting book:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


app.get('/books/:id', async (req, res) => {
    try {
        const book = await bookModel.findById(req.params.id);
        if (!book) {
            return res.status(404).json({ message: 'Book not found' });
        }
        res.json(book);
    } catch (error) {
        console.error('Error fetching book:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


app.put('/books/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { name, author, year } = req.body;

        if (!name && !author && !year) {
            return res.status(400).json({ error: 'At least one field (name, author, year) is required for update' });
        }

        const updatedBook = await bookModel.findByIdAndUpdate(id, req.body, { new: true });

        if (!updatedBook) {
            return res.status(404).json({ error: 'Book not found' });
        }


        res.json({ message: 'Book updated successfully', updatedBook });
    } catch (error) {
        console.error('Error updating book:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.listen("3001", () => {
    console.log("server works")
})





