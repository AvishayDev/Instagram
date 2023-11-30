




export const DEMO_DATA: {
    userProfileImageUrl:string
    userFirstName:string
    userLastName:string
    uploadDate:Date
    ImageUrl:string
    text:string
    isLiked:boolean
    numOfLikes:number}[] = [
            {
                userProfileImageUrl: 'https://t4.ftcdn.net/jpg/00/65/77/27/360_F_65772719_A1UV5kLi5nCEWI0BNLLiFaBPEkUbv5Fv.jpg',
                userFirstName: 'Koko',
                userLastName: 'Lala',
                uploadDate: new Date(),
                ImageUrl: 'https://t3.ftcdn.net/jpg/02/43/12/34/360_F_243123463_zTooub557xEWABDLk0jJklDyLSGl2jrr.jpg',
                text: 'jkwofiefj ifjiwejfewf wefojwefw jfweofwef',
                isLiked: false,
                numOfLikes: 129,
            },
            {
                userProfileImageUrl: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cGVyc29ufGVufDB8fDB8fHww',
                userFirstName: 'Fliki',
                userLastName: 'Fliki',
                uploadDate: new Date(),
                ImageUrl: 'https://www.liquidsandsolids.com/wp-content/uploads/2022/09/talking-to-a-dead-person.jpg',
                text: "kuku - A'ha Glida Tova!",
                isLiked: true,
                numOfLikes: 7361,
            },
            {
                userProfileImageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/40/Field_in_K%C3%A4rk%C3%B6l%C3%A4.jpg/275px-Field_in_K%C3%A4rk%C3%B6l%C3%A4.jpg',
                userFirstName: 'GoGo',
                userLastName: 'PowerRangers',
                uploadDate: new Date(),
                ImageUrl: 'https://images.unsplash.com/photo-1558871585-4c3574a1b7cd?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZmllbGRzfGVufDB8fDB8fHww',
                text: "kuku - A'ha Glida Tova!",
                isLiked: true,
                numOfLikes: 342,
            },
            {
                userProfileImageUrl: 'https://media.istockphoto.com/id/1414765339/photo/rows-of-newly-cut-cereal-plants-in-a-field-in-sussex-on-a-sunny-summers-day.jpg?s=612x612&w=0&k=20&c=oa_YAcw68WETFppnIJ-yGcFWEPEFo4LktzQ4ZYEMg9E=',
                userFirstName: 'Tolo',
                userLastName: 'Maroko',
                uploadDate: new Date(),
                ImageUrl: 'https://media.istockphoto.com/id/1319763440/photo/stubble-field-panorama-with-impressive-cloudscape.jpg?s=612x612&w=0&k=20&c=HhLv6TFzldoJjQd8QE8kg52d3ZgrD_laSyuC-oadNrQ=',
                text: "kuku - A'ha Glida Tova!",
                isLiked: false,
                numOfLikes: 182,
            }
        ]

export const DEMO_PROFILE_IMAGES: string[] = [
    'https://i0.wp.com/www.onceuponachef.com/images/2020/09/Sprinkle-Funfetti-Cake.jpg?resize=760%2C896&ssl=1',
    'data:image/jpeg;base64,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',
    "https://images.immediate.co.uk/production/volatile/sites/30/2013/04/Iced-fairy-cakes-7a55f02.jpg?resize=768,574",
    "https://img.delicious.com.au/VQn8MW9Z/del/2023/08/italian-berry-mascarpone-cake-193616-2.jpg",
    "https://www.simplyrecipes.com/thmb/HUDjaojXry70l9yI4XLBttTkOYk=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/Simply-Recipes-Unicorn-Cake-Lead-1-30eccf41bba749958631c1a011317d81.jpg",
    "https://sallysbakingaddiction.com/wp-content/uploads/2013/04/triple-chocolate-cake-4.jpg",
    'https://www.zestcakes.co.nz/cdn/shop/files/IMG_0146_10bfce3b-4cb1-47e2-ae87-28a843c2a11d.webp?v=1683102859',
    'https://food.fnr.sndimg.com/content/dam/images/food/fullset/2009/4/5/1/IG1C17_30946_s4x3.jpg.rend.hgtvcom.1280.1280.suffix/1433541424559.jpeg',
    'https://amycakesbakes.com/wp-content/uploads/2021/07/Fresh-Strawberry-Cake-by-Amycakes-Bakes.jpg'
]