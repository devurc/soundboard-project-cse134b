
For this part of the homework we used vanilla javascript and a library version. 
The library we chose to go with was jQuery. Our experience with jQuery was a 
positive one. The strengths of this library lies in the compactness, and 
shortening of many vanilla functions so development is a quicker and easier.
So the filesize of our jquery script is much smaller than the vanilla javascript
file. (	6047B vs 3152 )
Our application with vanilla javascript had slightly better performance in load 
time. Using the chrome performance tool, with a network throttling to 3g and our 
cache disabled, we found that the vanilla version loads in about 14s, while the 
jquery version loads in around 16s. 
So despite a smaller file size, the jquery version has less performance. 
However, enabling cache allows us to get more performance out of the jquery CDN, 
and the load time is almost the same as the vanilla version.
Therefore, the development time/easiness is a tradeoff for performance. 

SentryIO Error Tracking: https://postimg.org/image/f1cqf564r/



Our decision was to go with jQuery because we found it very easy to develop in, 
and while we want to maximize our performance, we wanted faster development and 
the jQuery library made the coding process a lot shorter than if we were to use 
vanilla javascript. 

Through the google chrome devtools performance, we foudn that on initial load 
the site has a load time of about 900ms. This is cut short by another 100ms on 
further refreshes (becuase of caches and the PWA service worker).

When throttling to good 3g levels, the initial load time went to around 15s. 
Amazingly, becuase of the cache and service worker the further load times were 
cut down to only 4s on this throttled speed so the improvement is significant.

i think the idea of creating a progressive web app using the service worker API 
was very beneficial. Since the technology is still fairly new, it feels very 
excitiing and rewarding to be able to implement it into our project. 

