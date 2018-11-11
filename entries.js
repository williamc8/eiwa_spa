/**
 * entries.js
 * Entries for the EIWA Pick 4 App
 * (can also be used for unit testing)
 */
(function(exports) {
    var mod = {
    
        bud: {
            fullName: 'bud',
            pick: 'Picks for: bud'

+ '\n\n125: 1. Max Mejia, Harvard.  2. no pick.  3. no pick.  4. no pick. '
+ '\n133: 1. Jeffrey Ott, Harvard.  2. no pick.  3. no pick.  4. no pick. '
+ '\n141: 1. Todd Preston, Harvard.  2. no pick.  3. no pick.  4. no pick. '
+ '\n149: 1. Nick Stager, Harvard.  2. no pick.  3. no pick.  4. no pick. '
+ '\n157: 1. Tyler Grimaldi, Harvard.  2. no pick.  3. no pick.  4. no pick.' 
+ '\n165: 1. Devin Gobbo, Harvard.  2. no pick.  3. no pick.  4. no pick. '
+ '\n174: 1. Eric Morris/Ian Roy, Harvard.  2. no pick.  3. no pick.  4. no pick.' 
+ '\n184: 1. Cameron Croy, Harvard.  2. no pick.  3. no pick.  4. no pick.' 
+ '\n197: 1. James Fox, Harvard.  2. no pick.  3. no pick.  4. no pick.' 
+ '\n285: 1. David Ng, Harvard.  2. no pick.  3. no pick.  4. no pick.' 
        },
        
        d3: {
            fullName: 'D3 for LU',
            pick: 'Picks for: D3 for LU'

+ '\n\n125: 1. Darian Cruz, Lehigh.  2. no pick.  3. no pick.  4. no pick. '
+ '\n133: 1. Mason Beckman, Lehigh.  2. no pick.  3. no pick.  4. no pick. '
+ '\n141: 1. Laike Gardner, Lehigh.  2. no pick.  3. no pick.  4. no pick. '
+ '\n149: 1. Mitch Minotti, Lehigh.  2. no pick.  3. no pick.  4. no pick.' 
+ '\n157: 1. Joey Napoli, Lehigh.  2. no pick.  3. no pick.  4. no pick.' 
+ '\n165: 1. Ben Haas, Lehigh.  2. no pick.  3. no pick.  4. no pick. '
+ '\n174: 1. Eliot Riddick, Lehigh.  2. no pick.  3. no pick.  4. no pick.' 
+ '\n184: 1. Zack Diekel, Lehigh.  2. no pick.  3. no pick.  4. no pick. '
+ '\n197: 1. Jon Bolich, Lehigh.  2. no pick.  3. no pick.  4. no pick. '
+ '\n285: 1. Max Wessell, Lehigh.  2. no pick.  3. no pick.  4. no pick.'
        },
        
        seawolf: {
            fullName: 'seawolf',
            pick: 'Picks for: seawolf'

+ '\n\n125: 1. Nahshon Garrett, Cornell.  2. no pick.  3. no pick.  4. no pick.' 
+ '\n133: 1. Mark Grey, Cornell.  2. no pick.  3. no pick.  4. no pick. '
+ '\n141: 1. Mike Nevinger, Cornell.  2. no pick.  3. no pick.  4. no pick.' 
+ '\n149: 1. Chris Villalonga, Cornell.  2. no pick.  3. no pick.  4. no pick.' 
+ '\n157: 1. Brian Realbuto, Cornell.  2. no pick.  3. no pick.  4. no pick. '
+ '\n165: 1. Dylan Palacio, Cornell.  2. no pick.  3. no pick.  4. no pick. '
+ '\n174: 1. Jesse Shanaman, Cornell.  2. no pick.  3. no pick.  4. no pick. '
+ '\n184: 1. Gabe Dean, Cornell.  2. no pick.  3. no pick.  4. no pick. '
+ '\n197: 1. Jace Bennett, Cornell.  2. no pick.  3. no pick.  4. no pick.' 
+ '\n285: 1. Jacob Aiken-Phillips, Cornell.  2. no pick.  3. no pick.  4. no pick. '
        },

        weh: {
            fullName: 'weh',
            pick: 'Picks for: weh'

+ '\n\n125: 1. Brendan Campbell, Navy.  2. no pick.  3. no pick.  4. no pick.'
+ '\n133: 1. Colton Rasche, Navy.  2. no pick.  3. no pick.  4. no pick.'
+ '\n141: 1. Joe Locksmith, Navy.  2. no pick.  3. no pick.  4. no pick.'
+ '\n149: 1. Ray Borja, Navy.  2. no pick.  3. no pick.  4. no pick.'
+ '\n157: 1. Bobby Burg, Navy.  2. no pick.  3. no pick.  4. no pick.'
+ '\n165: 1. Peyton Walsh, Navy.  2. no pick.  3. no pick.  4. no pick.' 
+ '\n174: 1. Matt Miller, Navy.  2. no pick.  3. no pick.  4. no pick. '
+ '\n184: 1. James Mannier, Navy.  2. no pick.  3. no pick.  4. no pick.' 
+ '\n197: 1. Paul Rands, Navy.  2. no pick.  3. no pick.  4. no pick. '
+ '\n285: 1. Colynn Cook, Navy.  2. no pick.  3. no pick.  4. no pick.' 
        },
        
        // TEST PATTERNS
        
        CDF: {
            fullName: 'CDF',
            pick: 'Picks for: CDF'

+ '\n\n125: 1. Penn Gottfried, Columbia.  2. Nahshon Garrett, Cornell.  3. Tanner Shoap, Drexel.  4. Dan Mantoccio, F & M.'
+ '\n133: 1. Angelo Amenta, Columbia.  2. Mark Grey, Cornell.  3. Kevin Devoy, Drexel.  4. Robert Ruiz, F & M.'
+ '\n141: 1. Joe Moita, Columbia.  2. Ryan Dunphy, Cornell.  3. David Pearce, Drexel.  4. Richard Durso, F & M.' 
+ '\n149: 1. Ryan Ponte, Columbia.  2. Chris Villalonga, Cornell.  3. Matt Cimato, Drexel.  4. Sharron Townsend, F & M.' 
+ '\n157: 1. Markus Scheidel, Columbia.  2. Brian Realbuto, Cornell.  3. Noel Blanco, Drexel.  4. Robert King, F & M.'
+ '\n165: 1. Tyrel White, Columbia.  2. Dylan Palacio, Cornell.  3. Nick Elmer, Drexel.  4. Gordon Boling, F & M.' 
+ '\n174: 1. Shane Hughes, Columbia.  2. Duke Pickett, Cornell.  3. Stephen Loiseau, Drexel.  4. Colin Gironda, F & M.' 
+ '\n184: 1. Zach Hernandez, Columbia.  2. Gabe Dean, Cornell.  3. Alex DeCiantis, Drexel.  4. Paul Alessandrini, F & M.' 
+ '\n197: 1. Matt Ideleson, Columbia.  2. Jace Bennett, Cornell.  3. Joshua Murphy, Drexel.  4. Charles  Kerkesner, F & M.' 
+ '\n285: 1. Garrett Ryan , Columbia.  2. Jacob Aiken-Phillips, Cornell.  3. Alex Foley, Drexel.  4. Alex Henry, F & M.'
        },
        
        odd: {
            fullName: 'Odd Nerdrum',
            pick: 'Picks for: Odd Nerdrum'

+ '\n\n125: 1. David Tereo, American.  2. David White, Binghamton.  3. Paul Petrov, Bucknell.  4. Nahshon Garrett, Cornell.'
+ '\n133: 1. Robert Ruiz, F & M.  2. Travis Passaro, Hofstra.  3. Colton Rasche, Navy.  4. Christian Innarella, Princeton.'
+ '\n141: 1. Michael Sprague, American.  2. Nick Tighe, Binghamton.  3. Tyler Smith, Bucknell.  4. Ryan Dunphy, Cornell.'
+ '\n149: 1. Sharron Townsend, F & M.  2. Cody Ruggirello, Hofstra.  3. Corey Wilding, Navy.  4. Adam Krop, Princeton.'
+ '\n157: 1. John Boyle, American.  2. Vincent Deprez, Binghamton.  3. Rustin Barrick, Bucknell.  4. Brian Realbuto, Cornell.' 
+ '\n165: 1. Gordon Boling, F & M.  2. Nick Terdick, Hofstra.  3. Peyton Walsh, Navy.  4. Jonathan Schleifer, Princeton.'
+ '\n174: 1. Nicholas Carey, American.  2. Vincent Grella, Binghamton.  3. Rory Bonner, Bucknell.  4. Duke Pickett, Cornell.' 
+ '\n184: 1. Paul Alessandrini, F & M.  2. Cory Damiana, Hofstra.  3. Michael Woulfe, Navy.  4. Brett Harner, Princeton.'
+ '\n197: 1. Brett Dempsey, American.  2. Caleb Wallace, Binghamton.  3. Tyler Lyster, Bucknell.  4. Jace Bennett, Cornell.' 
+ '\n285: 1. Alex Henry, F & M.  2. Michael Hughes, Hofstra.  3. Colynn Cook, Navy.  4. Ray O\'Donnell, Princeton.'
        },
        
        even: {
            fullName: 'Even Steven',
            pick: 'Picks for: Even Steven'

+ '\n\n125: 1. Sean Badua, Army.  2. Billy Watterson, Brown.  3. Penn Gottfried, Columbia.  4. Tanner Shoap, Drexel.'
+ '\n133: 1. Ryan Osleeb, Harvard.  2. Mason Beckman, Lehigh.  3. Caleb Richardson, Penn.  4. Tim Johnson, Sacred Heart.'
+ '\n141: 1. Logan Everett, Army.  2. Anthony Finocchiaro, Brown.  3. Joe Moita, Columbia.  4. David Pearce, Drexel.'
+ '\n149: 1. Nick Stager, Harvard.  2. Drew Longo, Lehigh.  3. C. J. Cobb, Penn.  4. Brendan Goldup, Sacred Heart.'
+ '\n157: 1. Russell Parsons, Army.  2. Justin Staudenmayer, Brown.  3. Markus Scheidel, Columbia.  4. Noel Blanco, Drexel.' 
+ '\n165: 1. Tyler Grimaldi, Harvard.  2. Marshall Peppelman, Lehigh.  3. Casey Kent, Penn.  4. Johnny Vrasidas, Sacred Heart.' 
+ '\n174: 1. Brian Harvey, Army.  2. Ricky McDonald, Brown.  3. Shane Hughes, Columbia.  4. Stephen Loiseau, Drexel.'
+ '\n184: 1. Mike Mocco, Harvard.  2. Nathaniel Brown, Lehigh.  3. Lorenzo Thomas, Penn.  4. Elliott Antler, Sacred Heart.' 
+ '\n197: 1. Bryce Barnes, Army.  2. Augustus Marker, Brown.  3. Matt Ideleson, Columbia.  4. Joshua Murphy, Drexel.'
+ '\n285: 1. David Ng, Harvard.  2. Doug Vollaro, Lehigh.  3. Patrik Garren, Penn.  4. Daniel Hayden, Sacred Heart.'     
        },
        
        '4slide': {
            fullName: '4slide',
            pick: 'Picks for: 4Slide'

+ '\n\n125: 1. David Tereo, American.  2. Sean Badua, Army.  3. David White, Binghamton.  4. Billy Watterson, Brown.'
+ '\n133: 1. Grimaldi Gonazalez, Bucknell.  2. Angelo Amenta, Columbia.  3. Mark Grey, Cornell.  4. Kevin Devoy, Drexel.'
+ '\n141: 1. Richard Durso, F & M.  2. Todd Preston, Harvard.  3. Jamel Hudson, Hofstra.  4. Randy Cruz, Lehigh.'
+ '\n149: 1. Corey Wilding, Navy.  2. C. J. Cobb, Penn.  3. Adam Krop, Princeton.  4. Brendan Goldup, Sacred Heart.' 
+ '\n157: 1. John Boyle, American.  2. Russell Parsons, Army.  3. Vincent Deprez, Binghamton.  4. Justin Staudenmayer, Brown.' 
+ '\n165: 1. Robert Schlitt, Bucknell.  2. Tyrel White, Columbia.  3. Dylan Palacio, Cornell.  4. Nick Elmer, Drexel.'
+ '\n174: 1. Colin Gironda, F & M.  2. Josef Johnson, Harvard.  3. Frank Affronti, Hofstra.  4. Santiago Martinez, Lehigh.' 
+ '\n184: 1. Michael Woulfe, Navy.  2. Lorenzo Thomas, Penn.  3. Brett Harner, Princeton.  4. Elliott Antler, Sacred Heart.' 
+ '\n197: 1. Brett Dempsey, American.  2. Bryce Barnes, Army.  3. Caleb Wallace, Binghamton.  4. Augustus Marker, Brown.'
+ '\n285: 1. Joe Stolfi, Bucknell.  2. Garrett Ryan , Columbia.  3. Jacob Aiken-Phillips, Cornell.  4. Alex Foley, Drexel'
        }
        
    };
    exports.entries = mod;    
})(this);