/**
 * model.js
 * 
 * Data for the 2019 EIWA Pick 4 App
 * starting source -> wrestlestat.com
 * 
 * loads after utility.js (global var = utility) in the spa
 * 
 * currentPick is the state object for the app. All user actions
 * update currentPick and the UI is then set from currentPick.
 * 
 */
 
(function(exports) {
   var U = utility;
   mod = {    
      weights: ['125', '133', '141', '149', '157', '165', '174', '184', '197', '285' ],
      schools: ['AME', 'ARM', 'BIN', 'BRO', 'BUC', 'COL', 'COR', 'DRE', 'FRA', 'HAR', 'HOF', 'LEH', 'NAV', 'PEN', 'PRI', 'SAC'],  // remove later...
      activeSchools: ['AME', 'ARM', 'BIN', 'BRO', 'BUC', 'COL', 'COR', 'DRE', 'FRA', 'HAR', 'HOF', 'LEH', 'NAV', 'PEN', 'PRI', 'SAC'],
      currentPick: {
         'contestant': '',
         '125': [U.NO_PICK, U.NO_PICK, U.NO_PICK, U.NO_PICK],
         '133': [U.NO_PICK, U.NO_PICK, U.NO_PICK, U.NO_PICK],
         '141': [U.NO_PICK, U.NO_PICK, U.NO_PICK, U.NO_PICK],
         '149': [U.NO_PICK, U.NO_PICK, U.NO_PICK, U.NO_PICK],
         '157': [U.NO_PICK, U.NO_PICK, U.NO_PICK, U.NO_PICK],
         '165': [U.NO_PICK, U.NO_PICK, U.NO_PICK, U.NO_PICK],
         '174': [U.NO_PICK, U.NO_PICK, U.NO_PICK, U.NO_PICK],
         '184': [U.NO_PICK, U.NO_PICK, U.NO_PICK, U.NO_PICK],
         '197': [U.NO_PICK, U.NO_PICK, U.NO_PICK, U.NO_PICK],
         '285': [U.NO_PICK, U.NO_PICK, U.NO_PICK, U.NO_PICK],
         reset: function() {
            var i,
               len;
            this.contestant = '';
            for (i = 0, len = mod.weights.length; i < len; i++ ) {
               this[mod.weights[i]] = U.getCleanPick();
            }
         },
         setWeight: function(wgt, arr) {
            this[wgt] = arr;
         }
      },
      ans2013: {      // 2013 results
            "125":["COR","PEN","AME","BRO"],
            "133":["LEH","COL+","RUT","PEN+"],
            "141":["FRA","PEN","COR","HAR"],
            "149":["COL","ARM","NAV+","COR"],
            "157":["LEH","HAR","NAV","COL"],
            "165":["COR","COL+","ARM","NAV"],
            "174":["LEH","NAV","PEN","RUT"],
            "184":["COR","NAV","BRO+","RUT"],
            "197":["PEN","HAR","COR","ARM"],
            "285":["NAV","AME","BUC","COR"]
      },
      ans2014: {      // 2014 results 
         "125":["COR","AME","LEH","BIN"],
         "133":["LEH","DRE","COR","RUT"],
         "141":["HAR","HOF","FRA","BOS+"],
         "149":["COR","LEH","RUT","HOF"],
         "157":["BOS","COL+","RUT+","COR"],
         "165":["HOF","COR","COL","PEN"],
         "174":["NAV","PEN+","LEH","HOF+"],
         "184":["COR","PEN","BRO","COL"],
         "197":["COR","BIN","AME","NAV+"],
         "285":["BUC","RUT","LEH","AME"]
      },
      ans2015: {      // 2015 results (used in dev for now, to be replaced w. actual results)
         "125":["COR","AME","LEH","BUC"],
         "133":["LEH","COR","PEN", "DRE"],
         "141":["HAR","HOF","LEH","BUC"],
         "149":["COR","PEN","PRI","HOF"],
         "157":["COR","LEH","COL","BRO"],
         "165":["COR","NAV","ARM","PEN"],
         "174":["ARM","PEN","COL","COR"],
         "184":["COR","LEH","PEN","BRO"],
         "197":["LEH","COR","HAR","PRI"],
         "285":["BUC","LEH","BIN","HAR"]
      },
      AME: {
         name: 'American',
         full: 'American University',
         team: ['Gage Curry', 'Josh Terao', 'Jack Mutchnik', 'Michael Sprague', 'Eric Hong', 
         'Anthony Wokasch', 'Conner Allshouse', 'Tanner Harvey', 'Prince Hyeamang', 'Niko Camacho']
      },
      ARM: {
         name: 'Army',
         full: 'U.S. Military Academy',
         team: ['Trey Chalifoux', 'Lane Peters', 'Corey Shie', 'Knox Fuller', 'Luke Weiland', 'Brad Laughlin', 'Ben Harvey', 'Noah Stewart', 'Rocco Caywood', 'Bobby Heald']
      },
      BIN: {
         name: 'Binghamton',
         full: 'Binghamton University',
         team: ['Joe Nelson', 'Zach Trampe', 'Joe Russ', 'Frank Garcia', 'Tristan Rifanburg', 'Aidan Monteverdi', 'Vincent DePrez', 'Louie DePrez', 'Anthony DePrez', 'Joe Doyle']
      },
      BRO: {
         name: 'Brown ',
         full: 'Brown University',
         team: ['Trey Keeley', 'Hunter Kosco', 'Jimmy Pawelski', 'Zachary Krause', 'Christian LaBrie', 'Jonathan Viruet', 'A. J. Pedro', 'Christian LaFragola', 'Tucker Ziegler', 'Ian Butterbrodt']
      },
      BUC: {
         name: 'Bucknell',
         full: 'Bucknell University',
         team: ['Geo Barzona', 'David Campbell', 'Joey Gould', 'Matt Kolonia', 'Zach Hartman', 'D. J. Hollingshead', 'Nick Stephani', 'Drew Phipps', 'Garrett Hoffman', 'Eric Chakonis']
      },
      COL: {
         name: 'Columbia',
         full: 'Columbia University',
         team: ['Joe Manchio', 'Matthew Kazimir', 'Danny Fongaro', 'Cole Corrigan', 'Dan Reed', 'Laurence Kosoy', 'Max Elling', 'Brandon Kui', 'Michael Bulkin', 'Daniel Herman']
      },
      COR: {
         name: 'Cornell',
         full: 'Cornell University',
         team: ['Noah Baughman', 'Vito Arujau', 'Yianni Diakomihalis', 'William Koll', 'Fredy Stroker', 'Jonathan Chavez', 'Brandon Womack', 'Max Dean', 'Ben Honis', 'Jeremy Sweany']
      },
      DRE: {
         name: 'Drexel',
         full: 'Drexel University',
         team: ['Antonio Mininno', 'Ty Smith', 'Julian Flores', 'Trevor Elfvin', 'Evan Barczak', 'Ebed Jarrell', 'Bryan McLaughlin', 'Anthony Walters', 'Stephen Loiseau', 'Joey Goodhart']
      },
      FRA: {
         name: 'F & M',
         full: 'Franklin and Marshall',
         team: ['Mark Simonetti', 'Mark Salvatore', 'Brett Kulp', 'Will Gil', 'Emmett LiCastri', 'Jacom Conners', 'Jimmy Stillerman', 'Anthony Mancini', 'Phillip Robilotto', 'Antonio Pelusi']
      },  
      HAR: {
         name: 'Harvard',
         full: 'Harvard University',
         team: ['Nolan Hellickson', 'Ryan Friedman', 'Trevor Tarsi', 'Brock Wilson', 'Hunter Ladnier', 'Tyler Tarsi', 'Kyle Bierdumpfel', 'Clifton Wang', 'Doyle Donovan', 'Evan Callahan']
      },
      HOF: {
         name: 'Hofstra',
         full: 'Hofstra University',
         team: ['Jacob Martin', 'Trent Olson', 'Vincent Vespa', 'Ryan Burkert', 'Chris Mauriello', 'Ricky Stamm', 'Sage Heller', 'Michael Oxley', 'Nezar Haddad', 'Omar Haddad',  ]
      },
      LEH: {
         name: 'Lehigh',
         full: 'Lehigh University',
         team: ['Connor Schram', 'Scott Parker', 'Luke Karam', 'Ryan Pomrinca', 'Gordon Wolf', 'Cole Walter', 'Jordan Kutler', 'Ryan Preisch', 'Chris Weiler', 'Jordan Wood']
      },
      NAV: {
         name: 'Navy',
         full: 'USNA',
         team: ['Aslan Kilic', 'Cody Trybus', 'Nicholas Gil', 'Jared Prince', 'Quentin Hovis', 'Jonathan Carrera', 'Spencer Carey', 'Connor Doyle', 'Joshua Roetman', 'Andrew Piehl']
      },
      PEN: {
         name: 'Penn',
         full: 'University of Pennsylvania',
         team: ['Doug Zapf', 'Gianni Ghione', 'Grant Aronoff', 'Anthony Artalone', 'Joe Oliva', 'Evan DeLuise', 'Brian Krasowski', 'Jalen Laughlin', 'Patrik Garren', 'Tyler Hall']
      },
      PRI: {
         name: 'Princeton',
         full: 'Princeton University',
         team: ['Patrick Glory', 'Ty Agaisse', 'Marshall Keller', 'Matt Kolodzik', 'Leonard Merkin', 'Dale Tiongson', 'Travis Stefanik', 'Kevin Parker', 'Patrick Brucki', 'Christian Araneo']
      },
      SAC: {
         name: 'Sacred Heart',
         full: 'Sacred Heart University',
         team: ['Ryan Burns', 'Calvin Call', 'Gerard Daly', 'Russell Feye', 'Paul Klee', 'Domenico Celli', 'Anthony Falbo', 'Joseph Toci', 'Mark Blokh', 'Dante DelBonis']
      }     
   };
   exports.model = mod;
})(this);