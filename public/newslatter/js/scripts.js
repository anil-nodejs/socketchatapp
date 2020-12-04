// newslatter script
$(document).ready(function () {

    var _url = "newslatter";
    var user_id;
    $.ajax({
        url: _url,
        type: "POST",
        data: {
            "action": "create_user"
        },
        success: (function (data) {
            user_id = data;
            console.log(user_id);

        })
    });
    var delay = 300; // milliseconds
    var cookie_expire = 0; // days

    var cookie = localStorage.getItem("list-builder");
    console.log("set cookies - " + cookie);
    var final_cookie_expire = ++cookie_expire;

    if (cookie == undefined || cookie == null) {
        cookie = 0;
    }

    if (((new Date()).getTime() - cookie) / (1000 * 60 * 60 * 24) > final_cookie_expire) {
        $("#list-builder").delay(delay).fadeIn("fast", () => {
            $("#popup-box").fadeIn("fast", () => { });
        });
        $("button[name=subscribe]").click(() => {

            $(".err").html("");
            var email = String(document.getElementById("email").value);
            var regex = /^([a-zA-Z0-9_\.\-\+])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2, 4})+$/;
            if (!regex.test(email)) {
                $("#eerror").html("Please enter the valid email id.");
                return;
            }

            $.ajax({
                url: _url,
                type: "POST",
                data: {
                    "user_id": user_id,
                    "action": "subscriber",
                    "email": email,
                    "source": "California Burrito"
                },
                success: (function (data) {
                    console.log(data);
                    $("#popup-box-content").show();
                    $("#email").hide();
                    $("#submit").hide();
                    $("#thanksmsg").show();



                })
            });
        });

        $("#popup-close").click(() => {
            $("#list-builder, #popup-box").hide();
            localStorage.setItem("list-builder", (new Date()).getTime());
        });
    }

});