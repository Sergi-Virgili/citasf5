

const state = {
    user: null,
    
    messageList : [],
    realTimePeriod: 1000,
    realTimeInterval: null,
    teachersList: null
}

//funcion login post controler login


function login() {
 
    let data = {
        userName: $('#loginName').val()
    }

    let url = 'controlers/controler-login.php'
    $.post(url, data,
        function (response) {
            let obj = JSON.parse(response)
            state.user= obj[0];
            console.log(state.user);
            let html = state.user.name
            render('userName', html)
            msg_request();            
        }    
    );
    
}
function msgSend() {
  
    let data = {
        text: $('#sendText').val(),
        idCoder: state.user.id,
        idTeacher: '1'
        

    }

    let url = 'controlers/controler-add-message.php'
    $.post(url, data,
        function (response) {
            msg_request();    
                   
        }    
    );
    
}
 function render(id,html){
    let component = document.getElementById(id);
    component.innerHTML = html
 }

 function msg_request() {
  
     let data = {
         userId: state.user.id
     }
 
     let url = 'controlers/controler-list-messages.php'
     $.post(url, data,
         function (response) {
             state.messageList = JSON.parse(response)
             console.log(state.messageList)
             let html = '';
             state.MessageList = []
            for (let i = 0; i < state.messageList.length; i++)
                {
                    
                    html += `<li>
                        <div class="team">${state.messageList[i].team}</div>
                        <div class="text">${state.messageList[i].text}</div>
                        <div class="coder">from: ${state.messageList[i].from}</div>
                        <div class="teacher">to: ${state.messageList[i].to}</div>
                        </li>`
                } 
            render('messagesList',html)        
         }    
     );
     
 }
 function teachers_request() {
  
    let data = {
       
    }

    let url = 'controlers/controler-list-teachers.php'
    $.post(url, data,
        function (response) {
            state.teachersList = JSON.parse(response)
            console.log(state.teachersList)
             let html = '';
        
            for (let i = 0; i < state.teachersList.length; i++)
                {
                   
                    html += `
                        <option>${state.teachersList[i].teacherName}</option>
                        
                        `
                } 
            console.log(html)
            render('teachersList', html)        
        }    
    );
    
}
teachers_request();

//INTERVAL REAL TIME

function startRealTime() {
    store.realTimeInterval = setInterval (function(){
        getMessages()
    }, 1000)
}

//startRealTime();