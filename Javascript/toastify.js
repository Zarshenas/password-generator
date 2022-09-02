function toastifyJs ( toastText, toastDuration ,firstColor , secondColor) {
    return Toastify({
        text: toastText,
        className: "info",
        duration: toastDuration,
        newWindow: true,
        close: true,
        gravity: "top", 
        position: "right",
        stopOnFocus: true,
        style: {
            background: `linear-gradient(to right, ${firstColor}, ${secondColor})`,
        },
        onClick: function(){} // Callback after click  "Select at least one of the settings below"
    }).showToast();
}
export default toastifyJs;