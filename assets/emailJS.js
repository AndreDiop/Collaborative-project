// PLEASE DO NOT INSERT THIS INTO THE WORKING CODE UNTIL WE ABSOLUTELY NEED IT
// THERE IS A MONTHLY CAP ON EMAILS I CAN SEND WITH THIS ACCOUNT OF 200
// WE'LL USE THEM VERY QUICKLY IF WE'RE NOT CAREFUL!
function sendEmail() {
var data = {
    service_id: 'default_service',
    template_id: 'template_rhcuybo',
    user_id: 'user_C4TQau4eepfDVHoV7waFq',
    template_params: {
        "message": lastLog,


    }
    
};
 
$.ajax('https://api.emailjs.com/api/v1.0/email/send', {
    type: 'POST',
    data: JSON.stringify(data),
    contentType: 'application/json'
}).done(function() {
    alert('Your mail is sent!');
}).fail(function(error) {
    alert('Oops... ' + JSON.stringify(error));
})
};