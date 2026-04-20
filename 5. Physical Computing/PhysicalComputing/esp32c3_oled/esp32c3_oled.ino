/*
For this assignment, I wanted to create something fun so I looked for emoji templates online that I could display on the small screen. 
However, I realised that Arduino could not recognise emojis and certain symbols like these (ᓚᘏᕐᐷ 𓇼 ⋆.˚ 𓆉 𓆝 𓆡⋆.˚). I felt a little 
disappointed at first, but I decided to explore other ways to create something cute. While experimenting, I noticed that a pattern 
like >;;;;.> resembled a fishbone, which inspired a new idea.

After I input my characters into the internal memory, I found that they looked small. To improve visibility, I adjusted to a larger font
from B10 to B12. I also realised the word is too cramped with the pattern, so I shifted it downwards from 10 to 20, giving more space
to view the pattern. It still looked cramped but I believe 20 was best number I could use to prevent the text from going off-screen.

As this was my first time doing physical computing, the wires and components seemed overwhelming at the beginning. However, once I 
started assembling everything, I realised it was actually quite simple. Overall, I really enjoyed this lesson and the process of 
experimenting with different ideas.

*/

#include <Arduino.h>
#include <U8g2lib.h>
#include <Wire.h>

#define SDA_PIN 5
#define SCL_PIN 6

U8G2_SSD1306_72X40_ER_F_HW_I2C u8g2(U8G2_R0,  U8X8_PIN_NONE);  

void setup(void) {
  Wire.begin(SDA_PIN, SCL_PIN);
  u8g2.begin();
}

void loop(void) {
  u8g2.clearBuffer();    

  u8g2.setFont(u8g2_font_ncenB12_tr); 
 
  u8g2.drawStr(0,10," >;;;;.>"); 
  u8g2.drawStr(0,20," fishbone ");
 
  u8g2.sendBuffer();                  
  delay(1000);  
}