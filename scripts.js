
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
            
            let html = state.user.name
            render('userName', html)
           // msg_request(); 
            startRealTime();           
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
            $('#sendText').val() = ''    
                   
        }    
    );
    
}
 function render(id,html){
    let component = document.getElementById(id);
    component.innerHTML = html
 }

//  function msg_request() {
  
//      let data = {
//          userId: state.user.id
//      }
 
//      let url = 'controlers/controler-list-messages.php'
//      $.post(url, data,
//          function (response) {
//              state.messageList = JSON.parse(response)
             
//              let html = '';
//             //  state.MessageList = []
//             for (let i = 0; i < state.messageList.length; i++)
//                 {
                    
//                     html += `<li>
//                         <div class="team">${state.messageList[i].team}</div>
//                         <div class="text">${state.messageList[i].text}</div>
//                         <div class="coder">from: ${state.messageList[i].from}</div>
//                         <div class="teacher">to: ${state.messageList[i].to}</div>
//                         </li>`
//                 } 
//             render('messagesList',html) 
                  
//          }    
//      );
     
//  }
 function teachers_request() {
  
    let data = {
       
    }

    let url = 'controlers/controler-list-teachers.php'
    $.post(url, data,
        function (response) {
            state.teachersList = JSON.parse(response)
           
             let html = '';
        
            for (let i = 0; i < state.teachersList.length; i++)
                {
                   
                    html += `
                        <option>${state.teachersList[i].teacherName}</option>
                        
                        `
                } 
           
            render('teachersList', html)        
        }    
    );
    
}
teachers_request();

//INTERVAL REAL TIME

function startRealTime() {
    state.realTimeInterval = setInterval (function(){
        let data = {
            userId: state.user.id
        }
    
        let url = 'controlers/controler-list-messages.php'
        $.post(url, data,
            function (response) {
                let newMessageList = JSON.parse(response)
                console.log(newMessageList)
                if (newMessageList === state.messageList)
                { return }
                html = ''
                state.messageList = newMessageList
                for (let i = 0; i < state.messageList.length; i++)
                {
                    
                    html += `<li class="message">
                    
                        <div class="team">${state.messageList[i].team}</div>
                        <div class="text">${state.messageList[i].text}</div>
                        <div class="coder">from: ${state.messageList[i].from}</div>
                        <div class="teacher">to: ${state.messageList[i].to}</div>
                        <a href="#" onClick = "deleteMsg(${state.messageList[i].id})">delete</a>
                        </li>`
                } 
            render('messagesList',html)       
            }    
        );
    }, 1000)
}

function deleteMsg(idMsg) {

    
    let data = {
       idMsg : idMsg
    }

    let url = 'controlers/controler-delete-message.php'
    $.post(url, data,
        function (response) {
                   
        }    
    );

}