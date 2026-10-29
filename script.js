// Personalize the values below before publishing your portfolio.
const portfolioConfig = {
  email: "bhosale71096@gmail.com",
  linkedin: "https://www.linkedin.com/in/akshay-bhosale-060966244/",
  github: "https://github.com/BhosaleAkshay8055"
};

const projectData = {
  safety: {
    kicker: "PROJECT APPROACH / 01",
    title: "Industrial Safety Monitoring",
    description: "A computer vision workflow can detect people and vehicles in camera frames, evaluate configured safety zones, and raise events for an operator or connected system. Describe only the features you have actually implemented in your own project.",
    steps: [
      "Receive frames from a video file or supported RTSP camera stream.",
      "Run object detection and track relevant objects across frames.",
      "Evaluate zone rules and event conditions using configured regions.",
      "Publish an alert or event to a dashboard or an approved PLC integration."
    ]
  },
  speed: {
    kicker: "PROJECT APPROACH / 02",
    title: "Vehicle Speed Analytics",
    description: "Speed estimation combines object tracking with camera calibration. Reliable measurements require a calibrated scene, known scale or reference points, and validation against real measurements.",
    steps: [
      "Detect vehicles and maintain a consistent track ID between frames.",
      "Map image coordinates to a calibrated ground plane using homography.",
      "Estimate distance over time using timestamps and the calibrated scale.",
      "Validate estimates against a trusted reference before using thresholds for alarms."
    ]
  },
  parking: {
    kicker: "PROJECT APPROACH / 03",
    title: "AI Parking Monitoring",
    description: "A parking analytics system can classify configured parking regions as occupied or available and expose the current status to a dashboard.",
    steps: [
      "Define parking-slot regions for the camera view.",
      "Detect vehicles and associate them with the defined regions.",
      "Apply occupancy rules and handle uncertain detections.",
      "Expose slot status through an API and display the results in a dashboard."
    ]
  },
  media: {
    kicker: "PROJECT APPROACH / 04",
    title: "Image & Video Processing",
    description: "A media-processing service can accept image or video input, process it through a Python vision pipeline, and return the output to a web application.",
    steps: [
      "Validate the uploaded media and enforce file-size and type limits.",
      "Process images or sample video frames with the selected vision model.",
      "Save annotated outputs and processing metadata safely.",
      "Return a job status or result URL to the frontend."
    ]
  }
};

const menuToggle = document.querySelector(".menu-toggle");
const nav = document.querySelector(".nav");
menuToggle.addEventListener("click", () => {
  const open = nav.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(open));
});
nav.querySelectorAll("a").forEach(link => link.addEventListener("click", () => {
  nav.classList.remove("open");
  menuToggle.setAttribute("aria-expanded", "false");
}));

document.querySelector("#year").textContent = new Date().getFullYear();

const emailLink = document.querySelector("#email-link");
const linkedinLink = document.querySelector("#linkedin-link");
const githubLink = document.querySelector("#github-link");
emailLink.textContent = portfolioConfig.email;
emailLink.href = `mailto:${portfolioConfig.email}`;
linkedinLink.href = portfolioConfig.linkedin;
githubLink.href = portfolioConfig.github;

const dialog = document.querySelector("#project-dialog");
document.querySelectorAll(".project-details").forEach(button => {
  button.addEventListener("click", () => {
    const project = projectData[button.dataset.project];
    if (!project) return;
    document.querySelector("#dialog-kicker").textContent = project.kicker;
    document.querySelector("#dialog-title").textContent = project.title;
    document.querySelector("#dialog-description").textContent = project.description;
    const list = document.querySelector("#dialog-steps");
    list.replaceChildren(...project.steps.map(step => {
      const li = document.createElement("li");
      li.textContent = step;
      return li;
    }));
    dialog.showModal();
  });
});
document.querySelector(".dialog-close").addEventListener("click", () => dialog.close());
dialog.addEventListener("click", event => {
  if (event.target === dialog) dialog.close();
});

const toast = document.querySelector("#toast");
let toastTimeout;
function showToast(message) {
  toast.textContent = message;
  toast.classList.add("show");
  clearTimeout(toastTimeout);
  toastTimeout = setTimeout(() => toast.classList.remove("show"), 2400);
}
document.querySelector(".copy-email").addEventListener("click", async () => {
  if (portfolioConfig.email.includes("YOUR_EMAIL")) {
    showToast("Update your email in script.js first.");
    return;
  }
  try {
    await navigator.clipboard.writeText(portfolioConfig.email);
    showToast("Email address copied.");
  } catch {
    window.location.href = `mailto:${portfolioConfig.email}`;
  }
});
