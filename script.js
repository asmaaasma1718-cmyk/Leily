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

/* LANGUAGE */

const languageSelect =
document.getElementById("languageSelect");

function setLanguage(language) {

const dictionary =
    translations[language];


document.documentElement.lang =
    language;


document.documentElement.dir =
    language === "ar"
        ? "rtl"
        : "ltr";


document
    .querySelectorAll("[data-i18n]")
    .forEach(element => {

        const key =
            element.dataset.i18n;


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
localStorage.getItem(
"leily-language"
) || "en";

if (languageSelect) {

languageSelect.value =
    savedLanguage;

setLanguage(
    savedLanguage
);


languageSelect.addEventListener(
    "change",
    event => {

        setLanguage(
            event.target.value
        );

    }
);

}

/* PANEL */

const sidePanel =
document.getElementById(
"sidePanel"
);

const overlay =
document.getElementById(
"overlay"
);

const menuBtn =
document.getElementById(
"menuBtn"
);

const profileBtn =
document.getElementById(
"profileBtn"
);

const closePanel =
document.getElementById(
"closePanel"
);

function openPanel() {

if (sidePanel) {

    sidePanel.classList.add(
        "open"
    );

}


if (overlay) {

    overlay.classList.add(
        "visible"
    );

}

}

function closeSidePanel() {

if (sidePanel) {

    sidePanel.classList.remove(
        "open"
    );

}


if (overlay) {

    overlay.classList.remove(
        "visible"
    );

}

}

if (menuBtn) {

menuBtn.addEventListener(
    "click",
    openPanel
);

}

if (profileBtn) {

profileBtn.addEventListener(
    "click",
    openPanel
);

}

if (closePanel) {

closePanel.addEventListener(
    "click",
    closeSidePanel
);

}

if (overlay) {

overlay.addEventListener(
    "click",
    closeSidePanel
);

}

/* SAVE PRODUCTS */

document
.querySelectorAll(".save-btn")
.forEach(button => {

    button.addEventListener(
        "click",
        event => {

            event.stopPropagation();


            button.classList.toggle(
                "saved"
            );


            button.textContent =
                button.classList.contains(
                    "saved"
                )
                    ? "♥"
                    : "♡";

        }
    );

});

/* OPEN PRODUCT */

document
.querySelectorAll(".product-open")
.forEach(element => {

    element.addEventListener(
        "click",
        event => {

            if (
                event.target.closest(
                    ".save-btn"
                )
            ) {

                return;

            }


            const productCard =
                element.closest(
                    ".product-card"
                );


            if (!productCard) {

                return;

            }


            const productId =
                productCard.dataset.product;


            if (!productId) {

                return;

            }


            window.location.href =
                "product.html?product=" +
                encodeURIComponent(
                    productId
                );

        }
    );

});

/* CATEGORY FILTER */

const categoryButtons =
document.querySelectorAll(
".category-card"
);

const productCards =
document.querySelectorAll(
".product-card"
);

categoryButtons.forEach(
button => {

    button.addEventListener(
        "click",
        () => {

            categoryButtons.forEach(
                item => {

                    item.classList.remove(
                        "active"
                    );

                }
            );


            button.classList.add(
                "active"
            );


            const category =
                button.dataset.category;


            productCards.forEach(
                card => {

                    if (
                        category === "all" ||
                        card.dataset.category ===
                            category
                    ) {

                        card.style.display =
                            "";

                    } else {

                        card.style.display =
                            "none";

                    }

                }
            );

        }
    );

}

);

/* SEARCH */

const searchInput =
document.getElementById(
"searchInput"
);

if (searchInput) {

searchInput.addEventListener(
    "input",
    () => {

        const search =
            searchInput.value
                .trim()
                .toLowerCase();


        productCards.forEach(
            card => {

                const text =
                    card.textContent
                        .toLowerCase();


                card.style.display =
                    text.includes(search)
                        ? ""
                        : "none";

            }
        );

    }
);

}

/* EXPLORE */

const exploreButton =
document.getElementById(
"exploreBtn"
);

if (exploreButton) {

exploreButton.addEventListener(
    "click",
    () => {

        const productsSection =
            document.querySelector(
                ".products-section"
            );


        if (productsSection) {

            productsSection.scrollIntoView({
                behavior: "smooth"
            });

        }

    }
);

}

/* BOTTOM NAVIGATION */

document
.querySelectorAll(".nav-item")
.forEach(item => {

    item.addEventListener(
        "click",
        () => {

            document
                .querySelectorAll(
                    ".nav-item"
                )
                .forEach(nav => {

                    nav.classList.remove(
                        "active"
                    );

                });


            item.classList.add(
                "active"
            );


            const page =
                item.dataset.page;


            if (
                page === "search" &&
                searchInput
            ) {

                searchInput.focus();

            }


            if (
                page === "saved"
            ) {

                const productsSection =
                    document.querySelector(
                        ".products-section"
                    );


                if (productsSection) {

                    productsSection.scrollIntoView({
                        behavior: "smooth"
                    });

                }

            }


            if (
                page === "account"
            ) {

                openPanel();

            }

        }
    );

});

/* SELLER */

const sellerButton =
document.getElementById(
"sellerBtn"
);

if (sellerButton) {

sellerButton.addEventListener(
    "click",
    () => {

        alert(
            "Seller registration will be connected to Supabase in the next stage."
        );

    }
);

}

/* VIEW ALL CATEGORIES */

const allCategoriesButton =
document.getElementById(
"allCategories"
);

if (allCategoriesButton) {

allCategoriesButton.addEventListener(
    "click",
    () => {

        categoryButtons.forEach(
            item => {

                item.classList.remove(
                    "active"
                );

            }
        );


        const allButton =
            document.querySelector(
                '.category-card[data-category="all"]'
            );


        if (allButton) {

            allButton.classList.add(
                "active"
            );

        }


        productCards.forEach(
            card => {

                card.style.display =
                    "";

            }
        );

    }
);

}

/* VIEW ALL PRODUCTS */

const viewProductsButton =
document.getElementById(
"viewProducts"
);

if (viewProductsButton) {

viewProductsButton.addEventListener(
    "click",
    () => {

        const productsSection =
            document.querySelector(
                ".products-section"
            );


        if (productsSection) {

            productsSection.scrollIntoView({
                behavior: "smooth"
            });

        }

    }
);

}

/* SAVED HEADER BUTTON */

const savedButton =
document.getElementById(
"savedBtn"
);

if (savedButton) {

savedButton.addEventListener(
    "click",
    () => {

        const productsSection =
            document.querySelector(
                ".products-section"
            );


        if (productsSection) {

            productsSection.scrollIntoView({
                behavior: "smooth"
            );

        }

    }
);

}
alert("Leily JavaScript is working!");
