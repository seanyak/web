window.onload = go;
function go() {
  $("#new-quote").click(function() {
    getQuote();
  });
  $("#tweet-quote").click(function() {});
  getQuote();
}

function getQuote() {
  var quotes = [{
		id: 1,
		quote: "All I got is time and I heard that this shit's money.",
		source: "Despot"
	},
	{
		id: 2,
		quote: "Life is just two quarters in the machine.",
		source: "Billy Woods"
	},
	{
		id: 3,
		quote: "Look in the mirror cause that should be who your hero is.",
		source: "Alpha Tha Alien"
	},
	{
		id: 4,
		quote: "I'm livin at the cross of awesome and super good.",
		source: "Open Mike Eagle"
	},
	{
		id: 5,
		quote: "If everything happens for a reason, I ain't really got shit else to do but be greatful.",
		source: "Quelle Chris"
	},
	{
		id: 6,
		quote: "What I pieced together and made from it, built me strong enough to reach the most raised summit.",
		source: "Ka"
	},
	{
		id: 7,
		quote: "Growing pains are always far from over.",
		source: "Chimezie"
	},
	{
		id: 8,
		quote: "I'm bound to fall but I'm bound to rise.",
		source: "Homeboy Sandman"
	},
	{
		id: 9,
		quote: "You've got to realize all the real lies.",
		source: "Jay Cinema"
	},
	{
		id: 10,
		quote: "Sometimes it's best to sever than to suffer.",
		source: "Elijah Quinton"
	},
	{
		id: 11,
		quote: "If you plant love love will grow, if you plant fear fear will grow.",
		source: "Mavi"
	},
	{
		id: 12,
		quote: "Better stay you and smile everyday.",
		source: "Maxo"
	},
	{
		id: 13,
		quote: "Perfectionism may look good in shiny shoes, but he's a little bit of an asshole, and no one invites him to their pool parties.",
		source: "Pink Naval"
	},
	{
		id: 14,
		quote: "You need to git up git out and git something, don't let the days of your life pass by.",
		source: "OutKast"
	},
	{
		id: 15,
		quote: "Don't ever let the world get you fed up, you gotta do your thing keep your head up.",
		source: "Nef The Pharoh"
	},
	{
		id: 16,
		quote: "Imma keep my soul when the devil's showing faces.",
		source: "Pink Slifu"
	},
	{
		id: 17,
		quote: "Gotta keep barkin', gotta tee off.",
		source: "Mike"
	},
	{
		id: 18,
		quote: "Ain't no limitations, It's far beyond the skies, we always meant to fly.",
		source: "The God Fahim"
	},
	{
		id: 19,
		quote: "Dark days turn bright, part ways from dark ways and found ways to gain sight.",
		source: "Kenny Mason"
	},
	{
		id: 20,
		quote: "Life is a blast when you know what you're doin', best to know what you're doin' 'fore your life get ruined.",
		source: "Hieroglyphics"
	},
	{
		id: 21,
		quote: "You gotta be able to smile through all this bullshit.",
		source: "2Pac"
	},
	{
		id: 22,
		quote: "Life without dreaming is a life without meaning.",
		source: "Wale"
	},
	{
		id: 23,
		quote: "To dream is to live life’s full potential.",
		source: "Wale"
	},
	{
		id: 24,
		quote: "They’re gonna try to tell you no, shatter all your dreams. But you gotta get up and go and think of better things.",
		source: "Mac Miller"
	},
	{
		id: 25,
		quote: "If you’re scared to take chances, you’ll never have the answers.",
		source: "Nas"
	},
	{
		id: 26,
		quote: "Trust your own judgement, live with it and love it.",
		source: "Nas"
	},
	{
		id: 27,
		quote: "Never apologize for what you feel, it’s like apologizing for being real.",
		source: "Lil Wayne"
	},
	{
		id: 28,
		quote: "Can't change the world unless we change ourselves.",
		source: "Joey Bada$$"
	},
	{
		id: 29,
		quote: "Never mind what hater’s say, ignore ’em till they fade away.",
		source: "T.I."
	},
	{
		id: 30,
		quote: "Remind yourself, nobody built like you, you designed yourself.",
		source: "Jay-Z"
	},
	{
		id: 31,
		quote: "Sunny days wouldn’t be so special, if it wasn’t for rain. Joy wouldn’t feel so good, if it wasn’t for pain.",
		source: "50 Cent"
	},
	{
		id: 32,
		quote: "No matter how hard it gets, stick your chest out, keep your head up and handle it.",
		source: "2Pac"
	},
	{
		id: 33,
		quote: "Every day women and men become legends.",
		source: "Common"
	},
	{
		id: 34,
		quote: "Being happy is the goal, but greatness is my mission.",
		source: "Childish Gambino"
	},
	{
		id: 35,
		quote: "Stop trying to prove, stop trying to be, stop trying to do, just be proof, do, and exist.",
		source: "Sole"
	},
	{
		id: 36,
		quote: "Don't ever change, keep your essence, the power is in the people and the politics we address.",
		source: "2Pac"
	},
	{
		id: 37,
		quote: "If at first you don't succeed, then dust yourself off and try again.",
		source: "Aaliyah"
	},
	{
		id: 38,
		quote: "Sky is the limit and know that you can have what you want, be what you want.",
		source: "Notorious B.I.G."
	},
	{
		id: 39,
		quote: "My word of advice to you is just relax, just do what you got to do.",
		source: "Dead Prez"
	},
	{
		id: 40,
		quote: "Everything is everything, what is meant to be will be.",
		source: "Lauryn Hill"
	},
	{
		id: 41,
		quote: "Never looking back or too far in front of me, the present is a gift and I just wanna be.",
		source: "Common"
	},
	{
		id: 42,
		quote: "Don't cry, dry your eyes, never let up. Forgive but don't forget...keep your head up.",
		source: "2Pac"
	},
	{
		id: 43,
		quote: "If I woke up tomorrow and I didn't have a dollar, as long as I have my heart I can get it all over.",
		source: "Wale"
	},
	{
		id: 44,
		quote: "The purpose of life is a life with a purpose. So I’d rather die for a cause, than live a life that is worthless..",
		source: "Immortal Technique"
	},
	{
		id: 45,
		quote: "You’ve got to realize that the world’s a test, you can only do your best.",
		source: "Cee-Lo",
	},
	{
		id: 46,
		quote: "Without order, nothing exists. Without chaos, nothing evolves.",
		source: "Jedi Mind Tricks"
	},
	{
		id: 47,
		quote: "Regardless of how it goes down life goes on.",
		source: "Rick Ross"
	},
	{
		id: 48,
		quote: "I did my own shit and now I'm up, and now all that paid off.",
		source: "Tyler, the Creator"
	},
	{
		id: 49,
		quote: "If I want it, I go get it, I'm always on go mode, I just go, I don't know what fear is.",
		source: "Tyler, the Creator"
	},
	{
		id: 50,
		quote: "The only difference between a winner and a loser is a winner plays until he wins.",
		source: "Big K.R.I.T."
	},
	{
		id: 51,
		quote: "Don't be eager to run with crowds, stay in your lane, Pass the knowledge on to your team, but carry the flame, Cause it's yours and yours alone to brighten your way.",
		source: "Big K.R.I.T."
	},
	{
		id: 52,
		quote: "Ain't nothing for free so get your ass up.",
		source: "Big K.R.I.T."
	},
	{
		id: 53,
		quote: "When you in your room, then you starin' at the ceilin', Dreamin', I want you to know it's no ceilings, I want you to notice that feelin', I want you to leave and go for it, I want you to reach with no fearin'.",
		source: "Tyler, the Creator"
	},
	{
		id: 54,
		quote: "Let me realize that my past failures at follow-through are no indication of my future performance. They're just healthy little fires that are gonna' warm up my ass.",
		source: "Pink Naval"
	},
	{
		id: 55,
		quote: "Let me not hit up my Facebook like it's a crack-pipe, keep the browser closed.",
		source: "Pink Naval"
	},
	{
		id: 56,
		quote: "Let me think about the people that I care about the most. And how when they fail or disappoint me I still love them, I still give them chances, and I still see the best in them - let me extend that generosity to myself.",
		source: "Pink Naval"
	},
	{
		id: 57,
		quote: "Lead, Don't watch TV read, You've got everything you need, Don't be greedy.",
		source: "Homeboy Sandman"
	},
	{
		id: 58,
		quote: "Every mistake I've ever made has had a certain inexplicable beauty you overachievers could never replace.",
		source: "Milo"
	},
	{
		id: 59,
		quote: "You just gotta do you, like there ain't nothin left to do, just do you.",
		source: "Lojii"
	},
	{
		id: 60,
		quote: "People rarely value time before they've lost it, So I'm hella' careful of where I vibe and where I'm caught.",
		source: "Chester Watson"
	},
	{
		id: 61,
		quote: "I'm just flowing with the waves to stay afloat, paddling on a board while praying for a boat.",
		source: "Massi Bay"
	},
	{
		id: 62,
		quote: "Eating right, these the finer things in life, see your ring in the light, everything that bling ain't ice.",
		source: "Roc Marciano"
	},
	{
		id: 63,
		quote: "Work my land, slash and burn, elephant hands, every callus earned.",
		source: "Billy Woods"
	},
	{
		id: 64,
		quote: "Shit hard when the rays don't shine.",
		source: "Mach-Hommy"
	},
	{
		id: 65,
		quote: "Got more soul than a sock with a hole.",
		source: "MF Doom"
	},
	{
		id: 66,
		quote: "Finna do all the things they keep sayin' you can't, then do it times two just to remind fools that the first time wasn't a lucky mistake.",
		source: "Koreatown Oddity"
	},
	{
		id: 67,
		quote: "No matter how tough right now things seem to be, when you wait patiently your time will come you'll see so keep your head high up.",
		source: "Koreatown Oddity"
	},
	{
		id: 68,
		quote: "What is life without love? What's life without dreams? What's life without goals? Everything ain't what it seems.",
		source: "Cordae"
	},
	{
		id: 69,
		quote: "What's life without love? What's life without haters? We all gotta eat so to them I don't cater.",
		source: "Common"
	},
	{
		id: 70,
		quote: "Would you rather be the person talking or the person doing all the things that people talk about.",
		source: "Dave"
	},
    {
		id: 71,
		quote: "Some said it's pre-programmed, some state it's up to Allah, you ask me, it's all part the mirage, ah-ha-ha!.",
		source: "Quelle Chris"
	},
    {
		id: 72,
		quote: "Fly, birdie, fly, be as wise as the owl, keep the eye of the falcon, that's eyein' the sparrow.",
		source: "Denmark Vessey"
	},
    {
		id: 73,
		quote: "The last laugh is a nectar, but the sweetest get-back is being completely free (Facts), completely me.",
		source: "Denmark Vessey"
	},
    {
		id: 74,
		quote: "Make your actions match your ambitions to survive.",
		source: "Big Sen"
	},
    {
		id: 75,
		quote: "What’s gon’ come to pass is what’s gon’ come to pass.",
		source: "Big Sen"
	},
    {
		id: 76,
		quote: "Security is largely a superstition. It does not exist in nature. Life is either a grand adventure or nothing, baby. Go have your adventure, 'cause I’m having mine.",
		source: "Big Sen"
	},
    {
		id: 77,
		quote: "Money comes and goes, broke today, but tomorrow who knows?.",
		source: "Billy Woods"
	},
    {
		id: 78,
		quote: "Time'll never wait on no man, society will never hold your hand.",
		source: "Kendrick Lamar"
	},
    {
		id: 79,
		quote: "Dreams of reality's peace, blow steam in the face of the beast, the sky could fall down, the wind could cry now, the strong in me, I still smile.",
		source: "Kendrick Lamar"
	},
    {
		id: 80,
		quote: "Sometimes in life you got to choose, if you really want to follow rules, but which rules you gon' choose?.",
		source: "The God Fahim"
	},
    {
		id: 81,
		quote: "Nothing lasts, beauty is what you make it, until the waves of wind and people ruin what I've worked so very hard to preserve.",
		source: "Sole"
	},
    {
		id: 82,
		quote: "Stop trying to prove, stop trying to be, stop trying to do, just be proof, do, and exist.",
		source: "Sole"
	},
    {
		id: 83,
		quote: "Go, let the wandering take it all in, generate, make you yours, my masters, my pupils, my equals, drop, decorate, I implore you, just think.",
		source: "Doseone"
	},
    {
		id: 84,
		quote: "Although I see many problems in my fellow man, hatred of others is absolutely not my master plan.",
		source: "Alias"
	},
    {
		id: 85,
		quote: "With a raised fist, symbolization of the urgency, strength blowing kisses and winks toward adversity, subtle yet as vital as the ink on your currency.",
		source: "Slug"
	},
    {
		id: 86,
		quote: "We are determining the future at this very moment,... the heart is the philosophers' stone.",
		source: "Saul Williams"
	},
    {
		id: 87,
		quote: "Find your mantra and awaken your subconscious.",
		source: "Saul Williams"
	},
    {
		id: 88,
		quote: "Put your faith into action, heads up and eyes open.",
		source: "Yummy Bingham"
	},
    {
		id: 89,
		quote: "And through all this life, the trials and tribulations, it is imperative, that you know you are where you're supposed to be.",
		source: "Kota the Friend"
	},
    {
		id: 90,
		quote: "Be what you speak...never speak on what you be.",
		source: "Sole"
	}
];
  var randQuote = quotes[Math.floor(Math.random() * (quotes.length))];
  $("#text").html(randQuote.quote);
  $("#author").html(randQuote.source);
  $("#tweet-quote").attr("href", strToTweet('"' + randQuote.quote + '" - ' + randQuote.source));
}


function strToTweet(str) {
    var strConvert = str.split(" ").join("%20").split("@").join("%40").split("!").join("%21");
    var tweetStr = "https://twitter.com/intent/tweet?quote=" + strConvert;
  return tweetStr;
}