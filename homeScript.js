//initializing the constant and variables
const UserCreds = JSON.parse(sessionStorage.getItem("user-creds"));
const UserInfo = JSON.parse(sessionStorage.getItem("user-info"));
const url = 'https://type.fit/api/quotes';
let pText = $('.card-text');
let pbdayText = $('.bdayText');
const signOutBtn = $('#signOutBtn');
let today = new Date();
console.log('today date' +today);
let bday = new Date(`${UserInfo.dateOfBirth}`.split('-')); 
console.log('bday',bday);

// Function to display a random quote from the array when its your bday!
function displayRandomValue(dataArrayObj) { 
    const randomIndex = Math.floor(Math.random() * dataArrayObj.length);
    const randomTextValue = dataArrayObj[randomIndex]['text'];
    const randomAuthorValue = dataArrayObj[randomIndex]['author'];
    console.log('randomAuthorValue '+randomAuthorValue);
    let newValue = '';
    if(randomAuthorValue.includes(', type.fit')){
        newValue = randomAuthorValue.replace(', type.fit','');
    }else if(randomAuthorValue.includes('type.fit')){
        newValue = randomAuthorValue.replace('type.fit','');
    }
    
    console.log('randomAuthorValue sub '+newValue);
        
    pbdayText.html("<span class='secondText'> Hello "+ UserInfo.name +"</span> </br><span class='firstText'>Happy Birthday!<span></br><span class='secondText'>'" +randomTextValue+"'</span> </br> <span class='thirdText'>"+newValue+"</span>");  
}
// Renders the JSON that was returned when the Promise from fetch resolves.
const renderJsonResponse = (res) => {
    console.log(res);
    displayRandomValue(res);
}
const getData = async ()=>{  
    try{
        const response = await fetch(url,{cache:'no-cache'});
        if(response.ok){
            const jsonResponse = await response.json();
            renderJsonResponse(jsonResponse);
        }

    }catch(error){
        console.log(error);
    }
}

//check if the bday is today
if(bday.getMonth() === today.getMonth() && bday.getDate() === today.getDate()){
    //code to fetch random quotes from the api
    getData();    
}else{
    let upcomingBday = new Date(today.getFullYear(), bday.getMonth(), bday.getDate());
    
    if(today > upcomingBday) {
        upcomingBday.setFullYear(today.getFullYear() + 1);
    }
    console.log('upcomingBday '+upcomingBday);
    var one_day = 24 * 60 * 60 * 1000;
    
    let daysLeft = Math.round(Math.abs(upcomingBday.getTime() - today.getTime()) / (one_day));
    console.log('daysleft '+daysLeft);
    
   
    if(daysLeft == 1){
        pbdayText.html("<b><span class='firstText'>"+daysLeft+" DAY LEFT</span> </br><span class='secondText'>UNTIL YOUR BIRTHDAY!</span></b>");
    }else{
        pbdayText.html("<b><span class='firstText'>"+daysLeft+" DAYS LEFT</span> </br><span class='secondText'>UNTIL YOUR BIRTHDAY!</span></b>");
    }
   
}
    


//signOut button functionality
signOutBtn.on('click', () =>{
    sessionStorage.removeItem("user-creds");
    sessionStorage.removeItem("user-info");
    window.location.href = 'loginPage.html'

})





    
    