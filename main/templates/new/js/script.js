const Login = document.querySelector(".__Login"),
    Reg = document.querySelector(".__Reg"),
    modalLogin = document.querySelector(".__modalLogin"),
    modalReg = document.querySelector(".__modalReg"),
    wrap = document.querySelector(".__wrap"),
    clicker = document.querySelector(".__clicker");
    if (Reg) { Reg.addEventListener("click", openModal); } if (Login) { Login.addEventListener("click", openModal) }
clicker.addEventListener("click", closeModal);

function openModal() {
    let a = document.querySelector(`.auth-block[data-id="${this.dataset.id}"]`);
    a.classList.add("auth-block_active"), wrap.style.filter = "blur(5px)", clicker.style.display = "flex"
}

function closeModal() {
    let a = document.querySelector(".auth-block_active");
    null !== a && (a.classList.remove("auth-block_active"), console.log("closed"), wrap.style.filter = "blur(0px)", clicker.style.display = "none")
}
const buttonFunc = document.querySelectorAll(".__funcButton"),
    modalFunc = document.querySelectorAll(".__funcModal");
buttonFunc.forEach(a => {
    a.addEventListener("click", openModal_func)
}), clicker.addEventListener("click", closeModal_func);

function openModal_func() {
    let a = document.querySelector(`.func-modal[data-id="${this.dataset.id}"]`);
    a.classList.add("func-modal_active"), wrap.style.filter = "blur(5px)", clicker.style.display = "flex"
}

function closeModal_func() {
    let a = document.querySelector(".func-modal_active");
    null !== a && (a.classList.remove("func-modal_active"), console.log("closed"), wrap.style.filter = "blur(0px)", clicker.style.display = "none")
}

function openTap() {
    let a = document.querySelector(`.__tab[data-id="${this.dataset.id}"]`),
        b = document.querySelector(".account-content_active"),
        c = document.querySelector(".aside__button_active");
    c.classList.remove("aside__button_active"), this.classList.add("aside__button_active"), b.classList.remove("account-content_active"), a.classList.add("account-content_active")
}
const linkTab = document.querySelectorAll(".__tabLink");
linkTab.forEach(a => {
    a.addEventListener("click", openTap)
});
const linkReset = document.querySelector(".__resetLink");
if (null !== linkReset) {
    linkReset.addEventListener("click", function() {
        let c = document.querySelector(`.__modalReset`);
        c.classList.add("func-modal_active"), wrap.style.filter = "blur(5px)", clicker.style.display = "flex"
    }), clicker.addEventListener("click", function() {
        let c = document.querySelector(".func-modal_active");
        null !== c && (c.classList.remove("func-modal_active"), console.log("closed"), wrap.style.filter = "blur(0px)", clicker.style.display = "none")
    })
}
/*const instButton = document.querySelectorAll(".__instButton");
if (null !== instButton) {
    function b() {
        let c = document.querySelector(`.__modalInst[data-id="${this.dataset.id}"]`);
        c.classList.add("auth-block_active"), wrap.style.filter = "blur(5px)", clicker.style.display = "flex"
    }
    instButton.forEach(c => {
        c.addEventListener("click", b)
    }), clicker.addEventListener("click", function() {
        let c = document.querySelector(".account-content_active");
        null !== c && (c.classList.remove("account-content_active"), console.log("closed"), wrap.style.filter = "blur(0px)", clicker.style.display = "none")
    })
}*/
$(document).ready(function(){

    $("#auth").submit(function(){

        var login       = $(this).find('.login').val();
        var password    = $(this).find('.password').val();
        var recaptcha   = $(this).find('.g-recaptcha').attr('data-widget-id');
        var response    = grecaptcha.getResponse(recaptcha);

        var sendData = { login: login , password: password, captcha: response};

        $.ajax ({
            type: 'POST',
            url: "/auth/login/",
            data: sendData,
            dataType: 'json',
            success: function(data)
                {
                    if(data['status'] == 1){
                        sendAlert(true, data['message']);
                        setTimeout(function(){
                            //window.location.reload();
                            window.location.href = "/profile/";
                        }, 1000);
                    }else{
                        grecaptcha.reset(recaptcha);
                        sendAlert(false, data['message']);
                    }
                }
        });
        return false;
    });
    $("#reg").submit(function(){

        var login       = $(this).find('.login').val();
        var email       = $(this).find('.email').val();
        var password    = $(this).find('.password').val();
        var password2   = $(this).find('.password2').val();
        var recaptcha   = $(this).find('.g-recaptcha').attr('data-widget-id');
        var response    = grecaptcha.getResponse(recaptcha);

        var sendData = {
            login:      login,
            email:      email,
            password:   password,
            password2:  password2,
            captcha:    response,
        };

        $.ajax ({
            type: 'POST',
            url: "/auth/register/",
            data: sendData,
            dataType: 'json',
            success: function(data)
                {
                    if(data['status'] == 1){
                        sendAlert(true, data['message']);
                        setTimeout(function(){
                            //window.location.reload();
                            window.location.href = "/profile/";
                        }, 1000);
                    }else{
                        grecaptcha.reset(recaptcha);
                        sendAlert(false, data['message']);
                    }
                }
        });
        return false;
    });
});

function sendAlert(type, message){
    switch (type) {
        case false: type = 'danger';   break;
        case true:  type = 'success';  break;
        default:    type = 'error';    break;
    }

    $(".alerts").append(
        "<div class='alert " + type + "' role='alert'>" +
            "<i class='far fa-times-circle'></i>" +
            "<p>" + message + "</p>" +
        "</div>"
    );
    removeAlert();
}
function removeAlert(){
    var GetLastAlert = $('.alerts .alert').last();
    setTimeout(function(){GetLastAlert.slideUp(500);}, 4000);
    setTimeout(function(){GetLastAlert.remove();}, 4500);

}
function locationTo(locatio) {
	return window.location.href=locatio;
}