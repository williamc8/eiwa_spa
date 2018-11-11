/**
 * eiwa2019.js
 * 
 * Controllers for the 2019 EIWA Pick 4 App
 * Uses global utility, model and entries from the other js files
 * 
 *      TO DO: 
 *      check for live debug output ~search on debug
 *      post tourney -> update w. actual results in entries, search on POST in this file for places to update
 * 
 *     LINE     
 *       55     write html
 *      140     show/hide UI elements
 *      253     pick-related
 *      xxx     manage state and compute result
 *      xxx     button click functions
 *      780     initialize
 */
(function(exports) {
    var U = utility,
        M = model,
        E = entries,
        pickingOrd = null,  // which place the user is picking
        // DOM REFS
        bdy = U.gEBTN('body')[0],
        allWeights = U.gEBID('allWeights'),    // div container for floating weight classes and output div
        navWeights = U.gEBID('navWeights'),    // navbar to toggel weight class display
        // we define these after HTML is created
        weightDiv,
        weightH2,
        contestant,
        // buttons
        savePicks,
        reloadSavedPicks,
        howToUse,
        computeScore,
        clear,
        reloadCurrentPicks,
        officialPicks,
        ta,  // textarea is defined in writeHtml...
 
       /**
        * Find out which weight we're in from the string.
        * not moved to utility.js due to circular dependency.
        */
        getIdx = function(sWgt) {
            var i = 0,
                len = M.weights.length;
            for (; i < len; i++) {
                if (sWgt == M.weights[i]) {
                    return i;
                }
            }
            return -1;
        },

       /*******************************************************
        * 
        *  WRITE HTML for the non-static parts of the page
        * 
        *******************************************************/

        writeHtml = function() {
            var i = 0,
                bigStr = '',
                len = M.weights.length;
            for (; i < len; i++) {
                bigStr += getWeightHtml(M.weights[i]);
            }
            bigStr += getOutputHtml();
            allWeights.innerHTML = bigStr;
            // getting the reference here...
            ta = U.gEBTN('textarea')[0];
            if (document.documentElement.className == 'js') {
                ta.value = U.howToUseStore + U.newLoader;
            } else {
                ta.value = U.howToUse + U.newLoader;
            }
        },

        getWeightHtml = function(wgt) {
            var i,
                clsVal = 'weight',
                sch = M.activeSchools,  // no more Rutgers or BU
                len = sch.length,
                wt = getIdx(wgt),
                cls = '',
                s = '';
                
            if (wgt == '125') {
                clsVal = 'weight disp';
            }
                
            s += '<div class="' + clsVal + '">'
            +   '<h2><span title="Previous Weight" class="prev">&laquo;</span>Pick ' + wgt + '<span title="Next Weight" class="next">&raquo;</span><span class="closeWeight">x</span></h2>'
            +   '<ul class="wrestler">'
                +   '<li class="instr">Click the place, then click the wrestler.</li>'
                +   '<li class="ord">'
                    +    '<span class="' + U.FIRST + '" title="Pick First Place">1st</span>'
                    +    '<span class="' + U.SECOND + '" title="Pick Second Place">2nd</span>'
                    +    '<span class="' + U.THIRD + '" title="Pick Third Place">3rd</span>'
                    +    '<span class="' + U.FOURTH + '" title="Pick Fourth Place">4th</span>'
                +   '</li>';
            for (i = 0; i < len; i++) {
                cls = sch[i];
                if (i == len - 1) {
                    cls += ' last';
                }      
                s += '<li class="' + cls + '"><span class="rank"></span>' + M[sch[i]].team[wt] + ', ' + M[sch[i]].name + '</li>';        
            }
                s += '</ul">';
            s += '</div>';                        
            return s;
        },

        getOutputHtml = function() {
            var entry,
                s = '';
                
            s += '<div id="output" class="clearfix">'
            +    '<label for="contestant">Contestant name <span>(e.g. your forum handle)</span>:</label><br>'
            +    '<input type="text" id="contestant"><br>'
            +    '<button type="button" class="storage" id="savePicks" title="Save Picks"><i class="fas fa-save"></i>Save Picks</button>'
            +    '<button type="button" class="storage" id="reloadSavedPicks" title="Reload Saved Picks"><i class="fas fa-laptop"></i><i class="fa fa-refresh"></i>Reload Saved Picks</button>'
            +    '<button type="button" id="howToUse" title="Show the original instructions"><i class="fas fa-question-circle"></i>How to use</button><br>'
            +    '<button type="button" class="newRow" id="computeScore" title="Compute Score"><i class="fas fa-cogs"></i>Compute Score</button>'
            +    '<button type="button" id="clear" title="Clear"><i class="fas fa-eraser"></i>Clear</button>'
            +    '<button type="button" id="reloadCurrentPicks" title="Reload Current Picks"><i class="fas fa-sync"></i>Reload Current Picks</button><br>'
            +    '<div><label><select id="officialPicks">'
            +    '<option id="">Load an official contest pick</option>';
            
            for (entry in E) {
                s += '    <option id="' + entry + '">' + E[entry].fullName + '</option>';
            }
            
            s +=    '</select></label></div>'
              +    '<textarea rows="28"></textarea>';
            return s;
        },

       /*****************************************************
        * 
        *  SHOW/HIDE UI elements based on user interaction
        * 
        *****************************************************/
    
       /**
        *   When navWeights is clicked, toggle display of the weights. 
        *   User can load any combination, plus there are convenience buttons
        *   to show all and hide all.
        */
        showHideWeights = function(evt) {
            evt = evt || window.event;
            var cn,
                strWgt,
                idx,
                targ = evt.target || evt.srcElement;
            if (targ.id == 'selectAll') {
                showAllWeights();
                return true;
            } else if (targ.id == 'selectNone') { 
                hideAllWeights();
                return true;
            } else if (targ.nodeName == 'LI') {
                cn = targ.className;
                strWgt = targ.innerHTML;            // '125', '133' etc.
                idx = getIdx(strWgt, weightDiv);
                if (cn.match(/sel/)) {
                    U.removeClass(targ, 'sel');
                    U.removeClass(weightDiv[idx], 'disp');
                } else {
                    U.addClass(targ, 'sel');
                    U.addClass(weightDiv[idx], 'disp');
                }
                return true;
            } else {
                // user clicked to the right of the last LI
                return false;
            }
        },

        showAllWeights = function() {
            var i,
                lstItems = U.gEBTN('li', navWeights),
                len;                
            for (i = 0, len = lstItems.length - 2; i < len; i++) {
                U.addClass(lstItems[i], 'sel');
                U.addClass(weightDiv[i], 'disp');
            }
            U.removeClass(allWeights, U.SINGLE_MODE);
        },
        
        hideAllWeights = function() {
            var i,
                lstItems = U.gEBTN('li', navWeights),
                len;                
            for (i = 0, len = lstItems.length - 2; i < len; i++) {
                U.removeClass(lstItems[i], 'sel');
                U.removeClass(weightDiv[i], 'disp');
            }
        },

       /**
        *   When header spans are clicked, step forward, step back or close weight.
        *   New logic: the 3 spans are always displayed. 
        *   Any click of a span closes the stepping weight, but for forward
        *   and back a new weight opens in the same apparent position.
        *   When that weight is already open, it looks like a close. 
        */
        stepCloseWeight = function(evt) {
            evt = evt || window.event;
            var targ = evt.target || evt.srcElement,
                h2,
                idx,
                step,
                displayed = U.gEBCN('disp', allWeights);
        
            if (targ.nodeName !== 'SPAN' ) {                
                
                return;
            
            } else {
                
                h2 = U.gABTN('h2', targ);
                idx = U.getOrd(h2, weightH2);
                
                // remove stepping weight from selection
                U.removeClass(weightDiv[idx], 'disp');
                U.removeClass(U.gEBTN('li', navWeights)[idx], 'sel');
                
                if (targ.className == 'next') {
                    step = idx + 1;
                    if (step == 10) {
                        step = 0;
                    }
                } else if (targ.className == 'prev') {
                    step = idx - 1;
                    if (step == -1) {
                        step = 9;
                    }                    
                } else { // Close span button was clicked. We already removed disp, so exit.
                    return;
                }
                
                /* Display stepped to weight and highlight in navbar
                unless it's already displayed. */
                if (!U.inArray(weightDiv[step], displayed)) {
                    U.addClass(weightDiv[step], 'disp');
                    U.addClass(U.gEBTN('li', navWeights)[step], 'sel');                       
                }           
            }
        },

       /****************************
        * 
        *  PICK-RELATED functions
        *
        ****************************/

        makePick = function(evt) {
            evt = evt || window.event;
            var targ = evt.target || evt.srcElement,
                nm = targ.nodeName.toUpperCase(),
                wgt,
                wgtIdx,
                spnPick,
                pickVal,
                cn;
  
            if (nm == 'SPAN') {
                wgt = U.gABTN('div', targ);
                cn = U.gABTN('LI', targ).className;
                // START the pick
                if (cn == 'ord') {
                    setPicking(wgt, targ);
                    pickingOrd = targ.className;
                    return true;
                } else if (cn == 'rank') {
                    // user clicked on the rank span
                    alert('Please click on the wrestler name, not the place number.');
                    return false;
                } else {
                    return false;
                }
            } else if (nm == 'LI') {
                wgt = U.gABTN('div', targ);
                wgtIdx = U.getOrd(wgt, weightDiv);
                if (targ.className == 'ord' || targ.className == 'instr') {
                    return true;
                } else if (wgt.className.match('picking')) {
                    // FINISH the pick
                    schoolCode = targ.className.substring(0,3);
                    spnPick = U.gEBTN('span', targ)[0];
                    pickVal = U.sayPlace(pickingOrd);
                    if (pickVal) {
                        removeDupe(wgt, pickVal);
                        spnPick.innerHTML = pickVal;
                        U.addClass(targ, 'sel');
                        // Need to loop through the entire weight because
                        // removeDupe can replace a previous pick
                        updateState(wgtIdx);
                        loadOutputFromStateObject();
                    }
                    setPicking(null);
                    removePickingOnSpans(wgt);
                    return true;
                } else {
                    // clicking in a different weight class cancels picking
                    setPicking(null);
                    removePickingOnSpans(wgt);
                    return true;
                }
            } else {
                // clicking outside area cancels picking
                setPicking(null);
                removePickingOnSpans(wgt);
                return true;
            }
        },
        
       /** 
        * update the state object after each pick
        * within a single weight class
        */
        updateState = function(idx) {
            var wgt = weightDiv[idx],
                strWgt = M.weights[idx],
                i = 2,
                li = U.gEBTN('li', wgt),
                len = li.length,
                cn,
                school,
                num,
                spn,
                arr = U.getCleanPick();

            M.currentPick.contestant = contestant.value;
            for (; i < len; i++) {
                cn = li[i].className;
                if (cn.match(/sel/)) {
                    school = cn.substring(0, 3);
                    spn = U.gEBTN('span', li[i])[0];
                    num = parseInt(spn.innerHTML, 10);
                    arr[num - 1] = school;
                }
            }
            M.currentPick.setWeight(strWgt, arr);
        },
        
       /** 
        * must unpick a wrestler when the same place
        * is picked for a different wrestler.
        */
        removeDupe = function(dv, val) {
            var spn,
                i = 2,
                lst = U.gEBTN('li', dv),
                len = lst.length;
                
            for(; i < len; i++) {
                spn = U.gEBTN('span', lst[i])[0];
                if (spn.innerHTML == val) {
                    spn.innerHTML = '';
                    U.removeClass(lst[i], 'sel');
                }
            }
        },
        
       /**
        * add flag class for picking mode on the weight div
        * and add class on the ord span that started the pick
        */
        setPicking = function(dv, spn) {
            var i = 0,
                len = weightDiv.length;
            
            for (; i < len; i++){
                removePickingOnSpans(weightDiv[i])
                if (dv === weightDiv[i]) {
                    U.addClass(spn, 'picking');
                    U.addClass(weightDiv[i], 'picking');
                } else {
                    U.removeClass(weightDiv[i], 'picking');
                }
            }
        },
        
        removePickingOnSpans = function(dv) {
            var i,
                len,
                li,
                spn;
            
            if (dv) {
                li = U.gEBCN('ord', dv)[0]; // DEBUG
                spn = U.gEBTN('span', li);
            } else {
                return false;
            }
                
            for (i = 0, len = spn.length; i < len; i++) {
                U.removeClass(spn[i], 'picking');
            }
            return true;
        },

       /****************************************
        * 
        *  MANAGE STATE and COMPUTE RESULT
        * 
        ***************************************/   

       /**
        *   Derive pick record from the formatted output in the textarea.
        *   User has either created valid output by making choices in the UI
        *   or by pasting valid output back into the textarea.
        *   Returns the JSON object or false.
        *   Calling function has already trimmed entry and checked for JSON support.
        */ 
        isValidPickObj = function(entry) {

            var i,
                len,
                arr,
                right = '',
                eMsg = 'failed on ',
                stor,
                str,
                strTest,
                pr = {};

            
            // Do some basic checks for validity
            if (entry.substring(0, U.PICKS_FOR.length) !== U.PICKS_FOR) {
                return false;
            }
            
            for (i = 0, len = M.weights.length; i < len; i++) {
                strTest = M.weights[i] + ':';
                if (!entry.match(strTest)) {
                    return false;
                }
            }

            arr = entry.split('125:');
            if (arr.length == 2) {
                arr[0] = arr[0].replace(U.PICKS_FOR, '');
                arr[0] = U.stripNewLines(arr[0]);
                pr['contestant'] = arr[0];
                right = arr[1];
            } else {
                //eMsg += 'initial split ';
                return false;
            }
            
            for (i = 1, len = M.weights.length; i < len; i++) {
                arr = right.split(M.weights[i] + ':');
                if (arr.length == 2) {
                    pr[M.weights[i - 1]] = U.stripNewLines(arr[0]);
                    right = arr[1];
                } else {
                    //eMsg += wgt[i - 1] + ' ';
                    //pr[wgt[i - 1]] = 'failed on ' + wgt[i - 1];
                    return false;
                }
            }

            pr['285'] = right;

            for (i = 0, len = M.weights.length; i < len; i++) {
                stor =['failed', 'failed', 'failed', 'failed'],
                str = U.stripNewLines(pr[M.weights[i]]);
                arr = str.split('1. ');
                if (arr.length == 2) {
                    right = arr[1];
                }
                arr = right.split('2. ');
                if (arr.length == 2) {
                    stor[0] = U.getSchool(arr[0]);
                    right = arr[1];
                }
                arr = right.split('3. ');
                if (arr.length == 2) {
                    stor[1] = U.getSchool(arr[0]);
                    right = arr[1];
                }
                arr = right.split('4. ');
                if (arr.length == 2) {
                    stor[2] = U.getSchool(arr[0]);
                    right = arr[1];
                }
                stor[3] = U.getSchool(right);
                pr[M.weights[i]] = stor;
            }
            return pr;
        },
        
       /**
        * Dependencies: well-formed output for
        * a pick set in the TA.
        */
        computeResult = function() {
            var str = '',
                arr,
                wgt = M.weights,
                wt,
                i,
                j,
                k,
                len,
                bonus = 0,
                cnt = 0,
                tot = 0,
                ansPick,
                usrPick,
                ans = M.ans2014, // POST
                ans = M.ans2015, // POST
                lowSeed,
                jsn,
                entry = ta.value;

            if (typeof JSON == 'undefined') {
                alert(U.noJsonSupport);
                return false;
            }
            
            entry = entry.trim();

            jsn = isValidPickObj(entry);
            
            if (!jsn ) {
                alert(U.badInput);
            } else {
                // Adapted from 2013 writeScore
                for (i = 0, len = wgt.length; i < len; i++) {
                    cnt = 0;
                    bonus = 0;
                    lowSeed = [],
                    wt = wgt[i];
                    ansPick = ans[wt];
                    usrPick = jsn[wt];
                    for (j = 0; j < 4; j++) {
                        for (k = 0; k < 4; k++) {
                            if (ansPick[j].substr(0,3) == usrPick[k]) {
                                cnt++;
                                break;  // can't pad score with redundant picks
                            }
                        }
                    }
                    str += wt + ': ' + cnt + ' picks matched. ';
                    tot += cnt;
                    // count bonus points for exact placement and look for unseeded placers
                    for (j = 0; j < 4; j++) {
                        if (ansPick[j].substr(0,3) == usrPick[j]) {
                            bonus += 2;
                        }
                        if (ansPick[j].length > 3) {
                            lowSeed.push(ansPick[j]);
                        }
                    }
                    str += bonus + ' bonus points for exact matches.\n';
                    tot += bonus;
                    bonus = 0;
                    if (lowSeed.length) {
                        for (j = 0; j < lowSeed.length; j++) {
                            for (k = 0; k < 4; k++) {
                                if (lowSeed[j].substr(0,3) == usrPick[k]) {
                                    bonus += 4;
                                    break;  // can't count the same unseeded guy twice...
                                }
                            }
                        } 	
                    }
                    if (bonus > 0) {
                        str += '     (plus ' + bonus + ' extra bonus points for picking unseeded).\n';
                        tot += bonus;
                    } 
                }
                ta.value = U.HDR_RESULTS_2014;      // POST
                ta.value = U.HDR_RESULTS_2015;    // POST
                //ta.value += '\n\n' + JSON.stringify(M.ans2014);     // POST
                ta.value += '\n\n' + JSON.stringify(M.ans2015);   // POST
                ta.value += '\n\n' + U.HDR_PICKS;
                ta.value += '\n\n' + JSON.stringify(jsn);
                ta.value += '\n\n' + U.HDR_SCORE + jsn.contestant;
                ta.value += '\n\n' + str;
                ta.value += '\n\n' + U.HDR_TOTAL + tot;
                U.setAttr('rows', '44', ta);  // add a few extra lines for bonus unseeded
            }
        },
        
       /**
        * Set the state object (M.currentPick) from the
        * local storage JSON object.
        */
        setStateObjectFromSaved = function(obj) {
            var i = 0,
                len = M.weights.length,
                wgt,
                arr;
            
            M.currentPick.reset();
            M.currentPick.contestant = obj.contestant;
            for(; i < len; i++) {
                wgt = M.weights[i];
                arr = U.getCleanPick();
                arr[0] = obj[M.weights[i]][0];
                arr[1] = obj[M.weights[i]][1]; 
                arr[2] = obj[M.weights[i]][2];
                arr[3] = obj[M.weights[i]][3];
                M.currentPick.setWeight(wgt, arr);
            }      
        },
        
       /**
        * All UI changes update the stateObject and then call this function to update the output box.
        * Loading saved picks also uses this function after setting the state object to match the saved values.
        */
        loadOutputFromStateObject = function(obj) {
            obj = obj || M.currentPick;
            var i,  // which weight
                j,  // which pick
                len,
                wgt,
                arr,
                scode,
                sch,
                wrstlr,
                s = '';
            
            s += U.PICKS_FOR + obj['contestant'] + '\n';

            for (i = 0, len = M.weights.length; i < len; i++) {
                wgt = M.weights[i];
                s +=  '\n' + wgt + ':';
                for (j = 1; j < 5; j++) {
                    wrstlr = U.NO_PICK;
                    s += ' ' + j + '. ';
                    scode = obj[wgt][j-1]
                    sch = U.saySchool(scode);
                    if (scode !== U.NO_PICK) {
                        wrstlr = M[scode]['team'][i] + ', ' + sch;
                    }
                    s += wrstlr + '. ';
                }
            }
            ta.value = s;
        },
        
       /**
        * Set the wrestler divs using an object
        * This does not write the text area content (see above: loadOutputFromStateObject)
        * No object = the stateObject
        */
        setUiFromStateObject = function(obj) {
            obj = obj || M.currentPick;
            var i,
                len,
                wgt,
                arr,
                li,
                spn,
                j,
                len2;

            // first strip all sel class and remove rank span content
            for (i = 0, len = weightDiv.length; i < len; i++) {
                li = U.gEBTN('li', weightDiv[i]);
                for (j = 2, len2 = li.length; j < len2; j++) {
                    U.removeClass(li[j], 'sel'); 
                    spn = U.gEBTN('span', li[j])[0];
                    spn.innerHTML = '';
                }                
            }
            
            // add back the selection...
            // skip if it's a defunct school
            for (i = 0, len = weightDiv.length; i < len; i++) {
                wgt = M.weights[i];
                arr = obj[wgt];
                for (j = 0, len2 = 4; j < len2; j++) {
                    if (arr[j].length == 3) {
                        li = U.gEBCN(arr[j], weightDiv[i])[0];
                        if (li) {  // there is no item for a defunct school e.g. 'RUT'
                            spn = U.gEBTN('span', li)[0];
                            spn.innerHTML = j + 1 + ' -';
                            U.addClass(li, 'sel');
                        }
                    }
                };
            }
            contestant.value = obj.contestant
        },

       /**********************************
        * 
        *  BUTTON CLICK FUNCTIONS
        *  (except general state manage-
        *   ment and compute result)
        * 
        **********************************/

       /**
        *   Locally stores from M.currentPick (stateObject)
        */     
        storePicksToDisk = function() {
            var confirmed = true,
                jsonString = JSON.stringify(M.currentPick),
                err = 'Saving the pick was unsuccessful.\n\n';
            
            if (localStorage.getItem(U.STORED_PICK)) {
                confirmed = confirm('Are you sure you want to overwrite your current saved pick?\n\nClick \'Cancel\' to exit without saving. Click \'OK\' to save.');
            }

            if (confirmed) {
            
                try {
                    localStorage.setItem(U.STORED_PICK, jsonString);
                } catch(e) {
                    alert(err + e.name + ': ' + e.description);
                }

                // debug
                ta.value = 'DEBUG: The following pick was saved...\n\n';
                ta.value += jsonString;
            }
        },

       /**
        * To make the UI behave as expected (append to/edit after reloading saved picks)
        * we need to copy the saved properties to the state object as well as
        * update the UI state and the output text.
        */
        loadStoredPicksFromDisk = function() {
            var jsn,
                jsonString = localStorage.getItem(U.STORED_PICK);
                
            if (!jsonString) {
                alert('No stored value was found.');
            } else {
                try {
                    // this should always succeed because we
                    // only save from the state object.
                    jsn = JSON.parse(jsonString);                   
                } catch(e) {
                    alert('An error occurred trying to read your stored pick.\n\n' + e.name + ': ' + e.message + '.');
                    return;
                }
                setStateObjectFromSaved(jsn);
                setUiFromStateObject(jsn);
                loadOutputFromStateObject(jsn);
                    
                /* debug
                ta.value += '\n\nDEBUG: The following saved pick was loaded from local storage...\n\n';
                ta.value += jsonString;
                */
            }
        },
 
        /**
        * user without local storage can still use the page
        */
        loadHowToUse = function() {
            if (document.documentElement.className == 'js') {
                ta.value = U.howToUseStore + U.newLoader;
            } else {
                ta.value = U.howToUse + U.newLoader;
            }
        },

        updateContestant = function() {
            M.currentPick.contestant = contestant.value;
            loadOutputFromStateObject();
        },

        loadOfficialPick = function(evt) {
            evt = evt || window.event;
            var targ = evt.target || evt.srcElement,                
                idx = this.selectedIndex,
                opt = this.options[idx],
                pickStr,
                pickObj;
                
            // top option is not in E
            try {
                pickStr = E[opt.id].pick;
            } catch(ignore) {
                ta.value = '';
                return false;
            }
            
            pickObj = isValidPickObj(pickStr);                
            if (pickObj) {
                setStateObjectFromSaved(pickObj);
                setUiFromStateObject(pickObj);
                loadOutputFromStateObject(pickObj);
            } else {
                ta.value = "Loading from the official entries failed. Please paste back your picks from the EIWA forum and click Compute Score again."
                return false;
            }
            return true;
        },

       /*********************
        * 
        *    INITIALIZE
        * 
        *********************/

       /**
        * Handlers for the output area
        * (buttons and textarea)
        */
        setTheOutputArea = function() {
            var evt;
            // buttons
            savePicks.onclick = storePicksToDisk; 
            reloadSavedPicks.onclick = loadStoredPicksFromDisk;
            howToUse.onclick = loadHowToUse;
            computeScore.onclick = computeResult;
            clear.onclick = function() {
                ta.value = '';
                contestant.value = '';
            };
            contestant.onkeyup = updateContestant;
            // redundant call for onkeyup probs...
            contestant.onchange = updateContestant;
            reloadCurrentPicks.onclick = function() {
                loadOutputFromStateObject();
                setUiFromStateObject();
            };
            officialPicks.onchange = loadOfficialPick;
        },

        init = function() {
            writeHtml();
            /*** get refs to the newly added HTML elements ***/
            weightDiv = U.gEBCN('weight');
            weightH2 = U.gEBTN('h2', allWeights);
            contestant = U.gEBID('contestant');
            savePicks = U.gEBID('savePicks');
            reloadSavedPicks = U.gEBID('reloadSavedPicks');
            howToUse = U.gEBID('howToUse');
            computeScore = U.gEBID('computeScore');
            clear = U.gEBID('clear');
            reloadCurrentPicks = U.gEBID('reloadCurrentPicks');
            officialPicks = U.gEBID('officialPicks');
            /*** add handlers ***/
            navWeights.addEventListener('click', function() {
                var evt;
                showHideWeights(evt);
            });
            // click weight header (spans) to step or close weight
            for (var i = 0; i < weightH2.length; i++) {
                weightH2[i].addEventListener('click', function() {
                    var evt;
                    stepCloseWeight(evt);
                });        
            }                         
            // make the pick
            allWeights.addEventListener('click', function() {
                var evt;
                makePick(evt);
            })
            // set handlers on buttons and textarea
            setTheOutputArea();
            if (typeof JSON == 'undefined') {
                ta.value += '\n\n * * *\n\nNOTE: ' + U.noJsonSupport;
                reloadSavedPicks.disabled = true;
                savePicks.disabled = true;
            }
            // POST -> after the tournament, comment out the next line after updating entries.js
            officialPicks.style.display = U.NONE; 
            // use next line to begin with all weights displayed
            // showAllWeights();
        }
    
    bdy.addEventListener('load', init());

})(this);