var popup_open_delay;
var popup_transition;

function popup_setup() {
    mouse_over_setup(document.getElementById("starry_text"), "url('resources/media/starry_night.jpg')");
    mouse_over_setup(document.getElementById("project_img_pic2paint"), "url('resources/media/pic2paint_pic.gif')");
    mouse_over_setup(document.getElementById("project_img_kweri"), "url('resources/media/kweri_pic.png')");
    mouse_over_setup(document.getElementById("project_img_freespace"), "url('resources/media/freespace_pic.png')");

    if (window.innerWidth <= 813) {
        document.body.addEventListener("click", function(e) {
            if (!document.getElementById("popup").classList.contains("display_none")) {
                // popup_close();
            }
        });
    }
}

function mouse_over_setup(elt, bg) {
    // Better mouseover, delay, popup, disappear on move
    elt.addEventListener("mousemove", function(e) {
        popup_close();
        clearTimeout(popup_open_delay);
        popup_open_delay = setTimeout(function() {
            var args = {
                bgImg: bg
            }
            popup_open(args);
        }, 100);
    });
    elt.addEventListener("mouseleave", function(e) {
        popup_close();
        clearTimeout(popup_open_delay);;
    });
}

function popup_open(args) {
    args.bgImg = args.bgImg || "";

    var popup = document.getElementById("popup");
    popup.style.backgroundImage = args.bgImg;
    document.getElementById("all").classList.add("blur");
    popup.classList.remove("display_none");
    clearTimeout(popup_transition);
    popup_transition = setTimeout(function() {
        popup.classList.remove("transparent");
    }, 10);
}

function popup_close() {
    var popup = document.getElementById("popup");
    if (!popup.classList.contains("display_none")) {
    document.getElementById("all").classList.remove("blur");
    popup.classList.add("transparent");
        clearTimeout(popup_transition);
        popup_transition = setTimeout(function() {
            popup.classList.add("display_none");
        }, 500);
    }
}