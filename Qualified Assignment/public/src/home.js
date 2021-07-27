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

function helper(books) { ///Helper Function
  let countObj = {}
  books.forEach(aBook => {
    if (countObj[aBook.genre] != null) {
      countObj[aBook.genre]++
    } else {
      countObj[aBook.genre] = 1
    }
  })
  return countObj
}
function getMostCommonGenres(books) {
  let countObj = helper(books)
  let countArray = []
  for (const [key, value] of Object.entries(countObj)) {
    countArray.push({
      name: key,
      count: value,
    })
  }
  countArray.sort((a, b) => b.count - a.count)
  return countArray.slice(0, 5)
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
