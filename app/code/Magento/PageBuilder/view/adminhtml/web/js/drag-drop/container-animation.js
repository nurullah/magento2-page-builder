/*eslint-disable */
define(["jquery", "uiEvents", "underscore"], function (_jquery, _uiEvents, _underscore) {
  /**
   * Copyright © Magento, Inc. All rights reserved.
   * See COPYING.txt for license details.
   */

  /**
   * Animation time in ms for container animations
   *
   * @type {number}
   */
  var animationTime = 350;
  /**
   * Lock the containers min height to it's current height, not allowing the height to change when the content does
   *
   * @param {JQuery} element
   * @returns {boolean}
   */

  function lockContainerHeight(element) {
    if (element[0].style.minHeight === "") {
      element.css({
        minHeight: element.height(),
        transition: "min-height " + animationTime + "ms ease-in-out"
      });
      return true;
    }

    return false;
  }
  /**
   * Animate the containers height to it's actual height
   *
   * @param {boolean} containerLocked
   * @param {ContentType} block
   * @param {JQuery} element
   */


  function bindAfterRenderForAnimation(containerLocked, block, element) {
    if (containerLocked) {
      // Wait for mount then animate the container
      var ns = block.id + ".afterRender.container.animate";

      _uiEvents.on("contentType:afterRender", function (args) {
        if (args.contentType.parent === block.parent) {
          animateContainerHeight(true, element);

          _uiEvents.off(ns);
        }
      }, ns);
    } else if (element[0] && element[0].style.transition !== "") {
      element.css({
        minHeight: "",
        transition: ""
      });
    }
  }
  /**
   * Animate the container height to the new value
   *
   * @param {boolean} containerLocked
   * @param {JQuery} element
   */


  function animateContainerHeight(containerLocked, element) {
    if (containerLocked) {
      _underscore.defer(function () {
        element.css({
          minHeight: getContainerActualHeight(element)
        }); // Remove the properties after a delay longer than the animation time

        _underscore.delay(function () {
          element.css({
            minHeight: "",
            transition: ""
          });
          cleanupClones();
        }, animationTime + 150);
      });
    } else if (element[0] && element[0].style.transition !== "") {
      element.css({
        minHeight: "",
        transition: ""
      });
      cleanupClones();
    }
  }
  /**
   * Make a clone of the container and remove the forced min height to determine it's actual height
   *
   * @param {JQuery} element
   * @returns {number}
   */


  function getContainerActualHeight(element) {
    var clone = element.clone().css({
      minHeight: "",
      position: "absolute",
      left: "-99999px"
    }).addClass("container-height-clone");
    element.parent().append(clone);
    var height = clone.height();
    clone.remove();
    return height;
  }
  /**
   * Clean up any left over clone elements
   */


  function cleanupClones() {
    if ((0, _jquery)(".container-height-clone").length) {
      (0, _jquery)(".container-height-clone").remove();
    }
  }

  return {
    lockContainerHeight: lockContainerHeight,
    bindAfterRenderForAnimation: bindAfterRenderForAnimation,
    animateContainerHeight: animateContainerHeight,
    animationTime: animationTime
  };
});
//# sourceMappingURL=container-animation.js.map