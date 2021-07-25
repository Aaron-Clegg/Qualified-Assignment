function getTotalBooksCount(books) {
return books.length
}

function getTotalAccountsCount(accounts) {
  return accounts.length
}

function getBooksBorrowedCount(books) {
let count = 0
  for (let i = 0; i < books.length; i++) {
    if (books[i].borrows[0].returned !== true) count++
  }
  return count;
}

function getMostCommonGenres(books) {   
  const bookGenres = books.map((book) => book.genre);
  const temp = [];
  bookGenres.map((genre) => {
    const genreLocation = temp.findIndex((element) => element.name === genre);
    if (genreLocation >= 0) {
      temp[genreLocation].count = temp[genreLocation].count + 1;
    } else {
      temp.push({ name: genre, count: 1 });
    }
  });
  temp.sort((alpha, delta) => delta.count - alpha.count);
  if (temp.length > 5) {
    return temp.slice(0, 5);
  }
  return temp;
}

 function getMostPopularBooks(books, count=5) {
    const borrows = books.map(book=>({name:book.title, count:book.borrows.length}));
    borrows.sort((alpha, delta) => delta.count - alpha.count);
    return borrows.slice(0,count);
}

function getMostPopularAuthors(books,authors) {
const topAuthors = authors.map(a => ({
  ...a,
  bookCount: books.filter(b => b.authorId === a.id).length,
  borrowCount: books.filter(b => b.authorId === a.id).reduce((acc, cur) => acc + cur.borrows.length, 0)
})).sort((b, a) => a.borrowCount - b.borrowCount);
topAuthors.length = 5;
return topAuthors.map(ta => {
  return {count: ta.borrowCount, name: ta.name.first + " " + ta.name.last};
})
}

module.exports = {
  getTotalBooksCount,
  getTotalAccountsCount,
  getBooksBorrowedCount,
  getMostCommonGenres,
  getMostPopularBooks,
  getMostPopularAuthors,
};
