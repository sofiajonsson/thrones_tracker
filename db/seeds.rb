Post.destroy_all

puts "Seeding Posts..."
p1 = Post.create(name: "Jon Snow", image: "https://pbs.twimg.com/profile_images/901947348699545601/hqRMHITj_400x400.jpg", comment: "Jon Snow of House Stark, first of his name, King in the North, King Beyond the Wall, Lord of Winterfell, the White Wolf, the Undead"),
p2 = Post.create(name: "Daenerys Targaryen", image: "https://www.hindustantimes.com/rf/image_size_960x540/HT/p2/2017/06/07/Pictures/_0a06e520-4b9c-11e7-81ca-1a4d4992589d.PNG", comment: "Daenerys Stormborn of the House Targaryen,First of Her Name, the Unburnt, Queen of the Andals and the First Men, Khaleesi of the Great Grass Sea,Breaker of Chains, and Mother of Dragons."),
p3 = Post.create(name: "Tyrion Lannister", image: "https://static.toiimg.com/photo/62981209/.jpg", comment: "I drink and I know things"),
p4 = Post.create(name: "Cersei Lannister", image: "https://www.telegraph.co.uk/content/dam/tv/2019/04/11/TELEMMGLPICT000194009938_trans_NvBQzQNjv4BqCceMXJtaZGMG8GkK7K3ZQkNPDKEzApT6aoLqLIUSTA8.jpeg?imwidth=450", comment: "When you play the game of thrones, you win, or you die"),
p5 = Post.create(name: "Arya Stark", image: "https://media.vanityfair.com/photos/59357c5c29fc2c6405bcc5da/master/w_768,c_limit/arya-season-7.jpg", comment: "Stick them with the pointy end"),
p6 = Post.create(name: "Sansa Stark", image: "https://media.wired.com/photos/5ccb048fcde987630819d168/master/pass/Culture_Monitor_SophieTurner.jpg", comment: "I’m a slow learner, it’s true. But I learn"),
p7 = Post.create(name: "Jaime Lannister", image: "https://mondrian.mashable.com/uploads%252Fcard%252Fimage%252F558528%252F93a81eb7-2637-411d-b77b-74456a4b1160.jpg%252F950x534__filters%253Aquality%252890%2529.jpg?signature=RCKYM31ZiWo9j6sf86IqJZBO7KE=&source=https%3A%2F%2Fblueprint-api-production.s3.amazonaws.com", comment: "The things I do for love."),
p8 = Post.create(name: "Varys", image: "https://pm1.narvii.com/6143/eb4e4c9099d6b724e5438a32a785b19a99c923fa_hq.jpg", comment: "The Spider, the one person with Westero's best interest at heart"),
p9 = Post.create(name: "Brienne of Tarth", image: "https://vignette.wikia.nocookie.net/gameofthrones/images/a/a9/S8_Brienne_Profil.jpg/revision/latest?cb=20190423165941", comment: "The first female knight"),
p10 = Post.create(name: "Bran Stark", image: "https://www.telegraph.co.uk/content/dam/tv/2019/04/17/bran-s8-e1-game-of-thrones_trans_NvBQzQNjv4BqeK8ehqBZJSTiVTgumtathRUrxw2k0v3FIvnVyxhkUuM.JPG?imwidth=450", comment: "The Three Eyed Raven")
