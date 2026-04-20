/* For this assignment, I experimented with different input
sketches/ images and pre-trained models using pix2pix
style transfer to create my work.

I created simple elements representing my dream of
living in a farm surrounded by animals and flowers.
However, the result was not as aesthetically pleasing as
I expected.

I think this happened because my input sketches and the
training data were too mismatched in terms of the shape,
textures and vibes. If the model used lacked sufficient
examples of certain object categories (e.g. house or snail),
it struggled to successfully transfer the style. Since
pix2pix models rely on edges and structure alignment, my
sketches were too abstract or did not match the
expected structure. Therefore, I learnt that the
effectiveness of each model was highly dependent on
how closely my input drawing matched the data the
model was trained on.

Secondly, I also noticed that some models like the Pikachu
transferred colour more effectively. The yellow and
brown colours appeared in the fence and butterflies
very clearly but the drawings like the house, flower, and
snail turned out dull, black-and-white. These suggest
that datasets with bright colour palettes can influence
the output quality and vibrancy.

Moving forward, I hope to explore making my own
custom models. By curating a dataset that matches my
style and subjects, I can gain greater control over the
outputs and achieve more consistent and personalised
results. This would also deepen my understanding of
how training data can influence the final generated
images.
 */

const SIZE = 256;
let inputImg, inputCanvas, outputContainer, statusMsg, transferBtn, clearBtn;

function setup() {
  inputCanvas = createCanvas(SIZE, SIZE);
  inputCanvas.class("border-box").parent("canvasContainer");

  // Fence 
  inputImg = loadImage("images/fence2.jpg", drawImage);
  // I drew the other 4 images freehand after clicking clear, therefore I did not use any other input images

  outputContainer = select("#output");

  statusMsg = select("#status");
  
  transferBtn = select("#transferBtn");

  clearBtn = select("#clearBtn");

  clearBtn.mousePressed(function () {
    clearCanvas();
  });

  stroke(0);
  pixelDensity(1);
}

function draw() {
  if (mouseIsPressed) {
    strokeWeight(2);
    stroke(0);
    line(mouseX, mouseY, pmouseX, pmouseY);
  }
}

function drawImage() {
  image(inputImg, 0, 0, SIZE, SIZE);

// Pikachu model for fence and butterflies  
  ml5.pix2pix("models/edges2pikachu.pict").ready.then((model) => {
    statusMsg.html("Model Loaded!");

// Below are the other models I used, commented to prevent interference

// Facades model for farmhouse 
// ml5.pix2pix("models/facades_BtoA.pict").ready.then((model) => {
    //statusMsg.html("Model Loaded!");
    
// handbag model for flower and snail
  //ml5.pix2pix("models/edges2handbags_AtoB.pict").ready.then((model) => {
    //statusMsg.html("Model Loaded!");
  

    transfer(model);
    transferBtn.mousePressed(function () {
      transfer(model);
    });
  });
}

function clearCanvas() {
  background(255);
}

function transfer(pix2pix) {
  statusMsg.html("Applying Style Transfer...!");

  const canvasElement = select("canvas").elt;

  pix2pix.transfer(canvasElement).then((result) => {
    outputContainer.html("");
    createImg(result.src).class("border-box").parent("output");
    statusMsg.html("Done!");
  });
}
