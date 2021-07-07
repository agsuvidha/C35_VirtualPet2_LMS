var database ,dog,dog1,dog2
var position
//var form
var feed,add
var foodobject
var Feedtime
var Lastfeed
var movingbottle=-1;
var flyingbottle;
//Create variables here

function preload()

{
  dogimg1 = loadImage("images/dogImg.png")
  dogimg2 = loadImage("images/dogImg1.png")
	//load images here
  bottleimg=loadImage("images/Milk.png")
}

function setup() {
	createCanvas(1000, 500);
  database = firebase.database();
  console.log(database);
 
  foodobject=new Food()
  dog = createSprite(750,250,10,10);
  dog.addImage(dogimg1)
  dog.scale=0.2
 
  var foodStock = database.ref('Food');
  foodStock.on("value", readPosition, showError);
  feed = createButton("Feed Bruno")
  feed.position(700,105)
  feed.mousePressed(FeedDog)
  add = createButton("Add Food")
  add.position(500,105)
  add.mousePressed(AddFood)

} 

function draw(){
 background(46,139,87);

 foodobject.display()
if(movingbottle===1) 
{
  if(flyingbottle.x===dog.x)
  {
    flyingbottle.destroy();
    movingbottle=-1;
  }
}
  

drawSprites();
}

function readPosition(data){
  position = data.val();
  foodobject.updateFoodStock(position)
}

function showError(){
  console.log("Error while writing to the database");
}

function writePosition(x){
  if(x>0){
    x=x-1
  }
  else{
    x=0
  }
  database.ref('/').set({
    'Food': x
  })

}
function AddFood(){
position++
database.ref('/').update({
  Food:position
}

)
}
function FeedDog(){
//for(var mynum=0;mynum<200;mynum++) console.log(frameCount);
movingbottle=1;
flyingbottle = createSprite(150,dog.y,10,10);
  flyingbottle.addImage(bottleimg);
  flyingbottle.scale=0.05;
  flyingbottle.setVelocity(30,0);
dog.addImage(dogimg2)

foodobject.updateFoodStock(foodobject.getFoodStock()-1)
//foodobject.setVelocity(2,0)
//foodobject.moveBottle();

 database.ref('/').update({
   Food:foodobject.getFoodStock(),
   FeedTime:hour ()
 })
}
