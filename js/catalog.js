const catalogStage=document.querySelector('.catalogMain');
const readPageStage= document.querySelector('.readPage')
const backBtn=document.querySelector('.backBtn')
const titleSlider=document.querySelector('.titleSlider')
const firstSection=document.querySelector('.first-section')
const commits=document.querySelector('.commits')
const commitInput=document.querySelector('.commit-input')
const sendBtn=document.querySelector('.sendBtn')
const allBooksSlider=document.getElementById('allBooks')
const besteller=document.getElementById('besteller')
const newRealise=document.getElementById('newRealise')
const catalogList=document.querySelector('.catalogList')



import {initializeApp} from "https://www.gstatic.com/firebasejs/9.5.0/firebase-app.js"
import {getDatabase, ref,onValue} from "https://www.gstatic.com/firebasejs/9.5.0/firebase-database.js"
const app=initializeApp(firebaseConfig)
const db = getDatabase(app);

backBtn.addEventListener('click',function(){
    catalogStage.style.display='block'
    readPageStage.style.display='none'
})

window.addEventListener('load', function() {
    const categoryRef=ref(db,'category')
    onValue(categoryRef,(snapshot)=>{
        const data = snapshot.val()
        const dataArr= Object.values(data)
        catalogList.innerHTML=''
        dataArr?.forEach((item)=>{
            let catalogItem=this.document.createElement('a')
            catalogItem.classList.add('catalogItem')
            catalogItem.innerText=`${item}`
            catalogList.appendChild(catalogItem)
    })
    const booksRef=ref(db,'books')
    onValue(booksRef,(snapshot)=>{
        const data = snapshot.val()
        const dataArr= Object.values(data)
        allBooksSlider.innerHTML=''
        dataArr?.forEach((item)=>{
            var bookCard=this.document.createElement('div')
            bookCard.classList.add('bookCard','swiper-slide')
            bookCard.innerHTML +=
            `
                <div style="display: ${item.new?'block':'none'}" class="new"><img src="../assets/icons/new.svg" alt=""></div>
                <img class="bookImg" src=${item.bookImage?item.bookImage:'../assets/images/defaultBook.jpeg'} alt="">
                <p class="bookName">${item.title}</p>
                <p class="bookAuthor">${item.author?item.author:'unknown'}</p>
            `
            var readBtn= this.document.createElement('button')
            readBtn.classList.add('readBtn')
            var readBtnP=this.document.createElement('p')
            readBtnP.innerText= 'READ MORE'
            readBtn.appendChild(readBtnP)
            bookCard.appendChild(readBtn)
            allBooksSlider.appendChild(bookCard)
            readBtn.addEventListener('click',function(){
                console.log('click');
                catalogStage.style.display='none'
                readPageStage.style.display='block'
                firstSection.innerHTML=`
                <div>
                    <div class="book-year">${item.publishYear}</div>
                    <p class="book-title">${item.title}</p>
                    <p class="author-name">${item.author?item.author:'unknown'}</p>
                    <p class="about-book">${item.description}</p>
                    </div>
                    <div class="d-flex justify-content-center"  >
                        <img class="bookImage" src=${item.bookImage} alt="">
                    </div>
                </div>
                `
                commits.innerHTML=''
                fetch('https://blog-api-t6u0.onrender.com/posts').then(res=>{
                    return res.json()
                }).then(data=>{
                    console.log(data.slice());
                    const filteredArray = data.slice(100).filter(obj => obj.code === item.bookCode);
                    filteredArray.map((post)=>{
                        commits.innerHTML+=`
                        <div class="commit">
                            <div class="name-time">
                                <p class="commit-name">anonim</p>
                                <p class="commit-time">${post.time}</p>
                            </div>
                            <p class="commit-content">${post.body}</p>
                        </div>
                        `
                    })
                }).catch(err=>console.log(err))
                sendBtn.addEventListener('click',function(){
                    if(commitInput.value!==''){
                        var currentTime = moment().format('MMMM Do YYYY, HH:mm:ss');
                        let postData={
                            title:'anonim',
                            body:commitInput.value,
                            time:currentTime,
                            code:item.bookCode
                        }
                        fetch('https://blog-api-t6u0.onrender.com/posts', {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json' 
                            },
                            body: JSON.stringify(postData)
                        })
                        .then(response => {
                            if (!response.ok) {
                                throw new Error('Network response was not ok');
                            }
                            return response.json();
                        })
                        .then(data => {
                            console.log('API Cevabı:', data);
                        })
                        .catch(error => {
                            console.error('Hata:', error);
                        });
                        commits.innerHTML+=`
                        <div class="commit">
                            <div class="name-time">
                                <p class="commit-name">anonim</p>
                                <p class="commit-time">${currentTime}</p>
                            </div>
                            <p class="commit-content">${commitInput.value}</p>
                        </div>
                        `
                        commitInput.value=''
                    }
                })
            })
            
        })
        var dataRev=dataArr.reverse()
        besteller.innerHTML=''
        dataRev?.forEach((item)=>{
            var bookCard=this.document.createElement('div')
            bookCard.classList.add('bookCard','swiper-slide')
            bookCard.innerHTML +=
            `
                <div style="display: ${item.new?'block':'none'}" class="new"><img src="../assets/icons/new.svg" alt=""></div>
                <img class="bookImg" src=${item.bookImage?item.bookImage:'../assets/images/defaultBook.jpeg'} alt="">
                <p class="bookName">${item.title}</p>
                <p class="bookAuthor">${item.author?item.author:'unknown'}</p>
            `
            var readBtn= this.document.createElement('button')
            readBtn.classList.add('readBtn')
            var readBtnP=this.document.createElement('p')
            readBtnP.innerText= 'READ MORE'
            readBtn.appendChild(readBtnP)
            bookCard.appendChild(readBtn)
            besteller.appendChild(bookCard)
            readBtn.addEventListener('click',function(){
                console.log('click');
                catalogStage.style.display='none'
                readPageStage.style.display='block'
                firstSection.innerHTML=`
                <div>
                    <div class="book-year">${item.publishYear}</div>
                    <p class="book-title">${item.title}</p>
                    <p class="author-name">${item.author?item.author:'unknown'}</p>
                    <p class="about-book">${item.description}</p>
                    </div>
                    <div>
                        <img class="bookImage" src=${item.bookImage} alt="">
                    </div>
                </div>
                `
                commits.innerHTML=''
                fetch('https://blog-api-t6u0.onrender.com/posts').then(res=>{
                    return res.json()
                }).then(data=>{
                    console.log(data.slice());
                    const filteredArray = data.slice(100).filter(obj => obj.code === item.bookCode);
                    filteredArray.map((post)=>{
                        commits.innerHTML+=`
                        <div class="commit">
                            <div class="name-time">
                                <p class="commit-name">anonim</p>
                                <p class="commit-time">${post.time}</p>
                            </div>
                            <p class="commit-content">${post.body}</p>
                        </div>
                        `
                    })
                }).catch(err=>console.log(err))
                sendBtn.addEventListener('click',function(){
                    if(commitInput.value!==''){
                        var currentTime = moment().format('MMMM Do YYYY, HH:mm:ss');
                        let postData={
                            title:'anonim',
                            body:commitInput.value,
                            time:currentTime,
                            code:item.bookCode
                        }
                        fetch('https://blog-api-t6u0.onrender.com/posts', {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json' 
                            },
                            body: JSON.stringify(postData)
                        })
                        .then(response => {
                            if (!response.ok) {
                                throw new Error('Network response was not ok');
                            }
                            return response.json();
                        })
                        .then(data => {
                            console.log('API Cevabı:', data);
                        })
                        .catch(error => {
                            console.error('Hata:', error);
                        });
                        commits.innerHTML+=`
                        <div class="commit">
                            <div class="name-time">
                                <p class="commit-name">anonim</p>
                                <p class="commit-time">${currentTime}</p>
                            </div>
                            <p class="commit-content">${commitInput.value}</p>
                        </div>
                        `
                        commitInput.value=''
                    }
                })
            })
            
        })
        var newsArr=dataArr.filter(obj => obj.new === true);
        newRealise.innerHTML=''
        newsArr?.forEach((item)=>{
            var bookCard=this.document.createElement('div')
            bookCard.classList.add('bookCard','swiper-slide')
            bookCard.innerHTML +=
            `
                <div style="display: ${item.new?'block':'none'}" class="new"><img src="../assets/icons/new.svg" alt=""></div>
                <img class="bookImg" src=${item.bookImage?item.bookImage:'../assets/images/defaultBook.jpeg'} alt="">
                <p class="bookName">${item.title}</p>
                <p class="bookAuthor">${item.author?item.author:'unknown'}</p>
            `
            var readBtn= this.document.createElement('button')
            readBtn.classList.add('readBtn')
            var readBtnP=this.document.createElement('p')
            readBtnP.innerText= 'READ MORE'
            readBtn.appendChild(readBtnP)
            bookCard.appendChild(readBtn)
            newRealise.appendChild(bookCard)
            readBtn.addEventListener('click',function(){
                console.log('click');
                catalogStage.style.display='none'
                readPageStage.style.display='block'
                firstSection.innerHTML=`
                <div>
                    <div class="book-year">${item.publishYear}</div>
                    <p class="book-title">${item.title}</p>
                    <p class="author-name">${item.author?item.author:'unknown'}</p>
                    <p class="about-book">${item.description}</p>
                    </div>
                    <div>
                        <img class="bookImage" src=${item.bookImage} alt="">
                    </div>
                </div>
                `
                commits.innerHTML=''
                fetch('https://blog-api-t6u0.onrender.com/posts').then(res=>{
                    return res.json()
                }).then(data=>{
                    console.log(data.slice());
                    const filteredArray = data.slice(100).filter(obj => obj.code === item.bookCode);
                    commits.innerHTML=''
                    filteredArray.map((post)=>{
                        commits.innerHTML+=`
                        <div class="commit">
                            <div class="name-time">
                                <p class="commit-name">anonim</p>
                                <p class="commit-time">${post.time}</p>
                            </div>
                            <p class="commit-content">${post.body}</p>
                        </div>
                        `
                    })
                }).catch(err=>console.log(err))
                sendBtn.addEventListener('click',function(){
                    
                    if(commitInput.value!==''){
                        var currentTime = moment().format('MMMM Do YYYY, HH:mm:ss');
                        let postData={
                            title:'anonim',
                            body:commitInput.value,
                            time:currentTime,
                            code:item.bookCode
                        }
                        fetch('https://blog-api-t6u0.onrender.com/posts', {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json' 
                            },
                            body: JSON.stringify(postData)
                        })
                        .then(response => {
                            if (!response.ok) {
                                throw new Error('Network response was not ok');
                            }
                            return response.json();
                        })
                        .then(data => {
                            console.log('API Cevabı:', data);
                        })
                        .catch(error => {
                            console.error('Hata:', error);
                        });
                        commits.innerHTML+=`
                        <div class="commit">
                            <div class="name-time">
                                <p class="commit-name">anonim</p>
                                <p class="commit-time">${currentTime}</p>
                            </div>
                            <p class="commit-content">${commitInput.value}</p>
                        </div>
                        `
                        commitInput.value=''
                    }
                })
            })
            
        })
    })

})
})
