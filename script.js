/* =========================================================
   INDIA THROUGH THE RAILWAY WINDOW
   MAIN JAVASCRIPT
========================================================= */


/* =========================================================
   GOOGLE SHEETS API
========================================================= */

const GOOGLE_SHEET_API =
    "https://script.google.com/macros/s/AKfycbwCGGmd83yh-OHlrEj4l1tmyxf-nufILvlM3LBKmnf92n6be_G-XOgIvaOEsPQVXDIPRQ/exec";


/* =========================================================
   ELEMENTS
========================================================= */

const exploreButton =
    document.getElementById("exploreButton");

const exploreModal =
    document.getElementById("exploreModal");

const closeExplore =
    document.getElementById("closeExplore");

const collaborateButton =
    document.getElementById("collaborateButton");

const collaborationModal =
    document.getElementById("collaborationModal");

const closeCollaboration =
    document.getElementById("closeCollaboration");

const addProjectButton =
    document.getElementById("addProjectButton");

const addWebsiteModal =
    document.getElementById("addWebsiteModal");

const closeAddWebsite =
    document.getElementById("closeAddWebsite");

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

const creatorList =
    document.getElementById("creatorList");

const page =
    document.querySelector(".page");

const placeCards =
    document.querySelectorAll(".place-card");

const backgroundVideo =
    document.getElementById("backgroundVideo");

const soundToggle =
    document.getElementById("soundToggle");


/*
 * IMPORTANT:
 * This was missing from your previous JS.
 */

const weatherButton =
    document.getElementById("weatherButton");

const weatherVideoA =
    document.getElementById("weatherVideoA");

const weatherVideoB =
    document.getElementById("weatherVideoB");


/* =========================================================
   DEFAULT PROJECTS
========================================================= */

const defaultProjects = [

    {
        id: "manish-original",
        name: "Manish Kumar",
        description: "India Through the Railway Window",
        url: "#",
        likes: 1248,
        category: "Original"
    },

    {
        id: "roadways-music",
        name: "Manish Kumar",
        description: "Roadways Music",
        url:
            "https://manishkumar241219-wq.github.io/music-player-deploy/",
        likes: 342,
        category: "Music"
    }

];


/* =========================================================
   EXPLORE
========================================================= */

if (exploreButton) {

    exploreButton.addEventListener(
        "click",
        function () {

            if (!exploreModal) {
                return;
            }

            exploreModal.classList.add("active");

            document.body.style.overflow =
                "hidden";

        }
    );

}


function closeExploreModal() {

    if (!exploreModal) {
        return;
    }

    exploreModal.classList.remove("active");

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

if (collaborateButton) {

    collaborateButton.addEventListener(
        "click",
        async function () {

            if (!collaborationModal) {
                return;
            }

            collaborationModal.classList.add(
                "active"
            );

            document.body.style.overflow =
                "hidden";

            showProjectsLoading();

            await loadProjects();

        }
    );

}


function closeCollaborationModal() {

    if (!collaborationModal) {
        return;
    }

    collaborationModal.classList.remove(
        "active"
    );

    document.body.style.overflow = "";

}


if (closeCollaboration) {

    closeCollaboration.addEventListener(
        "click",
        closeCollaborationModal
    );

}


/* =========================================================
   ADD WEBSITE
========================================================= */

if (addProjectButton) {

    addProjectButton.addEventListener(
        "click",
        function () {

            if (collaborationModal) {

                collaborationModal.classList.remove(
                    "active"
                );

            }

            if (websiteForm) {
                websiteForm.reset();
            }

            if (formError) {

                formError.textContent = "";

                formError.style.color = "";

            }

            if (addWebsiteModal) {

                addWebsiteModal.classList.add(
                    "active"
                );

            }

        }
    );

}


function closeAddWebsiteModal() {

    if (!addWebsiteModal) {
        return;
    }

    addWebsiteModal.classList.remove(
        "active"
    );

    if (collaborationModal) {

        collaborationModal.classList.add(
            "active"
        );

    }

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
   SUBMIT WEBSITE
========================================================= */

if (websiteForm) {

    websiteForm.addEventListener(
        "submit",
        async function (event) {

            event.preventDefault();


            if (formError) {

                formError.textContent = "";

                formError.style.color = "";

            }


            const name =
                creatorNameInput
                    ? creatorNameInput.value.trim()
                    : "";


            const description =
                websiteDescriptionInput
                    ? websiteDescriptionInput.value.trim()
                    : "";


            let url =
                websiteURLInput
                    ? websiteURLInput.value.trim()
                    : "";


            /* =================================================
               VALIDATION
            ================================================= */

            if (name.length < 2) {

                showFormError(
                    "Please enter your name."
                );

                return;

            }


            if (description.length < 5) {

                showFormError(
                    "Please describe your website."
                );

                return;

            }


            if (!url) {

                showFormError(
                    "Please enter your website URL."
                );

                return;

            }


            /*
             * Add https automatically.
             */

            if (
                !url.startsWith("http://") &&
                !url.startsWith("https://")
            ) {

                url =
                    "https://" + url;

            }


            /*
             * Validate URL.
             */

            try {

                const parsedURL =
                    new URL(url);


                if (
                    parsedURL.protocol !==
                        "http:" &&
                    parsedURL.protocol !==
                        "https:"
                ) {

                    throw new Error(
                        "Invalid protocol"
                    );

                }

            }

            catch (error) {

                showFormError(
                    "Please enter a valid website URL."
                );

                return;

            }


            /* =================================================
               BUTTON
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
               SEND TO GOOGLE SHEETS
               JSONP VERSION
            ================================================= */

            try {

                const result =
                    await submitToGoogleSheets(
                        name,
                        description,
                        url
                    );


                console.log(
                    "Google Sheets response:",
                    result
                );


                if (
                    !result ||
                    !result.success
                ) {

                    throw new Error(
                        result &&
                        result.message
                            ? result.message
                            : "Submission failed."
                    );

                }


                /* =================================================
                   SUCCESS
                ================================================= */

                websiteForm.reset();


                if (formError) {

                    formError.textContent =
                        "Submitted successfully! Your website will appear after approval.";

                    formError.style.color =
                        "rgba(190,255,210,0.85)";

                }


                setTimeout(
                    async function () {

                        if (addWebsiteModal) {

                            addWebsiteModal.classList.remove(
                                "active"
                            );

                        }


                        if (collaborationModal) {

                            collaborationModal.classList.add(
                                "active"
                            );

                        }


                        if (formError) {

                            formError.textContent =
                                "";

                            formError.style.color =
                                "";

                        }


                        await loadProjects();

                    },
                    1800
                );

            }


            catch (error) {

                console.error(
                    "Submission error:",
                    error
                );


                showFormError(
                    error.message ||
                    "Could not submit your website. Please try again."
                );

            }


            finally {

                if (submitButton) {

                    submitButton.disabled =
                        false;

                    submitButton.innerHTML =
                        originalButtonText;

                }

            }

        }
    );

}


/* =========================================================
   GOOGLE SHEETS SUBMISSION
   JSONP
========================================================= */

function submitToGoogleSheets(
    name,
    description,
    url
) {

    return new Promise(
        function (resolve, reject) {

            const callbackName =
                "googleSheetCallback_" +
                Date.now() +
                "_" +
                Math.floor(
                    Math.random() * 100000
                );


            const params =
                new URLSearchParams();


            params.append(
                "action",
                "submit"
            );


            params.append(
                "name",
                name
            );


            params.append(
                "description",
                description
            );


            params.append(
                "url",
                url
            );


            params.append(
                "callback",
                callbackName
            );


            const requestURL =
                GOOGLE_SHEET_API +
                "?" +
                params.toString();


            console.log(
                "Google Sheets submission:",
                requestURL
            );


            const script =
                document.createElement(
                    "script"
                );


            let completed =
                false;


            const cleanup =
                function () {

                    if (script) {
                        script.remove();
                    }

                    try {

                        delete window[
                            callbackName
                        ];

                    }

                    catch (error) {

                        window[
                            callbackName
                        ] = undefined;

                    }

                };


            window[callbackName] =
                function (result) {

                    if (completed) {
                        return;
                    }

                    completed = true;

                    clearTimeout(
                        timeout
                    );

                    cleanup();

                    resolve(result);

                };


            script.onerror =
                function () {

                    if (completed) {
                        return;
                    }

                    completed = true;

                    clearTimeout(
                        timeout
                    );

                    cleanup();

                    reject(
                        new Error(
                            "Could not connect to Google Sheets."
                        )
                    );

                };


            const timeout =
                setTimeout(
                    function () {

                        if (completed) {
                            return;
                        }

                        completed = true;

                        cleanup();

                        reject(
                            new Error(
                                "Google Sheets request timed out."
                            )
                        );

                    },
                    15000
                );


            script.src =
                requestURL;


            document.body.appendChild(
                script
            );

        }
    );

}


/* =========================================================
   FORM ERROR
========================================================= */

function showFormError(
    message
) {

    if (!formError) {
        return;
    }

    formError.textContent =
        message;

    formError.style.color =
        "#ffb4b4";

}


/* =========================================================
   LOAD PROJECTS
   JSONP VERSION
========================================================= */

async function loadProjects() {

    try {

        console.log(
            "Loading projects..."
        );


        const data =
            await loadProjectsFromGoogleSheets();


        console.log(
            "Projects received:",
            data
        );


        if (!data.success) {

            throw new Error(
                data.message ||
                "Could not load projects."
            );

        }


        const communityProjects =
            Array.isArray(data.projects)
                ? data.projects
                : [];


        const defaultIDs =
            new Set(
                defaultProjects.map(
                    function (project) {
                        return project.id;
                    }
                )
            );


        const filteredCommunityProjects =
            communityProjects.filter(
                function (project) {

                    return !defaultIDs.has(
                        project.id
                    );

                }
            );


        const allProjects = [

            ...defaultProjects,

            ...filteredCommunityProjects

        ];


        renderProjects(
            allProjects
        );

    }


    catch (error) {

        console.error(
            "Could not load community projects:",
            error
        );


        renderProjects(
            defaultProjects
        );

    }

}


/* =========================================================
   LOAD PROJECTS FROM GOOGLE SHEETS
   JSONP
========================================================= */

function loadProjectsFromGoogleSheets() {

    return new Promise(
        function (resolve, reject) {

            const callbackName =
                "googleProjectsCallback_" +
                Date.now() +
                "_" +
                Math.floor(
                    Math.random() * 100000
                );


            const params =
                new URLSearchParams();


            params.append(
                "callback",
                callbackName
            );


            const requestURL =
                GOOGLE_SHEET_API +
                "?" +
                params.toString();


            console.log(
                "Loading Google Sheets:",
                requestURL
            );


            const script =
                document.createElement(
                    "script"
                );


            let completed =
                false;


            const cleanup =
                function () {

                    if (script) {
                        script.remove();
                    }

                    try {

                        delete window[
                            callbackName
                        ];

                    }

                    catch (error) {

                        window[
                            callbackName
                        ] = undefined;

                    }

                };


            window[callbackName] =
                function (result) {

                    if (completed) {
                        return;
                    }

                    completed = true;

                    clearTimeout(
                        timeout
                    );

                    cleanup();

                    resolve(result);

                };


            script.onerror =
                function () {

                    if (completed) {
                        return;
                    }

                    completed = true;

                    clearTimeout(
                        timeout
                    );

                    cleanup();

                    reject(
                        new Error(
                            "Could not load Google Sheets data."
                        )
                    );

                };


            const timeout =
                setTimeout(
                    function () {

                        if (completed) {
                            return;
                        }

                        completed = true;

                        cleanup();

                        reject(
                            new Error(
                                "Google Sheets request timed out."
                            )
                        );

                    },
                    15000
                );


            script.src =
                requestURL;


            document.body.appendChild(
                script
            );

        }
    );

}


/* =========================================================
   LOADING
========================================================= */

function showProjectsLoading() {

    if (!creatorList) {
        return;
    }


    creatorList.innerHTML = `

        <div
            style="
                padding:25px;
                text-align:center;
                font-size:10px;
                color:rgba(255,255,255,0.50);
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


    creatorList.innerHTML = "";


    if (
        !projects ||
        projects.length === 0
    ) {

        creatorList.innerHTML = `

            <div
                style="
                    padding:25px;
                    text-align:center;
                    font-size:10px;
                    color:rgba(255,255,255,0.50);
                "
            >
                No community projects yet.
            </div>

        `;

        return;

    }


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
   CREATE PROJECT CARD
========================================================= */

function createProjectCard(
    project
) {

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


    const info =
        document.createElement(
            "div"
        );


    info.className =
        "creator-info";


    const name =
        document.createElement(
            "h3"
        );


    name.textContent =
        project.name;


    const description =
        document.createElement(
            "p"
        );


    description.textContent =
        project.description;


    const meta =
        document.createElement(
            "div"
        );


    meta.className =
        "creator-meta";


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


    info.appendChild(
        name
    );


    info.appendChild(
        description
    );


    info.appendChild(
        meta
    );


    const arrow =
        document.createElement(
            "div"
        );


    arrow.className =
        "creator-arrow";


    arrow.textContent =
        "→";


    card.appendChild(
        avatar
    );


    card.appendChild(
        info
    );


    card.appendChild(
        arrow
    );


    card.addEventListener(
        "click",
        function () {

            if (
                !project.url ||
                project.url === "#"
            ) {

                return;

            }


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
        typeof number !==
        "number"
    ) {

        number =
            Number(number) || 0;

    }


    return number.toLocaleString(
        "en-IN"
    );

}


/* =========================================================
   INITIALS
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


    if (words.length === 1) {

        return words[0]
            .substring(0, 2)
            .toUpperCase();

    }


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

    if (collaborationModal) {

        collaborationModal.classList.remove(
            "active"
        );

    }


    if (page) {

        page.classList.add(
            "page-fade-out"
        );

    }


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
   CLICK OUTSIDE MODALS
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
            event.key !==
            "Escape"
        ) {

            return;

        }


        if (
            addWebsiteModal &&
            addWebsiteModal.classList.contains(
                "active"
            )
        ) {

            closeAddWebsiteModal();

            return;

        }


        if (
            collaborationModal &&
            collaborationModal.classList.contains(
                "active"
            )
        ) {

            closeCollaborationModal();

            return;

        }


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
   WEATHER VIDEO SYSTEM
=========================================================

   ORDER:

   1. Background
   2. Rain
   3. Night
   4. Background
   5. Rain
   6. Night
   ...

========================================================= */


/* =========================================================
   VIDEO FILES
========================================================= */

const weatherVideoFiles = [

    "assets/background.mp4",

    "assets/Rain.mp4",

    "assets/Night.mp4"

];


/* =========================================================
   WEATHER STATE
========================================================= */

let weatherIndex = 0;

let activeWeatherVideo =
    weatherVideoA;

let nextWeatherVideo =
    weatherVideoB;

let weatherIsChanging =
    false;


/*
 * Whether the user has enabled sound.
 */

let weatherSoundEnabled =
    false;


/* =========================================================
   PREPARE VIDEO ELEMENT
========================================================= */

function configureWeatherVideo(
    video,
    src
) {

    if (!video) {
        return;
    }


    video.pause();


    video.classList.remove(
        "active"
    );


    video.src =
        src;


    video.loop =
        true;


    video.playsInline =
        true;


    video.preload =
        "auto";


    /*
     * Start muted because browsers
     * block autoplay with sound.
     */

    video.muted =
        true;


    video.load();

}


/* =========================================================
   START DEFAULT WEATHER VIDEO
========================================================= */

function startWeatherVideo() {

    if (!activeWeatherVideo) {
        return;
    }


    configureWeatherVideo(
        activeWeatherVideo,
        weatherVideoFiles[0]
    );


    weatherIndex =
        0;


    activeWeatherVideo.classList.add(
        "active"
    );


    const playVideo =
        function () {

            activeWeatherVideo
                .play()
                .catch(
                    function (error) {

                        console.log(
                            "Video autoplay:",
                            error
                        );

                    }
                );

        };


    if (
        activeWeatherVideo.readyState >=
        2
    ) {

        playVideo();

    }

    else {

        activeWeatherVideo.addEventListener(
            "loadeddata",
            playVideo,
            {
                once: true
            }
        );

    }

}


/* =========================================================
   ENABLE SOUND FOR CURRENT VIDEO
========================================================= */

function enableWeatherSound() {

    weatherSoundEnabled =
        true;


    if (!activeWeatherVideo) {
        return;
    }


    activeWeatherVideo.muted =
        false;


    activeWeatherVideo.volume =
        0.65;


    activeWeatherVideo
        .play()
        .catch(
            function (error) {

                console.log(
                    "Could not start video sound:",
                    error
                );

            }
        );


    updateSoundButton();

}


/* =========================================================
   DISABLE WEATHER SOUND
========================================================= */

function disableWeatherSound() {

    weatherSoundEnabled =
        false;


    if (activeWeatherVideo) {

        activeWeatherVideo.muted =
            true;

    }


    if (nextWeatherVideo) {

        nextWeatherVideo.muted =
            true;

    }


    updateSoundButton();

}


/* =========================================================
   SOUND BUTTON
========================================================= */

function updateSoundButton() {

    if (!soundToggle) {
        return;
    }


    if (weatherSoundEnabled) {

        soundToggle.textContent =
            "🔊";

        soundToggle.setAttribute(
            "aria-label",
            "Mute background sound"
        );

        soundToggle.setAttribute(
            "title",
            "Mute background sound"
        );

    }

    else {

        soundToggle.textContent =
            "🔇";

        soundToggle.setAttribute(
            "aria-label",
            "Turn background sound on"
        );

        soundToggle.setAttribute(
            "title",
            "Turn background sound on"
        );

    }

}


/* =========================================================
   FIRST USER INTERACTION
========================================================= */

document.addEventListener(
    "pointerdown",
    function (event) {

        if (
            soundToggle &&
            soundToggle.contains(
                event.target
            )
        ) {

            return;

        }


        /*
         * We don't automatically enable
         * sound here.
         *
         * Browser autoplay rules are strict.
         */

    }
);


/* =========================================================
   SOUND BUTTON CLICK
========================================================= */

if (soundToggle) {

    soundToggle.addEventListener(
        "click",
        function (event) {

            event.preventDefault();

            event.stopPropagation();


            if (
                weatherSoundEnabled
            ) {

                disableWeatherSound();

            }

            else {

                enableWeatherSound();

            }

        }
    );

}


/* =========================================================
   CHANGE WEATHER VIDEO
========================================================= */

function changeWeatherVideo() {

    if (
        weatherIsChanging ||
        !nextWeatherVideo ||
        !activeWeatherVideo
    ) {

        return;

    }


    weatherIsChanging =
        true;


    /*
     * Move to next video.
     */

    weatherIndex++;


    /*
     * Loop back to Background
     * after Night.
     */

    if (
        weatherIndex >=
        weatherVideoFiles.length
    ) {

        weatherIndex =
            0;

    }


    const nextVideoFile =
        weatherVideoFiles[
            weatherIndex
        ];


    console.log(
        "Changing weather to:",
        nextVideoFile
    );


    /*
     * Prepare next video.
     */

    configureWeatherVideo(
        nextWeatherVideo,
        nextVideoFile
    );


    /*
     * Keep next video muted initially.
     *
     * If user has already enabled
     * sound, enable it when playback
     * begins.
     */

    nextWeatherVideo.muted =
        !weatherSoundEnabled;


    nextWeatherVideo.volume =
        0.65;


    const transitionToNextVideo =
        function () {

            nextWeatherVideo.currentTime =
                0;


            nextWeatherVideo
                .play()
                .then(
                    function () {

                        /*
                         * If sound is enabled,
                         * the new video gets sound.
                         */

                        nextWeatherVideo.muted =
                            !weatherSoundEnabled;


                        nextWeatherVideo.volume =
                            0.65;


                        /*
                         * Fade new video IN.
                         */

                        nextWeatherVideo.classList.add(
                            "active"
                        );


                        /*
                         * Fade old video OUT.
                         */

                        activeWeatherVideo.classList.remove(
                            "active"
                        );


                        /*
                         * Wait for CSS fade.
                         */

                        setTimeout(
                            function () {

                                /*
                                 * Stop old video.
                                 */

                                activeWeatherVideo.pause();


                                activeWeatherVideo.currentTime =
                                    0;


                                /*
                                 * Swap video elements.
                                 */

                                const oldVideo =
                                    activeWeatherVideo;


                                activeWeatherVideo =
                                    nextWeatherVideo;


                                nextWeatherVideo =
                                    oldVideo;


                                /*
                                 * Make sure new
                                 * active video has
                                 * correct sound.
                                 */

                                activeWeatherVideo.muted =
                                    !weatherSoundEnabled;


                                activeWeatherVideo.volume =
                                    0.65;


                                /*
                                 * Transition finished.
                                 */

                                weatherIsChanging =
                                    false;


                                console.log(
                                    "Weather changed successfully."
                                );

                            },
                            1300
                        );

                    }
                )
                .catch(
                    function (error) {

                        console.error(
                            "Weather video playback failed:",
                            error
                        );


                        weatherIsChanging =
                            false;

                    }
                );

        };


    /*
     * Wait for video to be ready.
     */

    if (
        nextWeatherVideo.readyState >=
        2
    ) {

        transitionToNextVideo();

    }

    else {

        nextWeatherVideo.addEventListener(
            "loadeddata",
            transitionToNextVideo,
            {
                once: true
            }
        );

    }

}


/* =========================================================
   WEATHER BUTTON
========================================================= */

if (weatherButton) {

    weatherButton.addEventListener(
        "click",
        function (event) {

            event.preventDefault();

            event.stopPropagation();


            console.log(
                "Change weather clicked"
            );


            changeWeatherVideo();

        }
    );

}


/* =========================================================
   START WEATHER SYSTEM
========================================================= */

startWeatherVideo();


/* =========================================================
   INITIAL SOUND BUTTON
========================================================= */

updateSoundButton();


/* =========================================================
   DEBUG
========================================================= */

console.log(
    "India Through The Railway Window loaded."
);

console.log(
    "Weather button:",
    weatherButton
);

console.log(
    "Weather video A:",
    weatherVideoA
);

console.log(
    "Weather video B:",
    weatherVideoB
);


