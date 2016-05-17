var modal = (function() {

  var previousModal = null;
  var previousModalShade = null;

  function destroy() {
    var modal = helper.e(".js-modal");
    var modalShade = helper.e(".js-modal-shade");
    if (modal) {
      getComputedStyle(modal).opacity;
      helper.removeClass(modal, "is-unrotate");
      helper.removeClass(modal, "is-opaque");
      helper.addClass(modal, "is-transparent");
    };
    if (modalShade) {
      getComputedStyle(modalShade).opacity;
      helper.removeClass(modalShade, "is-opaque");
      helper.addClass(modalShade, "is-transparent");
    };
  };

  function render(modalBodyContent, action) {

    var body = helper.e("body");

    // make new shade
    var modalShade = document.createElement("div");
    modalShade.setAttribute("class", "m-modal-shade js-modal-shade");
    modalShade.destroy = function() {
      helper.removeClass(modalShade, "is-opaque");
      helper.addClass(modalShade, "is-transparent");
    };

    var modal = document.createElement("div");
    modal.setAttribute("class", "m-modal js-modal");
    modal.destroy = function() {
      helper.removeClass(modal, "is-unrotate");
      helper.removeClass(modal, "is-opaque");
      helper.addClass(modal, "is-transparent");
    };

    var modalBody = document.createElement("div");
    modalBody.setAttribute("class", "m-modal-body u-clearfix");

    var modalControls = document.createElement("div");
    modalControls.setAttribute("class", "m-modal-controls");

    var modalWrapper = document.createElement("div");
    modalWrapper.setAttribute("class", "m-modal-wrapper");

    var okButton = document.createElement("a");
    okButton.setAttribute("href", "javascript:void(0)");
    okButton.setAttribute("tabindex", "3");
    okButton.setAttribute("class", "button button-primary button-block button-large");
    okButton.textContent = "OK";

    modalControls.appendChild(okButton);

    if (modalBodyContent) {
      modalBody.appendChild(modalBodyContent);
      modalWrapper.appendChild(modalBody);
    };

    modalWrapper.appendChild(modalControls);
    modal.appendChild(modalWrapper);

    modal.addEventListener("transitionend", function(event, elapsed) {
      if (event.propertyName === "opacity" && getComputedStyle(this).opacity == 0) {
        this.parentElement.removeChild(this);
      };
    }.bind(modal), false);

    modalShade.addEventListener("transitionend", function(event, elapsed) {
      if (event.propertyName === "opacity" && getComputedStyle(this).opacity == 0) {
        this.parentElement.removeChild(this);
      };
    }.bind(modalShade), false);

    okButton.addEventListener("click", destroy, false);
    modalShade.addEventListener("click", destroy, false);

    if (previousModal) {
      previousModal.destroy();
    };

    if (previousModalShade) {
      previousModalShade.destroy();
    };

    previousModal = modal;
    previousModalShade = modalShade;

    body.appendChild(modalShade);
    body.appendChild(modal);

    getComputedStyle(modal).opacity;
    getComputedStyle(modalShade).opacity;
    helper.removeClass(modal, "is-transparent");
    helper.addClass(modal, "is-opaque");
    helper.addClass(modal, "is-unrotate");
    helper.removeClass(modalShade, "is-transparent");
    helper.addClass(modalShade, "is-opaque");

  };

  return {
    render: render
  };

})();
