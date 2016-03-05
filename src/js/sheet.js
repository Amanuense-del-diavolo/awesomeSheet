var sheet = (function() {

  var singleNewCharacter = [{
    clone: {},
    input: {},
    textarea: {},
    spells: []
  }];

  var allCharacters = singleNewCharacter;
  var currentCharacterIndex = 0;

  var saveAllCharacters = (function() {
    if (read("allCharacters")) {
      allCharacters = JSON.parse(read("allCharacters"));
    } else {
      if (typeof hardCodedCharacters !== "undefined") {
        allCharacters = hardCodedCharacters.load;
      };
    };
    storeCharacters();
    // console.log("laoded Character is " + allCharacters[currentCharacterIndex].input.name);
    // console.log("laoded Character index is " + currentCharacterIndex);
    // console.log(allCharacters);
  })();

  function storeCharacters() {
    store("allCharacters", JSON.stringify(allCharacters));
    // console.log(allCharacters);
  };

  function store(key, data) {
    if (localStorage.getItem) {
      localStorage.setItem(key, data);
    };
  };

  function remove(key) {
    if (localStorage.getItem) {
      localStorage.removeItem(key);
    };
  };

  function read(key) {
    if (localStorage.getItem(key) == "") {
      localStorage.removeItem(key);
    } else if (localStorage.getItem(key)) {
      return localStorage.getItem(key);
    };
  };

  function destroy() {
    localStorage.clear();
    prompt.destroy();
    snack.destroy();
    document.location.reload(true);
  };

  // function test(argument) {
  //   var allCharacterToggle = helper.eA(".character-toggle");
  //   for (var i = 0; i < allCharacterToggle.length; i++) {
  //     var icon = allCharacterToggle[i].querySelector(".icon");
  //     helper.removeClass(icon, "icon-check-box-checked");
  //     helper.addClass(icon, "icon-check-box-unchecked");
  //   };
  // };

  function clear() {
    var allInputBlock = helper.eA(".input-block");
    var allTextareaBlock = helper.eA(".textarea-block");
    var allCloneTarget = helper.eA(".clone-target");
    var allSpellsKnown = helper.eA(".spells-known");
    for (var i = 0; i < allInputBlock.length; i++) {
      var input = allInputBlock[i].querySelector(".input-field");
      helper.e("#" + input.id).value = "";
    };
    for (var i = 0; i < allTextareaBlock.length; i++) {
      helper.e("#" + allTextareaBlock[i].id).innerHTML = "";
    };
    for (var i = 0; i < allCloneTarget.length; i++) {
      allCloneTarget[i].innerHTML = "";
    };
    for (var i = 0; i < allSpellsKnown.length; i++) {
      allSpellsKnown[i].innerHTML = "";
    };
    stats.render();
    totalBlock.render();
  };

  function render() {
    clone.render();
    consumable.render();
    inputBlock.render();
    textareaBlock.render();
    stats.render();
    spells.render();
    totalBlock.render();
  };

  // exposed methods
  return {
    allCharacters: allCharacters,
    currentCharacterIndex: currentCharacterIndex,
    storeCharacters: storeCharacters,
    destroy: destroy,
    store: store,
    remove: remove,
    read: read,
    clear: clear,
    render: render
  };

})();
