const translations = {

    en: {

        welcome: "Welcome to Leily",

        heroTitle: "Find something<br>you’ll love.",

        heroDescription:
            "Discover clothing and little things chosen for you, all in one soft and simple place.",

        explore: "Explore products",

        discover: "Discover",

        categories: "Categories",

        viewAll: "View all",

        all: "All",

        clothes: "Clothes",

        shoes: "Shoes",

        bags: "Bags",

        accessories: "Accessories",

        beauty: "Beauty",

        kids: "Kids",

        fresh: "Fresh finds",

        newProducts: "New products",

        sellerKicker: "Have a shop?",

        sellerTitle: "Bring your products<br>to Leily.",

        sellerDescription:
            "Create your seller page and let women discover what you have to offer.",

        becomeSeller: "Become a seller",

        home: "Home",

        search: "Search",

        saved: "Saved",

        account: "Account",

        settings: "Settings",

        language: "Language",

        chooseLanguage: "Choose your language",

        savedProducts: "Saved products",

        myAccount: "My account",

        sellerAccount: "Seller account"

    },


    ar: {

        welcome: "مرحبًا بكِ في Leily",

        heroTitle: "اكتشفي شيئًا<br>ستحبينه.",

        heroDescription:
            "اكتشفي الملابس والأشياء الجميلة المختارة لكِ، في مكان واحد بسيط وناعم.",

        explore: "استكشفي المنتجات",

        discover: "اكتشفي",

        categories: "التصنيفات",

        viewAll: "عرض الكل",

        all: "الكل",

        clothes: "ملابس",

        shoes: "أحذية",

        bags: "حقائب",

        accessories: "إكسسوارات",

        beauty: "عناية",

        kids: "أطفال",

        fresh: "وصل حديثًا",

        newProducts: "أحدث المنتجات",

        sellerKicker: "لديكِ متجر؟",

        sellerTitle: "أضيفي منتجاتكِ<br>إلى Leily.",

        sellerDescription:
            "أنشئي صفحة متجركِ ودعي النساء يكتشفن ما تقدمينه.",

        becomeSeller: "أصبحي بائعة",

        home: "الرئيسية",

        search: "البحث",

        saved: "المحفوظات",

        account: "الحساب",

        settings: "الإعدادات",

        language: "اللغة",

        chooseLanguage: "اختاري لغتكِ",

        savedProducts: "المنتجات المحفوظة",

        myAccount: "حسابي",

        sellerAccount: "حساب البائعة"

    }

};


const languageSelect =
    document.getElementById("languageSelect");


function setLanguage(language) {

    const dictionary = translations[language];

    document.documentElement.lang = language;

    document.documentElement.dir =
        language === "ar" ? "rtl" : "ltr";


    document.querySelectorAll("[data-i18n]")
        .forEach(element => {

            const key = element.dataset.i18n;

            if (dictionary[key]) {

                element.innerHTML =
                    dictionary[key];

            }

        });


    localStorage.setItem(
        "leily-language",
        language
    );

}


const savedLanguage =
    localStorage.getItem("leily-language") || "en";


languageSelect.value = savedLanguage;

setLanguage(savedLanguage);


languageSelect.addEventListener(
    "change",
    event => {

        setLanguage(event.target.value);

    }
);


/* PANEL */

const sidePanel =
    document.getElementById("sidePanel");

const overlay =
    document.getElementById("overlay");

const menuBtn =
    document.getElementById("menuBtn");

const profileBtn =
    document.getElementById("profileBtn");

const closePanel =
    document.getElementById("closePanel");


function openPanel() {

    sidePanel.classList.add("open");

    overlay.classList.add("visible");

}


function closeSidePanel() {

    sidePanel.classList.remove("open");

    overlay.classList.remove("visible");

}


menuBtn.addEventListener(
    "click",
    openPanel
);


profileBtn.addEventListener(
    "click",
    openPanel
);


closePanel.addEventListener(
    "click",
    closeSidePanel
);


overlay.addEventListener(
    "click",
    closeSidePanel
);


/* SAVE PRODUCTS */

document.querySelectorAll(".save-btn")
    .forEach(button => {

        button.addEventListener(
            "click",
            () => {

                button.classList.toggle("saved");

                button.textContent =
                    button.classList.contains("saved")
                        ? "♥"
                        : "♡";

            }
        );

    });


/* CATEGORY FILTER */

const categoryButtons =
    document.querySelectorAll(".category-card");

const productCards =
    document.querySelectorAll(".product-card");


categoryButtons.forEach(button => {

    button.addEventListener(
        "click",
        () => {

            categoryButtons.forEach(
                item =>
                    item.classList.remove("active")
            );


            button.classList.add("active");


            const category =
                button.dataset.category;


            productCards.forEach(card => {

                if (
                    category === "all" ||
                    card.dataset.category === category
                ) {

                    card.style.display = "";

                } else {

                    card.style.display = "none";

                }

            });

        }
    );

});


/* SEARCH */

const searchInput =
    document.getElementById("searchInput");


searchInput.addEventListener(
    "input",
    () => {

        const search =
            searchInput.value
                .trim()
                .toLowerCase();


        productCards.forEach(card => {

            const text =
                card.textContent.toLowerCase();


            card.style.display =
                text.includes(search)
                    ? ""
                    : "none";

        });

    }
);


/* EXPLORE */

document.getElementById("exploreBtn")
    .addEventListener(
        "click",
        () => {

            document
                .querySelector(".products-section")
                .scrollIntoView({
                    behavior: "smooth"
                });

        }
    );


/* BOTTOM NAV */

document.querySelectorAll(".nav-item")
    .forEach(item => {

        item.addEventListener(
            "click",
            () => {

                document.querySelectorAll(".nav-item")
                    .forEach(
                        nav =>
                            nav.classList.remove("active")
                    );


                item.classList.add("active");


                const page =
                    item.dataset.page;


                if (page === "search") {

                    searchInput.focus();

                }


                if (page === "saved") {

                    document
                        .querySelector(".products-section")
                        .scrollIntoView({
                            behavior: "smooth"
                        });

                }


                if (page === "account") {

                    openPanel();

                }

            }
        );

    });


/* SELLER */

document.getElementById("sellerBtn")
    .addEventListener(
        "click",
        () => {

            alert(
                "Seller registration will be connected to Supabase in the next stage."
            );

        }
    );
