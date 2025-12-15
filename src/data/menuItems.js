// src/data/menuItems.js
export const menuItems = {
  burgers: [
    {
      id: 101,
      title: "CREAMY MUSHROOM",
      title_ar: "كريمي مشروم",
      description: "Ground beef, cheese, tomato, onion, pickles, mushrooms, eggs, lettuce, sauce",
      description_ar: "لحم بقر، جبنة، طماطم، بصل، مخلل، فطر، بيض، خس، صوص",
      price: 6.5,
      image: "/pics/burgers/mushroomburger.webp"
    },
    {
      id: 102,
      title: "BEEF SUPREME",
      title_ar: "بيف سوبريم",
      description: "Beef patty, cheddar cheese, pickles, ketchup, mustard",
      description_ar: "شريحة لحم بقر، جبنة شيدر، مخلل، كاتشب، خردل",
      price: 6.5,
      image: "/pics/burgers/doublebeef.webp"
    },
    {
      id: 103,
      title: "SMOKED",
      title_ar: "سموكي برجر",
      description: "Beef patty, smoked beef bacon, cheddar cheese, pickles, ketchup, mustard",
      description_ar: "شريحة لحم، لحم مقدد مدخن، جبنة شيدر، مخلل، كاتشب، خردل",
      price: 7.5,
      image: "/pics/burgers/smoked.webp"
    },
    {
      id: 104,
      title: "MEXICANO",
      title_ar: "مكسيكانو",
      description: "Beef patty, sriracha, onions, cheddar cheese, pickles, ketchup, mustard",
      description_ar: "شريحة لحم، سيراتشا حار، بصل، جبنة شيدر، مخلل، كاتشب",
      price: 6.5,
      image: "/pics/burgers/spicyburger.webp"
    }
  ],
  pizza: [
    {
      id: 201,
      title: "MARGHERITA",
      title_ar: "مارغريتا",
      description: "Mozzarella, tomato sauce, fresh basil, olive oil",
      description_ar: "موزاريلا، صلصة طماطم، ريحان طازج، زيت زيتون",
      price: 12.0,
      image: "/pics/pizza/margherita.webp"
    },
    {
      id: 202,
      title: "PEPPERONI",
      title_ar: "بيبروني",
      description: "Mozzarella, tomato sauce, pepperoni",
      description_ar: "موزاريلا، صلصة طماطم، شرائح بيبروني",
      price: 12.0,
      image: "/pics/pizza/pepperoni.webp"
    },
    {
      id: 203,
      title: "CHICKEN BBQ",
      title_ar: "دجاج باربيكيو",
      description: "BBQ sauce, shredded mozzarella, grilled chicken",
      description_ar: "صوص باربيكيو، موزاريلا مبشورة، دجاج مشوي",
      price: 12.0,
      image: "/pics/pizza/bbqchicken.webp"
    },
    {
      id: 204,
      title: "FOUR SEASONS",
      title_ar: "الفصول الأربعة",
      description: "Mozzarella, tomato sauce, pepperoni, mushrooms, olives",
      description_ar: "موزاريلا، صلصة طماطم، بيبروني، فطر، زيتون",
      price: 14.0,
      image: "/pics/pizza/fourseasons.webp"
    }
  ],
  shawrma: [
    {
      id: 301,
      title: "MEAT SHAWARMA",
      title_ar: "شاورما لحم",
      description: "Marinated sliced beef, tahini, pickles, parsley, onion, salad",
      description_ar: "شرائح لحم متبلة، طحينة، مخلل، بقدونس، بصل، سلطة",
      price: 6.5,
      image: "/pics/shawrma/meatshawrma.webp"
    },
    {
      id: 302,
      title: "CHICKEN SHAWARMA",
      title_ar: "شاورما دجاج",
      description: "Marinated chicken, garlic sauce, pickles, tomato, onion",
      description_ar: "دجاج متبل، ثومية، مخلل، طماطم، بصل",
      price: 6.0,
      image: "/pics/shawrma/chickenshawrma.webp"
    },
    {
      id: 303,
      title: "FAMILY SHAWARMA PLATTER",
      title_ar: "صينية شاورما عائلية",
      description: "Mixed meats, rice, fries, salad and sauces (good for 2-3)",
      description_ar: "لحم ودجاج، تمن، مقبلات، سلطة وصوصات (تكفي 2-3)",
      price: 18.0,
      image: "/pics/shawrma/familyplatter.webp"
    },
    {
      id: 304,
      title: "VEGGIE SHAWARMA",
      title_ar: "شاورما نباتي",
      description: "Grilled vegetables, hummus, pickles, tahini, fresh herbs",
      description_ar: "خضار مشوية، حمص، مخلل، طحينة، أعشاب طازجة",
      price: 5.5,
      image: "/pics/shawrma/veggieshawrma.webp"
    }
  ],
  eastern: [
    {
      id: 401,
      title: "MANSAF",
      title_ar: "منسف",
      description: "Traditional lamb with fermented yogurt and rice",
      description_ar: "لحم ضأن بلدي مع جميد وتمن",
      price: 14.0,
      image: "/pics/eastern/mansaf.webp"
    },
    {
      id: 402,
      title: "MAQLUBA",
      title_ar: "مقلوبة",
      description: "Upside-down rice with chicken, eggplant and caramelized vegetables",
      description_ar: "تمن مقلوب مع دجاج، باذنجان وخضار",
      price: 11.5,
      image: "/pics/eastern/maqluba.webp"
    },
    {
      id: 403,
      title: "KOFTA KEBAB",
      title_ar: "كباب كفتة",
      description: "Spiced minced meat skewers served with tahini and salad",
      description_ar: "أسياخ لحم مفروم متبل تقدم مع طحينة وسلطة",
      price: 9.0,
      image: "/pics/eastern/kofta.webp"
    },
    {
      id: 404,
      title: "MUTABBAL & HUMMUS PLATE",
      title_ar: "صحن متبل وحمص",
      description: "Smoky eggplant dip, classic hummus, warm pita",
      description_ar: "باذنجان مدخن، حمص بالطحينة، خبز حار",
      price: 7.0,
      image: "/pics/eastern/mutabbal.webp"
    }
  ],
  hot_drinks: [
    {
      id: 501,
      title: "ARABIC COFFEE",
      title_ar: "قهوة عربية",
      description: "Lightly spiced traditional Arabic coffee",
      description_ar: "قهوة عربية تقليدية بالهيل",
      price: 1.5,
      image: "/pics/hotdrinks/arabic_coffee.webp"
    },
    {
      id: 502,
      title: "ESPRESSO",
      title_ar: "اسبريسو",
      description: "Single shot, rich and bold",
      description_ar: "سينجل شوت، غني ومركز",
      price: 2.0,
      image: "/pics/hotdrinks/espresso.webp"
    },
    {
      id: 503,
      title: "LATTE",
      title_ar: "لاتيه",
      description: "Steamed milk with espresso, creamy and smooth",
      description_ar: "حليب مبخر مع اسبريسو",
      price: 2.8,
      image: "/pics/hotdrinks/latte.webp"
    },
    {
      id: 504,
      title: "MINT TEA",
      title_ar: "شاي بالنعناع",
      description: "Fresh mint leaves brewed green tea",
      description_ar: "شاي أخضر مخمر بأوراق النعناع الطازجة",
      price: 1.8,
      image: "/pics/hotdrinks/mint_tea.webp"
    }
  ],
  juices: [
    {
      id: 601,
      title: "FRESH ORANGE",
      title_ar: "برتقال طازج",
      description: "Cold-pressed fresh orange juice",
      description_ar: "عصير برتقال طبيعي معصور على البارد",
      price: 3.0,
      image: "/pics/juices/orange.webp"
    },
    {
      id: 602,
      title: "MIXED BERRY",
      title_ar: "كوكتيل توت",
      description: "Strawberry, blueberry and raspberry blend",
      description_ar: "خليط فراولة، توت أزرق وتوت عليق",
      price: 3.5,
      image: "/pics/juices/mixed_berry.webp"
    },
    {
      id: 603,
      title: "CARROT GINGER",
      title_ar: "جزر وزنجبيل",
      description: "Refreshing carrot with a hint of ginger",
      description_ar: "جزر منعش مع لمسة زنجبيل",
      price: 3.2,
      image: "/pics/juices/carrot_ginger.webp"
    },
  ],
  mojitos: [
    {
      id: 701,
      title: "CLASSIC MOJITO",
      title_ar: "موهيتو كلاسيك",
      description: "Lime, fresh mint, sugar, soda (alcohol-free available)",
      description_ar: "ليمون، نعناع طازج، سكر، صودا",
      price: 4.5,
      image: "/pics/mojitos/classic_mojito.webp"
    },
    {
      id: 702,
      title: "STRAWBERRY MOJITO",
      title_ar: "موهيتو فراولة",
      description: "Fresh strawberry, mint, lime and soda",
      description_ar: "فراولة طازجة، نعناع، ليمون وصودا",
      price: 4.8,
      image: "/pics/mojitos/strawberry_mojito.webp"
    },
    {
      id: 703,
      title: "MANGO MOJITO",
      title_ar: "موهيتو مانجو",
      description: "Ripe mango, mint and zesty lime",
      description_ar: "مانجو ناضج، نعناع وليمون منعش",
      price: 4.9,
      image: "/pics/mojitos/mango_mojito.webp"
    }
  ],
  hookah_classic: [
    {
      id: 801,
      title: "DOUBLE APPLE",
      title_ar: "تفاحتين",
      description: "Classic double apple flavor, medium smoke",
      description_ar: "نكهة التفاحتين الكلاسيكية",
      price: 6.0,
      image: "/pics/hookah/double_apple.webp"
    },
    {
      id: 802,
      title: "MINT",
      title_ar: "نعناع",
      description: "Cool mint, light and refreshing",
      description_ar: "نعناع بارد، خفيف ومنعش",
      price: 6.0,
      image: "/pics/hookah/mint.webp"
    },
    {
      id: 803,
      title: "GRAPE",
      title_ar: "عنب",
      description: "Sweet grape tobacco, smooth taste",
      description_ar: "تبغ العنب الحلو، مذاق سلس",
      price: 6.0,
      image: "/pics/hookah/grape.webp"
    }
  ],
  hookah_special: [
    {
      id: 901,
      title: "CITRUS MIX",
      title_ar: "ميكس حمضيات",
      description: "Blend of lemon, orange and lime for a tangy session",
      description_ar: "خليط ليمون، برتقال ولايم",
      price: 8.0,
      image: "/pics/special-mixes/citrus_mix.webp"
    },
    {
      id: 902,
      title: "BERRY DELUXE",
      title_ar: "بيري ديلوكس",
      description: "Mixed berries with a cooling menthol finish",
      description_ar: "توت مشكل مع لمسة نعناع باردة",
      price: 8.5,
      image: "/pics/special-mixes/bery_deluxe.webp"
    },
    {
      id: 903,
      title: "VANILLA TOBACCO",
      title_ar: "فانيلا",
      description: "Smooth vanilla-infused tobacco",
      description_ar: "تبغ بنكهة الفانيلا الناعمة",
      price: 9.0,
      image: "/pics/special-mixes/vanilla.webp"
    }
  ],
  desserts: [
    {
      id: 1001,
      title: "BASBOUSA",
      title_ar: "بسبوسة",
      description: "Semolina cake soaked in syrup, topped with almonds",
      description_ar: "كيكة سميد بالقطر واللوز",
      price: 3.5,
      image: "/pics/desserts/basbousa.webp"
    },
    {
      id: 1002,
      title: "KNAFEH",
      title_ar: "كنافة",
      description: "Sweet cheese pastry, orange blossom syrup",
      description_ar: "عجينة كنافة بالجبن الحلو والقطر",
      price: 4.5,
      image: "/pics/desserts/knafeh.webp"
    },
    {
      id: 1003,
      title: "UMM ALI",
      title_ar: "أم علي",
      description: "Egyptian bread pudding with nuts and cream",
      description_ar: "حلوى الخبز والحليب والمكسرات",
      price: 3.8,
      image: "/pics/desserts/ummali.webp"
    },
    {
      id: 1004,
      title: "ICE CREAM SCOOP",
      title_ar: "آيس كريم",
      description: "Vanilla or chocolate scoop with toppings",
      description_ar: "كرة فانيلا أو شوكولاتة مع إضافات",
      price: 2.5,
      image: "/pics/desserts/icecream.webp"
    }
  ]
};