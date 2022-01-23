/*
Key: 89aae050d1d8c006bdb5bf866029199d

https://www.flickr.com/services/rest/?method=flickr.test.echo&name=value

flickr.interestingness.getList

https://live.staticflickr.com/{server-id}/{id}_{secret}_{size-suffix}.jpg

flickr.photos.search

*/
const body = document.querySelector("body"); 
const frame = document.querySelector("#list"); 
const loading = document.querySelector(".loading"); 
const input = document.querySelector("#search"); 
const btnSearch = document.querySelector(".btnSearch"); 
const base = "https://www.flickr.com/services/rest/?";
const method1 = "flickr.interestingness.getList";
const method2 = "flickr.photos.search";
const key = "89aae050d1d8c006bdb5bf866029199d";
const per_page = 20; 

const url = `${base}method=${method1}&api_key=${key}&per_page=${per_page}&format=json&nojsoncallback=1`;


callData(url);

btnSearch.addEventListener("click", e=>{

    let tag = input.value; 
    tag = tag.trim();
    
    const url = `${base}method=${method2}&api_key=${key}&per_page=${per_page}&format=json&nojsoncallback=1&privacy_filter=1&tags=${tag}`;

    if(tag !=""){
        callData(url); 
    }else{
        console.log("검색어를 입력하세요"); 
        frame.innerHTML =""; 
        frame.classList.remove("on");
        frame.style.height = "auto"; 

        const errMsgs = frame.parentElement.querySelectorAll("p"); 
        if(errMsgs.length >0) frame.parentElement.querySelector("p").remove(); 

        const errMsg = document.createElement("p"); 
        errMsg.append("검색어를 입력하세요"); 
        frame.parentElement.append(errMsg);

    }
})

input.addEventListener("keyup", e=>{
    if(e.key === "Enter"){
        let tag = input.value; 
        tag = tag.trim();
        
        const url = `${base}method=${method2}&api_key=${key}&per_page=${per_page}&format=json&nojsoncallback=1&privacy_filter=1&tags=${tag}`;

        if(tag !=""){
            callData(url); 
        }else{
            console.log("검색어를 입력하세요"); 
            frame.innerHTML =""; 
            frame.classList.remove("on");
            frame.style.height = "auto"; 
    
            const errMsgs = frame.parentElement.querySelectorAll("p"); 
            if(errMsgs.length >0) frame.parentElement.querySelector("p").remove(); 
    
            const errMsg = document.createElement("p"); 
            errMsg.append("검색어를 입력하세요"); 
            frame.parentElement.append(errMsg);
        }
    }
})

frame.addEventListener("click", e=>{
    e.preventDefault(); 

    let target = e.target.closest(".item").querySelector(".thumb"); 
   
  
     
    if(e.target == target){ 
        let imgSrc = target.parentElement.getAttribute("href"); 
        
        let pop = document.createElement("aside"); 
        pop.classList.add("pop"); 
        let pops = `
                    <div class="con">
                        <img src="${imgSrc}">
                    </div>
                    <span class="close">CLOSE</span>
                    `;
        pop.innerHTML = pops; 
        body.append(pop);  
        body.style.overflow = "hidden"; 
    }     
})

body.addEventListener("click", e=>{

    let pop = body.querySelector(".pop"); 

    if(pop != null){
        let close = pop.querySelector(".close"); 

        if(e.target == close){
            pop.remove(); 
            body.style.overflow = "auto";
        }
    }
})



function callData(url){
    frame.innerHTML =""; 
    loading.classList.remove("off"); 
    frame.classList.remove("on");     

    fetch(url)
    .then(data=>{          
        return data.json(); 
    })
    .then(json=>{
        let items = json.photos.photo; 
        //console.log(items)
        if(items.length >0){
            const errMsgs = frame.parentElement.querySelectorAll("p"); 
            if(errMsgs.length >0) frame.parentElement.querySelector("p").remove(); 

            createList(items);
            delayLoading();
        }else{
            
            loading.classList.add("off"); 

            const errMsgs = frame.parentElement.querySelectorAll("p"); 
            if(errMsgs.length >0) frame.parentElement.querySelector("p").remove(); 

            const errMsg =document.createElement("p"); 
            errMsg.append("검색하신 검색어의 이미지가 없습니다."); 
            frame.parentElement.append(errMsg); 

            frame.classList.remove("on"); 
            frame.style.height = "auto"; 
        }
        
    }); 
}

function createList(items){
    let htmls =""; 
    
        items.map(data=>{
            console.log(data); 
    
            let imgSrc = `https://live.staticflickr.com/${data.server}/${data.id}_${data.secret}_m.jpg`;
    
            let imgSrcBig =`https://live.staticflickr.com/${data.server}/${data.id}_${data.secret}_b.jpg`;
    
            htmls += `
                    <li class="item">
                        <div>
                            <a href=${imgSrcBig}>
                                <img src=${imgSrc} class="thumb" >
                            </a>
                            <p>${data.title}</p>
                            <span>
                                <img class="profile" src="http://farm${data.farm}.staticflickr.com/${data.server}/buddyicons/${data.owner}.jpg">
                                <strong>${data.owener}</strong>
                            </span>
                        </div>
                    </li>
                    `;
        })
    
        frame.innerHTML = htmls; 
}; 

function delayLoading(){
    const imgs = frame.querySelectorAll("img"); 
    const len = imgs.length; 
    let count = 0; 

    for(let el of imgs){

        el.onload =()=>{
            count++;
            
            if(count == len) isoLayout(); 
        }

        let thumb = el.closest(".item").querySelector(".thumb"); 
        thumb.onerror = e =>{
            e.currentTarget.closest(".item").querySelector(".thumb").setAttribute("src", "img/k1.jpg"); 
        }

        let profile = el.closest(".item").querySelector(".profile"); 
        profile.onerror = e =>{
            e.currentTarget.closest(".item").querySelector(".profile").setAttribute("src", "https://www.flickr.com/images/buddyicon.gif");
        }

        
    }
}




function isoLayout(){

    loading.classList.add("off"); 
    frame.classList.add("on"); 

    new Isotope("#list",{
        itemSelector : ".item", 
        columnWidth : ".item", 
        transitionDuration : "0.5s"
    })
}