VAR character = "Person1"
VAR character_count = 3
VAR day = 0
VAR has_jenny = true
VAR pick_rate = 3
VAR did_exercise = 0
VAR scene = "characters"
VAR variant = "default"
VAR rounds = 1

-> start


== start
~ scene = "characters"
~ has_jenny = true
~ pick_rate = 3
Pick a character.

* [Person1] 
    ~ character = "Person1"
    ~ character_count--
    -> congratulations
* [Person2]
    ~ character = "Person2"
    ~ character_count--
    -> congratulations
* [Person3]
    ~ character = "Person3"
    ~ character_count--
    -> congratulations

  
== congratulations
~ scene = "home"
~ variant = "default"
Congratulations! You've got a job at <b>Amazon</b>! You've been job-hunting for a while, so this is really good news. 
+ [Time for training] -> enter_training


== enter_training
~ day = 1
~ scene = "title"
+[OK] -> training


== training
~ scene = "training"
Your trainers say as a picker inside this huge warehouse, you're part of the magic of bringing Amazon orders to life. 
+ [Awesome] -> training_casual  


== training_casual ==
The trainers emphasise that you'll only ever be a casual employee. There are no permanent jobs planned.
+ [OK ] -> training_scanner  


== training_scanner ==
~ scene = "training_scanner"
This is your scanner. 

It tells you what items you need to collect next and how long you have to scan it. It also monitors your performance.

+ [Got it 👍🏽] -> training_get_picking  


== training_get_picking ==
~ scene = "training_trolley"
Let's do a trial run. Here's your trolley.

You're expected to move quickly. The trainer calls it "Amazon pace".

+ [Give it a try] -> training_warehouse 


== training_warehouse
~ scene = "training_warehouse"
~ rounds = 1
+ [OK] -> go_home_training


== go_home_training ==
~ scene = "training_home_time"
Well done, that's it for today.

+ [Go home] -> start_job


== start_job ==
~ scene = "home"
~ variant = "default"
You get a text at 4pm from the labour hire agency.

You've been rostered 7am-3pm for the next three days.

+ [Show me the money 🤑] -> day_1 


== day_1 ==
~ day = day + 1
~ scene = "title"
Tuesday
+ [OK] -> stretches


== stretches
~ scene = "chant"
~ variant = "stretches"
Your supervisor picks a team member to lead the daily stretches.
+ [Stretch] -> chant


== chant
~ scene = "chant"
~ variant = "idle"
When you're done, the supervisor chants. "When I say Amazon, you say 'Let's go!'"

"Amazon!"

+ "Let's go!"[] everyone chants. 
~ variant = "chant"
- + [NEXT] -> day_1_start_shift


== day_1_start_shift ==
~ scene = "warehouse"
~ rounds = 2
The faster you tap, the quicker you get there! (picking mini game)
+ [OK] -> thirsty


== thirsty ==
~ scene = "thirsty"
You've been picking flat out for two hours. It's really hot in the warehouse. 
+ [Drink some water] -> drink_water
+ [Just keep picking] -> dehydrated


== drink_water ==
~ scene = "thirsty"
~ variant = "drinking"
~ pick_rate = pick_rate - 1
You rehydrate. But now you need to go to the toilet before your break. <b>Your pick rate has suffered</b>.
+ [OK] -> day_1_before_lunch


== dehydrated ==
~ scene = "thirsty"
~ pick_rate = pick_rate + 1
You feel dehydrated. But going to the toilet would affect your pick rate.
+ [OK] -> day_1_before_lunch


== day_1_before_lunch ==
~ scene = "warehouse_auto"
Picking staff say they're expected to move quickly, but for safety are not allowed to run.
'Amazon pace' means moving at a speed between walking and jogging for their entire shift.
+ [OK] -> day_1_lunch


== day_1_lunch ==
~ scene = "breakroom"
On your lunch break, you meet a co-worker named <b>Jenny</b>. She mentions the supervisor has been asking about her low pick rate. She's worried her shifts will be cut.
+ [OK, back to work] -> day_1_after_lunch


== day_1_after_lunch ==
~ scene = "warehouse"
~ rounds = 1
You do some more picking. (picking mini game)
+ [OK] -> day_1_scanner


== day_1_scanner ==
~ scene = "scanner_question"
~ variant = "helping"
Towards the end of the day your scanner asks you: "Are you always willing to help your teammates?"

You know Amazon will see your answer.

+ [Yes] -> day_2
+ [No] -> day_2


== day_2 ==
~ scene = "title"
~ day = day + 1
Wednesday
+ [OK] -> day_2_chant


== day_2_chant ==
~ scene = "chant"
~ variant = "chant"
"Outbound gets it done!" the team chants. 
+ [Get picking] -> day_2_start_shift


== day_2_start_shift ==
~ scene = "warehouse"
~ rounds = 2
You do some picking. (picking mini game)
+ [OK] -> needs_help


== needs_help ==
~ scene = "needs_help"
A co-worker isn't tall enough to reach an item on the shelf. They're worried getting a ladder will ruin their pick rate.
+ [Help them] -> help_them 
+ [Keep working] -> dont_help_them


== help_them ==
~ scene = "needs_help"
~ variant = "helped"
~ pick_rate = pick_rate - 1
You feel good about yourself until you remember that <b>your pick rate will go down</b>. 
+ [OK] -> day_2_before_lunch


== dont_help_them ==
~ scene = "needs_help"
~ variant = "no_help"
~ pick_rate = pick_rate + 1
You feel a bit bad, but you want to get your pick rate. You really need this job.
+ [OK] -> day_2_before_lunch


== day_2_before_lunch ==
~ scene = "warehouse_auto"
Workers have told the ABC their pick rate is about 120 small items per hour – roughly two items per minute.
+ [OK] -> day_2_lunch


== day_2_lunch ==
~ scene = "youtube"
You eat lunch with Jenny. 

There's five minutes of your break left. She wants to show you something hilarious on YouTube.

+ [Watch the video] -> watch_the_video
+ [Get back to work] -> get_back_to_work


== watch_the_video ==
~ scene = "youtube"
~ variant = "is_watching"
~ pick_rate = pick_rate - 1
It puts you in a good mood. 

Until you realise Amazon expects you to be ready to scan the moment your break finishes. You didn't leave enough time to go through security and pick up your trolley. <b>This'll affect your pick rate</b>.

+ [Get back to picking] -> day_2_after_lunch 


== get_back_to_work ==
~ scene = "no_youtube"
~ pick_rate = pick_rate + 1
Probably a good choice. 

Amazon expects you to be ready as soon as the break is over. You need to allow time to go through security and pick up your trolley. Jenny's probably going to be late.
+ [Start picking] -> day_2_after_lunch 


== day_2_after_lunch ==
~ scene = "warehouse_supervisor"
~ rounds = 1
You do some more picking. (picking mini game)
+ [Good pick rate] -> day_2_end
+ [Bad pick rate] -> day_2_supervisor


== day_2_supervisor == 
~ scene = "supervisor"
Your supervisor approaches you.

"Hey, is everything OK? I noticed your pick rate is down."

+ [Tell them you'll do better] -> day_2_supervisor_response
+ [Complain about pick times] -> day_2_supervisor_response


== day_2_supervisor_response ==
You hope this doesn't affect your shifts. You really need the money.
+ [Go home] -> day_2_end


== day_2_end ==
~ scene = "home_time"
It's time to go home. Your muscles are aching. You reckon you've walked about <b>30km</b> today.
+ [OK] -> day_2_next_shift


== day_2_next_shift ==
~ scene = "home"
It's 4:30pm and you get a text. Tomorrow's shift has been cancelled. You were relying on that money.
+ [Damn.] -> day_3


== day_3
~ scene = "title"
~ variant = "home"
~ day = day + 1
Thursday

+ [OK, I guess there's no shift today] -> day_3_next_shift


== day_3_next_shift
~ scene = "home"
At 6pm the labour hire company texts you. You have a shift at 7am tomorrow.

But your sister's just started a new job and you promised to babysit your nephews tomorrow. The message doesn't give you the option to decline.

+ [Accept shift] -> day_3_acknowledge_shift
+ [Ignore it] -> day_3_ignore_it


== day_3_acknowledge_shift
~ scene = "home"
~ variant = "angry_sister"
You've let your sister down. But you need this job. Co-workers have told you they were rostered on less after turning down a shift.
+ [OK] -> day_4


== day_3_ignore_it
~ scene = "home"
~ variant = "call"
You become a little worried that you might not get any shifts for next week now.

An hour passes and you get a phone call asking why you haven't acknowledged your shift.

+ [Give them a reason] -> babysit
+ [Take the shift] -> day_3_acknowledge_shift


== babysit
~ day = day + 1
~ scene = "home"
~ variant = "babysit"
You babysit your nephews.
+ [OK] -> day_4



== day_4
~ scene = "title"
~ variant = "default"
~ day = day + 1
Friday
+ [OK] -> day_4_jenny_gone


== day_4_jenny_gone
~ scene = "locker_room"
When you get to work you get a text from your co-worker Jenny.

"All of my shifts have been cancelled :(".

+ [Poor Jenny] -> day_4_chant


== day_4_chant
~ scene = "chant"
Two new team members have started today. People seem to come and go a lot around here.

"Efficiency!" everyone chants. 
+ [Get picking] -> day_4_start_shift


== day_4_start_shift
~ scene = "warehouse"
~ rounds = 1
You do some picking. (picking mini game)
+ [OK] -> trolley_full


== trolley_full
~ scene = "trolley_full"
Your trolley is full. You only have two more items to pick before your break.

+ [Pile them on] -> safety_first
+ [Empty your trolley first] -> empty_trolley


== safety_first
~ scene = "trolley_full"
~ variant = "overflowing"
Your supervisor approaches and tells you off for overloading your trolley.

"Safety first," they say.
+ [Say your pick rate is more important] -> day_4_before_lunch
+ [Say you won't do it again] -> day_4_before_lunch


== empty_trolley
~ scene = "trolley_full"
~ variant = "empty"
~ pick_rate = pick_rate - 1
Amazon says safety comes first. You take the trolley over to be emptied.

Your pick rate has gone down.
+ [OK] -> day_4_before_lunch


== day_4_before_lunch
~ scene = "warehouse_auto"
One warehouse worker says the countdown clock is often unrealistic – they might only have 15 seconds to pick an item six aisles away. Sometimes they cut safety corners to meet targets.
+ [OK] -> day_4_lunch


== day_4_lunch
~ scene = "union"
The union vists at lunch.

You have a question about your rights as a casual. The managers are eating nearby. 

+ [Ask anyway] -> day_4_ask_anyway
+ [Keep quiet] -> day_4_keep_quiet


== day_4_ask_anyway
~ variant = "spoke_up"
You hope speaking out doesn’t affect your shifts.
+ [Get back to work] -> day_5_go_home1


== day_4_keep_quiet
~ variant = "quiet"
You're worried that speaking out could impact your shifts.
+ [Get back to work] -> day_5_go_home1


== day_5_go_home1
~ scene = "early_finish"
Around 2pm the manager gathers all of the pickers together.

"Congratulations, everyone! You've been so efficient that you've fulfilled all of our customers' orders for today!"

+ [Awesome 👏]-> day_5_go_home2


== day_5_go_home2
You get sent home two hours early. 

<b>You don't get paid for those two hours</b>.

+ [Take your trolley back] -> day_5_end


== day_5_end
~ scene = "scanner_question"
~ variant = "satisfied"
A message appears on your scanner.

"Would you say you're generally satisfied in your job?"

+ [Yes] -> news_alert 
+ [No] -> news_alert


== news_alert
~ scene = "home"
~ variant = "news_alert"
It's been a couple of days and you haven’t been given any shifts. You don't really know why.
 
You get a news alert – ABC News has just published a story about what it's like to work at Amazon Australia.

+ [Read the article] -> DONE
+ [Start again] -> start
