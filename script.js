/* =========================================================
   INDIA THROUGH THE RAILWAY WINDOW
   COMMUNITY WEBSITE SCRIPT
========================================================= */


/* =========================================================
   GOOGLE SHEETS API
========================================================= */

const GOOGLE_SHEET_API =
    "https://script.google.com/macros/s/AKfycbzkbY4cW1UH9o-du7Z_SquboB_UnMdzy1ORr5QBdrFpAUjtP_xCnYnwIA3QXUfUDIibWw/exec";


/* =========================================================
   ELEMENTS
========================================================= */


/* ---------- Explore ---------- */

const exploreButton =
    document.getElementById("exploreButton");

const exploreModal =
    document.getElementById("exploreModal");

const closeExplore =
    document.getElementById("closeExplore");


/* ---------- Build With Us ---------- */

const collaborateButton =
    document.getElementById("collaborateButton");

const collaborationModal =
    document.getElementById("collaborationModal");

const closeCollaboration =
    document.getElementById("closeCollaboration");


/* ---------- Add Website ---------- */

const addProjectButton =
    document.getElementById("addProjectButton");

const addWebsiteModal =
    document.getElementById("addWebsiteModal");

const closeAddWebsite =
    document.getElementById("closeAddWebsite");


/* ---------- Form ---------- */

const websiteForm =
    document.getElementById("websiteForm");

const creatorNameInput =
    document.getElementById("creatorName");

const websiteDescriptionInput =
    document.getElementById("websiteDescription");

const websiteURLInput =
    document.getElementById("websiteURL");

const formError =
    document.getElementById("formError");


/* ---------- Creator List ---------- */

const creatorList =
    document.getElementById("creatorList");


/* ---------- Page ---------- */

const page =
    document.querySelector(".page");


/* ---------- Place Cards ---------- */

const placeCards =
    document.querySelectorAll(".place-card");



/* =========================================================
   DEFAULT PROJECTS
========================================================= */

/*
 * These are your own projects.
 *
 * Community projects will now come from
 * Google Sheets.
 */

const defaultProjects = [

    {
        id: "manish-original",

        name: "Manish Kumar",

        description:
            "India Through the Railway Window",

        url: "#",

        likes: 1248,

        category: "Original"

    },


    {
        id: "roadways-music",

        name: "Manish Kumar",

        description:
            "Roadways Music",

        url:
            "https://manishkumar241219-wq.github.io/music-player-deploy/",

        likes: 342,

        category: "Music"

    }

];



/* =========================================================
   EXPLORE UTTARAKHAND
========================================================= */


/* ---------- Open Explore ---------- */

if (exploreButton) {

    exploreButton.addEventListener(
        "click",
        function () {

            exploreModal.classList.add(
                "active"
            );

            document.body.style.overflow =
                "hidden";

        }
    );

}



/* ---------- Close Explore ---------- */

function closeExploreModal() {

    if (!exploreModal) {
        return;
    }


    exploreModal.classList.remove(
        "active"
    );


    document.body.style.overflow = "";

}


if (closeExplore) {

    closeExplore.addEventListener(
        "click",
        closeExploreModal
    );

}



/* =========================================================
   BUILD WITH US
========================================================= */


/*
 * When the user opens Build With Us,
 * fetch the latest APPROVED projects
 * from Google Sheets.
 */

if (collaborateButton) {

    collaborateButton.addEventListener(
        "click",
        async function () {

            collaborationModal.classList.add(
                "active"
            );

            document.body.style.overflow =
                "hidden";


            /*
             * Show loading state.
             */

            showProjectsLoading();


            /*
             * Load projects from Google Sheet.
             */

            await loadProjects();

        }
    );

}



/* =========================================================
   CLOSE BUILD WITH US
========================================================= */

function closeCollaborationModal() {

    if (!collaborationModal) {
        return;
    }


    collaborationModal.classList.remove(
        "active"
    );


    document.body.style.overflow =
        "";

}


if (closeCollaboration) {

    closeCollaboration.addEventListener(
        "click",
        closeCollaborationModal
    );

}



/* =========================================================
   OPEN ADD WEBSITE
========================================================= */

if (addProjectButton) {

    addProjectButton.addEventListener(
        "click",
        function () {

            /*
             * Close Build With Us.
             */

            collaborationModal.classList.remove(
                "active"
            );


            /*
             * Reset form.
             */

            if (websiteForm) {

                websiteForm.reset();

            }


            if (formError) {

                formError.textContent =
                    "";

            }


            /*
             * Open submission modal.
             */

            addWebsiteModal.classList.add(
                "active"
            );

        }
    );

}



/* =========================================================
   CLOSE ADD WEBSITE
========================================================= */

function closeAddWebsiteModal() {

    if (!addWebsiteModal) {
        return;
    }


    addWebsiteModal.classList.remove(
        "active"
    );


    /*
     * Return to Build With Us.
     */

    collaborationModal.classList.add(
        "active"
    );


    document.body.style.overflow =
        "hidden";

}


if (closeAddWebsite) {

    closeAddWebsite.addEventListener(
        "click",
        closeAddWebsiteModal
    );

}



/* =========================================================
   SUBMIT WEBSITE TO GOOGLE SHEET
========================================================= */

if (websiteForm) {

    websiteForm.addEventListener(
        "submit",
        async function (event) {

            event.preventDefault();


            /*
             * Clear old error.
             */

            formError.textContent =
                "";


            /* =================================================
               GET FORM VALUES
            ================================================= */

            const name =
                creatorNameInput.value.trim();


            const description =
                websiteDescriptionInput.value.trim();


            let url =
                websiteURLInput.value.trim();



            /* =================================================
               VALIDATE NAME
            ================================================= */

            if (
                name.length < 2
            ) {

                formError.textContent =
                    "Please enter your name.";

                return;

            }



            /* =================================================
               VALIDATE DESCRIPTION
            ================================================= */

            if (
                description.length < 5
            ) {

                formError.textContent =
                    "Please describe your website.";

                return;

            }



            /* =================================================
               VALIDATE URL
            ================================================= */

            if (!url) {

                formError.textContent =
                    "Please enter your website URL.";

                return;

            }



            /* =================================================
               ADD HTTPS IF MISSING
            ================================================= */

            if (
                !url.startsWith("http://") &&
                !url.startsWith("https://")
            ) {

                url =
                    "https://" + url;

            }



            /* =================================================
               VALIDATE URL FORMAT
            ================================================= */

            try {

                const parsedURL =
                    new URL(url);


                if (
                    parsedURL.protocol !== "http:" &&
                    parsedURL.protocol !== "https:"
                ) {

                    throw new Error(
                        "Invalid protocol"
                    );

                }

            }

            catch (error) {

                formError.textContent =
                    "Please enter a valid website URL.";

                return;

            }



            /* =================================================
               SHOW SUBMITTING STATE
            ================================================= */

            const submitButton =
                websiteForm.querySelector(
                    ".submit-website-button"
                );


            const originalButtonText =
                submitButton
                    ? submitButton.innerHTML
                    : "";


            if (submitButton) {

                submitButton.disabled =
                    true;

                submitButton.innerHTML =
                    "Submitting...";

            }



            /* =================================================
               SEND TO GOOGLE APPS SCRIPT
            ================================================= */

            try {

                /*
                 * URLSearchParams creates normal
                 * form data which Apps Script
                 * can read through e.parameter.
                 */

                const formData =
                    new URLSearchParams();


                formData.append(
                    "name",
                    name
                );


                formData.append(
                    "description",
                    description
                );


                formData.append(
                    "url",
                    url
                );



                /*
                 * Send the data to Google Apps Script.
                 */

                const response =
                    await fetch(
                        GOOGLE_SHEET_API,
                        {
                            method: "POST",

                            body: formData
                        }
                    );



                /* =================================================
                   READ RESPONSE
                ================================================= */

                const result =
                    await response.json();



                /* =================================================
                   CHECK RESULT
                ================================================= */

                if (
                    !result.success
                ) {

                    throw new Error(
                        result.message ||
                        "Submission failed."
                    );

                }



                /* =================================================
                   SUCCESS
                ================================================= */

                websiteForm.reset();


                /*
                 * Show success message.
                 */

                formError.textContent =
                    "Submitted successfully! Your website will appear after approval.";


                formError.style.color =
                    "rgba(190,255,210,0.85)";



                /*
                 * Wait a moment, then
                 * return to Build With Us.
                 */

                setTimeout(
                    async function () {

                        addWebsiteModal.classList.remove(
                            "active"
                        );


                        collaborationModal.classList.add(
                            "active"
                        );


                        formError.textContent =
                            "";


                        formError.style.color =
                            "";


                        /*
                         * Refresh projects.
                         */

                        await loadProjects();

                    },
                    1800
                );

            }


            /* =================================================
               ERROR
            ================================================= */

            catch (error) {

                console.error(
                    "Submission error:",
                    error
                );


                formError.textContent =
                    "Could not submit your website. Please try again.";


                formError.style.color =
                    "#ffb4b4";

            }



            /* =================================================
               RESTORE BUTTON
            ================================================= */

            if (submitButton) {

                submitButton.disabled =
                    false;

                submitButton.innerHTML =
                    originalButtonText;

            }

        }
    );

}



/* =========================================================
   LOAD PROJECTS FROM GOOGLE SHEET
========================================================= */

async function loadProjects() {

    try {

        /*
         * Fetch data from Apps Script.
         */

        const response =
            await fetch(
                GOOGLE_SHEET_API,
                {
                    method: "GET",
                    cache: "no-store"
                }
            );


        /*
         * Check HTTP response.
         */

        if (!response.ok) {

            throw new Error(
                "API request failed."
            );

        }


        /*
         * Convert response to JSON.
         */

        const data =
            await response.json();



        /* =================================================
           CHECK API RESPONSE
        ================================================= */

        if (
            !data.success
        ) {

            throw new Error(
                data.message ||
                "Could not load projects."
            );

        }



        /* =================================================
           COMBINE DEFAULT + APPROVED
        ================================================= */

        const communityProjects =
            Array.isArray(data.projects)
                ? data.projects
                : [];


        const allProjects = [

            ...defaultProjects,

            ...communityProjects

        ];



        /* =================================================
           RENDER
        ================================================= */

        renderProjects(
            allProjects
        );

    }


    catch (error) {

        console.error(
            "Could not load community projects:",
            error
        );


        /*
         * If the API fails, still show
         * your own projects.
         */

        renderProjects(
            defaultProjects
        );

    }

}



/* =========================================================
   LOADING STATE
========================================================= */

function showProjectsLoading() {

    if (!creatorList) {
        return;
    }


    creatorList.innerHTML = `

        <div
            style="
                padding: 25px;
                text-align: center;
                font-size: 10px;
                color: rgba(255,255,255,0.50);
            "
        >
            Loading community projects...
        </div>

    `;

}



/* =========================================================
   RENDER PROJECTS
========================================================= */

function renderProjects(
    projects
) {

    if (!creatorList) {
        return;
    }


    /*
     * Clear existing cards.
     */

    creatorList.innerHTML =
        "";



    /*
     * If there are no projects.
     */

    if (
        !projects ||
        projects.length === 0
    ) {

        creatorList.innerHTML = `

            <div
                style="
                    padding: 25px;
                    text-align: center;
                    font-size: 10px;
                    color: rgba(255,255,255,0.50);
                "
            >
                No community projects yet.
            </div>

        `;

        return;

    }



    /*
     * Create cards.
     */

    projects.forEach(
        function (project) {

            const card =
                createProjectCard(
                    project
                );


            creatorList.appendChild(
                card
            );

        }
    );

}



/* =========================================================
   CREATE CREATOR CARD
========================================================= */

function createProjectCard(
    project
) {

    /*
     * Create button.
     */

    const card =
        document.createElement(
            "button"
        );


    card.className =
        "creator-card";


    card.type =
        "button";


    card.dataset.url =
        project.url;


    card.dataset.name =
        project.name;



    /* =================================================
       AVATAR
    ================================================= */

    const avatar =
        document.createElement(
            "div"
        );


    avatar.className =
        "creator-avatar";


    avatar.textContent =
        getInitials(
            project.name
        );



    /* =================================================
       CREATOR INFO
    ================================================= */

    const info =
        document.createElement(
            "div"
        );


    info.className =
        "creator-info";



    /* ---------- Name ---------- */

    const name =
        document.createElement(
            "h3"
        );


    name.textContent =
        project.name;



    /* ---------- Description ---------- */

    const description =
        document.createElement(
            "p"
        );


    description.textContent =
        project.description;



    /* =================================================
       META
    ================================================= */

    const meta =
        document.createElement(
            "div"
        );


    meta.className =
        "creator-meta";



    /* ---------- Likes ---------- */

    const likes =
        document.createElement(
            "span"
        );


    likes.className =
        "likes";


    likes.textContent =
        "♥ " +
        formatNumber(
            project.likes
        );



    /* ---------- Category ---------- */

    const category =
        document.createElement(
            "span"
        );


    category.textContent =
        project.category;



    meta.appendChild(
        likes
    );


    meta.appendChild(
        category
    );



    /* =================================================
       ADD CREATOR INFORMATION
    ================================================= */

    info.appendChild(
        name
    );


    info.appendChild(
        description
    );


    info.appendChild(
        meta
    );



    /* =================================================
       ARROW
    ================================================= */

    const arrow =
        document.createElement(
            "div"
        );


    arrow.className =
        "creator-arrow";


    arrow.textContent =
        "→";



    /* =================================================
       ADD TO CARD
    ================================================= */

    card.appendChild(
        avatar
    );


    card.appendChild(
        info
    );


    card.appendChild(
        arrow
    );



    /* =================================================
       CLICK CARD
    ================================================= */

    card.addEventListener(
        "click",
        function () {

            /*
             * No URL.
             */

            if (
                !project.url ||
                project.url === "#"
            ) {

                return;

            }


            /*
             * Open website.
             */

            openCreatorWebsite(
                project.url
            );

        }
    );


    return card;

}



/* =========================================================
   FORMAT NUMBER
========================================================= */

function formatNumber(
    number
) {

    if (
        typeof number !== "number"
    ) {

        number =
            Number(number) || 0;

    }


    return number.toLocaleString(
        "en-IN"
    );

}



/* =========================================================
   GET INITIALS
========================================================= */

function getInitials(
    name
) {

    if (!name) {

        return "??";

    }


    const words =
        name
            .trim()
            .split(/\s+/);



    /*
     * One-word name.
     */

    if (
        words.length === 1
    ) {

        return words[0]
            .substring(0, 2)
            .toUpperCase();

    }



    /*
     * Multiple-word name.
     */

    return (
        words[0].charAt(0) +
        words[
            words.length - 1
        ].charAt(0)
    ).toUpperCase();

}



/* =========================================================
   OPEN CREATOR WEBSITE
========================================================= */

function openCreatorWebsite(
    url
) {

    /*
     * Close community modal.
     */

    if (collaborationModal) {

        collaborationModal.classList.remove(
            "active"
        );

    }


    /*
     * Start fade.
     */

    if (page) {

        page.classList.add(
            "page-fade-out"
        );

    }


    /*
     * Navigate in same tab.
     */

    setTimeout(
        function () {

            window.location.href =
                url;

        },
        450
    );

}



/* =========================================================
   PLACE CARDS
========================================================= */

placeCards.forEach(
    function (card) {

        card.addEventListener(
            "click",
            function () {

                const place =
                    card.dataset.place;


                console.log(
                    "Selected place:",
                    place
                );


                closeExploreModal();

            }
        );

    }
);



/* =========================================================
   CLICK OUTSIDE EXPLORE MODAL
========================================================= */

if (exploreModal) {

    exploreModal.addEventListener(
        "click",
        function (event) {

            if (
                event.target ===
                exploreModal
            ) {

                closeExploreModal();

            }

        }
    );

}



/* =========================================================
   CLICK OUTSIDE COMMUNITY MODAL
========================================================= */

if (collaborationModal) {

    collaborationModal.addEventListener(
        "click",
        function (event) {

            if (
                event.target ===
                collaborationModal
            ) {

                closeCollaborationModal();

            }

        }
    );

}



/* =========================================================
   CLICK OUTSIDE ADD WEBSITE MODAL
========================================================= */

if (addWebsiteModal) {

    addWebsiteModal.addEventListener(
        "click",
        function (event) {

            if (
                event.target ===
                addWebsiteModal
            ) {

                closeAddWebsiteModal();

            }

        }
    );

}



/* =========================================================
   ESCAPE KEY
========================================================= */

document.addEventListener(
    "keydown",
    function (event) {

        if (
            event.key !== "Escape"
        ) {

            return;

        }



        /* ---------- Add Website ---------- */

        if (
            addWebsiteModal &&
            addWebsiteModal.classList.contains(
                "active"
            )
        ) {

            closeAddWebsiteModal();

            return;

        }



        /* ---------- Community ---------- */

        if (
            collaborationModal &&
            collaborationModal.classList.contains(
                "active"
            )
        ) {

            closeCollaborationModal();

            return;

        }



        /* ---------- Explore ---------- */

        if (
            exploreModal &&
            exploreModal.classList.contains(
                "active"
            )
        ) {

            closeExploreModal();

        }

    }
);



/* =========================================================
   INITIAL LOAD
========================================================= */

/*
 * We intentionally do NOT load the community
 * projects immediately.
 *
 * They are loaded when the user clicks
 * "Build with us".
 */

console.log(
    "India Through the Railway Window loaded."
);