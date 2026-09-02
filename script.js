const translations = {
    en: {
        welcome: "Welcome to Leily",
        heroTitle: "Find somethingyou’ll love.",
        heroDescription: "Discover clothing and little things chosen for you, all in one soft and simple place.",
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
        sellerTitle: "Bring your productsto Leily.",
        sellerDescription: "Create your seller page and let women discover what you have to offer.",
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
        heroTitle: "اكتشفي شيئًاستحبينه.",
        heroDescription: "اكتشفي الملابس والأشياء الجميلة المختارة لكِ، في مكان واحد بسيط وناعم.",
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
        sellerTitle: "أضيفي منتجاتكِإلى Leily.",
        sellerDescription: "أنشئي صفحة متجركِ ودعي النساء يكتشفن ما تقدمينه.",
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


/* ========================= LANGUAGE ========================= */

const languageSelect = document.getElementById("languageSelect");

function setLanguage(language) {

    const dictionary = translations[language];

    if (!dictionary) {
        return;
    }

    document.documentElement.lang = language;
    document.documentElement.dir = language === "ar" ? "rtl" : "ltr";

    document
        .querySelectorAll("[data-i18n]")
        .forEach(element => {

            const key = element.dataset.i18n;

            if (dictionary[key]) {
                element.innerHTML = dictionary[key];
            }

        });

    localStorage.setItem("leily-language", language);
}


const savedLanguage =
    localStorage.getItem("leily-language") || "en";


if (languageSelect) {

    languageSelect.value = savedLanguage;

    setLanguage(savedLanguage);

    languageSelect.addEventListener(
        "change",
        event => {
            setLanguage(event.target.value);
        }
    );
}


/* ========================= SIDE PANEL ========================= */

const sidePanel = document.getElementById("sidePanel");

const overlay = document.getElementById("overlay");

const menuBtn = document.getElementById("menuBtn");

const profileBtn = document.getElementById("profileBtn");

const closePanel = document.getElementById("closePanel");


function openPanel() {

    if (sidePanel) {
        sidePanel.classList.add("open");
    }

    if (overlay) {
        overlay.classList.add("visible");
    }

}


function closeSidePanel() {

    if (sidePanel) {
        sidePanel.classList.remove("open");
    }

    if (overlay) {
        overlay.classList.remove("visible");
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


/* ========================= PRODUCTS ========================= */

const productCards =
    document.querySelectorAll(".product-card");


/* ========================= SAVE PRODUCTS ========================= */

/*
   Leily Saved Products

   We only store the product IDs.
   Example:
   ["sweater", "bag"]

   This does not change the product cards,
   product pages, search, categories, or anything else.
*/

const SAVED_PRODUCTS_KEY = "leily-saved-products";


function getSavedProducts() {

    try {

        const saved =
            localStorage.getItem(SAVED_PRODUCTS_KEY);

        if (!saved) {
            return [];
        }

        const parsed = JSON.parse(saved);

        if (Array.isArray(parsed)) {
            return parsed;
        }

        return [];

    } catch (error) {

        return [];

    }
}


function saveSavedProducts(products) {

    localStorage.setItem(
        SAVED_PRODUCTS_KEY,
        JSON.stringify(products)
    );

}


function isProductSaved(productId) {

    return getSavedProducts().includes(productId);

}


function updateSaveButton(button, productId) {

    if (isProductSaved(productId)) {

        button.classList.add("saved");

        button.textContent = "♥";

    } else {

        button.classList.remove("saved");

        button.textContent = "♡";

    }

}


/*
   Restore saved hearts when the page opens.
*/

document
    .querySelectorAll(".save-btn")
    .forEach(button => {

        const productCard =
            button.closest(".product-card");

        if (!productCard) {
            return;
        }

        const productId =
            productCard.dataset.product;

        if (!productId) {
            return;
        }

        updateSaveButton(
            button,
            productId
        );


        button.addEventListener(
            "click",
            event => {

                event.stopPropagation();

                let savedProducts =
                    getSavedProducts();

                if (
                    savedProducts.includes(productId)
                ) {

                    savedProducts =
                        savedProducts.filter(
                            id => id !== productId
                        );

                } else {

                    savedProducts.push(productId);

                }

                saveSavedProducts(
                    savedProducts
                );

                updateSaveButton(
                    button,
                    productId
                );

            }
        );

    });


/* ========================= SAVED VIEW ========================= */

let savedMode = false;


function showAllProducts() {

    productCards.forEach(card => {

        card.style.display = "";

    });

}


function showSavedProducts() {

    savedMode = true;

    const savedProducts =
        getSavedProducts();

    productCards.forEach(card => {

        const productId =
            card.dataset.product;

        if (
            productId &&
            savedProducts.includes(productId)
        ) {

            card.style.display = "";

        } else {

            card.style.display = "none";

        }

    });

}


function leaveSavedMode() {

    savedMode = false;

    showAllProducts();

}


/* ========================= OPEN PRODUCT ========================= */

document
    .querySelectorAll(".product-open")
    .forEach(element => {

        element.addEventListener(
            "click",
            event => {

                if (
                    event.target.closest(".save-btn")
                ) {
                    return;
                }

                const productCard =
                    element.closest(".product-card");

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
                    encodeURIComponent(productId);

            }
        );

    });


/* ========================= CATEGORY FILTER ========================= */

const categoryButtons =
    document.querySelectorAll(".category-card");


categoryButtons.forEach(button => {

    button.addEventListener(
        "click",
        () => {

            /*
               If the user chooses a category,
               leave Saved mode.
            */

            leaveSavedMode();

            categoryButtons.forEach(item => {

                item.classList.remove("active");

            });

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


/* ========================= SEARCH ========================= */

const searchInput =
    document.getElementById("searchInput");


if (searchInput) {

    searchInput.addEventListener(
        "input",
        () => {

            /*
               Searching is normal product browsing,
               so leave Saved mode.
            */

            if (savedMode) {
                savedMode = false;
            }

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

}


/* ========================= EXPLORE BUTTON ========================= */

const exploreButton =
    document.getElementById("exploreBtn");


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


/* ========================= BOTTOM NAVIGATION ========================= */

document
    .querySelectorAll(".nav-item")
    .forEach(item => {

        item.addEventListener(
            "click",
            () => {

                document
                    .querySelectorAll(".nav-item")
                    .forEach(nav => {

                        nav.classList.remove(
                            "active"
                        );

                    });

                item.classList.add("active");

                const page =
                    item.dataset.page;


                if (
                    page === "search" &&
                    searchInput
                ) {

                    leaveSavedMode();

                    searchInput.focus();

                }


                if (page === "saved") {

                    showSavedProducts();

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


                if (page === "home") {

                    leaveSavedMode();

                    const allButton =
                        document.querySelector(
                            '.category-card[data-category="all"]'
                        );

                    if (allButton) {

                        categoryButtons.forEach(
                            item => {
                                item.classList.remove(
                                    "active"
                                );
                            }
                        );

                        allButton.classList.add(
                            "active"
                        );

                    }

                }


                if (page === "account") {

                    openPanel();

                }

            }
        );

    });


/* ========================= SELLER BUTTON ========================= */

const sellerButton =
    document.getElementById("sellerBtn");


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


/* ========================= VIEW ALL CATEGORIES ========================= */

const allCategoriesButton =
    document.getElementById("allCategories");


if (allCategoriesButton) {

    allCategoriesButton.addEventListener(
        "click",
        () => {

            leaveSavedMode();

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
                    card.style.display = "";
                }
            );

        }
    );

}


/* ========================= VIEW ALL PRODUCTS ========================= */

const viewProductsButton =
    document.getElementById("viewProducts");


if (viewProductsButton) {

    viewProductsButton.addEventListener(
        "click",
        () => {

            leaveSavedMode();

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


/* ========================= SAVED HEADER BUTTON ========================= */

const savedButton =
    document.getElementById("savedBtn");


if (savedButton) {

    savedButton.addEventListener(
        "click",
        () => {

            showSavedProducts();

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
