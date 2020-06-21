// let selectRegion = document.querySelector('#selectRegion');
// let optionData = ["三民區","大樹區","小港區","六龜區"];
// let optionDataStr = ''
// for(let i=0;i<optionData.length;i++){
//     optionDataStr += ` <option value="${optionData[i]}">${optionData[i]}</option>`;
// }
// selectRegion.innerHTML = optionDataStr;








//  xhr request 
let xhr = new XMLHttpRequest();
xhr.open('get', 'https://data.kcg.gov.tw/api/action/datastore_search?resource_id=92290ee5-6e61-456f-80c0-249eae2fcc97')
xhr.send(null);
var _parseData = [];

xhr.onload = function () {
    _parseData = JSON.parse(xhr.responseText).result.records; // 取得傳回來的字串 並解析成object
    // _parseData 是陣列
    console.log(_parseData)

    let selectRegion = document.querySelector('#selectRegion');
    let optionDataStr = ''
    for(let i=0;i<_parseData.length;i++){
        optionDataStr += ` <option value="${_parseData[i].Zone}">${_parseData[i].Zone}</option>`;
    }
    selectRegion.innerHTML = optionDataStr;




    markUpBoxGroup();
}





// 組成 旅遊圖卡 box
function markUpBoxGroup() {
    let boxGroup = document.querySelector('#box_group');
    let selectRegion = document.querySelector('#selectRegion');

    selectRegion.addEventListener('change', changeRegion);
    
    changeRegion()

    function changeRegion(e){
        let str = '';
        for (let i = 0; i < _parseData.length; i++) { 
            if (_parseData[i].Zone == selectRegion.value) {   // == e.target.val
                str += `
                <div class="box">
                    <div class="box-banner" style="background-image: url(${_parseData[i].Picture1});">
                        <h3 class="box-title">${_parseData[i].Name}</h3>
                        <p class="box-title-small">${_parseData[i].Zone}</p>
                    </div>
                    <div class="box-content">
                        <p class="box-time">${_parseData[i].Opentime}</p>
                        <p class="box-address">${_parseData[i].Add}</p>
                        <p class="box-call">${_parseData[i].Tel}</p>
                        <p class="box-cost">${_parseData[i].Ticketinfo}</p>
                    </div>
                </div>
            `
            }
        }
        boxGroup.innerHTML = str;
    }
}






