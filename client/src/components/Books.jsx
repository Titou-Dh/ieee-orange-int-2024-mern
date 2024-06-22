import { useState, useEffect } from "react";
import Axios from "axios";
import { Link } from "react-router-dom";
import "./../index.css";
import Swal from "sweetalert2";

function Books() {
  const [books, setBooks] = useState([]);
  const [load, setLoad] = useState(0);
  useEffect(() => {
    fetchBooks();
  }, []);
  Axios.defaults.withCredentials = true;
  const fetchBooks = () => {
    Axios.get("http://localhost:3001/books")
      .then((res) => {
        console.log("Books fetched successfully:", res.data);
        setBooks(res.data);
        setLoad(1);
      })
      .catch((error) => {
        console.error("Error fetching books:", error);
      });
  };

  const handleDelete = (id) => {
    Swal.fire({
      title: "Delete",
      text: "Are you Sure ,you want t delete this book ?",
      icon: "question",
      confirmButtonText: "Yes",
      cancelButtonText: "No",
      showCancelButton: true,
    }).then((result) => {
      result.isConfirmed
        ? Axios.delete(`http://localhost:3001/books/${id}`)

            .then((res) => {
              console.log("Book deleted successfully:", res.data);
              Swal.fire({
                title: "Deleted",
                text: "Deleted succesfully",
                icon: "success",
                confirmButtonText: "ok",
              }).then((result) => {
                result.isConfirmed
                  ? fetchBooks()
                  : (window.location.href = "/");
              });
            })
            .catch((error) => {
              console.error("Error deleting book:", error);
            })
        : (window.location.href = "/");
    });
  };

  return (
    <div>
      <div className="text-center pt-20">
        <Link
          to="books/add"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-7 py-4 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Add
        </Link>
      </div>
      {load == 0 ? (
        <div className="text-center flex items-center justify-center min-h-screen text-white text-4xl">
          <h1>Loading...</h1>
        </div>
      ) : books.length === 0 ? (
        <div className="text-center flex items-center justify-center min-h-screen text-white text-4xl">
          <h1>No Books Available</h1>
        </div>
      ) : (
        <div className="grid xl:grid-cols-3 md:px-16 md:grid-cols-2 sm:grid-cols-1 sm:px-10 gap-4 xl:px-52 py-16">
          {books.map((book) => (
            <div
              key={book._id}
              className="p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
            >
              <a href="#">
                <h5 className="mb-2 text-2xl font-semibold tracking-tight text-gray-900 dark:text-white">
                  {book.name}
                </h5>
              </a>
              <p className="mb-3 font-normal text-gray-500 dark:text-gray-400">
                By: {book.author}
              </p>
              <p className="mb-3 font-normal text-gray-500 dark:text-gray-400">
                Year of release: {book.year}
              </p>
              <div className="gap-2">
                <button
                  onClick={() => handleDelete(book._id)}
                  className="bg-red-600 text-white border border-gray-200 rounded-lg shadow dark:border-gray-700 px-6 w-1/2 py-2 text-lg font-semibold"
                >
                  Delete
                </button>
                <Link to={`books/modify/${book._id}`}>
                  <button className="bg-blue-600 text-white border border-gray-200 rounded-lg shadow dark:border-gray-700 px-6 w-1/2 py-2 text-lg font-semibold">
                    Modify
                  </button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Books;
