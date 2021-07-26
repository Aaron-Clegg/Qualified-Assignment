function findAuthorById(authors, id) {
  return authors.find(author => {
     return author.id === id;
   });  
}

function findBookById(books, id) {
  return books.find(book => {
     return book.id === id;
   }); 
}

function partitionBooksByBorrowedStatus(books) {
    return books.reduce( (alpha, delta) => { alpha[(delta.borrows.length && delta.borrows.filter( book => !book.returned).length) ? 0 : 1].push(delta); return alpha }, [[],[]] )
}

function getBorrowersForBook(book, accounts) {
  let result = [];
  let borrowArray = book.borrows;  
  borrowArray.forEach(borrow=>{
    let account = accounts.find(acc => acc.id === borrow.id);
    let obj = account;
    obj['returned'] =  borrow.returned;
    result.push(obj);
  })
  console.log(result);
  return result.slice(0,10);
}

module.exports = {
  findAuthorById,
  findBookById,
  partitionBooksByBorrowedStatus,
  getBorrowersForBook,
};
