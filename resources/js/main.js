var cur_page;
var cur_page_num = 0;

window.onload = function() {
    hotkey_setup();
    hammer_setup();
    background_setup();
    setup();
}

function setup() {
    var delay = 3000;
    if (!window.location.hash || window.location.hash != "#home") {
        delay = 10;
    }
    setTimeout(function () {    
        var nav_bar_items = document.getElementsByClassName("nav_bar_item");
        for (var i = 0; i < nav_bar_items.length; i++) {
            nav_bar_items[i].addEventListener("click", function(e) {
                var nav_bar_inner = document.getElementById("nav_bar_inner");
                nav_bar_inner.classList.remove("regular");
                setTimeout(function() {
                    nav_bar_inner.classList.add("display_none_xs");
                }, 500);

                var page_name = e.target.getAttribute("value");
                open_page(page_name);
            })
        }

        document.getElementById("nav_bar_mobile_button").addEventListener("click", function(e) {
            var nav_bar_inner = document.getElementById("nav_bar_inner");
            if (nav_bar_inner.offsetHeight == 0) {
                nav_bar_inner.classList.remove("display_none_xs");
                setTimeout(function() {
                    nav_bar_inner.classList.add("regular");
                }, 10);
            } else {
                nav_bar_inner.classList.remove("regular");
                setTimeout(function() {
                    nav_bar_inner.classList.add("display_none_xs");
                }, 500);
            }
        });

        document.getElementById("nav_bar_title").addEventListener("click", function(e) {
            open_page("home_page");
        });

        if (window.innerWidth <= 813) {
            var bg = document.getElementById("bg");
            bg.style.height = (bg.offsetHeight + 60) + "px";
        }

        var start_page = window.location.hash ? window.location.hash.split("#")[1] + "_page" : "home_page";
        document.getElementById(start_page).classList.add("transparent");

        open_page(start_page);
    }, delay);
}

function background_setup() {
    if (window.location.hash && window.location.hash != "#home") {
       document.getElementById("bg").style.backgroundImage = "url('resources/media/bg.png')";
       return;
    }
    // setTimeout(function() {
    //     document.getElementById("nav_bar").classList.remove("transparent");
    //     document.getElementById("nav_bar").classList.remove("move_up");
    // }, 100);
    document.getElementById("bg").style.backgroundImage = "url('resources/media/bg.gif')";
    setTimeout(function () {
       document.getElementById("bg").style.backgroundImage = "url('resources/media/bg.png')";
    }, 5000)
}

function hotkey_setup() {
    document.body.addEventListener("keyup", function(e) {
        if (e.keyCode == 37) {
            open_page(cur_page_num - 1);
        } else if (e.keyCode == 39) {
            open_page(cur_page_num + 1);
        }
    });
}

function hammer_setup() {
    if (!isMobile()) {
        return;
    }
    var hammertime = new Hammer(document.body);
    hammertime.on('swiperight', function(e) {
        open_page(cur_page_num - 1, true);
    });
    hammertime.on('swipeleft', function(e) {
        open_page(cur_page_num + 1, true);
    });
}

function open_page(page_val) {
    var page_name = page_val;
    var pages = document.getElementsByClassName("page");

    if (!isNaN(page_val)) {
        if (page_val < 0 || page_val >= 5) {
            return;
        }
        page_name = pages[page_val].id;
    }
    if (cur_page == page_name) {
        return;
    }

    if (page_name == "home_page") {
        document.getElementById("nav_bar").classList.remove("mini-nav");
    } else {
        document.getElementById("nav_bar").classList.add("mini-nav");
    }

    var page = document.getElementById(page_name);
    var index = parseInt(page.getAttribute("index"));
    var nav_bar_items = document.getElementsByClassName("nav_bar_item");
    cur_page = page_name;
    cur_page_num = index;
    document.getElementById("content").classList.add("hide_over_x");

    for (var i = 0; i < pages.length; i++) {
        if (i < index) {
            pages[i].style.transform = "translateX(-" + window.innerWidth + "px)";
        } else if (i > index) {
            pages[i].style.transform = "translateX(" + window.innerWidth + "px)";
        }
    }

    for (var i = 0; i < nav_bar_items.length; i++) {
        nav_bar_items[i].classList.remove("selected");
    }

    setTimeout(function() {
        for (var i = 0; i < pages.length; i++) {
            if (index != i) {
                pages[i].classList.add("display_none");
                if (i < index) {
                    pages[i].style.transform = "translateX(-" + window.innerWidth + "px)";
                } else if (i > index) {
                    pages[i].style.transform = "translateX(" + window.innerWidth + "px)";
                }
            }
        }
        // window.scrollTo(0,0);

        for (var i = 0; i < nav_bar_items.length; i++) {
            nav_bar_items[i].classList.remove("selected");
        }
        document.getElementById(page_name + "_nav_item").classList.add("selected");

        page.classList.remove("display_none");
        setTimeout(function() {
            document.getElementById("nav_bar").classList.remove("transparent");
            document.getElementById("nav_bar").classList.remove("move_up");
            page.style.transform = "";
            page.classList.remove("transparent");
        }, 50);
    }, 500);

    window.location.hash = "#" + page_name.split("_page")[0];
}

function isMobile() {
    var check = false;
    (function(a){if(/(android|bb\d+|meego|ipad|playbook|silk).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4)))check = true})(navigator.userAgent||navigator.vendor||window.opera);
    return check;
}
