import { AuraAnalysis, Song, SongMatch } from "./types";

// Local catalogue only: AuraCheck never streams or hosts copyrighted audio.
// The catalogue is deliberately broad so very different looks can receive useful matches.
export const songs: Song[] = [
  // Dark / luxury / night / streetwear
  { title:"Starboy", artist:"The Weeknd", moods:["dark","luxury","night","confident"], genres:["pop","r&b"], energy:85, aesthetic:["luxury","streetwear","main character"] },
  { title:"Die For You", artist:"The Weeknd", moods:["romantic","dark","smooth","night"], genres:["r&b","pop"], energy:62, aesthetic:["luxury","dark","soft"] },
  { title:"The Hills", artist:"The Weeknd", moods:["dark","night","bold"], genres:["r&b","pop"], energy:82, aesthetic:["dark","streetwear","main character"] },
  { title:"Often", artist:"The Weeknd", moods:["dark","smooth","night"], genres:["r&b"], energy:72, aesthetic:["luxury","dark","streetwear"] },
  { title:"Middle of the Night", artist:"Elley Duhé", moods:["dark","confident","night"], genres:["pop"], energy:79, aesthetic:["dark","luxury","main character"] },
  { title:"After Dark", artist:"Mr.Kitty", moods:["dark","night","aesthetic","moody"], genres:["synthpop"], energy:68, aesthetic:["dark","monochrome","retro"] },
  { title:"Do I Wanna Know?", artist:"Arctic Monkeys", moods:["dark","cool","moody"], genres:["rock"], energy:66, aesthetic:["dark","vintage","streetwear"] },
  { title:"505", artist:"Arctic Monkeys", moods:["moody","romantic","indie"], genres:["rock"], energy:64, aesthetic:["dark academia","vintage","night"] },
  { title:"Why'd You Only Call Me When You're High?", artist:"Arctic Monkeys", moods:["dark","cool","night"], genres:["rock"], energy:74, aesthetic:["streetwear","dark","vintage"] },
  { title:"Fashion Killa", artist:"A$AP Rocky", moods:["fashion","confident","streetwear","cool"], genres:["hip-hop"], energy:77, aesthetic:["streetwear","luxury"] },
  { title:"Praise The Lord", artist:"A$AP Rocky ft. Skepta", moods:["streetwear","confident","energetic"], genres:["hip-hop"], energy:87, aesthetic:["streetwear","main character"] },
  { title:"Sundress", artist:"A$AP Rocky", moods:["chill","fashion","summer"], genres:["hip-hop"], energy:67, aesthetic:["streetwear","summer","casual"] },
  { title:"SICKO MODE", artist:"Travis Scott", moods:["hype","dark","streetwear"], genres:["hip-hop"], energy:96, aesthetic:["streetwear","party"] },
  { title:"goosebumps", artist:"Travis Scott", moods:["dark","hype","night"], genres:["hip-hop"], energy:83, aesthetic:["streetwear","dark"] },
  { title:"HIGHEST IN THE ROOM", artist:"Travis Scott", moods:["dark","hype","night","confident"], genres:["hip-hop"], energy:82, aesthetic:["streetwear","main character"] },
  { title:"Nonstop", artist:"Drake", moods:["confident","dark","hype"], genres:["hip-hop"], energy:88, aesthetic:["streetwear","luxury","main character"] },
  { title:"God's Plan", artist:"Drake", moods:["confident","chill","uplifting"], genres:["hip-hop"], energy:73, aesthetic:["streetwear","casual"] },
  { title:"One Dance", artist:"Drake", moods:["smooth","chill","night"], genres:["hip-hop","dancehall"], energy:76, aesthetic:["party","casual","streetwear"] },
  { title:"No Role Modelz", artist:"J. Cole", moods:["cool","confident","chill"], genres:["hip-hop"], energy:75, aesthetic:["streetwear","casual"] },
  { title:"HUMBLE.", artist:"Kendrick Lamar", moods:["bold","confident","hype"], genres:["hip-hop"], energy:92, aesthetic:["streetwear","main character"] },

  // Main-character / confident / pop
  { title:"Blinding Lights", artist:"The Weeknd", moods:["energetic","night","retro","confident"], genres:["pop","synthwave"], energy:92, aesthetic:["retro","party","main character"] },
  { title:"Espresso", artist:"Sabrina Carpenter", moods:["confident","summer","fun"], genres:["pop"], energy:82, aesthetic:["main character","party","summer"] },
  { title:"Feather", artist:"Sabrina Carpenter", moods:["fun","confident","bright"], genres:["pop"], energy:79, aesthetic:["main character","summer","casual"] },
  { title:"greedy", artist:"Tate McRae", moods:["confident","bold","party"], genres:["pop"], energy:88, aesthetic:["main character","party","y2k"] },
  { title:"Levitating", artist:"Dua Lipa", moods:["party","energetic","glam"], genres:["pop","disco"], energy:90, aesthetic:["party","luxury","y2k"] },
  { title:"Don't Start Now", artist:"Dua Lipa", moods:["confident","party","energetic"], genres:["pop","disco"], energy:89, aesthetic:["party","main character"] },
  { title:"Houdini", artist:"Dua Lipa", moods:["confident","party","sleek"], genres:["pop"], energy:88, aesthetic:["luxury","party","main character"] },
  { title:"bad guy", artist:"Billie Eilish", moods:["dark","cool","confident"], genres:["pop"], energy:78, aesthetic:["streetwear","dark","main character"] },
  { title:"Therefore I Am", artist:"Billie Eilish", moods:["confident","cool","minimal"], genres:["pop"], energy:76, aesthetic:["minimalist","streetwear","main character"] },
  { title:"INDUSTRY BABY", artist:"Lil Nas X & Jack Harlow", moods:["confident","gym","bold"], genres:["hip-hop"], energy:95, aesthetic:["streetwear","gym","main character"] },
  { title:"Paint The Town Red", artist:"Doja Cat", moods:["confident","bold","party"], genres:["pop","hip-hop"], energy:86, aesthetic:["main character","streetwear","party"] },
  { title:"Woman", artist:"Doja Cat", moods:["confident","smooth","summer"], genres:["pop"], energy:81, aesthetic:["luxury","summer","main character"] },
  { title:"Boss Bitch", artist:"Doja Cat", moods:["bold","confident","hype"], genres:["pop","hip-hop"], energy:94, aesthetic:["main character","streetwear"] },

  // Chill / soft / aesthetic / romantic
  { title:"Sweater Weather", artist:"The Neighbourhood", moods:["chill","aesthetic","moody"], genres:["alternative"], energy:60, aesthetic:["soft","dark academia","vintage"] },
  { title:"Softcore", artist:"The Neighbourhood", moods:["moody","soft","dark"], genres:["alternative"], energy:59, aesthetic:["dark","soft","aesthetic"] },
  { title:"I Wanna Be Yours", artist:"Arctic Monkeys", moods:["romantic","moody","soft"], genres:["indie","rock"], energy:48, aesthetic:["dark academia","soft","vintage"] },
  { title:"Night Changes", artist:"One Direction", moods:["romantic","nostalgic","soft"], genres:["pop"], energy:50, aesthetic:["soft","vintage"] },
  { title:"Dandelions", artist:"Ruth B.", moods:["soft","romantic","dreamy"], genres:["pop"], energy:43, aesthetic:["soft","minimalist"] },
  { title:"Until I Found You", artist:"Stephen Sanchez", moods:["romantic","vintage","warm"], genres:["pop"], energy:55, aesthetic:["vintage","old money","formal"] },
  { title:"Love Nwantiti", artist:"CKay", moods:["romantic","chill","smooth"], genres:["afrobeats"], energy:66, aesthetic:["soft","summer"] },
  { title:"Calm Down", artist:"Rema & Selena Gomez", moods:["chill","summer","romantic"], genres:["afrobeats","pop"], energy:72, aesthetic:["summer","casual"] },
  { title:"Here With Me", artist:"d4vd", moods:["soft","romantic","dreamy"], genres:["indie pop"], energy:45, aesthetic:["soft","minimalist"] },
  { title:"Romantic Homicide", artist:"d4vd", moods:["moody","soft","dark"], genres:["indie"], energy:42, aesthetic:["soft","dark academia"] },
  { title:"Until I Found You", artist:"Stephen Sanchez & Em Beihold", moods:["romantic","vintage","soft"], genres:["pop"], energy:56, aesthetic:["vintage","old money"] },
  { title:"Glue Song", artist:"beabadoobee", moods:["soft","romantic","warm"], genres:["indie"], energy:44, aesthetic:["soft","casual","vintage"] },
  { title:"From The Start", artist:"Laufey", moods:["romantic","elegant","soft"], genres:["jazz pop"], energy:58, aesthetic:["old money","soft","vintage"] },
  { title:"Valentine", artist:"Laufey", moods:["romantic","soft","elegant"], genres:["jazz pop"], energy:42, aesthetic:["old money","formal","soft"] },
  { title:"Best Part", artist:"Daniel Caesar ft. H.E.R.", moods:["romantic","smooth","warm"], genres:["r&b"], energy:40, aesthetic:["soft","minimalist","elegant"] },
  { title:"Get You", artist:"Daniel Caesar ft. Kali Uchis", moods:["romantic","smooth","dreamy"], genres:["r&b"], energy:46, aesthetic:["soft","luxury"] },
  { title:"telepatía", artist:"Kali Uchis", moods:["smooth","romantic","dreamy"], genres:["r&b","pop"], energy:61, aesthetic:["soft","luxury","summer"] },
  { title:"Snooze", artist:"SZA", moods:["romantic","smooth","chill"], genres:["r&b"], energy:57, aesthetic:["soft","luxury","casual"] },
  { title:"Saturn", artist:"SZA", moods:["dreamy","soft","calm"], genres:["r&b"], energy:48, aesthetic:["soft","minimalist"] },

  // Summer / travel / bright / casual
  { title:"Sunflower", artist:"Post Malone & Swae Lee", moods:["chill","summer","happy"], genres:["pop","hip-hop"], energy:67, aesthetic:["casual","summer","streetwear"] },
  { title:"Heat Waves", artist:"Glass Animals", moods:["chill","summer","dreamy"], genres:["indie pop"], energy:65, aesthetic:["summer","casual","soft"] },
  { title:"Golden", artist:"Harry Styles", moods:["summer","bright","travel"], genres:["pop"], energy:78, aesthetic:["summer","traveller","casual"] },
  { title:"Watermelon Sugar", artist:"Harry Styles", moods:["summer","fun","bright"], genres:["pop"], energy:80, aesthetic:["summer","casual"] },
  { title:"As It Was", artist:"Harry Styles", moods:["nostalgic","energetic","retro"], genres:["pop"], energy:76, aesthetic:["retro","vintage","main character"] },
  { title:"Hymn for the Weekend", artist:"Coldplay", moods:["uplifting","travel","dreamy"], genres:["pop","rock"], energy:79, aesthetic:["traveller","main character"] },
  { title:"Adventure of a Lifetime", artist:"Coldplay", moods:["travel","energetic","happy"], genres:["pop","rock"], energy:88, aesthetic:["traveller","summer","sporty"] },
  { title:"Paradise", artist:"Coldplay", moods:["dreamy","travel","uplifting"], genres:["pop","rock"], energy:76, aesthetic:["traveller","main character"] },
  { title:"A Sky Full of Stars", artist:"Coldplay", moods:["uplifting","party","dreamy"], genres:["pop","edm"], energy:92, aesthetic:["party","main character"] },
  { title:"The Nights", artist:"Avicii", moods:["travel","energetic","uplifting"], genres:["edm"], energy:94, aesthetic:["traveller","main character"] },
  { title:"Wake Me Up", artist:"Avicii", moods:["travel","energetic","hopeful"], genres:["edm"], energy:93, aesthetic:["traveller","sporty"] },
  { title:"Counting Stars", artist:"OneRepublic", moods:["uplifting","travel","energetic"], genres:["pop","rock"], energy:87, aesthetic:["traveller","casual"] },
  { title:"Good Life", artist:"OneRepublic", moods:["happy","travel","uplifting"], genres:["pop"], energy:80, aesthetic:["traveller","summer","casual"] },
  { title:"Walking on a Dream", artist:"Empire of the Sun", moods:["dreamy","travel","bright"], genres:["electropop"], energy:77, aesthetic:["summer","retro","traveller"] },
  { title:"Paradise", artist:"MEDUZA ft. Dermot Kennedy", moods:["travel","party","uplifting"], genres:["dance"], energy:88, aesthetic:["summer","party","traveller"] },
  { title:"Sunroof", artist:"Nicky Youre & dazy", moods:["summer","happy","chill"], genres:["pop"], energy:78, aesthetic:["summer","casual"] },
  { title:"Beautiful Things", artist:"Benson Boone", moods:["uplifting","romantic","powerful"], genres:["pop"], energy:79, aesthetic:["main character","traveller"] },

  // Party / energetic / Y2K
  { title:"One Kiss", artist:"Calvin Harris & Dua Lipa", moods:["party","summer","energetic"], genres:["dance"], energy:90, aesthetic:["party","summer"] },
  { title:"Feel So Close", artist:"Calvin Harris", moods:["party","energetic","uplifting"], genres:["edm"], energy:92, aesthetic:["party","summer"] },
  { title:"Titanium", artist:"David Guetta ft. Sia", moods:["powerful","gym","energetic"], genres:["edm"], energy:97, aesthetic:["gym","sporty"] },
  { title:"Memories", artist:"David Guetta ft. Kid Cudi", moods:["party","night","energetic"], genres:["edm"], energy:91, aesthetic:["party","y2k"] },
  { title:"Can't Hold Us", artist:"Macklemore & Ryan Lewis", moods:["energetic","party","confident"], genres:["hip-hop"], energy:98, aesthetic:["party","sporty"] },
  { title:"Party In The U.S.A.", artist:"Miley Cyrus", moods:["party","fun","bright"], genres:["pop"], energy:88, aesthetic:["party","y2k"] },
  { title:"Timber", artist:"Pitbull ft. Kesha", moods:["party","energetic","fun"], genres:["dance","pop"], energy:95, aesthetic:["party","y2k"] },
  { title:"Give Me Everything", artist:"Pitbull ft. Ne-Yo, Afrojack & Nayer", moods:["party","night","energetic"], genres:["dance","pop"], energy:94, aesthetic:["party","luxury"] },
  { title:"DJ Got Us Fallin' In Love", artist:"Usher ft. Pitbull", moods:["party","energetic","night"], genres:["pop","dance"], energy:93, aesthetic:["party","y2k"] },
  { title:"Stereo Love", artist:"Edward Maya & Vika Jigulina", moods:["party","nostalgic","night"], genres:["dance"], energy:85, aesthetic:["y2k","retro","party"] },
  { title:"Temperature", artist:"Sean Paul", moods:["party","summer","hype"], genres:["dancehall"], energy:94, aesthetic:["party","summer"] },
  { title:"Rockabye", artist:"Clean Bandit ft. Sean Paul & Anne-Marie", moods:["party","uplifting","summer"], genres:["pop","dance"], energy:86, aesthetic:["party","casual"] },

  // Gym / sporty / power
  { title:"Believer", artist:"Imagine Dragons", moods:["gym","powerful","energetic"], genres:["rock"], energy:96, aesthetic:["gym","sporty"] },
  { title:"Thunder", artist:"Imagine Dragons", moods:["gym","powerful","confident"], genres:["rock"], energy:88, aesthetic:["gym","sporty"] },
  { title:"Whatever It Takes", artist:"Imagine Dragons", moods:["gym","determined","energetic"], genres:["rock"], energy:95, aesthetic:["gym","sporty","main character"] },
  { title:"Unstoppable", artist:"Sia", moods:["powerful","gym","confident"], genres:["pop"], energy:91, aesthetic:["gym","sporty","main character"] },
  { title:"Till I Collapse", artist:"Eminem", moods:["gym","powerful","hype"], genres:["hip-hop"], energy:98, aesthetic:["gym","sporty"] },
  { title:"Lose Yourself", artist:"Eminem", moods:["determined","gym","powerful"], genres:["hip-hop"], energy:95, aesthetic:["gym","main character"] },
  { title:"Remember the Name", artist:"Fort Minor", moods:["gym","confident","hype"], genres:["hip-hop"], energy:94, aesthetic:["gym","sporty"] },
  { title:"POWER", artist:"Kanye West", moods:["powerful","confident","hype"], genres:["hip-hop"], energy:94, aesthetic:["main character","gym","luxury"] },
  { title:"Stronger", artist:"Kanye West", moods:["gym","confident","energetic"], genres:["hip-hop"], energy:93, aesthetic:["gym","y2k","streetwear"] },
  { title:"Centuries", artist:"Fall Out Boy", moods:["powerful","sporty","energetic"], genres:["rock"], energy:96, aesthetic:["gym","sporty"] },

  // Retro / vintage / old money / elegant
  { title:"Electric Feel", artist:"MGMT", moods:["retro","party","cool"], genres:["indie"], energy:80, aesthetic:["retro","y2k","party"] },
  { title:"Lady (Hear Me Tonight)", artist:"Modjo", moods:["retro","luxury","party"], genres:["house"], energy:84, aesthetic:["old money","luxury","retro"] },
  { title:"Gimme! Gimme! Gimme!", artist:"ABBA", moods:["party","retro","energetic"], genres:["disco"], energy:91, aesthetic:["retro","party","vintage"] },
  { title:"Everybody Wants to Rule the World", artist:"Tears for Fears", moods:["retro","chill","main character"], genres:["new wave"], energy:70, aesthetic:["old money","retro","vintage"] },
  { title:"Dreams", artist:"Fleetwood Mac", moods:["vintage","chill","dreamy"], genres:["rock"], energy:58, aesthetic:["vintage","soft","traveller"] },
  { title:"Young and Beautiful", artist:"Lana Del Rey", moods:["elegant","romantic","luxury"], genres:["pop"], energy:50, aesthetic:["old money","luxury","elegant"] },
  { title:"Summertime Sadness", artist:"Lana Del Rey", moods:["summer","moody","cinematic"], genres:["pop"], energy:64, aesthetic:["vintage","summer","main character"] },
  { title:"West Coast", artist:"Lana Del Rey", moods:["vintage","summer","cool"], genres:["pop"], energy:61, aesthetic:["vintage","luxury","summer"] },
  { title:"Smooth Operator", artist:"Sade", moods:["elegant","luxury","smooth"], genres:["soul","jazz pop"], energy:58, aesthetic:["old money","formal","luxury"] },
  { title:"No Time To Die", artist:"Billie Eilish", moods:["elegant","dark","cinematic"], genres:["pop"], energy:47, aesthetic:["formal","dark","luxury"] },
  { title:"Skyfall", artist:"Adele", moods:["elegant","cinematic","powerful"], genres:["pop"], energy:66, aesthetic:["formal","luxury","dark"] },
  { title:"Careless Whisper", artist:"George Michael", moods:["romantic","retro","smooth"], genres:["pop"], energy:54, aesthetic:["vintage","old money","formal"] },
  { title:"Nothing's Gonna Change My Love for You", artist:"George Benson", moods:["romantic","vintage","warm"], genres:["pop","soul"], energy:44, aesthetic:["vintage","soft","formal"] },
  { title:"Can't Take My Eyes Off You", artist:"Frankie Valli", moods:["romantic","vintage","elegant"], genres:["pop"], energy:66, aesthetic:["old money","formal","vintage"] },

  // Indie / moody / cinematic
  { title:"Another Love", artist:"Tom Odell", moods:["moody","emotional","dark"], genres:["indie"], energy:57, aesthetic:["dark academia","monochrome"] },
  { title:"Runaway", artist:"AURORA", moods:["dreamy","travel","soft"], genres:["art pop"], energy:53, aesthetic:["traveller","soft","minimalist"] },
  { title:"Space Song", artist:"Beach House", moods:["dreamy","moody","soft"], genres:["dream pop"], energy:45, aesthetic:["soft","dark academia","vintage"] },
  { title:"Apocalypse", artist:"Cigarettes After Sex", moods:["romantic","moody","dreamy"], genres:["dream pop"], energy:41, aesthetic:["soft","dark","minimalist"] },
  { title:"Nothing's Gonna Hurt You Baby", artist:"Cigarettes After Sex", moods:["soft","romantic","dreamy"], genres:["dream pop"], energy:37, aesthetic:["soft","minimalist","dark"] },
  { title:"The Less I Know The Better", artist:"Tame Impala", moods:["retro","chill","cool"], genres:["psychedelic pop"], energy:73, aesthetic:["retro","y2k","casual"] },
  { title:"Borderline", artist:"Tame Impala", moods:["chill","retro","smooth"], genres:["psychedelic pop"], energy:67, aesthetic:["retro","summer","casual"] },
  { title:"Take a Slice", artist:"Glass Animals", moods:["dark","cool","aesthetic"], genres:["indie"], energy:74, aesthetic:["streetwear","dark","retro"] },

  // Indian / Hindi / Punjabi / Telugu-friendly social picks
  { title:"Heeriye", artist:"Jasleen Royal ft. Arijit Singh", moods:["romantic","soft","warm"], genres:["indian pop","hindi"], energy:54, aesthetic:["soft","elegant","casual"] },
  { title:"Chaleya", artist:"Arijit Singh & Shilpa Rao", moods:["romantic","elegant","dreamy"], genres:["bollywood","hindi"], energy:55, aesthetic:["soft","formal","luxury"] },
  { title:"Kesariya", artist:"Arijit Singh", moods:["romantic","warm","dreamy"], genres:["bollywood","hindi"], energy:57, aesthetic:["soft","elegant","traditional"] },
  { title:"O Maahi", artist:"Arijit Singh", moods:["romantic","travel","soft"], genres:["bollywood","hindi"], energy:51, aesthetic:["traveller","soft","cinematic"] },
  { title:"Apna Bana Le", artist:"Arijit Singh & Sachin-Jigar", moods:["romantic","soft","warm"], genres:["bollywood","hindi"], energy:50, aesthetic:["soft","casual"] },
  { title:"Sajni", artist:"Arijit Singh", moods:["soft","moody","romantic"], genres:["indian","hindi"], energy:47, aesthetic:["soft","minimalist"] },
  { title:"Maan Meri Jaan", artist:"King", moods:["romantic","smooth","confident"], genres:["indian pop","hindi"], energy:65, aesthetic:["luxury","soft","main character"] },
  { title:"Tu Aake Dekhle", artist:"King", moods:["romantic","night","smooth"], genres:["indian pop","hindi"], energy:61, aesthetic:["night","streetwear","soft"] },
  { title:"Excuses", artist:"AP Dhillon, Gurinder Gill & Intense", moods:["cool","streetwear","night"], genres:["punjabi","hip-hop"], energy:73, aesthetic:["streetwear","luxury","casual"] },
  { title:"Insane", artist:"AP Dhillon, Gurinder Gill & Shinda Kahlon", moods:["streetwear","hype","confident"], genres:["punjabi","hip-hop"], energy:87, aesthetic:["streetwear","party"] },
  { title:"With You", artist:"AP Dhillon", moods:["romantic","smooth","luxury"], genres:["punjabi","pop"], energy:68, aesthetic:["luxury","soft","main character"] },
  { title:"Brown Munde", artist:"AP Dhillon, Gurinder Gill, Gminxr & Shinda Kahlon", moods:["streetwear","confident","hype"], genres:["punjabi","hip-hop"], energy:88, aesthetic:["streetwear","main character"] },
  { title:"Softly", artist:"Karan Aujla", moods:["smooth","confident","luxury"], genres:["punjabi","pop"], energy:76, aesthetic:["luxury","streetwear","main character"] },
  { title:"Winning Speech", artist:"Karan Aujla", moods:["confident","hype","luxury"], genres:["punjabi","hip-hop"], energy:88, aesthetic:["main character","streetwear","luxury"] },
  { title:"Tauba Tauba", artist:"Karan Aujla", moods:["party","confident","stylish"], genres:["bollywood","punjabi"], energy:89, aesthetic:["party","luxury","main character"] },
  { title:"Obsessed", artist:"Riar Saab & Abhijay Sharma", moods:["romantic","cool","streetwear"], genres:["punjabi","indian pop"], energy:70, aesthetic:["streetwear","soft","casual"] },
  { title:"Cheques", artist:"Shubh", moods:["confident","streetwear","cool"], genres:["punjabi","hip-hop"], energy:81, aesthetic:["streetwear","luxury"] },
  { title:"Still Rollin", artist:"Shubh", moods:["confident","hype","streetwear"], genres:["punjabi","hip-hop"], energy:86, aesthetic:["streetwear","main character"] },
  { title:"No Love", artist:"Shubh", moods:["cool","dark","streetwear"], genres:["punjabi","hip-hop"], energy:77, aesthetic:["streetwear","dark"] },
  { title:"Husn", artist:"Anuv Jain", moods:["soft","romantic","aesthetic"], genres:["indie","hindi"], energy:42, aesthetic:["soft","minimalist","vintage"] },
  { title:"Jo Tum Mere Ho", artist:"Anuv Jain", moods:["romantic","soft","warm"], genres:["indie","hindi"], energy:43, aesthetic:["soft","minimalist"] },
  { title:"Alag Aasmaan", artist:"Anuv Jain", moods:["travel","soft","dreamy"], genres:["indie","hindi"], energy:45, aesthetic:["traveller","soft","minimalist"] },
  { title:"Iraaday", artist:"Abdul Hannan & Rovalio", moods:["romantic","soft","chill"], genres:["indie","urdu pop"], energy:49, aesthetic:["soft","casual"] },
  { title:"Kahani Suno 2.0", artist:"Kaifi Khalil", moods:["romantic","soft","moody"], genres:["pop","urdu"], energy:46, aesthetic:["soft","vintage"] },
  { title:"Jhol", artist:"Maanu & Annural Khalid", moods:["romantic","smooth","chill"], genres:["pop","south asian"], energy:59, aesthetic:["soft","casual","luxury"] },
  { title:"Aasa Kooda", artist:"Sai Abhyankkar & Sai Smriti", moods:["romantic","summer","bright"], genres:["indian pop","tamil"], energy:72, aesthetic:["summer","soft","casual"] },
  { title:"Katchi Sera", artist:"Sai Abhyankkar", moods:["romantic","energetic","stylish"], genres:["indian pop","tamil"], energy:78, aesthetic:["main character","party","casual"] },
  { title:"Arabic Kuthu", artist:"Anirudh Ravichander & Jonita Gandhi", moods:["party","hype","energetic"], genres:["tamil","dance"], energy:96, aesthetic:["party","main character"] },
  { title:"Hukum", artist:"Anirudh Ravichander", moods:["powerful","hype","confident"], genres:["tamil","film"], energy:98, aesthetic:["main character","gym","streetwear"] },
  { title:"Vaathi Coming", artist:"Anirudh Ravichander & Gana Balachandar", moods:["party","hype","energetic"], genres:["tamil","dance"], energy:97, aesthetic:["party","sporty"] },
  { title:"Why This Kolaveri Di", artist:"Dhanush", moods:["casual","fun","chill"], genres:["tamil","pop"], energy:68, aesthetic:["casual","retro"] },
  { title:"Butta Bomma", artist:"Armaan Malik", moods:["romantic","bright","smooth"], genres:["telugu","film"], energy:68, aesthetic:["soft","elegant","casual"] },
  { title:"Samajavaragamana", artist:"Sid Sriram", moods:["romantic","elegant","soft"], genres:["telugu","film"], energy:55, aesthetic:["soft","formal","elegant"] },
  { title:"Inkem Inkem Inkem Kaavaale", artist:"Sid Sriram", moods:["romantic","soft","warm"], genres:["telugu","film"], energy:50, aesthetic:["soft","traditional","elegant"] },
  { title:"Oh Sita Hey Rama", artist:"S.P. Charan & Ramya Behara", moods:["romantic","vintage","elegant"], genres:["telugu","film"], energy:50, aesthetic:["vintage","formal","soft"] },
  { title:"Kadalalle", artist:"Sid Sriram & Aishwarya Ravichandran", moods:["romantic","dreamy","soft"], genres:["telugu","film"], energy:52, aesthetic:["soft","elegant"] },
  { title:"Naatu Naatu", artist:"Rahul Sipligunj & Kaala Bhairava", moods:["party","energetic","hype"], genres:["telugu","dance"], energy:100, aesthetic:["party","sporty","main character"] },
  { title:"Ramuloo Ramulaa", artist:"Anurag Kulkarni & Mangli", moods:["party","energetic","fun"], genres:["telugu","dance"], energy:94, aesthetic:["party","traditional","main character"] },
  { title:"Daakko Daakko Meka", artist:"Sivam", moods:["powerful","hype","rustic"], genres:["telugu","film"], energy:96, aesthetic:["main character","streetwear","sporty"] },
  { title:"Srivalli", artist:"Sid Sriram", moods:["romantic","soft","warm"], genres:["telugu","film"], energy:53, aesthetic:["soft","traditional","casual"] },
  { title:"Oo Antava Oo Oo Antava", artist:"Indravathi Chauhan", moods:["party","bold","confident"], genres:["telugu","dance"], energy:92, aesthetic:["party","main character"] },
  { title:"Pushpa Pushpa", artist:"Nakash Aziz & Deepak Blue", moods:["confident","hype","powerful"], genres:["telugu","film"], energy:95, aesthetic:["main character","streetwear","gym"] },
  { title:"Peelings", artist:"Shankarr Babu Kandukoori & Laxmi Dasa", moods:["party","energetic","fun"], genres:["telugu","dance"], energy:95, aesthetic:["party","main character"] },
  { title:"Chuttamalle", artist:"Shilpa Rao", moods:["romantic","soft","dreamy"], genres:["telugu","film"], energy:57, aesthetic:["soft","elegant","summer"] }
];

const normalize = (value: string) => value.toLowerCase().replace(/[^a-z0-9 ]/g, " ").replace(/\s+/g, " ").trim();

const synonymGroups = [
  ["dark","night","moody","cinematic","monochrome"],
  ["luxury","elegant","old","money","formal","glam","sleek","classy"],
  ["streetwear","street","urban","cool","fashion","stylish"],
  ["soft","dreamy","calm","warm","gentle","aesthetic"],
  ["party","hype","energetic","dance","fun"],
  ["gym","sporty","powerful","determined","bold"],
  ["summer","bright","happy","sunny"],
  ["travel","traveller","adventure","uplifting","roadtrip"],
  ["retro","vintage","nostalgic","y2k"],
  ["romantic","love","smooth"],
  ["main","character","confident","boss","hero"],
  ["minimal","minimalist","clean","casual","chill"]
];

function expandTerms(values: string[]) {
  const base = new Set(values.flatMap(v => normalize(v).split(" ")).filter(Boolean));
  for (const group of synonymGroups) {
    if (group.some(term => base.has(term))) group.forEach(term => base.add(term));
  }
  return [...base];
}

export function matchSongs(analysis: AuraAnalysis, limit = 32): SongMatch[] {
  const rawValues = [
    analysis.songMood,
    ...analysis.songKeywords,
    analysis.primaryVibe,
    analysis.secondaryVibe,
    analysis.aesthetic,
  ].filter(Boolean);
  const terms = expandTerms(rawValues);
  const phrases = rawValues.map(normalize).filter(Boolean);

  const ranked = songs
    .map(song => {
      const tagValues = [...song.moods, ...song.genres, ...song.aesthetic];
      const songTerms = expandTerms(tagValues);
      const songPhrases = tagValues.map(normalize);

      const exactTokens = terms.reduce((sum, term) => sum + (songTerms.includes(term) ? 1 : 0), 0);
      const phraseHits = phrases.reduce((sum, phrase) => sum + (songPhrases.some(tag => tag === phrase || tag.includes(phrase) || phrase.includes(tag)) ? 1 : 0), 0);
      const energyFit = Math.max(0, 1 - Math.abs(song.energy - analysis.ratings.energy) / 100);
      const matchScore = exactTokens * 10 + phraseHits * 18 + energyFit * 18;

      const reason = song.moods.find(m => terms.some(t => normalize(m).includes(t)))
        || song.aesthetic.find(a => terms.some(t => normalize(a).includes(t)))
        || song.moods[0];
      return { ...song, matchScore, matchReason: reason };
    })
    .sort((a, b) => b.matchScore - a.matchScore);

  // Keep the soundtrack varied instead of filling the top results with one artist.
  const selected: SongMatch[] = [];
  const artistCounts = new Map<string, number>();
  for (const song of ranked) {
    const artistKey = normalize(song.artist.split(/ft\.|&|,/i)[0]);
    const count = artistCounts.get(artistKey) || 0;
    if (count >= 2) continue;
    selected.push(song);
    artistCounts.set(artistKey, count + 1);
    if (selected.length >= limit) break;
  }

  if (selected.length < limit) {
    for (const song of ranked) {
      if (!selected.includes(song)) selected.push(song);
      if (selected.length >= limit) break;
    }
  }

  return selected.slice(0, limit);
}
