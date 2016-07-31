var cur_page;
var cur_page_num = 0;

window.onload = function() {
    hotkey_setup();
    hammer_setup();
    setup();
}

function setup() {
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
    })

    if (window.innerWidth <= 813) {
        var bg = document.getElementById("bg");
        bg.style.height = (bg.offsetHeight + 60) + "px";
    }

    open_page("home_page");
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
    var hammertime = new Hammer(document.body);
    hammertime.on('swipeleft', function(e) {
        open_page(cur_page_num - 1);
    });
    hammertime.on('swiperight', function(e) {
        open_page(cur_page_num + 1);
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

    for (var i = 0; i < pages.length; i++) {
        if (window.innerWidth > 813) {
            if (i < index) {
                pages[i].style.transform = "translateX(-" + window.innerWidth + "px)";
            } else if (i > index) {
                pages[i].style.transform = "translateX(" + window.innerWidth + "px)";
            }
        } else {
            pages[i].classList.add("transparent");
        }
    }

    for (var i = 0; i < nav_bar_items.length; i++) {
        nav_bar_items[i].classList.remove("selected");
    }

    setTimeout(function() {
        for (var i = 0; i < pages.length; i++) {
            if (index != i) {
                pages[i].classList.add("display_none");
                if (window.innerWidth > 813) {
                    if (i < index) {
                        pages[i].style.transform = "translateX(-" + window.innerWidth + "px)";
                    } else if (i > index) {
                        pages[i].style.transform = "translateX(" + window.innerWidth + "px)";
                    }
                }
            }
        }

        for (var i = 0; i < nav_bar_items.length; i++) {
            nav_bar_items[i].classList.remove("selected");
        }
        document.getElementById(page_name + "_nav_item").classList.add("selected");

        page.classList.remove("display_none");
        setTimeout(function() {
            page.style.transform = "";
            page.classList.remove("transparent");
        }, 50);
    }, 500);
}
