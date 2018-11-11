/***************************************************
 * utility.js
 * 
 * utility functions for the EIWA 2019 SPA. 
 * Based on my old utility libe 2.04 and also
 * moved all the constants from constant.js into this file
 * as well as most of the utility functions from
 * the main controller file (eiwa2019.js).
 * 
 *   FUNCTIONS
 * - Patches (most are now unnecessary)
 * - DOM selection (phasing out the use of these functions in the other code)
 * - A basic AJAX function (old)
 * - Utility functions from constant.js and EIWA2019.js
 * 
 * functions in this module are accessed through global variable utility
 */

(function (exports) {
    
    var mod = {
        FIRST: 'first',
        SECOND: 'second',
        THIRD: 'third',
        FOURTH: 'fourth',
        NO_PICK: 'no pick',
        VERSION: '2019.1',
        PICKS_FOR: 'Picks for: ',
        PLUS: 'img/clr10x2plus.png',
        MINUS: 'img/clr10x2minus.png',
        BLOCK: 'block',
        NONE: 'none',
        HDR_PICKS: 'YOUR PICKS: ',
        HDR_SCORE: 'SCORE: ',
        HDR_TOTAL: 'TOTAL: ',
        HDR_RESULTS_2015: '2015 EIWA FINAL RESULTS: ',
        STORED_PICK: 'eiwa2019StoredPick',
        howToUse: '    HOW TO USE (no storage)    ' + 
            '\n\n1. Make picks using this page (click place number, then click wrestler name).' +  
            '\n\n2. Paste complete output from this box to the EIWA forum.' + 
            '\n\n3. After the finals, paste back the forum text, overwriting contents, and click \'Compute score\'.',
        howToUseStore: '    HOW TO USE     ' + 
            '\n\n1. Make picks using this page (click place number, then click wrestler name).' +  
            '\n\n2. Save picks to your computer using local storage by clicking \'Save Picks\'. Paste complete output from this box to the EIWA forum to make your official pick.' + 
            '\n\n3. After the finals, load picks using \'Reload From Saved Picks\' or paste back your forum text, overwriting the contents, and click \'Compute score\'.',
        newLoader: '\n\n4. After the finals, you\'ll also be able to load other fan picks using a drop-down which will appear above this text box.' +
        '\n\nClick \'Reload Current Picks\' or make a new pick to exit this screen.',
        notYet: 'After the finals you can paste the forum text back into this box (or use \'Reload Saved Picks\') and then click \'Compute Score\' to get your score.',
        noJsonSupport: 'Your browser does not support JSON. Save, reload and compute score won\'t work with this browser.',
        badInput: 'Your value in the text box is not valid.\n\nValid output begins with "Picks for: "\nand contains picks from 125 through 285.'
    };

    // *** PATCH *** //

    if (typeof String.prototype.trim !== 'function') {
        String.prototype.trim = function () {
            return this.replace(/^\s*(\S*(\s+\S+)*)\s*$/, "$1");
        };
    }

    /* polyfill for JSON is 3.5 Kb (https://bestiejs.github.io/json3/) */

    // *** SELECTION *** //

    // phasing out the use of these functions
    
    mod.gEBID = function(id) {
        return document.getElementById(id);
    };
    mod.gEBTN = function(tag, targ) {
        targ = targ || document;
        return targ.getElementsByTagName(tag);
    };
    // this still works but is unnecessary now...
    mod.gEBCN = function(className, context) {
        context = context || document;
        var els = [];
        if (typeof document.evaluate === "function") {
            var xpath = document.evaluate(".//*[ contains(concat(' ', @class, ' '), ' " + className + " ')]", context, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
            for (var i = 0; i < xpath.snapshotLength; i++) {
                els.push(xpath.snapshotItem(i));
            }
        } else {
            var nodelist = context.getElementsByTagName("*");
            patch('filter');
            nodelist.filter = Array.prototype.filter;
            var re = new RegExp('(^|\\s)' + className + '(\\s|$)');
            els = nodelist.filter(function (node) {
                return node.className.match(re);
            });
        }
        return els;
    };
    
   /**
    * Get reference to ancestor element of a certain html element type from a start element.
    * @param {tag} tag nodeName to match.
    * @param {start} start element in the DOM to begin search.
    * @return {elem} DOM element found. Stops if document element is reached.
    * replaces getAncestorBTN in 2.0.3 and earlier.
    */
    mod.gABTN = function(tag, start) {
        var par = start.parentNode;
        while (par.nodeName.toUpperCase() !== tag.toUpperCase()) {
            par = par.parentNode;
            if (par === document) {
                return document;
            }
        }
        return par;
    };
    
    // *** ATTRIBUTE-RELATED *** //

    // ditto: most browsers in 2018 will have classList.add/remove
    // also: get/set attribute won't have the old IE bugs
    
   /** 
    * Summary: add a class value to the target HTML element.
    * Source: The Javascript Anthology by Sitepoint (adapted).
    */
    mod.addClass = function(target, classValue) {
        var pattern = new RegExp("(^| )" + classValue + "( |$)");
        if (!pattern.test(target.className)) {
            if (target.className === "") {
                target.className = classValue;
            } else {
                target.className += " " + classValue;
            }
        }
        return true;
    };
    
   /** 
    * Summary: Removes a class value from the target HTML element.
    * Source: The Javascript Anthology by Sitepoint (adapted).
    * 2nd. replace removes a space at the end.
    */
    mod.removeClass = function(target, classValue) {
        var removedClass = target.className,
            pattern = new RegExp("(^| )" + classValue + "( |$)");
        removedClass = removedClass.replace(pattern, "$1");
        removedClass = removedClass.replace(/ $/, "");
        target.className = removedClass;
        return true;
    };
    
   /**
    * Summary: get or set an attribute, using a feature test to 
    * detect UAs that confuse attributes with properties (i.e. IE).
    * Source: David Mark
    * Usage: Use 'class' and 'for' as arguments for those attributes.
    * Not intended to be used with the style attribute or event handler
    * attributes, obviously.
    *
    * Note from David Mark: ~~Assuming el is an element object and has a getAttribute
    * method, what does the next statement evaluate to in standards-based browsers?
    *
    * el.getAttribute('style') && typeof(el.getAttribute('style')) === 'object'
    *
    * If it doesn't have a style attribute, the first test will return null
    * and the second test is not evaluated. If it does have one, the
    * second test will return false. So, in standards-based browsers, the
    * conjunction is always false.
    * Now consider current and past (broken) versions of IE which doesn't
    * know what attributes are (it thinks they are properties of the element
    * object). Regardless of whether the element has a style attribute, it
    * has a style property which is a non-null object, so the first test
    * always passes. Obviously the second test is always evaluated for IE
    * and always true. Therefore, the conjunction is always true.~~
    */
    mod.getAttr = function(attrName, elem) {
        if (elem.getAttribute('style') && typeof(elem.getAttribute('style')) === 'object') {
            if (attrName === 'class') { attrName = 'className'; }
            if (attrName === 'for') { attrName = 'htmlFor'; }
        }
        return elem.getAttribute(attrName);
    };

    mod.setAttr = function(attrName, attrValue, elem) {
        if (elem.getAttribute('style') && typeof(elem.getAttribute('style')) === 'object') {
            if (attrName === 'class') { attrName = 'className'; }
            if (attrName === 'for') { attrName = 'htmlFor'; }
        }
        elem.setAttribute(attrName, attrValue);
    };
    
    // *** AJAX *** //

    // old code, but I probably will keep it for 2019
    
   /**
    * Get the XML http request object.
    * @return the XML http request object, or null.  
    * Ignore ActiveX versions 4.0 and 5.0. Alternatively, we could just check
    * for 'Msxml2.XMLHTTP' and fall back.
    */
    mod.getXhr = function() {
        var xhr = null;
        if (typeof window.XMLHttpRequest !== 'undefined') {
            xhr = new XMLHttpRequest();
        } else if (typeof window.ActiveXObject !== 'undefined') { 
            var xhrVersions = ['Msxml2.XMLHTTP.6.0', 'Msxml2.XMLHTTP.3.0', 'Microsoft.XMLHTTP'];
            for (var i = 0; i < xhrVersions.length; i++) {
                try {
                    xhr = new ActiveXObject(xhrVersions[i]);
                    if (typeof xhr === 'object') { 
                        return xhr; 
                    }
                } catch (ignore) {
                }
            }
        }
        return xhr;
    };

// *** UTILITIES *** //

/**
 * Specific utilites for the EIWA spa. Moved out of
 * eiwa2019.js (and constant.js) to improve code readability.
 * The one remaining utility function in the spa has a circular
 * dependency between utility.js and model.js 
 */

    /* formerly in constant.js */
    mod.getCleanPick = function() { 
        return [this.NO_PICK, this.NO_PICK, this.NO_PICK, this.NO_PICK]; 
    };

    /* the following were moved from eiwa2019.js */
    mod.stripNewLines = function(str) {
        str = str.replace(/\n/g, '');
        str = str.replace(/\r/g, '');
        return str;
    };

    /**
     * Returns school name from the school code
     * must be consistent with mod.getSchool
     */
    mod.saySchool = function(code) {
        if (code == 'AME') {
            return 'American';
        } else if (code == 'ARM') {
            return 'Army';
        } else if (code == 'BIN') {
            return 'Binghamton'; 
        } else if (code == 'BRO') {
            return 'Brown'; 
        } else if (code == 'BUC') {
            return 'Bucknell';
        } else if (code == 'COL') {
            return 'Columbia';
        } else if (code == 'COR') {
            return 'Cornell';
        } else if (code == 'DRE') {
            return 'Drexel';
        } else if (code == 'FRA') {
            return 'F & M'; 
        } else if (code == 'HAR') {
            return 'Harvard';
        } else if (code == 'HOF') {
            return 'Hofstra'; 
        } else if (code == 'LEH') {
            return 'Lehigh';
        } else if (code == 'NAV') {
            return 'Navy'; 
        } else if (code == 'PEN') {
            return 'Penn';
        } else if (code == 'PRI') {
            return 'Princeton';
        } else if (code == 'SAC') {
            return 'Sacred Heart'; 
        } else {
            return this.NO_PICK;  
        }
    };

   /**
    * Derives school code from 'name, school' in the output
    */
    mod.getSchool = function(val) {
        var arr = val.split(',');
        if (arr.length == 2) {
            val = arr[1];
        } else if (val.match(this.NO_PICK)) {
            return this.NO_PICK;
        }
        if (val.match(/American/)) {
            return 'AME';
        } else if (val.match(/Army/)) {
            return 'ARM';
        } else if (val.match(/Binghamton/)) {
            return 'BIN'; 
        } else if (val.match(/Brown/)) {
            return 'BRO'; 
        } else if (val.match(/Bucknell/)) {
            return 'BUC';
        } else if (val.match(/Columbia/)) {
            return 'COL';
        } else if (val.match(/Cornell/)) {
            return 'COR';
        } else if (val.match(/Drexel/)) {
            return 'DRE'; 
        } else if (val.match(/F & M/)) {
            return 'FRA'; 
        } else if (val.match(/Harvard/)) {
            return 'HAR';
        } else if (val.match(/Hofstra/)) {
            return 'HOF';
        } else if (val.match(/Lehigh/)) {
            return 'LEH';
        } else if (val.match(/Navy/)) {
            return 'NAV'; 
        } else if (val.match(/Penn/)) {
            return 'PEN';
        } else if (val.match(/Princeton/)) {
            return 'PRI';
        } else if (val.match(/Sacred Heart/)) {
            return 'SAC'; 
        } else {
            return 'school not found';
        }
    };

   /**
    * convenience function: checks an array
    * of HTML elements and returns true if
    * the element is in the array
    */
    mod.inArray = function(elem, arr) {
        var i = 0,
            len = arr.length;
        for (; i < len; i++) {
            if (elem === arr[i]) {
                return true;
            }
        }
        return false;
    };

   /**
    * Returns the index of an element in an HTML collection  
    */    
    mod.getOrd = function(elem, coll) {
        var i = 0,
            len = coll.length;
        for (; i < len; i++) {
            if (elem === coll[i]) {
                return i;
            }
        }
        return -1;
    };

   /**
    *   Dependencies:
    *   - return value must convert to an int.
    *   - code in restoreUiFromJsonObject must match
    *     this code  
    */
    mod.sayPlace = function(cn) {
        if (cn.match(this.FIRST)) {
            return '1 -';
        } else if (cn.match(this.SECOND)) {
            return '2 -';
        } else if (cn.match(this.THIRD)) {
            return '3 -';
        } else if (cn.match(this.FOURTH)) {
            return '4 -'
        } else {
            return '';
        }
    };

    // exports.$w = mod;
    exports.utility = mod;
    
})(this);
