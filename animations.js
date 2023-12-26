import anime from './anime.es.js';

// Hero Section Selectors
const line = document.querySelectorAll(".line");
const nameRole = document.getElementById('name-role')
const stackLinks = document.getElementById('stack-links');
const logo = document.getElementById('logo');

const heroCopy = document.getElementById('hero-copy');
const projectCard = document.getElementById('project-card');
const roleList = document.getElementById('role-list');

// Project Section Selectors 
const projectTitle = document.getElementById('project-title');
const projectList = document.getElementById('project-list');
const projectControls = document.getElementById('project-controls');

const projectName = document.getElementById('project-name');
const projectDesc = document.getElementById('project-desc');
const projectThumbnail = document.getElementById('project-thumbnail');
const buttons = document.querySelectorAll('button');
const buttonArray = [...buttons];

// Experience Section Selectors
const experienceTitle = document.getElementById('experience-title');
const companyTitle = document.getElementById('company-title');
const roleStack = document.getElementById('role-stack');
const experienceDescription = document.getElementById('experience-description');

// Hero Timeline
let heroTl = anime.timeline({
    easing: 'easeOutExpo',
});
  
heroTl
.add({
  targets: line[0],
  width: '35%',
  duration: 1000,
  easing: 'cubicBezier(.75, .05, .1, .3)',
})
.add({
  targets: nameRole,
  opacity: '100%',
  translateY: -50,
  delay: 100,
  duration: 1500
});

let heroTl2 = anime.timeline({
    easing: 'easeOutExpo',
    delay: 1100
});

heroTl2.add({
  targets: stackLinks,
  opacity: '100%',
  translateY: 50,
  duration: 1500
});

let logoTl = anime.timeline({
  easing: 'easeOutExpo',
  delay: 1100
});

logoTl.add({
    targets: logo,
    opacity: '100%',
    duration: 1500
});

// Projects timeline
let projectTl = anime.timeline({
  easing: 'easeOutExpo',
});

let projectButtonsTl = anime.timeline({
  easing: 'easeOutExpo'
});

// Exp Timeline
let expTl = anime.timeline({
  easing: 'easeOutExpo'
});

let expTl2 = anime.timeline({
  easing: 'easeOutExpo',
  delay: 1000
});

let projectAnimated = false;
let experienceAnimated = false;

// Intersection Observers
const callback = entries => {
  entries.forEach(entry => {
      const target = entry.target.id;
      const isIntersecting = entry.isIntersecting;
      if (target === 'project-title' && isIntersecting === true) {
          if (projectAnimated === false) {
            projectTl.add({
              // targets: [projectTitle, projectList, projectControls, projectName, projectDesc, projectThumbnail],
              targets: [projectTitle],
              translateY: -50,
              opacity: 1,
              duration: 1000,
              delay: 250
            })
            .add({
              targets: [line[1], line[2], line[3], line[4]],
              width: '15%',
              duration: 1000,
              easing: 'cubicBezier(.75, .05, .1, .3)',
            })
            projectButtonsTl.add({
              targets: buttonArray,
              opacity: 1,
              duration: 250,
            });
          }
          projectAnimated = true;
      } else if (target === 'role-list' && isIntersecting === true) {
          if (experienceAnimated === false) {
            expTl.add({
              targets: line[5],
              width: '15%',
              duration: 1000,
              easing: 'cubicBezier(.75, .05, .1, .3)',
            })
            .add({
              targets: [experienceTitle, companyTitle],
              translateY: -50,
              opacity: 1,
              duration: 1000,
            })
            expTl2.add({
              targets: [roleStack, experienceDescription],
              translateY: 50,
              opacity: 1,
              duration: 1000,
            })
          }
          experienceAnimated = true;
      }
  });
}

let sectionObserver = new IntersectionObserver(callback);
sectionObserver.observe(heroCopy);
sectionObserver.observe(projectTitle);
// sectionObserver.observe(projectCard);
sectionObserver.observe(roleList);