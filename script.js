
/* =========================================================
   1. GLOBAL ELEMENTS
========================================================= */

const themeToggle = document.getElementById("themeToggle");
const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");
const year = document.getElementById("year");

const sections = document.querySelectorAll("main section[id]");


/* =========================================================
   2. CURRENT YEAR
========================================================= */

if (year) {
    year.textContent = new Date().getFullYear();
}


/* =========================================================
   3. THEME TOGGLE
========================================================= */

themeToggle?.addEventListener("click", () => {
    const isLight = document.body.classList.toggle("light");

    themeToggle.innerHTML = isLight
        ? "<span>☾</span> Dark mode"
        : "<span>☼</span> Light mode";
});


/* =========================================================
   4. MOBILE NAVIGATION
========================================================= */

function closeMobileMenu() {
    navLinks?.classList.remove("open");
    menuToggle?.setAttribute("aria-expanded", "false");

    if (menuToggle) {
        menuToggle.textContent = "☰";
    }
}

menuToggle?.addEventListener("click", () => {
    const isOpen = navLinks?.classList.toggle("open") ?? false;

    menuToggle.setAttribute("aria-expanded", String(isOpen));
    menuToggle.textContent = isOpen ? "✕" : "☰";
});

navLinks?.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", closeMobileMenu);
});


/* =========================================================
   5. ACTIVE NAVIGATION ON SCROLL
========================================================= */

if ("IntersectionObserver" in window && navLinks) {
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;

            navLinks.querySelectorAll("a").forEach(link => {
                const isActive =
                    link.getAttribute("href") === `#${entry.target.id}`;

                link.classList.toggle("active", isActive);
            });
        });
    }, {
        rootMargin: "-35% 0px -55% 0px"
    });

    sections.forEach(section => observer.observe(section));
}


/* =========================================================
   6. CONTACT FORM - EMAILJS
========================================================= */

const contactForm = document.getElementById("contactForm");

contactForm?.addEventListener("submit", async event => {
    event.preventDefault();

    const sender = document.getElementById("name")?.value.trim();
    const senderEmail = document.getElementById("email")?.value.trim();
    const message = document.getElementById("message")?.value.trim();

    const submitButton = contactForm.querySelector(
        'button[type="submit"]'
    );

    if (!sender || !senderEmail || !message) {
        showToast(
            "Incomplete information",
            "Please complete all fields.",
            "error"
        );
        return;
    }

    if (!window.emailjs) {
        showToast(
            "Email service unavailable",
            "Please try again later.",
            "error"
        );
        return;
    }

    const originalText = submitButton?.textContent ?? "Send Message";

    if (submitButton) {
        submitButton.disabled = true;
        submitButton.textContent = "Sending...";
    }

    try {
        await emailjs.send(
            "service_a01ad7c",
            "template_sl08bko",
            {
                sender,
                senderEmail,
                message
            }
        );

        showToast(
            "Message sent successfully!",
            "Thank you for reaching out. I'll get back to you soon.",
            "success"
        );

        contactForm.reset();

    } catch (error) {
        console.error("EmailJS Error:", error);

        showToast(
            "Message not sent",
            "Something went wrong. Please try again.",
            "error"
        );

    } finally {
        if (submitButton) {
            submitButton.disabled = false;
            submitButton.textContent = originalText;
        }
    }
});


/* =========================================================
   7. CERTIFICATE DATA
========================================================= */

const certificates = [
    {
        title: "English for IT 1",
        issuer: "Cisco Networking Academy",
        date: "2026",
        image: "asset/Screenshot 2026-11-26 000248.png"
    },
    {
        title: "Computer Literacy In-House Training Program of MENTOR",
        issuer: "MENTOR In-House Training Program",
        date: "2026",
        image: "asset/METORS.jpg"
    },
    {
        title: "Financial Literacy and Mental Health",
        issuer: "World Mental Health Awareness Month 2026",
        date: "2026",
        image: "asset/flmh.jpg"
    },
    {
        title: "Adolescent Reproductive Health",
        issuer: "World Mental Health Awareness Month 2026",
        date: "2026",
        image: "asset/ARH.jpg"
    },
    {
        title: "Gender and Development: Safe Spaces and Gender-Based Violence",
        issuer: "World Mental Health Awareness Month 2026",
        date: "2026",
        image: "asset/GDSSGV.jpg"
    },
    {
        title: "Beat the Heat: Preventing Dehydration and Heat-Related Illnesses",
        issuer: "Health and Safety Awareness Training",
        date: "2026",
        image: "asset/beat the heat.jpeg"
    },
    {
        title: "School-Based/Onsite Face-to-Face Skill/Hands-On Practicum Training",
        issuer: "RESCUE 177 Training Center",
        date: "2025",
        image: "asset/RESCUE.jpg"
    },
    {
        title: "Toxic Truths: Symposium on Drug Education, Prevention, and Control",
        issuer: "Barkada Kontra Droga",
        date: "2025",
        image: "asset/SDEPC.jpg"
    },
    {
        title: "Symposium on Fire Prevention and Control",
        issuer: "Civil Welfare Training Service Coastal Leader Environmental Action Network",
        date: "2025",
        image: "asset/SFS.jpg"
    },
    {
        title: "Computer Systems Servicing NC II",
        issuer: "TESDA",
        date: "2024",
        image: "asset/NC II.png"
    },
    {
        title: "Specialized Subject: TVL ICT Computer System Servicing (CSS NC II)",
        issuer: "Achiever Award",
        date: "2024",
        image: "asset/achiver award.jpeg"
    },
     {
        title: "Advanced Microsoft Productivity Applications Training Workshop",
        issuer: "Microsoft Productivity Applications Training",
        date: "2023",
        image: "asset/Advanced Microsoft Productivity Applications Training Workshop – Ivisan National High School.jpg"
    }
];


/* =========================================================
   8. CERTIFICATE ELEMENTS
========================================================= */

const featuredCertificates = document.getElementById("featuredCertificates");
const certificateTags = document.getElementById("certificateTags");
const certificatesGallery = document.getElementById("certificatesGallery");
const certificateGalleryGrid = document.getElementById("certificateGalleryGrid");

const certificateImageModal = document.getElementById("certificateImageModal");
const fullCertificateImage = document.getElementById("fullCertificateImage");
const fullCertificateTitle = document.getElementById("fullCertificateTitle");

const openCertificates = document.getElementById("openCertificates");
const viewAllCertificates = document.getElementById("viewAllCertificates");
const closeCertificates = document.getElementById("closeCertificates");
const closeCertificateImage = document.getElementById("closeCertificateImage");


/* =========================================================
   9. MODAL SCROLL MANAGEMENT
========================================================= */

function updateBodyScroll() {
    const modals = [
        certificatesGallery,
        certificateImageModal,
        projectModal,
        imageLightbox
    ];

    const isModalOpen = modals.some(modal =>
        modal?.classList.contains("active")
    );

    document.body.style.overflow = isModalOpen ? "hidden" : "";
}


/* =========================================================
   10. CERTIFICATE IMAGE PREVIEW
========================================================= */

function showCertificate(index) {
    const certificate = certificates[index];

    if (
        !certificate ||
        !certificateImageModal ||
        !fullCertificateImage ||
        !fullCertificateTitle
    ) return;

    fullCertificateImage.src = certificate.image;
    fullCertificateImage.alt = certificate.title;

    fullCertificateTitle.textContent = certificate.title;

    certificateImageModal.classList.add("active");

    updateBodyScroll();
}

function closeImagePreview() {
    certificateImageModal?.classList.remove("active");

    if (fullCertificateImage) {
        fullCertificateImage.removeAttribute("src");
    }

    updateBodyScroll();
}


/* =========================================================
   11. CREATE CERTIFICATE CARD
========================================================= */

function createCertificateCard(cert, index, featured = false) {
    const card = document.createElement("article");

    card.className = featured
        ? "featured-certificate-card"
        : "gallery-certificate-card";

    const image = document.createElement("img");

    image.src = cert.image;
    image.alt = cert.title;
    image.loading = "lazy";
    image.tabIndex = 0;

    const openPreview = () => showCertificate(index);

    image.addEventListener("click", openPreview);

    image.addEventListener("keydown", event => {
        if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            openPreview();
        }
    });

    image.addEventListener("error", () => {
        console.error("Certificate image not found:", cert.image);
    });

    const info = document.createElement("div");

    info.className = featured
        ? "featured-certificate-info"
        : "gallery-certificate-info";

    const title = document.createElement(featured ? "h4" : "h3");
    title.textContent = cert.title;

    const issuer = document.createElement("p");
    issuer.textContent = `Issued by: ${cert.issuer}`;

    const date = document.createElement("p");
    date.textContent = `Date: ${cert.date}`;

    const button = document.createElement("button");

    button.type = "button";
    button.className = "gallery-view-btn";
    button.textContent = "View Certificate ↗";
    button.addEventListener("click", openPreview);

    info.append(title, issuer, date, button);
    card.append(image, info);

    return card;
}


/* =========================================================
   12. RENDER CERTIFICATES
========================================================= */

function renderCertificates() {
    if (featuredCertificates) {
        featuredCertificates.replaceChildren();

        certificates.slice(0, 4).forEach((cert, index) => {
            featuredCertificates.appendChild(
                createCertificateCard(cert, index, true)
            );
        });
    }

    if (certificateGalleryGrid) {
        certificateGalleryGrid.replaceChildren();

        certificates.forEach((cert, index) => {
            certificateGalleryGrid.appendChild(
                createCertificateCard(cert, index)
            );
        });
    }

    if (certificateTags) {
        certificateTags.replaceChildren();

        certificates.slice(0, 3).forEach(cert => {
            const tag = document.createElement("span");

            tag.className = "certificate-tag";
            tag.textContent = cert.title;

            certificateTags.appendChild(tag);
        });

        if (certificates.length > 3) {
            const more = document.createElement("button");

            more.type = "button";
            more.className = "certificate-tag";
            more.textContent = `+${certificates.length - 3} more`;
            more.addEventListener("click", openGallery);

            certificateTags.appendChild(more);
        }
    }
}


/* =========================================================
   13. CERTIFICATE GALLERY
========================================================= */

function openGallery() {
    certificatesGallery?.classList.add("active");
    updateBodyScroll();
}

function closeGallery() {
    certificatesGallery?.classList.remove("active");
    updateBodyScroll();
}

openCertificates?.addEventListener("click", openGallery);
viewAllCertificates?.addEventListener("click", openGallery);
closeCertificates?.addEventListener("click", closeGallery);


/* =========================================================
   14. CERTIFICATE MODAL EVENTS
========================================================= */

closeCertificateImage?.addEventListener("click", closeImagePreview);

certificateImageModal?.addEventListener("click", event => {
    if (event.target === certificateImageModal) {
        closeImagePreview();
    }
});

certificatesGallery?.addEventListener("click", event => {
    if (event.target === certificatesGallery) {
        closeGallery();
    }
});


/* =========================================================
   15. PROJECT CASE STUDY CONTENT
========================================================= */

const projectContent = {

    equipment: `
        <p class="doc-type">PROJECT 01 / SYSTEM DEVELOPMENT</p>

        <h2>Equipment Borrowing Management System</h2>

        <p>
            A web-based application developed to manage equipment
            borrowing transactions, user requests, approvals, and returns.
        </p>

        <div class="project-gallery">
            <figure>
                <img
                    class="project-screenshot"
                    src="image/PROJECT/equipment-dashboard.png"
                    alt="Equipment Borrowing Management System Dashboard"
                    loading="lazy"
                    tabindex="0"
                    role="button"
                >
                <figcaption>Equipment System Dashboard</figcaption>
            </figure>

            <figure>
                <img
                    class="project-screenshot"
                    src="image/PROJECT/equipment-list.png"
                    alt="Equipment Management List"
                    loading="lazy"
                    tabindex="0"
                    role="button"
                >
                <figcaption>Equipment Management List</figcaption>
            </figure>
        </div>

        <div class="case-meta">
            <span class="tag">Python</span>
            <span class="tag">Django</span>
            <span class="tag">MySQL</span>
            <span class="tag">HTML</span>
            <span class="tag">CSS</span>
        </div>

        <div class="case-repository">
            <a
                class="btn"
                href="https://github.com/renielvillareal17-ui/equipment-borrowing-system"
                target="_blank"
                rel="noopener noreferrer"
            >
                View GitHub Repository ↗
            </a>
        </div>

        <div class="case-block">
            <h3>Project Overview</h3>
            <p>
                The system provides a centralized platform for managing
                equipment borrowing activities. It supports different
                user roles, allowing administrators, staff, and users
                to access features based on their responsibilities.
            </p>
        </div>

        <div class="case-block">
            <h3>Borrowing Workflow</h3>

            <div class="workflow-diagram">
                <div class="workflow-step">
                    <span class="workflow-number">01</span>
                    <b>Submit Request</b>
                    <p>The user selects equipment and submits a borrowing request.</p>
                </div>

                <div class="workflow-step">
                    <span class="workflow-number">02</span>
                    <b>Review Request</b>
                    <p>Authorized staff reviews the submitted request.</p>
                </div>

                <div class="workflow-step">
                    <span class="workflow-number">03</span>
                    <b>Approval</b>
                    <p>The request is approved or rejected.</p>
                </div>

                <div class="workflow-step">
                    <span class="workflow-number">04</span>
                    <b>Return Monitoring</b>
                    <p>The system tracks due dates and equipment returns.</p>
                </div>
            </div>
        </div>

        <div class="case-block">
            <h3>Problem Addressed</h3>
            <p>
                Manual equipment borrowing processes can make it difficult
                to monitor requests, approvals, due dates, and returned
                equipment. This project aims to organize these activities
                through a web-based management system.
            </p>
        </div>

        <div class="case-block">
            <h3>Key Features</h3>
            <ul>
                <li>Role-based access for administrators, staff, and users.</li>
                <li>Equipment borrowing request management.</li>
                <li>Borrowing approval and rejection processes.</li>
                <li>Due-date and return monitoring.</li>
                <li>Overdue status and penalty calculation.</li>
                <li>Notification management.</li>
            </ul>
        </div>

        <div class="case-block">
            <h3>Technologies Used</h3>
            <p>
                Python and Django were used for backend development,
                MySQL for database management, and HTML and CSS
                for the user interface.
            </p>
        </div>

        <div class="case-block">
            <h3>My Role and Contributions</h3>
            <p>
                Contributed to requirements analysis, workflow design, 
                feature development, user-interface refinement,
                and quality assurance.
            </p>
        </div>
    `,

    ar: `
        <p class="doc-type">PROJECT 02 / COMPUTER VISION</p>

        <h2>AR Hand &amp; Face Tracker – Boss Fight</h2>

        <p>
            An interactive augmented reality application that combines
            hand tracking and face tracking to create a gesture-controlled
            boss battle experience.
        </p>

        <div class="project-gallery">
            <figure>
                <img
                    class="project-screenshot"
                    src="image/PROJECT/ar-boss-fight.png"
                    alt="AR Hand and Face Tracker Boss Fight gameplay"
                    loading="lazy"
                    tabindex="0"
                    role="button"
                >
                <figcaption>Boss Fight Gameplay</figcaption>
            </figure>

            <figure>
                <img
                    class="project-screenshot"
                    src="image/PROJECT/ar-start-screen.png"
                    alt="AR Hand and Face Tracker start screen"
                    loading="lazy"
                    tabindex="0"
                    role="button"
                >
                <figcaption>Game Start Screen</figcaption>
            </figure>
        </div>

        <div class="case-meta">
            <span class="tag">Python</span>
            <span class="tag">OpenCV</span>
            <span class="tag">MediaPipe</span>
            <span class="tag">Computer Vision</span>
            <span class="tag">AR</span>
        </div>

        <div class="case-repository">
            <a
                class="btn"
                href="https://github.com/renielvillareal17-ui/AR-Hand-Face-Tracker-Boss-Fight"
                target="_blank"
                rel="noopener noreferrer"
            >
                View GitHub Repository ↗
            </a>
        </div>

        <div class="case-block">
            <h3>Project Overview</h3>
            <p>
                This project uses a webcam to track the user's face and
                hand movements in real time. It transforms detected
                gestures into game interactions, allowing the user to
                control attacks and interact with a virtual boss.
            </p>
        </div>

        <div class="case-block">
            <h3>Core Technologies</h3>
            <ul>
                <li>OpenCV for webcam input and image processing.</li>
                <li>MediaPipe for real-time hand landmark detection.</li>
                <li>Face tracking for player interaction.</li>
                <li>Gesture recognition for attack activation.</li>
                <li>Augmented reality elements for the game interface.</li>
            </ul>
        </div>

        <div class="case-block">
            <h3>Gameplay Features</h3>
            <ul>
                <li>Real-time face and hand tracking.</li>
                <li>Gesture-controlled player attacks.</li>
                <li>Boss health and shield indicators.</li>
                <li>Score tracking and game-over state.</li>
                <li>Visual effects and animated attacks.</li>
                <li>Sound effects and background music.</li>
            </ul>
        </div>

        <div class="case-block">
            <h3>Problem Addressed</h3>
            <p>
                Traditional computer interactions rely heavily on
                keyboards and mouse input. This project explores
                natural user interaction through camera-based
                hand and face tracking.
            </p>
        </div>

        <div class="case-block">
            <h3>My Role and Contributions</h3>
            <p>
              Contributed to feature planning, interaction design,
              prototype development, usability improvements,
              and project evaluation.
            </p>
        </div>
    `
};


/* =========================================================
   16. PROJECT MODAL ELEMENTS
========================================================= */

const projectModal = document.getElementById("projectModal");
const projectModalContent = document.getElementById("projectModalContent");
const closeProjectButton = document.getElementById("closeProjectModal");

const imageLightbox = document.getElementById("imageLightbox");
const lightboxImage = document.getElementById("lightboxImage");
const lightboxCaption = document.getElementById("lightboxCaption");
const closeLightboxButton = document.getElementById("lightboxClose");

let previousProjectButton = null;


/* =========================================================
   17. OPEN PROJECT CASE STUDY
========================================================= */

function openProject(projectKey, button) {
    const content = projectContent[projectKey];

    if (!projectModal || !projectModalContent || !content) {
        console.error("Project modal or content is missing:", projectKey);
        return;
    }

    previousProjectButton = button;

    projectModalContent.innerHTML = content;

    projectModal.classList.add("active");
    projectModal.setAttribute("aria-hidden", "false");

    updateBodyScroll();

    closeProjectButton?.focus();
}


/* =========================================================
   18. CLOSE PROJECT CASE STUDY
========================================================= */

function closeProject() {
    if (!projectModal) return;

    projectModal.classList.remove("active");
    projectModal.setAttribute("aria-hidden", "true");

    updateBodyScroll();

    previousProjectButton?.focus();
}


/* =========================================================
   19. PROJECT BUTTON EVENTS
========================================================= */

document.querySelectorAll("[data-project]").forEach(button => {
    button.addEventListener("click", () => {
        openProject(button.dataset.project, button);
    });
});

closeProjectButton?.addEventListener("click", closeProject);

projectModal?.addEventListener("click", event => {
    if (event.target === projectModal) {
        closeProject();
    }
});


/* =========================================================
   20. PROJECT IMAGE LIGHTBOX
========================================================= */

function openLightbox(image) {
    if (!imageLightbox || !lightboxImage) return;

    lightboxImage.src = image.src;
    lightboxImage.alt = image.alt || "Project screenshot";

    if (lightboxCaption) {
        lightboxCaption.textContent =
            image.dataset.caption || image.alt || "";
    }

    imageLightbox.classList.add("active");
    imageLightbox.setAttribute("aria-hidden", "false");

    updateBodyScroll();

    closeLightboxButton?.focus();
}

projectModalContent?.addEventListener("click", event => {
    const image = event.target.closest(
        ".project-screenshot, .project-gallery img[role='button']"
    );

    if (image) {
        openLightbox(image);
    }
});

projectModalContent?.addEventListener("keydown", event => {
    const image = event.target.closest(
        ".project-screenshot, .project-gallery img[role='button']"
    );

    if (
        image &&
        (event.key === "Enter" || event.key === " ")
    ) {
        event.preventDefault();
        openLightbox(image);
    }
});


/* =========================================================
   21. CLOSE PROJECT IMAGE LIGHTBOX
========================================================= */

function closeLightbox() {
    if (!imageLightbox) return;

    imageLightbox.classList.remove("active");
    imageLightbox.setAttribute("aria-hidden", "true");

    lightboxImage?.removeAttribute("src");

    updateBodyScroll();
}

closeLightboxButton?.addEventListener("click", closeLightbox);

imageLightbox?.addEventListener("click", event => {
    if (event.target === imageLightbox) {
        closeLightbox();
    }
});


/* =========================================================
   22. GLOBAL ESCAPE KEY
========================================================= */

document.addEventListener("keydown", event => {
    if (event.key !== "Escape") return;

    if (imageLightbox?.classList.contains("active")) {
        closeLightbox();
    } else if (projectModal?.classList.contains("active")) {
        closeProject();
    } else if (certificateImageModal?.classList.contains("active")) {
        closeImagePreview();
    } else if (certificatesGallery?.classList.contains("active")) {
        closeGallery();
    }
});


/* =========================================================
   23. INITIALIZE PORTFOLIO
========================================================= */

renderCertificates();
