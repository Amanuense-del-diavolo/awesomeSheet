var clone = (function() {

  function _newConsumable() {
    var timeStamp = Date.now();
    var cloneString =
      '<div class="row">' +
      '<div class="col-xs-8">' +
      '<div class="input-block">' +
      '<label class="input-label" for="input-item-' + timeStamp + '">Item</label>' +
      '<input class="input-field input-item" id="input-item-' + timeStamp + '" type="text" tabindex="3">' +
      '</div>' +
      '</div>' +
      '<div class="col-xs-4">' +
      '<div class="row no-gutter">' +
      '<div class="col-xs-6">' +
      '<div class="input-block">' +
      '<label class="input-label" for="input-total-' + timeStamp + '">Total</label>' +
      '<input class="input-field consumable-total input-total" id="input-total-' + timeStamp + '" type="number" tabindex="3">' +
      '</div>' +
      '</div>' +
      '<div class="col-xs-6">' +
      '<div class="input-block">' +
      '<label class="input-label" for="input-used-' + timeStamp + '">Used</label>' +
      '<input class="input-field consumable-used input-used" id="input-used-' + timeStamp + '" type="number" tabindex="3">' +
      '</div>' +
      '</div>' +
      '</div>' +
      '</div>' +
      '<div class="col-xs-12">' +
      '<div class="consumable-counts clearfix"></div>' +
      '<div class="clone-delete-controls">' +
      '<button class="button button-primary button-small button-icon" tabindex="3"><span class="icon-close"></span> Remove</button>' +
      '</div>' +
      '</div>' +
      '</div>';
    return cloneString;
  };

  function _newAttack() {
    var timeStamp = Date.now();
    var cloneString =
      '<div class="row no-gutter">' +
      '<div class="col-xs-6 col-md-4">' +
      '<div class="input-block">' +
      '<label class="input-label" for="input-weapon-' + timeStamp + '">Weapon</label>' +
      '<input class="input-field input-weapon" id="input-weapon-' + timeStamp + '" type="text" tabindex="3">' +
      '</div>' +
      '</div>' +
      '<div class="col-xs-3 col-md-2">' +
      '<div class="input-block">' +
      '<label class="input-label" for="input-attack-' + timeStamp + '">Attack</label>' +
      '<input class="input-field input-attack" id="input-attack-' + timeStamp + '" type="text" tabindex="3">' +
      '</div>' +
      '</div>' +
      '<div class="col-xs-3 col-md-2">' +
      '<div class="input-block">' +
      '<label class="input-label" for="input-damage-' + timeStamp + '">Damage</label>' +
      '<input class="input-field input-damage" id="input-damage-' + timeStamp + '" type="text" tabindex="3">' +
      '</div>' +
      '</div>' +
      '<div class="col-xs-4 col-md-1">' +
      '<div class="input-block">' +
      '<label class="input-label" for="input-range-' + timeStamp + '">Range</label>' +
      '<input class="input-field input-range" id="input-range-' + timeStamp + '" type="text" tabindex="3">' +
      '</div>' +
      '</div>' +
      '<div class="col-xs-4 col-md-1">' +
      '<div class="input-block">' +
      '<label class="input-label" for="input-ammo-' + timeStamp + '">Ammo</label>' +
      '<input class="input-field input-ammo" id="input-ammo-' + timeStamp + '" type="text" tabindex="3">' +
      '</div>' +
      '</div>' +
      '<div class="col-xs-4 col-md-2">' +
      '<div class="input-block">' +
      '<label class="input-label" for="input-critical-' + timeStamp + '">Critical</label>' +
      '<input class="input-field input-critical" id="input-critical-' + timeStamp + '" type="text" tabindex="3">' +
      '</div>' +
      '</div>' +
      '<div class="col-xs-12 col-md-2">' +
      '<div class="clone-delete-controls">' +
      '<button class="button button-primary button-small button-icon" id="remove-attack" tabindex="3"><span class="icon-close"></span> Remove</button>' +
      '</div>' +
      '</div>' +
      '</div>';
    return cloneString;
  };

  function _minMaxCountLimit(input) {
    if (input.value <= 0) {
      input.value = "";
    } else if (input.value >= 100) {
      input.value = 100;
    };
  };

  var _bind_cloneControls = (function() {
    var consumableCloneAdd = helper.e(".consumable .clone-add");
    var consumableCloneRemove = helper.e(".consumable .clone-remove");
    var attackCloneAdd = helper.e(".attack .clone-add");
    var attackCloneRemove = helper.e(".attack .clone-remove");
    consumableCloneAdd.addEventListener("click", function() {
      _render_clone([{ item: "", total: "", used: "" }], "consumable");
      _updateCloneConsumable();
      snack.render("Consumable added.", false, false);
      sheet.storeCharacters();
    }, false);
    consumableCloneRemove.addEventListener("click", function() {
      _changeCloneState("consumable");
      _updateCloneConsumable();
      sheet.storeCharacters();
    }, false);
    attackCloneAdd.addEventListener("click", function() {
      _render_clone([{ weapon: "", attack: "", damage: "", critical: "", ammo: "", range: "" }], "attack");
      _updateCloneAttack();
      snack.render("Attack added.", false, false);
      sheet.storeCharacters();
    }, false);
    attackCloneRemove.addEventListener("click", function() {
      _changeCloneState("attack");
      _updateCloneAttack();
      sheet.storeCharacters();
    }, false);
  })();

  function _bind_cloneRemoveButton(button, cloneType) {
    button.addEventListener("click", function() {
      _destroy_clone(this, cloneType);
      _updateCloneAttack();
      _updateCloneConsumable();
      sheet.storeCharacters();
      if (cloneType == "consumable") {
        _checkCloneCount("consumable");
       snack.render("Consumable removed.", false, false);
      };
      if (cloneType == "attack") {
        _checkCloneCount("attack");
        snack.render("Attack removed.", false, false);
      };
    }, false);
  };

  function _bind_cloneAttackInput(array) {
    for (var i = 0; i < array.length; i++) {
      var input = array[i].querySelector(".input-field");
      input.addEventListener("input", function() {
        _updateCloneAttack();
        _minMaxCountLimit(this);
        sheet.storeCharacters();
        inputBlock.focus(this);
      }, false);
      input.addEventListener("focus", function() {
        _updateCloneAttack();
        _minMaxCountLimit(this);
        sheet.storeCharacters();
        inputBlock.focus(this);
      }, false);
      input.addEventListener("blur", function() {
        _updateCloneAttack();
        _minMaxCountLimit(this);
        sheet.storeCharacters();
        inputBlock.focus(this);
      }, false);
    };
  };

  function _bind_cloneConsumableInput(array) {
    for (var i = 0; i < array.length; i++) {
      var input = array[i].querySelector(".input-field");
      input.addEventListener("input", function() {
        _updateCloneConsumable();
        _minMaxCountLimit(this);
        consumable.render();
        consumable.update();
        sheet.storeCharacters();
        inputBlock.focus(this);
      }, false);
      input.addEventListener("focus", function() {
        _updateCloneConsumable();
        _minMaxCountLimit(this);
        consumable.render();
        consumable.update();
        sheet.storeCharacters();
        inputBlock.focus(this);
      }, false);
      input.addEventListener("blur", function() {
        _updateCloneConsumable();
        _minMaxCountLimit(this);
        consumable.render();
        consumable.update();
        sheet.storeCharacters();
        inputBlock.focus(this);
      }, false);
    };
  };

  function _changeCloneState(cloneType) {
    var cloneBlock = helper.e("." + cloneType);
    var cloneControls = cloneBlock.querySelector(".clone-controls");
    var cloneRemove = cloneControls.querySelector(".clone-remove");
    var cloneDeleteControls = cloneBlock.querySelectorAll(".clone-delete-controls");
    var cloneTarget = cloneBlock.querySelector(".clone-target");
    var all_clone = cloneTarget.querySelectorAll(".clone");
    var cloneCount = all_clone.length;
    // change clone remove button
    helper.toggleClass(cloneRemove, "active");
    helper.toggleClass(cloneRemove, "button-primary");
    helper.toggleClass(cloneRemove, "button-secondary");
    // change clone block state
    if (cloneBlock.dataset.deleteCloneState == "true") {
      helper.removeClass(cloneBlock, "delete-state");
      cloneBlock.dataset.deleteCloneState = "false";
    } else if (cloneBlock.dataset.deleteCloneState == "false") {
      helper.addClass(cloneBlock, "delete-state");
      cloneBlock.dataset.deleteCloneState = "true";
    };
    // if clone count us 0 remove restore all classes to normal
    if (cloneCount == 0) {
      helper.removeClass(cloneBlock, "delete-state");
      cloneBlock.dataset.deleteCloneState = "false";
      helper.removeClass(cloneRemove, "active");
      helper.removeClass(cloneRemove, "button-primary");
      helper.addClass(cloneRemove, "button-secondary");
    };
  };

  function _checkCloneCount(cloneType) {
    var cloneBlock = helper.e("." + cloneType);
    var cloneControls = cloneBlock.querySelector(".clone-controls");
    var cloneRemove = cloneControls.querySelector(".clone-remove");
    var cloneDeleteControls = cloneBlock.querySelectorAll(".clone-delete-controls");
    var cloneTarget = cloneBlock.querySelector(".clone-target");
    var all_clone = cloneTarget.querySelectorAll(".clone");
    var cloneCount = all_clone.length;
    if (cloneCount == 0) {
      cloneBlock.dataset.deleteCloneState = "false";
      helper.removeClass(cloneBlock, "delete-state");
      helper.removeClass(cloneRemove, "active");
      helper.removeClass(cloneRemove, "button-primary");
      helper.addClass(cloneRemove, "button-secondary");
    };
  };

  function _destroy_clone(element, cloneType) {
    var cloneBlock = helper.getClosest(element, ".clone-block");
    var cloneTarget = cloneBlock.querySelector(".clone-target");
    var cloneToRemove = helper.getClosest(element, ".clone");
    cloneToRemove.remove();
  };

  function _render_clone(array, cloneType) {
    var cloneBlock = helper.e("." + cloneType);
    var cloneTarget = cloneBlock.querySelector(".clone-target");
    for (var i = 0; i < array.length; i++) {
      var cloneCount = cloneTarget.querySelectorAll(".clone").length;
      var cloneObject = array[i];
      var newNode = document.createElement("div");
      var cloneString;
      if (cloneType == "consumable") {
        cloneString = _newConsumable();
      };
      if (cloneType == "attack") {
        cloneString = _newAttack();
      };
      newNode.setAttribute("class", "clone");
      newNode.innerHTML = cloneString;
      if (cloneCount <= 99) {
        cloneTarget.appendChild(newNode);
        if (cloneType == "consumable") {
          _bind_cloneConsumableInput(newNode.querySelectorAll(".input-block"));
        };
        if (cloneType == "attack") {
          _bind_cloneAttackInput(newNode.querySelectorAll(".input-block"));
        };
        _bind_cloneRemoveButton(newNode.querySelector(".clone-delete-controls button"), cloneType);
      };
      for (var j in array[i]) {
        newNode.querySelector(".input-" + j.replace(/_/g, "-")).value = array[i][j];
      };
    };
  };

  function _createAttackObject(weapon, attack, damage, critical, ammo, range) {
    return {
      weapon: this.weapon = weapon,
      attack: this.attack = attack,
      damage: this.damage = damage,
      critical: this.critical = critical,
      ammo: this.ammo = ammo,
      range: this.range = range
    };
  };

  function _createConsumableObject(item, total, used) {
    return {
      item: this.item = item,
      total: this.total = total,
      used: this.used = used
    };
  };

  function _updateCloneAttack() {
    var cloneBlock = helper.e(".clone-block.attack");
    var cloneTarget = cloneBlock.querySelector(".clone-target");
    var all_clone = cloneTarget.querySelectorAll(".clone");
    var cloneAttack = [];
    for (var i = 0; i < all_clone.length; i++) {
      var weapon = all_clone[i].querySelector(".input-weapon").value || "";
      var attack = all_clone[i].querySelector(".input-attack").value || "";
      var damage = all_clone[i].querySelector(".input-damage").value || "";
      var critical = all_clone[i].querySelector(".input-range").value || "";
      var ammo = all_clone[i].querySelector(".input-ammo").value || "";
      var range = all_clone[i].querySelector(".input-critical").value || "";
      var newAttack = new _createAttackObject(weapon, attack, damage, critical, ammo, range);
      cloneAttack.push(newAttack);
    };
    sheet.allCharacters[sheet.currentCharacterIndex].clone.attack = cloneAttack;
  };

  function _updateCloneConsumable() {
    var cloneBlock = helper.e(".clone-block.consumable");
    var cloneTarget = cloneBlock.querySelector(".clone-target");
    var all_clone = cloneTarget.querySelectorAll(".clone");
    var cloneConsumable = [];
    for (var i = 0; i < all_clone.length; i++) {
      var item = all_clone[i].querySelector(".input-item").value || "";
      var total = all_clone[i].querySelector(".input-total").value || "";
      var used = all_clone[i].querySelector(".input-used").value || "";
      var newConsumable = new _createConsumableObject(item, total, used);
      cloneConsumable.push(newConsumable);
    };
    sheet.allCharacters[sheet.currentCharacterIndex].clone.consumable = cloneConsumable;
  };

  function render() {
    // build an array of clone objects
    var all_attack = [];
    var all_consumable = [];
    // iterate over all objects keys to find clones then push those values to all_attack
    if (sheet.allCharacters[sheet.currentCharacterIndex].clone.attack) {
      for (var i in sheet.allCharacters[sheet.currentCharacterIndex].clone.attack) {
        all_attack.push(sheet.allCharacters[sheet.currentCharacterIndex].clone.attack[i]);
      };
    };
    // iterate over all objects keys to find clones then push those values to all_consumable
    if (sheet.allCharacters[sheet.currentCharacterIndex].clone.consumable) {
      for (var i in sheet.allCharacters[sheet.currentCharacterIndex].clone.consumable) {
        all_consumable.push(sheet.allCharacters[sheet.currentCharacterIndex].clone.consumable[i]);
      };
    };
    _render_clone(all_attack, "attack");
    _render_clone(all_consumable, "consumable");
  };

  // exposed methods
  return {
    render: render
  };

})();
