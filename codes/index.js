/* <li class="book-card">
        <div>
            <img src="https://d19w3hj6vw9gu6.cloudfront.net/media/product_images/t5gardenschool_mediumborder.255aab885181a1977439f256905a8238.jpg" alt="">
        </div>
        <h2>Sapiens</h2>
        <p>Lizzie Laforton</p>
        <button>Mark as read!</button>
    </li>
*/
let form = document.querySelector(`form`);
let rootElm = document.querySelector(`.root_ul`);
let bookElm = form.elements.bookName;
let authorElm = form.elements.authorName;
let imageElm = form.elements.bookImage;

class BookList {
    constructor (list = []) {
        this.list = list;
    }
    addBook(name,author,img){
        let book = new Book(name,author,img);
        this.list.push(book);
        this.createUI();
        return this.list.length;
    }
    
    createUI(){
        rootElm.innerHTML = "";
        this.list.forEach((book) => {
            let li = document.createElement(`li`);
            li.classList.add(`book-card`);
            let div = document.createElement(`div`);
            let img = document.createElement(`img`);
            img.src = `${book.img}`;
            div.append(img);
            let h2 = document.createElement(`h2`);
            h2.innerText = book.name;
            let p = document.createElement(`p`);
            p.innerText = book.author;
            let button = document.createElement(`button`);
            button.innerText = book.isRead ? `Completed` : `Mark as read!`;
            if(book.isRead){
                button.setAttribute(`id`,`color`)
            }
            button.addEventListener(`click`, () => {
                book.handleBtnClick();
                this.createUI();
            });
            li.append(div,h2,p,button);
            rootElm.append(li);
        })
    }
}

class Book {
    constructor (name,author,img) {
        this.name = name;
        this.author = author;
        this.img = img;
        this.isRead = false;
    }
    handleBtnClick(){
        this.isRead = !this.isRead;
    }
}

let library = new BookList();

form.addEventListener(`submit`, (event) => {
    event.preventDefault();
    const name = bookElm.value;
    const author = authorElm.value;
    const img = imageElm.value;
    // console.log(name,author,img);
    if(name !== "" && author !== "" && img !== ""){
        library.addBook(name,author,img);
    }
    bookElm.value = "";
    authorElm.value = "";
    imageElm.value = "";
} )