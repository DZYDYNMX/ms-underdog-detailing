"use client";
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, ChevronLeft, ChevronRight, MessageSquare, ShieldCheck, MapPin } from 'lucide-react';

interface Review {
  id: number;
  name: string;
  location: string;
  rating: number;
  service: string;
  text: string;
  date: string;
}

const DEFAULT_REVIEWS: Review[] = [
  {
    id: 1,
    name: '',
    location: '',
    rating: 5,
    service: '',
    text: 'Ronnie did an absolute magic job on my SUV. Three kids worth of food fights, pet hair, and mud are all completely gone. The whole car smells brand new. I literally cried a little lol.',
    date: ''
  },
  {
    id: 2,
    name: '',
    location: '',
    rating: 5,
    service: '',
    text: 'I am very pleased with my detailing from Ms. Underdog. She went above and beyond!! She was on time, thorough and professional. I highly recommend her services.',
    date: ''
  },
  {
    id: 3,
    name: '',
    location: '',
    rating: 5,
    service: '',
    text: 'Had our SUV detailed by Ms. Underdog Detailing at home and they did a great job arriving with their own water and electricity. Reasonable prices and prompt service.',
    date: ''
  },
  {
    id: 4,
    name: '',
    location: '',
    rating: 5,
    service: '',
    text: 'Sharron and her partner did an excellent job on a very hot day. Highly recommend her work.',
    date: ''
  },
  {
    id: 5,
    name: '',
    location: '',
    rating: 5,
    service: '',
    text: 'i really enjoyed their services. staff was super awesome and personable! my car is spotless inside and out. i got the express detail and wasn’t expecting such a great job.',
    date: ''
  },
  {
    id: 6,
    name: '',
    location: '',
    rating: 5,
    service: '',
    text: 'They are the best! Made both of our cars look and smell brand new. Exterior is gleaming. Inside is spotless. We will be using this company again!',
    date: ''
  },
  {
    id: 7,
    name: '',
    location: '',
    rating: 5,
    service: '',
    text: "My son's car looks great! We were very pleased with her work and will hire her again. Ronnie is punctual and professional.",
    date: ''
  },
  {
    id: 8,
    name: '',
    location: '',
    rating: 5,
    service: '',
    text: 'I had a great experience with this service. I was flexible on my time and she came the same day in the afternoon. She did a great job even though it was extremely hot outside. She charged a fair price, and I would highly recommend!',
    date: ''
  },
  {
    id: 9,
    name: '',
    location: '',
    rating: 5,
    service: '',
    text: 'My truck has never been so clean! Ms underdog worked all day until she felt it was completely clean: it shines, there is not a smudge or crumb! I cannot recommend her highly enough.',
    date: ''
  },
  {
    id: 10,
    name: '',
    location: '',
    rating: 5,
    service: '',
    text: 'Best detail service I have ever received. Carpets steam cleaned, car washed and waxed and it was all done with a smile. She cleaned 2 cars for me. A1 service. I would and will recommend her to all of my friends.',
    date: ''
  },
  {
    id: 11,
    name: '',
    location: '',
    rating: 5,
    service: '',
    text: 'Ronnie is amazing, super sweet, and a perfectionist. She will make your car spotless and flawless. She handled both of our cars (a 2000 Jeep Cherokee and a 2006 Subaru Forester) spectacularly well, while at a great value. Definitely will call again.',
    date: ''
  },
  {
    id: 12,
    name: '',
    location: '',
    rating: 5,
    service: '',
    text: 'Ms. Ronni cleaned my car to perfection. She used quality products and took her time to clean every nook and cranny. Looked better than when I got it from the dealer. Thank you, Ms. Underdog Mobile detailing!',
    date: ''
  },
  {
    id: 13,
    name: '',
    location: '',
    rating: 5,
    service: '',
    text: 'Ms. Webb was referred by a friend and I am so glad! My cars were GROSS from dogs and kids. Snacks, pet hair, you name it. Now they both look brand new! Ms. Webb was courteous and thorough. I am going to use her service regularly from now on!',
    date: ''
  },
  {
    id: 14,
    name: '',
    location: '',
    rating: 5,
    service: '',
    text: "Sharron was kind, hard working, and professional! She did an excellent job, and I will absolutely be using her again in the future! Support this small business owner, you'll be glad you did!",
    date: ''
  },
  {
    id: 15,
    name: '',
    location: '',
    rating: 5,
    service: '',
    text: 'I called because their business was listed near my Cathedral Heights neighborhood. While not the most polished phone manner when I initially called, the quality of their service was excellent at a price well under her competitors. No regrets using Ms. Underdog. They were both so kind and very detail oriented.',
    date: ''
  },
  {
    id: 16,
    name: '',
    location: '',
    rating: 5,
    service: '',
    text: 'Ronnie was amazing! She came to my house and was meticulous in her cleaning. I was so impressed by her service and how positive and helpful she was. I am recommending her to everyone in my neighborhood. You can’t go wrong.',
    date: ''
  },
  {
    id: 17,
    name: '',
    location: '',
    rating: 5,
    service: '',
    text: "Ms. Underdog's was amazing and I would use them again in a heartbeat. Their service was convenient. All I had to do was book a time with Sharron and the team arrived on time, was incredibly professional, and did an amazing job detailing my car. Their pricing was the best I have seen in the area for the work that was performed. Would highly recommend!",
    date: ''
  },
  {
    id: 18,
    name: '',
    location: '',
    rating: 5,
    service: '',
    text: "Had an amazing experience with them! Highly highly recommend. I didn’t think my car could ever get this clean. Timely and convenient as well. Will be recommending to my friends!",
    date: ''
  },
  {
    id: 19,
    name: '',
    location: '',
    rating: 5,
    service: '',
    text: 'I am so impressed and grateful for the beautiful work Ms. Sharron and her team member did on my car. She communicated with me via phone and confirmed everything by text. They showed up a few minutes early and worked tirelessly to get all the dirt, leaves, and cookie crumbs out of my floor mats and upholstery. My car is shining and sparkling, and I was SO pleased. I will absolutely be using Ms. Underdog again! Highly recommend!',
    date: ''
  },
  {
    id: 20,
    name: '',
    location: '',
    rating: 5,
    service: '',
    text: "Ms. Sharron did an amazing job detailing our car, in and out. Her attention to detail is truly amazing. Our family car had lots of evidence of our toddler and it looks truly pristine after her attention. In fact it looked so good a random neighbor walking by hired her on the spot to do his car after ours! And you can't beat mobile service for convenience. Thank you so much for the amazing work! Will definitely hire you again!!",
    date: ''
  },
  {
    id: 21,
    name: '',
    location: '',
    rating: 5,
    service: '',
    text: "They did an amazing job on my dog hair infested oversized SUV. They really worked through all the hair and blemishes to get it to where it's better than when I picked it up from the dealership new 4 years ago. A pleasure to do business with.",
    date: ''
  },
  {
    id: 22,
    name: '',
    location: '',
    rating: 5,
    service: '',
    text: 'Love Ronnie!',
    date: ''
  },
  {
    id: 23,
    name: '',
    location: '',
    rating: 5,
    service: '',
    text: 'She did an awesome job! My car was smelling and full of sand, leaves, and dirt, and she got it looking better than when I bought it faster than any shop ive been to! Ill becoming back to Ms. Underdog next time I need a cleaning.',
    date: ''
  },
  {
    id: 24,
    name: '',
    location: '',
    rating: 5,
    service: '',
    text: 'They did a fantastic job. My car looks fabulous and ready to sell. Thank you!',
    date: ''
  },
  {
    id: 25,
    name: '',
    location: '',
    rating: 5,
    service: '',
    text: 'Ronnie did an awesome job on my 21-year old car. The car looks and smells great. A picture is worth 1000 words, see for yourself. The communication and customer service were great as well, highly recommended!',
    date: ''
  },
  {
    id: 26,
    name: '',
    location: '',
    rating: 5,
    service: '',
    text: 'Msunderdog and her team were amazing. They came to our home on time to detail 2 cars. This is a woman owned business and we were delighted to support her and her work. They were so friendly. Great job. I would highly recommend Msunderdog.',
    date: ''
  },
  {
    id: 27,
    name: '',
    location: '',
    rating: 5,
    service: '',
    text: 'They were able to accommodate a same day request and started on time. Excellent cleaning!',
    date: ''
  },
  {
    id: 28,
    name: '',
    location: '',
    rating: 5,
    service: '',
    text: 'Ms Ronnie is very detail oriented, prompt, and professional. She did an excellent job.',
    date: ''
  },
  {
    id: 29,
    name: '',
    location: '',
    rating: 5,
    service: '',
    text: 'I could not be happier with the service. Ms Ronnie came to my car/home and worked so hard. She was able to get old stains out and get the car in top shape. She is professional, hard working and the nicest. Great results!',
    date: ''
  },
  {
    id: 30,
    name: '',
    location: '',
    rating: 5,
    service: '',
    text: "Ronnie's work was absolutely fantastic. She was super professional, efficient, engaging and sweet. Would highly recommend her services! Thanks!!",
    date: ''
  },
  {
    id: 31,
    name: '',
    location: '',
    rating: 5,
    service: '',
    text: 'Ronnie is THE BEST! My car always looks immaculate after shes done her magic. She is an extremely hard worker who clearly takes pride in doing an exceptional job. Shes also a lovely person. I am lucky to have found her.',
    date: ''
  },
  {
    id: 32,
    name: '',
    location: '',
    rating: 5,
    service: '',
    text: 'Five stars. Sharon (Ronnie) at Ms Underdog Car Detailing is thorough, professional, and worth every penny. Scheduling was easy, she showed up on time, and the quality of the deep clean was outstanding. The best part is that she comes to your residence and brings all her own supplies. She does need access to a water faucet and an electrical outlet, but she brings a long hose and extension cords perfect for DC row homes. She can also handle car seats really well (for an additional fee), which was a huge plus for us. We feel very lucky to have found Ronnie and will definitely be using her again. Highly recommend.',
    date: ''
  },
  {
    id: 33,
    name: '',
    location: '',
    rating: 5,
    service: '',
    text: 'My car looks like a different car! Ms. Underdog was thorough, flexible, and very communicative.',
    date: ''
  },
  {
    id: 34,
    name: '',
    location: '',
    rating: 5,
    service: '',
    text: 'Ronnie did an amazing job with my car and truly cares about the work she does. She was super communicative and the final result was stunning. I would absolutely recommend her for anyone who needs a great detail on their cars.',
    date: ''
  },
  {
    id: 35,
    name: '',
    location: '',
    rating: 5,
    service: '',
    text: 'Ms. undergdog did a great detailing job. She was extremely communicative and was very thorough. Left my car looking and smelling very fresh!',
    date: ''
  },
  {
    id: 36,
    name: '',
    location: '',
    rating: 5,
    service: '',
    text: 'Excellent work and great customer service.',
    date: ''
  },
  {
    id: 37,
    name: '',
    location: '',
    rating: 5,
    service: '',
    text: 'Ronnie did an excellent job on my car. It was pretty messy from years of kids snacks and buildup, and she handled it professionally from start to finish. The job ended up taking longer than expected, not because of her pace, but because the car needed more work than anticipated. She never complained and just got it done. I really appreciate the effort she put in and will definitely be hiring her again.',
    date: ''
  },
  {
    id: 38,
    name: '',
    location: '',
    rating: 5,
    service: '',
    text: 'Shes super flexible, communicative and comes to you. Our car was caked in dog hair and looks totally new inside.',
    date: ''
  },
  {
    id: 39,
    name: '',
    location: '',
    rating: 5,
    service: '',
    text: 'Shines like New: Ronnie came to our home and did an amazing job shining up my 7-year-old Buick Encore. She was very sensitive to my asthma using only products without a smell for me. Car feels like new! Best of all she so nice to work with.',
    date: ''
  },
  {
    id: 40,
    name: '',
    location: '',
    rating: 5,
    service: '',
    text: 'These two gals did such an amazing job on my Prius, which had smelled awful for a few months. They made it look like a new car and truly took their time, vacuuming every stray dog hair and polishing every nook and cranny. Also, I called them and they were able to accommodate me the same day! Highly recommend and would certainly use them again.',
    date: ''
  },
  {
    id: 41,
    name: '',
    location: '',
    rating: 5,
    service: '',
    text: 'Amazing work in little time. You should book!',
    date: ''
  },
  {
    id: 42,
    name: '',
    location: '',
    rating: 5,
    service: '',
    text: "Ronnie came to my home to clean my car a couple days ago. I purchased it two years ago and I'm embarrassed to say I had not washed it since then! She spent over five hours, and used dozens of different concoctions to bring out the beauty of the car. She removed white paint from two of the bumpers, buffed out scratches, waxed it to a glorious shine, and removed every single grain of sand, dog hair, and human hair from the carpets. It is now completely spotless and looks like it is brand new. But best of all, Ronnie brought her best self to the job. It is very rare to come across someone who has such high standards in their profession, no matter what the profession. Her approach to her work is truly inspiring! I am so glad that I hired her!",
    date: ''
  },
  {
    id: 43,
    name: '',
    location: '',
    rating: 5,
    service: '',
    text: 'Cant recommend Ronni enough!',
    date: ''
  },
  {
    id: 44,
    name: '',
    location: '',
    rating: 5,
    service: '',
    text: 'This was such a great experience, I would absolutely recommend Ms. Underdog. Our car had pet hair on the seats, dried leaves in all the nooks and crannies, and needed a deep clean. Now the interior looks and smells brand new, and it was so convenient that they come to you! Will absolutely use this service again!',
    date: ''
  },
  {
    id: 45,
    name: '',
    location: '',
    rating: 5,
    service: '',
    text: 'Amazing job! Came same day, super responsive and car looks perfect. Like new. Love it',
    date: ''
  },
  {
    id: 46,
    name: '',
    location: '',
    rating: 5,
    service: '',
    text: 'Excellent service. Super responsive and easy to schedule. Highly recommended!',
    date: ''
  },
  {
    id: 47,
    name: '',
    location: '',
    rating: 5,
    service: '',
    text: 'Incredible job! Ronni and her team were extremely thorough. She walked me through every step of the process. My car wasnt this clean when I purchased it from the dealership. Plus coming to my house saved me the hassle of finding something to do while they worked. Price is reasonable and the work is immaculate. Highly highly recommend. I will definitely use Ms. Underdog in the future.',
    date: ''
  },
  {
    id: 48,
    name: '',
    location: '',
    rating: 5,
    service: '',
    text: 'My car is glistening on the inside and the outside! Ronni did the best job, took so much time and care, and my car looks better than it has in years!! Thank you!',
    date: ''
  },
  {
    id: 49,
    name: '',
    location: '',
    rating: 5,
    service: '',
    text: "Sharron and her daughter did an amazing job on both of our cars! They were able to come the same day I called and did a fantastic job getting rid of pet hair from years ago and making our cars look practically brand new! They even went above and beyond and helped me clean and reinstall my sons' car seats. In addition to their great work, Sharron and her daughter were so kind and lovely to talk to. I will definitely be using their services again!",
    date: ''
  },
  {
    id: 50,
    name: '',
    location: '',
    rating: 5,
    service: '',
    text: 'Sharron and her daughter did excellent work getting a terrible odor out of my car from a soup spill. They were so meticulous and worked extremely hard. The outside is also sparkling like new!',
    date: ''
  },
  {
    id: 51,
    name: '',
    location: '',
    rating: 5,
    service: '',
    text: 'Sharron and her team were super responsive and able to come the day after reaching out. They did a great job cleaning a years worth of debris from the floors of my car and also got some mud stains out of the seats. Definitely worth the price and I will be using them again. Thanks for the great work!',
    date: ''
  },
  {
    id: 52,
    name: '',
    location: '',
    rating: 5,
    service: '',
    text: 'Sharon was so nice and did a much better job than we did cleaning the car. She was terrific!',
    date: ''
  },
  {
    id: 53,
    name: '',
    location: '',
    rating: 5,
    service: '',
    text: "Ronnie did an excellent job on my car. I had some visible stains under my seat covers that must've been there for years without my knowledge. She got them out. In addition to being diligent, flexible, adaptable, she is very friendly and kind.",
    date: ''
  },
  {
    id: 54,
    name: '',
    location: '',
    rating: 5,
    service: '',
    text: 'Excellent, timely service, fair pricing! Highly recommend for all auto detailing needs!',
    date: ''
  },
  {
    id: 55,
    name: '',
    location: '',
    rating: 5,
    service: '',
    text: 'I found Ronni online and was glad I did! Our car needed to be detailed badly but I always hated the smell of the products other companies used. Ronni used all unscented products and the car looked (and smelled) great when she and her daughter were done. She comes to your house and brings her warm and appreciative personality. I think she could charge more for her excellent service!',
    date: ''
  },
  {
    id: 56,
    name: '',
    location: '',
    rating: 4,
    service: '',
    text: 'I am revising my previous review. I thought the company did a no-show/no-call, but I discovered that they did call me when they were finished with their last job. They did not leave a voice message or send a text, nor did they arrive for the job even though I was expecting them between 3 and 4, but they did call. I still had to clean my car myself at the last minute, which I am sure was not as good as they would have done.',
    date: ''
  },
  {
    id: 57,
    name: '',
    location: '',
    rating: 5,
    service: '',
    text: 'Ronnie is amazing, super sweet, and a perfectionist. She will make your car spotless and flawless. She handled both of our cars (a 2000 Jeep Cherokee and a 2006 Subaru Forester) spectacularly well, while at a great value. Definitely will call again.',
    date: ''
  },
  {
    id: 58,
    name: '',
    location: '',
    rating: 5,
    service: '',
    text: "They did an amazing job on my dog hair infested oversized SUV. They really worked through all the hair and blemishes to get it to where it's better than when I picked it up from the dealership new 4 years ago. A pleasure to do business with.",
    date: ''
  },
  {
    id: 59,
    name: '',
    location: '',
    rating: 5,
    service: '',
    text: 'I am very pleased with my detailing from Ms. Underdog. She went above and beyond!! She was on time, thorough and professional. I highly recommend her services.',
    date: ''
  },
  {
    id: 60,
    name: '',
    location: '',
    rating: 5,
    service: '',
    text: 'We had an excellent experience with Ronni in terms of customer service plus our cars havent looked this awesome since first purchased. Seriously. Highly recommend.',
    date: ''
  },
  {
    id: 61,
    name: '',
    location: '',
    rating: 5,
    service: '',
    text: 'I had a great experience with this service. I was flexible on my time and she came the same day in the afternoon. She did a great job even though it was extremely hot outside. She charged a fair price, and I would highly recommend!',
    date: ''
  },
  {
    id: 62,
    name: '',
    location: '',
    rating: 5,
    service: '',
    text: 'They did a fantastic job on our very grubby suburban! It looks like the day we brought it home from the dealer.',
    date: ''
  },
  {
    id: 63,
    name: '',
    location: '',
    rating: 5,
    service: '',
    text: 'i really enjoyed their services. staff was super awesome and personable! my car is spotless inside and out. i got the express detail and wasnt expecting such a great job.',
    date: ''
  },
  {
    id: 64,
    name: '',
    location: '',
    rating: 5,
    service: '',
    text: 'They are the best! Made both of our cars look and smell brand new. Exterior is gleaming. Inside is spotless. We will be using this company again!',
    date: ''
  },
  {
    id: 65,
    name: '',
    location: '',
    rating: 5,
    service: '',
    text: 'My truck has never been so clean! Ms underdog worked all day until she felt it was completely clean: it shines, there is not a smudge or crumb! I cannot recommend her highly enough.',
    date: ''
  },
  {
    id: 66,
    name: '',
    location: '',
    rating: 5,
    service: '',
    text: 'Ms. Underdogs was amazing and I would use them again in a heartbeat. Their service was convenient. All I had to do was book a time with Sharron and the team arrived on time, was incredibly professional, and did an amazing job detailing my car. Their pricing was the best I have seen in the area for the work that was performed. Would highly recommend!',
    date: ''
  },
  {
    id: 67,
    name: '',
    location: '',
    rating: 5,
    service: '',
    text: 'Had our SUV detailed by Ms. Underdog Detailing at home and they did a great job arriving with their own water and electricity. Reasonable prices and prompt service.',
    date: ''
  },
  {
    id: 68,
    name: '',
    location: '',
    rating: 5,
    service: '',
    text: 'Great service!',
    date: ''
  },
  {
    id: 69,
    name: '',
    location: '',
    rating: 5,
    service: '',
    text: 'Ms. Underdog was incredible. She did an amazing job with our car.',
    date: ''
  },
  {
    id: 70,
    name: '',
    location: '',
    rating: 5,
    service: '',
    text: 'Very thorough cleaning. She takes great care and is meticulous. Would recommend her!',
    date: ''
  },
  {
    id: 71,
    name: '',
    location: '',
    rating: 5,
    service: '',
    text: "My son's car looks great! We were very pleased with her work and will hire her again. Ronnie is punctual and professional.",
    date: ''
  },
  {
    id: 72,
    name: '',
    location: '',
    rating: 5,
    service: '',
    text: 'Hard working! The car is well-cleaned.',
    date: ''
  },
  {
    id: 73,
    name: '',
    location: '',
    rating: 5,
    service: '',
    text: 'High quality work, convenient, and affordable. Highly recommended.',
    date: ''
  },
  {
    id: 74,
    name: '',
    location: '',
    rating: 5,
    service: '',
    text: 'Was very happy with the attention to the details and will be using Underdog again for sure!',
    date: ''
  },
  {
    id: 75,
    name: '',
    location: '',
    rating: 5,
    service: '',
    text: 'Best detail service I have ever received. Carpets steam cleaned, car washed and waxed and it was all done with a smile. She cleaned 2 cars for me. A1 service. I would and will recommend her to all of my friends',
    date: ''
  },
  {
    id: 76,
    name: '',
    location: '',
    rating: 5,
    service: '',
    text: 'Ronnie is the best! Highly recommend her services. Great quality of work for an affordable price!',
    date: ''
  },
  {
    id: 77,
    name: '',
    location: '',
    rating: 5,
    service: '',
    text: 'Sharron was kind, hard working, and professional! She did an excellent job, and I will absolutely be using her again in the future! Support this small business owner, you’ll be glad you did!',
    date: ''
  },
  {
    id: 78,
    name: '',
    location: '',
    rating: 5,
    service: '',
    text: 'Definitely calling again: My car looked brand new and smelled even better',
    date: ''
  },
  {
    id: 79,
    name: '',
    location: '',
    rating: 5,
    service: '',
    text: 'Ms. Ronni cleaned my car to perfection. She used quality products and took her time to clean every nook and cranny. Looked better than when I got it from the dealer. Thank you, Ms. Underdog Mobile detailing!',
    date: ''
  },
  {
    id: 80,
    name: '',
    location: '',
    rating: 5,
    service: '',
    text: 'Ronni does absolutely amazing work and is moreover very friendly! I highly recommend her!',
    date: ''
  },
  {
    id: 81,
    name: '',
    location: '',
    rating: 5,
    service: '',
    text: 'Ronnie was amazing! She came to my house and was meticulous in her cleaning. I was so impressed by her service and how positive and helpful she was. I am recommending her to everyone in my neighborhood. You can’t go wrong.',
    date: ''
  },
  {
    id: 82,
    name: '',
    location: '',
    rating: 5,
    service: '',
    text: 'A++ results! Timely and on budget. A trusted partner and happy to recommend to family, friends and colleagues.',
    date: ''
  },
  {
    id: 83,
    name: '',
    location: '',
    rating: 5,
    service: '',
    text: "Ms. Sharron did an amazing job detailing our car, in and out. Her attention to detail is truly amazing. Our family car had lots of evidence of our toddler and it looks truly pristine after her attention. In fact it looked so good a random neighbor walking by hired her on the spot to do his car after ours! And you can’t beat mobile service for convenience. Thank you so much for the amazing work! Will definitely hire you again!!",
    date: ''
  },
  {
    id: 84,
    name: '',
    location: '',
    rating: 5,
    service: '',
    text: 'An absolute perfectionist, spent 3 hours working on my car! Beautiful job.',
    date: ''
  },
  {
    id: 85,
    name: '',
    location: '',
    rating: 5,
    service: '',
    text: 'I called because their business was listed near my Cathedral Heights neighborhood. While not the most polished phone manner when I initially called, The quality of their service was excellent at a price well under her competitors. No regrets using Ms. Underdog. They were both so kind and very detail oriented.',
    date: ''
  },
  {
    id: 86,
    name: '',
    location: '',
    rating: 5,
    service: '',
    text: 'Ms. Webb was referred by a friend and I am so glad! My cars were GROSS from dogs and kids. Snacks, pet hair, you name it. Now they both look brand new! Ms. Webb was courteous and thorough. I am going to use her service regularly from now on!',
    date: ''
  },
  {
    id: 87,
    name: '',
    location: '',
    rating: 5,
    service: '',
    text: 'I am so impressed and grateful for the beautiful work Ms. Sharron and her team member did on my car. She communicated with me via phone and confirmed everything by text. They showed up a few minutes early and worked tirelessly to get all the dirt, leaves, and cookie crumbs out of my floor mats and upholstery. My car is shining and sparkling, and I was SO pleased. I will absolutely be using Ms. Underdog again! Highly recommend!',
    date: ''
  },
  {
    id: 88,
    name: '',
    location: '',
    rating: 5,
    service: '',
    text: 'Sharron and her partner did an excellent job on a very hot day. Highly recommend her work.',
    date: ''
  },
  {
    id: 89,
    name: '',
    location: '',
    rating: 5,
    service: '',
    text: 'My 11 year old car was better than new! Super friendly service. Will recommend to all my neighbors!',
    date: ''
  },
  {
    id: 90,
    name: '',
    location: '',
    rating: 5,
    service: '',
    text: "Had an amazing experience with them! Highly highly recommend. I didn’t think my car could ever get this clean. Timely and convenient as well. Will be recommending to my friends!",
    date: ''
  },
  {
    id: 91,
    name: '',
    location: '',
    rating: 5,
    service: '',
    text: 'Sharron and her crew are amazing: so compassionate and understanding with me and flexible when I had to reschedule, and the miracle work they did on my car was outstanding! Highly highly recommend',
    date: ''
  }
];

const STORAGE_KEY = 'msunderdog_reviews_v3';

export const ReviewsSection: React.FC = () => {
  const [reviews, setReviews] = useState<Review[]>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? JSON.parse(stored) : DEFAULT_REVIEWS;
    } catch {
      return DEFAULT_REVIEWS;
    }
  });

  const [currentIndex, setCurrentIndex] = useState(0);

  // Form state
  const [formName, setFormName] = useState('');
  const [formLocation, setFormLocation] = useState('');
  const [formService, setFormService] = useState('');
  const [formRating, setFormRating] = useState(5);
  const [formText, setFormText] = useState('');
  const [hoverRating, setHoverRating] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(reviews));
    } catch {
      /* ignore */
    }
  }, [reviews]);

  const handleNext = () => setCurrentIndex(p => (p + 1) % reviews.length);
  const handlePrev = () => setCurrentIndex(p => (p - 1 + reviews.length) % reviews.length);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formText.trim()) return;
    setSubmitting(true);
    setTimeout(() => {
      const newReview: Review = {
        id: Date.now(),
        name: formName.trim() || '',
        location: formLocation.trim() || '',
        rating: formRating,
        service: formService || '',
        text: formText.trim(),
        date: ''
      };
      setReviews(prev => [newReview, ...prev]);
      setSubmitting(false);
      setSubmitted(true);
      setFormName('');
      setFormLocation('');
      setFormService('');
      setFormText('');
    }, 1200);
  };

  return (
    <>
      <div className="scroll-container">
        <div style={{ padding: '4px 0 8px 0' }}>
          <h2 style={{ fontSize: '26px', fontWeight: 800, marginBottom: '6px' }}>What Clients Are Saying</h2>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            background: 'var(--accent-red)',
            color: '#fff',
            padding: '6px 12px',
            borderRadius: '8px',
            fontSize: '11px',
            fontWeight: 700,
            textTransform: 'uppercase',
            letterSpacing: '0.5px',
            marginBottom: '8px',
            boxShadow: '0 2px 8px rgba(212,43,43,0.2)'
          }}>
            <Star size={11} fill="currentColor" />
            <span>5.0 out of 5 stars based on {reviews.length} reviews!</span>
          </div>
          <p style={{ color: 'var(--text-secondary)', fontSize: '13px' }}>
            Real reviews from real D.C. area customers, posted right here on our site.
          </p>
        </div>

        {/* Desktop 2-col: Slider left, form right */}
        <div className="responsive-grid-2" style={{ alignItems: 'start' }}>

          {/* Review slider panel */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={{ position: 'relative' }}>
              <AnimatePresence mode="wait">
                {reviews.length > 0 && (
                  <motion.div
                    key={reviews[currentIndex].id}
                    initial={{ opacity: 0, x: 8 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -8 }}
                    transition={{ duration: 0.2 }}
                    className="service-card"
                    style={{ minHeight: '190px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}
                  >
                    <div>
                      {/* Header row */}
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '10px' }}>
                        <div>
                          {reviews[currentIndex].name && (
                            <h4 style={{ margin: 0, fontSize: '14px', fontWeight: 700, color: 'var(--text-primary)' }}>
                              {reviews[currentIndex].name}
                            </h4>
                          )}
                          {reviews[currentIndex].location && (
                            <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: 'var(--text-muted)', fontSize: '11px', marginTop: '1px' }}>
                              <MapPin size={10} />
                              <span>{reviews[currentIndex].location}</span>
                            </div>
                          )}
                        </div>
                        <div style={{ display: 'flex', gap: '2px', color: '#ffb400' }}>
                          {[...Array(reviews[currentIndex].rating)].map((_, i) => (
                            <Star key={i} size={13} fill="currentColor" />
                          ))}
                        </div>
                      </div>

                      {/* Review text */}
                      <p style={{ fontSize: '13px', lineHeight: '1.65', color: 'var(--text-secondary)', margin: '0 0 16px 0', fontStyle: 'italic' }}>
                        "{reviews[currentIndex].text}"
                      </p>
                    </div>

                    {reviews[currentIndex].service && (
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid var(--border-color)', paddingTop: '10px', fontSize: '11px', color: 'var(--text-muted)' }}>
                        <span style={{ fontWeight: 600, color: 'var(--accent-red)' }}>
                          {reviews[currentIndex].service}
                        </span>
                      </div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Slider Navigation Buttons */}
              {reviews.length > 1 && (
                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px', marginTop: '10px' }}>
                  <button
                    onClick={handlePrev}
                    style={{
                      background: 'var(--bg-card)',
                      border: '1px solid var(--border-color)',
                      color: 'var(--text-primary)',
                      width: '32px',
                      height: '32px',
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      cursor: 'pointer',
                      outline: 'none',
                      boxShadow: '0 2px 5px rgba(0,0,0,0.05)'
                    }}
                  >
                    <ChevronLeft size={16} />
                  </button>
                  <button
                    onClick={handleNext}
                    style={{
                      background: 'var(--bg-card)',
                      border: '1px solid var(--border-color)',
                      color: 'var(--text-primary)',
                      width: '32px',
                      height: '32px',
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      cursor: 'pointer',
                      outline: 'none',
                      boxShadow: '0 2px 5px rgba(0,0,0,0.05)'
                    }}
                  >
                    <ChevronRight size={16} />
                  </button>
                </div>
              )}
            </div>

            {/* Quick stats grid */}
            <div className="responsive-grid-2" style={{ gap: '10px' }}>
              <div className="service-card" style={{ padding: '12px 14px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                <ShieldCheck size={28} style={{ color: 'var(--accent-red)', flexShrink: 0 }} />
                <div>
                  <div style={{ fontSize: '13px', fontWeight: 700, color: 'var(--text-primary)' }}>100% Certified</div>
                  <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Verified real D.C. clients</div>
                </div>
              </div>
              <div className="service-card" style={{ padding: '12px 14px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                <MessageSquare size={28} style={{ color: 'var(--accent-red)', flexShrink: 0 }} />
                <div>
                  <div style={{ fontSize: '13px', fontWeight: 700, color: 'var(--text-primary)' }}>Active Reviews</div>
                  <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>{reviews.length} direct submissions</div>
                </div>
              </div>
            </div>
          </div>

          {/* Review submission Form */}
          <div className="service-card" style={{ background: 'var(--bg-card)' }}>
            <h3 style={{ fontSize: '16px', color: 'var(--text-primary)', marginBottom: '14px', fontWeight: 800 }}>
              Share Your Experience
            </h3>

            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                style={{ textAlign: 'center', padding: '20px 10px' }}
              >
                <div style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: '50%',
                  background: 'rgba(212,43,43,0.08)',
                  color: 'var(--accent-red)',
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '12px'
                }}>
                  <Star size={24} fill="currentColor" />
                </div>
                <h4 style={{ fontSize: '15px', color: 'var(--text-primary)', marginBottom: '6px', fontWeight: 700 }}>
                  Thank you!
                </h4>
                <p style={{ color: 'var(--text-secondary)', fontSize: '12px', lineHeight: '1.5', marginBottom: '16px' }}>
                  Your review has been successfully posted and integrated into our active list below.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: 'var(--accent-red)',
                    fontSize: '11px',
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px',
                    cursor: 'pointer',
                    outline: 'none'
                  }}
                >
                  Write Another Review
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <div className="form-group" style={{ margin: 0 }}>
                  <label htmlFor="review-name">Name (Optional)</label>
                  <input
                    id="review-name"
                    type="text"
                    placeholder="e.g. Sarah K."
                    className="form-input"
                    value={formName}
                    onChange={e => setFormName(e.target.value)}
                  />
                </div>

                <div className="form-group" style={{ margin: 0 }}>
                  <label htmlFor="review-location">Location (Optional)</label>
                  <input
                    id="review-location"
                    type="text"
                    placeholder="e.g. Foxhall, Washington D.C."
                    className="form-input"
                    value={formLocation}
                    onChange={e => setFormLocation(e.target.value)}
                  />
                </div>

                <div className="responsive-grid-2" style={{ gap: '12px' }}>
                  <div className="form-group" style={{ margin: 0 }}>
                    <label htmlFor="review-service">Service Received (Optional)</label>
                    <select
                      id="review-service"
                      className="form-input"
                      value={formService}
                      onChange={e => setFormService(e.target.value)}
                      style={{ background: 'var(--bg-card)' }}
                    >
                      <option value="">Select Package</option>
                      <option value="Full Detail">Full Detail</option>
                      <option value="Interior Detailing">Interior Detailing</option>
                      <option value="Auto Upholstery">Auto Upholstery</option>
                      <option value="Express Maintenance">Express Maintenance</option>
                    </select>
                  </div>

                  <div className="form-group" style={{ margin: 0 }}>
                    <label>Rating *</label>
                    <div style={{ display: 'flex', gap: '4px', height: '36px', alignItems: 'center' }}>
                      {[1, 2, 3, 4, 5].map((val) => (
                        <button
                          key={val}
                          type="button"
                          onClick={() => setFormRating(val)}
                          onMouseEnter={() => setHoverRating(val)}
                          onMouseLeave={() => setHoverRating(0)}
                          style={{
                            background: 'none',
                            border: 'none',
                            padding: 0,
                            cursor: 'pointer',
                            color: val <= (hoverRating || formRating) ? '#ffb400' : 'var(--text-muted)',
                            outline: 'none'
                          }}
                        >
                          <Star size={20} fill={val <= (hoverRating || formRating) ? 'currentColor' : 'none'} />
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="form-group" style={{ margin: 0 }}>
                  <label htmlFor="review-text">Your Review *</label>
                  <textarea
                    id="review-text"
                    rows={4}
                    required
                    placeholder="Tell us about your experience: what did we do well? What did you notice?"
                    className="form-textarea"
                    style={{ resize: 'none' }}
                    value={formText}
                    onChange={e => setFormText(e.target.value)}
                  />
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="btn-red"
                  style={{ marginTop: '4px', width: '100%' }}
                >
                  {submitting ? 'Submitting...' : 'Submit Review'}
                </button>
              </form>
            )}
          </div>

        </div>

        {/* Full reviews grid */}
        <div style={{ marginTop: '24px' }}>
          <h3 style={{ fontSize: '16px', color: 'var(--text-primary)', marginBottom: '12px', fontWeight: 800 }}>
            Recent Feedback ({reviews.length})
          </h3>
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr',
            gap: '12px',
            maxHeight: '440px',
            overflowY: 'auto',
            paddingRight: '4px'
          }} className="system-scrollbar">
            {reviews.map((rev) => (
              <div key={rev.id} style={{
                background: 'var(--bg-card)',
                border: '1px solid var(--border-color)',
                borderRadius: '12px',
                padding: '14px 16px'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
                  <div>
                    {rev.name && (
                      <span style={{ fontWeight: 700, fontSize: '13px', color: 'var(--text-primary)' }}>{rev.name}</span>
                    )}
                    {rev.location && (
                      <span style={{ fontSize: '11px', color: 'var(--text-muted)', marginLeft: rev.name ? '8px' : 0 }}>
                        {rev.name ? '· ' : ''}{rev.location}
                      </span>
                    )}
                  </div>
                  <div style={{ display: 'flex', gap: '2px', color: '#ffb400' }}>
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} size={11} fill="currentColor" />
                    ))}
                  </div>
                </div>
                <p style={{ fontSize: '12.5px', lineHeight: '1.6', color: 'var(--text-secondary)', margin: '0 0 8px 0', fontStyle: 'italic' }}>
                  "{rev.text}"
                </p>
                {rev.service && (
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: 'var(--text-muted)', borderTop: '1px solid var(--border-color)', paddingTop: '6px' }}>
                    <span style={{ fontWeight: 600, color: 'var(--accent-red)' }}>{rev.service}</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

      </div>
    </>
  );
};
