import { projects, experiences } from "./project-experience.js";

// Populate experience section
const roleList = document.getElementById('role-list');
const project = experiences[0].description;
project.forEach(list => {
    const node = document.createElement("li");
    const listText = document.createTextNode(list);
    node.appendChild(listText);
    roleList.appendChild(node);
})

// Event listener to determine whether mousemove listener for logo should be active
window.addEventListener('resize', () => {
    if (window.innerWidth >= 768) {
        document.addEventListener('mousemove', rotateLogo);
    } else if (window.innerWidth < 768) {
        document.removeEventListener('mousemove', rotateLogo);
    } 
})

// Logo Controller
const logo = document.getElementById('logo');

// screen.orientation.addEventListener('change', (e) => {
// })

const rotateLogo = e => {
    const horizontalDeg = (((e.clientX / window.innerWidth) * 90) - 45) / 3.5;
    const verticalDeg = ((e.clientY / window.innerHeight * 90) - 45) / 4;
    logo.style.transform = `rotateX(${-verticalDeg}deg) rotateY(${horizontalDeg}deg)`;
}

// Initial check to see if mousemove listener should be active
if (window.innerWidth >= 768) {
    document.addEventListener('mousemove', rotateLogo);
} else if (window.innerWidth < 768) {
    document.removeEventListener('mousemove', rotateLogo);
}

// Project Selector
const slider = document.getElementById('slider');
const projectName = document.getElementById('project-name');
const projectDesc1 = document.getElementById('project-desc-1');
const projectDesc2 = document.getElementById('project-desc-2');
const projectThumbnail = document.getElementById('project-thumbnail');
const githubUrl = document.getElementById('github-link');
const demoUrl = document.getElementById('demo-link');
let currentProject = 0;

const setProjectDetails = idx => {
    // Check if ID of project is between 0 and 2
    if (idx >= 0 && idx <= 2) {
        const projectInfo = projects[idx];
        projectName.textContent = projectInfo.name;
        projectDesc1.innerHTML = projectInfo.description1;
        projectDesc2.innerHTML = projectInfo.description2;
        projectThumbnail.src = projectInfo.thumbnail;
        githubUrl.href = projectInfo.github;
        demoUrl.href = projectInfo.demo;
    }
}

// Set initial project with first project
setProjectDetails(0);

const setSlideType = (prevIdx, nextIdx) => {
    // To bigger index (right)
    if (prevIdx < nextIdx) {
        if (prevIdx === 0 && nextIdx === 1) {
            slider.style.transform = 'translateX(115%)';
        } else if ((prevIdx === 1 || prevIdx === 0) && nextIdx === 2) {
            slider.style.transform = 'translateX(235%)';
        }
    // To smaller index (left)
    } else if (prevIdx > nextIdx) {
        if (nextIdx === 0 && (prevIdx === 1 || prevIdx === 2)) {
            slider.style.transform = 'translateX(0%)';
        } else if (nextIdx === 1 && prevIdx === 2) {
            slider.style.transform = 'translateX(115%)';
        }
    }
}

const slide = props => {
    let previousProject = currentProject;
    currentProject = props;
    setSlideType(previousProject, currentProject);
    setProjectDetails(props);
}

// Swipe Handler - Project Section
const projectCard = document.getElementById('project-card');
let touchStart = 0;
let move = false;

const touchHandler = e => {
    let touchDiff = 0;
    if (e.type === 'touchstart') {
        touchStart = e.targetTouches[0].clientX;
    } else if (e.type === 'touchmove') {
        move = true;
    } else if (e.type === 'touchend') {
        let touchEnd = e.changedTouches[0].clientX;
        if (touchStart < touchEnd) {
            // --
            touchDiff = touchStart - touchEnd;
            if (touchDiff < -20 && move === true && currentProject >= 0) {
                setSlideType(currentProject, currentProject - 1);
                currentProject--;
                setProjectDetails(currentProject);
            }
        } else if (touchStart > touchEnd) {
            // ++
            touchDiff = touchStart - touchEnd;
            if (touchDiff > 20 && move === true && currentProject < 3) {
                setSlideType(currentProject, currentProject + 1);
                currentProject++
                setProjectDetails(currentProject);
            }
        }
    }
}

projectCard.addEventListener('touchstart', touchHandler);
projectCard.addEventListener('touchend', touchHandler);
projectCard.addEventListener('touchmove', touchHandler);

export default slide;