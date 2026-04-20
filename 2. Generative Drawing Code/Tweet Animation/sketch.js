/* Since it was Valentine's week, I was inspired to create an abstract 
 * pink rose. 
 * 
 * First I changed the $ to yh as it is my initial and increased the 
 * canvas size so it can fit both letters. I also changed the colour
 * to a darker shade of pink so when it rotates and overlaps it would 
 * look more like a rose. Then I made the transparency low to create 
 * a dreamy glow effect. Lastly I made the translation speed slightly 
 * faster so the dreamy effect can be seen more clearly at one glance. 
 * 
 * I also made i=k=450 since it's a rotation, the starting point doesn't
 * matter
 * 
 * Through this assignment, I learnt how layering, shape of letters and 
 * motion can affect the composition in an animation. I aim 
 * to continue applying these techniques in my future sketches.
 */


i=k=450;
function setup(){createCanvas(950,950);textSize(k)}
function draw(){
 translate(k,k);
 fill(255,0,127,2);
 rotate(i+=.02);
 text("yh",10,0)
}

