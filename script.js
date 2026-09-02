const translations = {

    en: {

        welcome: "Welcome to Leily",

        heroTitle:
            "Find something<br>you’ll love.",

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

        sellerTitle:
            "Bring your products<br>to Leily.",

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

        sellerAccount: "Seller account",

        savedTitle: "Saved products",

        noSavedTitle: "No saved products yet",

        noSavedText:
            "Products you save will appear here.",

        backToProducts: "Back to products"

    },


    ar: {

        welcome: "مرحبًا بكِ في Leily",

        heroTitle:
            "اكتشفي شيئًا<br>ستحبينه.",

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

        sellerTitle:
            "أضيفي منتجاتكِ<br>إلى Leily.",

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

        sellerAccount: "حساب البائعة",

        savedTitle: "المنتجات المحفوظة",

        noSavedTitle: "لا توجد منتجات محفوظة بعد",

        noSavedText:
            "المنتجات التي تحفظينها ستظهر هنا.",

        backToProducts: "العودة إلى المنتجات"

    }

};



/* =========================
LANGUAGE
========================= */

const languageSelect =
    document.getElementById("languageSelect");


function setLanguage(language) {

    const dictionary =
        translations[language];

    if (!dictionary) {
        return;
    }

    document.documentElement.lang =
        language;

    document.documentElement.dir =
        language === "ar" ? "rtl" : "ltr";


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


    const savedTitle =
        document.getElementById(
            "productsTitle"
        );

    const savedEmptyTitle =
        document.getElementById(
            "savedEmptyTitle"
        );

    const savedEmptyText =
        document.getElementById(
            "savedEmptyText"
        );

    const backButton =
        document.getElementById(
            "backToAllProducts"
        );


    if (savedEmptyTitle) {

        savedEmptyTitle.textContent =
            dictionary.noSavedTitle;

    }


    if (savedEmptyText) {

        savedEmptyText.textContent =
            dictionary.noSavedText;

    }


    if (backButton) {

        backButton.textContent =
            dictionary.backToProducts;

    }


    if (savedMode && savedTitle) {

        savedTitle.textContent =
            dictionary.savedTitle;

    }


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

    setLanguage(savedLanguage);


    languageSelect.addEventListener(
        "change",
        event => {

            setLanguage(
                event.target.value
            );

        }
    );

}



/* =========================
SIDE PANEL
========================= */

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



/* =========================
SAVE PRODUCTS
========================= */

const savedStorageKey =
    "leily-saved-products";


let savedProducts =
    JSON.parse(
        localStorage.getItem(
            savedStorageKey
        ) || "[]"
    );


function saveSavedProducts() {

    localStorage.setItem(
        savedStorageKey,
        JSON.stringify(savedProducts)
    );

}


function isProductSaved(productId) {

    return savedProducts.includes(
        productId
    );

}


function updateSaveButtons() {

    document
        .querySelectorAll(".save-btn")
        .forEach(button => {

            const productCard =
                button.closest(
                    ".product-card"
                );

            if (!productCard) {
                return;
            }

            const productId =
                productCard.dataset.product;

            if (
                isProductSaved(productId)
            ) {

                button.classList.add(
                    "saved"
                );

                button.textContent =
                    "♥";

            } else {

                button.classList.remove(
                    "saved"
                );

                button.textContent =
                    "♡";

            }

        });

}


document
    .querySelectorAll(".save-btn")
    .forEach(button => {

        button.addEventListener(
            "click",
            event => {

                event.stopPropagation();

                const productCard =
                    button.closest(
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


                if (
                    savedProducts.includes(
                        productId
                    )
                ) {

                    savedProducts =
                        savedProducts.filter(
                            id =>
                                id !== productId
                        );

                } else {

                    savedProducts.push(
                        productId
                    );

                }


                saveSavedProducts();

                updateSaveButtons();


                if (savedMode) {

                    showSavedProducts();

                }

            }
        );

    });



/* =========================
SAVED PRODUCTS VIEW
========================= */

const productsGrid =
    document.getElementById(
        "productsGrid"
    );

const productsKicker =
    document.getElementById(
        "productsKicker"
    );

const productsTitle =
    document.getElementById(
        "productsTitle"
    );

const savedEmpty =
    document.getElementById(
        "savedEmpty"
    );

const backToProducts =
    document.getElementById(
        "backToProducts"
    );

const backToAllProducts =
    document.getElementById(
        "backToAllProducts"
    );


let savedMode = false;


function showAllProducts() {

    savedMode = false;


    const dictionary =
        translations[
            document.documentElement.lang
        ] || translations.en;


    productsKicker.innerHTML =
        dictionary.fresh;

    productsTitle.innerHTML =
        dictionary.newProducts;


    document
        .querySelectorAll(".product-card")
        .forEach(card => {

            card.style.display = "";

        });


    savedEmpty.style.display =
        "none";

    backToProducts.style.display =
        "none";


    updateSaveButtons();

}


function showSavedProducts() {

    savedMode = true;


    const dictionary =
        translations[
            document.documentElement.lang
        ] || translations.en;


    productsKicker.innerHTML =
        dictionary.saved;

    productsTitle.innerHTML =
        dictionary.savedTitle;


    let visibleCount = 0;


    document
        .querySelectorAll(".product-card")
        .forEach(card => {

            const productId =
                card.dataset.product;


            if (
                savedProducts.includes(
                    productId
                )
            ) {

                card.style.display =
                    "";

                visibleCount++;

            } else {

                card.style.display =
                    "none";

            }

        });


    if (visibleCount === 0) {

        savedEmpty.style.display =
            "block";

    } else {

        savedEmpty.style.display =
            "none";

    }


    backToProducts.style.display =
        "block";


    updateSaveButtons();

}



/* =========================
OPEN PRODUCT
========================= */

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



/* =========================
CATEGORY FILTER
========================= */

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

                if (savedMode) {

                    showAllProducts();

                }


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



/* =========================
SEARCH
========================= */

const searchInput =
    document.getElementById(
        "searchInput"
    );


if (searchInput) {

    searchInput.addEventListener(
        "input",
        () => {

            if (savedMode) {

                showAllProducts();

            }


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



/* =========================
EXPLORE BUTTON
========================= */

const exploreButton =
    document.getElementById(
        "exploreBtn"
    );


if (exploreButton) {

    exploreButton.addEventListener(
        "click",
        () => {

            showAllProducts();


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



/* =========================
BOTTOM NAVIGATION
========================= */

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
                    page === "home"
                ) {

                    showAllProducts();

                    window.scrollTo({
                        top: 0,
                        behavior: "smooth"
                    });

                }


                if (
                    page === "search" &&
                    searchInput
                ) {

                    showAllProducts();

                    searchInput.focus();

                }


                if (
                    page === "saved"
                ) {

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


                if (
                    page === "account"
                ) {

                    openPanel();

                }

            }
        );

    });



/* =========================
TOP SAVED BUTTON
========================= */

const savedButton =
    document.getElementById(
        "savedBtn"
    );


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



/* =========================
SIDE PANEL SAVED BUTTON
========================= */

const savedPanelButton =
    document.getElementById(
        "savedPanelBtn"
    );


if (savedPanelButton) {

    savedPanelButton.addEventListener(
        "click",
        () => {

            closeSidePanel();

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



/* =========================
BACK TO ALL PRODUCTS
========================= */

if (backToAllProducts) {

    backToAllProducts.addEventListener(
        "click",
        () => {

            showAllProducts();

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



/* =========================
VIEW ALL PRODUCTS
========================= */

const viewProductsButton =
    document.getElementById(
        "viewProducts"
    );


if (viewProductsButton) {

    viewProductsButton.addEventListener(
        "click",
        () => {

            showAllProducts();


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



/* =========================
VIEW ALL CATEGORIES
========================= */

const allCategoriesButton =
    document.getElementById(
        "allCategories"
    );


if (allCategoriesButton) {

    allCategoriesButton.addEventListener(
        "click",
        () => {

            if (savedMode) {

                showAllProducts();

            }


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



/* =========================
SELLER BUTTON
========================= */

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



/* =========================
SELLER PANEL BUTTON
========================= */

const sellerPanelButton =
    document.getElementById(
        "sellerPanelBtn"
    );


if (sellerPanelButton) {

    sellerPanelButton.addEventListener(
        "click",
        () => {

            window.location.href =
                "seller.html";

        }
    );

}



/* =========================
ACCOUNT PANEL BUTTON
========================= */

const accountPanelButton =
    document.getElementById(
        "accountPanelBtn"
    );


if (accountPanelButton) {

    accountPanelButton.addEventListener(
        "click",
        () => {

            alert(
                "Account will be connected to Supabase in the next stage."
            );

        }
    );

}



/* =========================
INITIAL STATE
========================= */

updateSaveButtons();
