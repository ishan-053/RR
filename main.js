// ==========================================
// NEXUS T&P CELL - DYNAMIC INTERACTION LOGIC
// ==========================================
document.addEventListener("DOMContentLoaded", () => {
  
  // 1. SCROLL NAVBAR ACCENTUATION
  const navbar = document.getElementById("navbar");
  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }
  });
  // 2. MOBILE NAVIGATION DRAWER
  const mobileToggle = document.getElementById("mobile-toggle");
  const navMenu = document.getElementById("nav-menu");
  const navLinks = document.querySelectorAll(".nav-link");
  mobileToggle.addEventListener("click", () => {
    navMenu.classList.toggle("open");
    const isOpen = navMenu.classList.contains("open");
    mobileToggle.innerHTML = isOpen 
      ? '<i class="fa-solid fa-xmark"></i>' 
      : '<i class="fa-solid fa-bars"></i>';
  });
  navLinks.forEach(link => {
    link.addEventListener("click", () => {
      navMenu.classList.remove("open");
      mobileToggle.innerHTML = '<i class="fa-solid fa-bars"></i>';
    });
  });
  // 3. STATS COUNT-UP ANIMATION (Intersection Observer)
  const statsSection = document.getElementById("stats");
  const statNumbers = document.querySelectorAll(".stat-number");
  let animated = false;
  const countUp = (element) => {
    const target = parseFloat(element.getAttribute("data-target"));
    const duration = 2000; // ms
    const frameRate = 1000 / 60; // 60fps
    const totalFrames = Math.round(duration / frameRate);
    let frame = 0;
    const isInt = Number.isInteger(target);
    const timer = setInterval(() => {
      frame++;
      const progress = frame / totalFrames;
      // Ease out quadratic progress formula
      const easeProgress = progress * (2 - progress);
      const currentValue = easeProgress * target;
      if (isInt) {
        element.textContent = Math.floor(currentValue);
      } else {
        element.textContent = currentValue.toFixed(1);
      }
      if (frame >= totalFrames) {
        element.textContent = target;
        clearInterval(timer);
      }
    }, frameRate);
  };
  const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !animated) {
        statNumbers.forEach(num => countUp(num));
        animated = true;
        statsObserver.unobserve(statsSection);
      }
    });
  }, { threshold: 0.2 });
  if (statsSection) {
    statsObserver.observe(statsSection);
  }
  // 4. ROADMAP TIMELINE DATA & INTERACTION
  const roadmapData = {
    1: {
      title: "Discovery & Skill Assessment",
      text: "Every candidate begins by undergoing automated benchmarking. We evaluate your core coding aptitude, communication parameters, and logic metrics to outline your customized training curve. Feedback is instant, detailing areas of growth.",
      icon: "fa-solid fa-magnifying-glass-chart",
      duration: "Week 1 - 2",
      output: "Individual Competency Chart"
    },
    2: {
      title: "Intensive Bootcamp Training",
      text: "Rigorous preparation tracks covering data structures, advanced system architecture, full-stack technologies, or specialized core engineering parameters. Mentored by industry professionals with code checks.",
      icon: "fa-solid fa-laptop-code",
      duration: "Week 3 - 10",
      output: "Hands-on Project Portfolio"
    },
    3: {
      title: "Resume Crafting & Branding",
      text: "Our experts review your portfolios and rewrite resumes to pass standard ATS scanners. We establish clean GitHub layouts, professional LinkedIn pages, and guide you to frame projects in high-impact corporate terms.",
      icon: "fa-solid fa-id-card",
      duration: "Week 11 - 12",
      output: "ATS-Approved Profile Pack"
    },
    4: {
      title: "Mock Drills & Peer Reviews",
      text: "Simulate exact company rounds. Participate in mock coding battles, HR interactions, design scenarios, and communication feedback loops. We conduct 1-on-1 simulated interviews with alumni from MAANG & Tier-1 firms.",
      icon: "fa-solid fa-comments-dollar",
      duration: "Week 13 - 15",
      output: "Interview Readiness Certification"
    },
    5: {
      title: "Placement Drives & Offer Nexus",
      text: "The final connection. Get exclusive notifications of on-campus & off-campus pool drives, direct resume shortlists, and negotiate packages. The placement portal monitors schedules so you never miss an interview.",
      icon: "fa-solid fa-award",
      duration: "Week 16+",
      output: "Dream Corporate Placement"
    }
  };
  const stepNodes = document.querySelectorAll(".step-node");
  const detailsCard = document.getElementById("roadmap-details");
  const detailsTitle = document.getElementById("details-title");
  const detailsText = document.getElementById("details-text");
  const detailsIcon = document.querySelector(".details-icon i");
  const detailsDuration = document.getElementById("details-duration");
  const detailsOutput = document.getElementById("details-output");
  stepNodes.forEach(node => {
    node.addEventListener("click", () => {
      stepNodes.forEach(n => n.classList.remove("active"));
      node.classList.add("active");
      const stepNum = node.getAttribute("data-step");
      const data = roadmapData[stepNum];
      // Smooth transition swap
      detailsCard.style.opacity = "0";
      detailsCard.style.transform = "translateY(10px)";
      
      setTimeout(() => {
        detailsTitle.textContent = data.title;
        detailsText.textContent = data.text;
        detailsIcon.className = data.icon;
        detailsDuration.textContent = data.duration;
        detailsOutput.textContent = data.output;
        
        detailsCard.style.opacity = "1";
        detailsCard.style.transform = "translateY(0)";
      }, 250);
    });
  });
  // 5. SKILL MATCHER DATA & SECTOR RECOMMENDATIONS
  const sectorData = {
    software: {
      title: "Software Development",
      percentage: 95,
      status: "High Demand",
      skills: [
        { label: "Data Structures & Algorithms", icon: "fa-solid fa-brackets-curly" },
        { label: "Full Stack (React, Node.js, Next.js)", icon: "fa-solid fa-layer-group" },
        { label: "Cloud Systems & DevOps (Docker, AWS)", icon: "fa-solid fa-cloud" },
        { label: "System Design & Databases", icon: "fa-solid fa-database" }
      ]
    },
    data: {
      title: "Data Science & AI",
      percentage: 89,
      status: "Hyper-Scaling",
      skills: [
        { label: "Python, R & SQL Core", icon: "fa-brands fa-python" },
        { label: "Machine Learning Models (PyTorch)", icon: "fa-solid fa-brain" },
        { label: "Data Visualisation (Tableau, PowerBI)", icon: "fa-solid fa-chart-pie" },
        { label: "Statistical Modelling & Big Data", icon: "fa-solid fa-calculator" }
      ]
    },
    core: {
      title: "Core Engineering",
      percentage: 76,
      status: "Stable Growth",
      skills: [
        { label: "VLSI & Digital Systems Design", icon: "fa-solid fa-microchip" },
        { label: "CAD, CAM Modeling & Simulation", icon: "fa-solid fa-compass-drafting" },
        { label: "MATLAB & Embedded Programming", icon: "fa-solid fa-wave-square" },
        { label: "IoT Sensors & Robotics Networks", icon: "fa-solid fa-wifi" }
      ]
    },
    finance: {
      title: "Finance & Management",
      percentage: 82,
      status: "Elite Incomes",
      skills: [
        { label: "Financial Modeling & Valuation", icon: "fa-solid fa-money-bill-trend-up" },
        { label: "Quantitative Aptitude & Logic", icon: "fa-solid fa-hashtag" },
        { label: "Business Analytics & Excel Pro", icon: "fa-solid fa-file-excel" },
        { label: "Case Study Analysis & Communication", icon: "fa-solid fa-comments" }
      ]
    },
    design: {
      title: "UX Design & Product",
      percentage: 80,
      status: "Design Heavy",
      skills: [
        { label: "UI / UX Prototyping (Figma)", icon: "fa-brands fa-figma" },
        { label: "User Research & Heuristic Reviews", icon: "fa-solid fa-users-viewfinder" },
        { label: "Product Roadmap Planning", icon: "fa-solid fa-route" },
        { label: "Interactive Motion & Design Systems", icon: "fa-solid fa-wand-magic-sparkles" }
      ]
    }
  };
  const sectorButtons = document.querySelectorAll(".sector-btn");
  const recomTitle = document.getElementById("recom-sector-title");
  const recomSkillsList = document.getElementById("recom-skills-list");
  const recomPercentage = document.getElementById("recom-percentage");
  const recomProgress = document.getElementById("recom-progress");
  const recomStatus = document.getElementById("recom-status");
  const updateSectorContent = (sectorKey) => {
    const data = sectorData[sectorKey];
    
    // Update Title
    recomTitle.textContent = data.title;
    
    // Update Skills List
    recomSkillsList.innerHTML = "";
    data.skills.forEach(skill => {
      const skillItem = document.createElement("div");
      skillItem.className = "skill-tag-item";
      // Fallback custom bullet icon if the fontawesome icon doesn't support the style directly
      const iconClass = skill.icon.includes("fa-") ? skill.icon : "fa-solid fa-check";
      skillItem.innerHTML = `<i class="${iconClass}"></i> <span>${skill.label}</span>`;
      recomSkillsList.appendChild(skillItem);
    });
    // Update Percentage & Progress Ring
    recomPercentage.textContent = `${data.percentage}%`;
    recomProgress.style.background = `conic-gradient(var(--primary) ${data.percentage}%, rgba(255, 255, 255, 0.05) ${data.percentage}%)`;
    
    // Update Status
    recomStatus.textContent = data.status;
  };
  // Initialize Software Sector on load
  updateSectorContent("software");
  sectorButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      sectorButtons.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      
      const sectorKey = btn.getAttribute("data-sector");
      updateSectorContent(sectorKey);
    });
  });
  // 6. ALUMNI TESTIMONIAL SLIDER CAROUSEL
  const track = document.getElementById("testimonials-track");
  const dots = document.querySelectorAll(".nav-dot");
  let currentIndex = 0;
  let autoPlayTimer;
  const moveSlide = (index) => {
    const cardWidth = track.firstElementChild.getBoundingClientRect().width;
    const gap = 32; // matching stylesheet gap (2rem = 32px)
    
    // Calculate slide percentage or pixels translation
    // In viewport width relative, card is 33.3% minus gap adjustments
    // If mobile, it translates full width
    const isMobile = window.innerWidth <= 768;
    const isTablet = window.innerWidth > 768 && window.innerWidth <= 1024;
    
    let multiplier;
    if (isMobile) {
      multiplier = index * (cardWidth + gap);
    } else if (isTablet) {
      multiplier = index * (cardWidth + gap);
    } else {
      // Desktop: showing 3 items, step is typically single card width + gap
      multiplier = index * (cardWidth + gap);
    }
    
    track.style.transform = `translateX(-${multiplier}px)`;
    
    dots.forEach(d => d.classList.remove("active"));
    dots[index].classList.add("active");
    currentIndex = index;
  };
  const startAutoPlay = () => {
    autoPlayTimer = setInterval(() => {
      let nextIndex = currentIndex + 1;
      if (nextIndex >= dots.length) {
        nextIndex = 0;
      }
      moveSlide(nextIndex);
    }, 8000);
  };
  const resetAutoPlay = () => {
    clearInterval(autoPlayTimer);
    startAutoPlay();
  };
  dots.forEach((dot, index) => {
    dot.addEventListener("click", () => {
      moveSlide(index);
      resetAutoPlay();
    });
  });
  // Listen to window resize to recalibrate widths
  window.addEventListener("resize", () => {
    moveSlide(currentIndex);
  });
  // Start sliding loop
  startAutoPlay();
});