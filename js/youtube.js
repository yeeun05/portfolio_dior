/*
AIzaSyDA9JxUWxiJRm6GSCEutLr1CIiU5qxmxOQ

url : 'https://www.googleapis.com/youtube/v3/playlistItems'

호출시 옵션값 
part : 'snippet', 
key : 'AIzaSyDA9JxUWxiJRm6GSCEutLr1CIiU5qxmxOQ', 
playlistId : 'PLq0n89wH9v3C4_NPyIRZnl967ogGTmtCg',
maxResults : 5, 
*/

const vidList = document.querySelector(".vidList"); 
const key = 'AIzaSyDA9JxUWxiJRm6GSCEutLr1CIiU5qxmxOQ'; 
const playlistId = 'PLq0n89wH9v3C4_NPyIRZnl967ogGTmtCg';
const num = 6; 
const url = `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&key=${key}&playlistId=${playlistId}&maxResults=${num}`;


fetch(url)
.then(data=>{
    return data.json(); 
})
.then(json=>{
    
    let items = json.items; 
    console.log(items); 
    let result =''; 
    
    

    items.map(item=>{

        let title = item.snippet.title; 
        if(title.length > 30){
            title = title.substr(0, 30)+"..."; 
        }

        let con = item.snippet.description; 
        if(con.length > 100){
            con = con.substr(0,100)+"..."; 
        }

        let date = item.snippet.publishedAt; 
        date = date.split("T")[0]; 
         

        result +=`
                <article>
                    <a href="${item.snippet.resourceId.videoId}" class="pic">
                        <img src="${item.snippet.thumbnails.medium.url}">
                    </a>
                    <div class="con">
                        <h2>${title}</h2>
                        <p>${con}</p>
                        <span>${date}</span>
                    </div>
                </article>
        `;
    })

    vidList.innerHTML = result; 
});


vidList.addEventListener("click", e=>{
    e.preventDefault(); 

    //a요소의 href값을 받아야 하므로
    //클릭한 요소의 부모태그가 a요소가 아니라면 중지 
    if(!e.target.closest("a")) return;
    const vidId = e.target.closest("a").getAttribute("href"); 
    let pop = document.createElement("figure"); 
    pop.classList.add("pop"); 
    pop.innerHTML = `
                    <iframe src="https://www.youtube.com/embed/${vidId}" frameborder="0" width="100%" height="100%" allowfullscreen></iframe>
                    <span class="btnClose">close</span>
    `;

    vidList.append(pop); 
});


vidList.addEventListener("click", e=>{
    const pop = vidList.querySelector(".pop"); 
    if(pop){
        const close = pop.querySelector("span"); 
        if(e.target == close) pop.remove(); 
       
    }

});


