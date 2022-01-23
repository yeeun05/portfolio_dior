var mapContainer = document.getElementById('map'); // 지도를 표시할 div 
const t_on = document.querySelectorAll(".traffic li")[0]; 
const t_off = document.querySelectorAll(".traffic li")[1]; 
const branch_btns = document.querySelectorAll(".branch li"); 


let drag = true; //드래그 가능 
let zoom = true; //확대,축소 가능 


    mapOption = { 
        center: new kakao.maps.LatLng(37.50711796614849,126.7564159502457), // 지도의 중심좌표
        level: 3 // 지도의 확대 레벨
    };

// 지도를 표시할 div와  지도 옵션으로  지도를 생성합니다
var map = new kakao.maps.Map(mapContainer, mapOption); 

//마커생성하기 
var markerOptions =[
    {
        title:"본점", 
        latlng : new kakao.maps.LatLng(37.50711796614849,126.7564159502457),
        imgSrc : 'img/marker1.png', 
        imgSize : new kakao.maps.Size(232,99), 
        imgPos : {offset: new kakao.maps.Point(116, 99)},
        button : branch_btns[0]
    },
    {
        title:"지점1", 
        latlng : new kakao.maps.LatLng(33.450701, 126.570667),
        imgSrc : 'img/marker2.png', 
        imgSize : new kakao.maps.Size(232,99), 
        imgPos : {offset: new kakao.maps.Point(116, 99)},
        button : branch_btns[1]
    },
    {
        title:"지점2", 
        latlng : new kakao.maps.LatLng(37.557527,126.9222836),
        imgSrc : 'img/marker3.png', 
        imgSize : new kakao.maps.Size(232,99), 
        imgPos : {offset: new kakao.maps.Point(116, 99)}, 
        button : branch_btns[2]
    }
]; 

for(let i =0; i<markerOptions.length; i++){
    new kakao.maps.Marker({
        map : map, 
        position: markerOptions[i].latlng, 
        title : markerOptions[i].title, 
        image : new kakao.maps.MarkerImage(markerOptions[i].imgSrc, markerOptions[i].imgSize, markerOptions[i].imgPos) 
    });

    //branch 버튼을 클릭했을 때 해당위치로 이동 및 버튼 활성화 
    markerOptions[i].button.onclick = e=>{
        e.preventDefault(); 

        for(let k=0; k<markerOptions.length; k++){
            markerOptions[k].button.classList.remove("on"); 
        }
        markerOptions[i].button.classList.add("on"); 

        moveTo(markerOptions[i].latlng); 
    }    
}

//브라우저 리사이즈시 현재 활성화되어있는 버튼의 data-index 구해서 
//setCenter의 매개변수-위치값에 적용 
window.onresize = ()=>{
    let active_btn = document.querySelector(".branch li.on"); 
    let active_index = active_btn.getAttribute("data-index"); 
    
    map.setCenter(markerOptions[active_index].latlng);
}

 




//교통정보 보기/끄기 버튼 클릭 이벤트 
t_on.addEventListener("click", e=>{
    e.preventDefault(); 
    if(t_on.classList.contains("on")) return; 
    map.addOverlayMapTypeId(kakao.maps.MapTypeId.TRAFFIC);

    t_on.classList.add("on"); 
    t_off.classList.remove("on");

})

t_off.addEventListener("click", e=>{
    e.preventDefault(); 
    if(t_off.classList.contains("on")) return; 
    map.removeOverlayMapTypeId(kakao.maps.MapTypeId.TRAFFIC);

    t_off.classList.add("on"); 
    t_on.classList.remove("on"); 
})


//컨트롤 보이기 
var mapTypeControl = new kakao.maps.MapTypeControl();
map.addControl(mapTypeControl, kakao.maps.ControlPosition.TOPRIGHT);

//지도 드래그 이동 끄기/켜기 
setDraggable(drag);
function setDraggable(draggable) {
    // 마우스 드래그로 지도 이동 가능여부를 설정합니다
    map.setDraggable(draggable);    
}

//지도 확대/축소 켜기/끄기 
setZoomable(zoom); 
function setZoomable(zoomable) {
    // 마우스 휠로 지도 확대,축소 가능여부를 설정합니다
    map.setZoomable(zoomable);    
}

//지도 이동 함수 정의 
function moveTo(target) {   
    var moveLatLon = target;   
    map.setCenter(moveLatLon);
}